# monitoring/views.py
import csv
import io
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser

from . import opennms
from .models import ThresholdRule, NodeAction, DiscoveryJob
from .serializers import (
    ThresholdRuleSerializer,
    NodeActionSerializer,
    DiscoveryJobSerializer
)


# ─── HEALTH ───────────────────────────────────────────────

class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            resp = requests.get(
                f"{settings.OPENNMS_BASE_URL}/rest/info",
                auth=(settings.OPENNMS_USERNAME, settings.OPENNMS_PASSWORD),
                headers={"Accept": "application/json"},
                timeout=5
            )
            resp.raise_for_status()
            info = resp.json()
            return Response({
                "status":     "connected",
                "django":     "ok",
                "opennms":    "ok",
                "version":    info.get("displayVersion", "unknown"),
                "instanceId": info.get("instanceId", "Pulse Monitor"),
            })
        except requests.exceptions.ConnectionError:
            return Response({
                "status":  "error",
                "django":  "ok",
                "opennms": "unreachable",
                "message": "Cannot connect to OpenNMS",
            }, status=503)
        except Exception as e:
            return Response({
                "status":  "error",
                "message": str(e)
            }, status=500)


# ─── DASHBOARD ────────────────────────────────────────────

class DashboardView(APIView):

    def get(self, request):
        stats = opennms.fetch_dashboard_stats()
        return Response(stats)


# ─── NODES ────────────────────────────────────────────────



    # monitoring/views.py
class NodeListView(APIView):

    def get(self, request):
        params = {}

        # search by label — OpenNMS supports this
        if request.query_params.get("search"):
            params["comparator"] = "ilike"
            params["label"]      = f"%{request.query_params['search']}%"

        # fetch all nodes from OpenNMS
        nodes = opennms.fetch_nodes(params)

        # filter by type on Django side
        node_type = request.query_params.get("type")
        if node_type:
            nodes = [
                n for n in nodes
                if n.get("assetRecord", {}).get("category", "").lower() == node_type.lower()
            ]

        # normalize ipInterfaces: OpenNMS returns {"ipInterface": [...]} not a plain array
        for node in nodes:
            raw = node.get("ipInterfaces")
            if isinstance(raw, dict):
                node["ipInterfaces"] = raw.get("ipInterface", [])
            elif not isinstance(raw, list):
                node["ipInterfaces"] = []

        return Response(nodes)

    

    def post(self, request):
        result = opennms.create_node(
            label                   = request.data.get("label"),
            foreign_id              = request.data.get("foreignId"),
            ip                      = request.data.get("ip"),
            location                = request.data.get("location", "Default"),
            node_type               = request.data.get("type", "other"),
            description             = request.data.get("description", ""),
            snmp_version            = request.data.get("snmpVersion", "v2c"),
            snmp_community          = request.data.get("snmpCommunity", "public"),
            snmp_port               = request.data.get("snmpPort", 161),
            snmp_security_name      = request.data.get("snmpSecurityName"),
            snmp_auth_protocol      = request.data.get("snmpAuthProtocol"),
            snmp_auth_passphrase    = request.data.get("snmpAuthPassphrase"),
            snmp_privacy_protocol   = request.data.get("snmpPrivacyProtocol"),
            snmp_privacy_passphrase = request.data.get("snmpPrivacyPassphrase"),
            vendor                  = request.data.get("vendor", ""),
            model                   = request.data.get("model", ""),
            serial_number           = request.data.get("serialNumber", ""),
            building                = request.data.get("building", ""),
            room                    = request.data.get("room", ""),
            department              = request.data.get("department", ""),
            services                = request.data.get("services", ["ICMP", "SNMP"]),
        )
        return Response(result, status=201)


class NodeDetailView(APIView):

    def get(self, request, node_id):
        node = opennms.fetch_node(node_id)
        return Response(node)

    def patch(self, request, node_id):
        print("foreignId:", request.data.get("foreignId"))
        print("foreignSource:", request.data.get("foreignSource"))
        print("ALL REQUEST DATA:", dict(request.data))
       
        result = opennms.update_node(
            foreign_id              = request.data.get("foreignId"),
            foreign_source          = request.data.get("foreignSource"),
            label                   = request.data.get("label"),
            location                = request.data.get("location"),
            node_type               = request.data.get("type"),
            description             = request.data.get("description"),
            snmp_version            = request.data.get("snmpVersion"),
            snmp_community          = request.data.get("snmpCommunity", "public"),
            vendor                  = request.data.get("vendor"),
            model                   = request.data.get("model"),
            serial_number           = request.data.get("serialNumber"),
            building                = request.data.get("building"),
            room                    = request.data.get("room"),
            department              = request.data.get("department"),
            services                = request.data.get("services"),
        )
        return Response(result)

    def delete(self, request, node_id):
        opennms.delete_node(node_id)
        return Response(status=204)


class NodeBulkImportView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file provided"}, status=400)

        decoded = file.read().decode("utf-8")
        reader  = csv.DictReader(io.StringIO(decoded))
        nodes   = []

        for row in reader:
            nodes.append({
                "label":      row.get("label"),
                "foreign_id": row.get("foreign_id"),
                "ip":         row.get("ip"),
                "location":   row.get("location", "Default"),
                "type":       row.get("type", "other"),
            })

        if not nodes:
            return Response({"error": "CSV is empty"}, status=400)

        count = opennms.bulk_create_nodes(nodes)
        return Response({"imported": count}, status=201)


class NodeResourcesView(APIView):

    def get(self, request, node_id):
        metrics = opennms.fetch_node_resources(node_id)
        return Response(metrics)


# ─── ALARMS ───────────────────────────────────────────────

class AlarmListView(APIView):

    def get(self, request):
        params = {}
        if request.query_params.get("severity"):
            params["severity"] = request.query_params["severity"].upper()
        alarms = opennms.fetch_alarms(params)
        return Response(alarms)


# ─── OUTAGES ──────────────────────────────────────────────

class OutageListView(APIView):

    def get(self, request):
        node_id = request.query_params.get("nodeId")
        if node_id:
            outages = opennms.fetch_node_outages(node_id)
            return Response(outages)

        params = {}
        if request.query_params.get("current") == "true":
            params["ifRegainedService"] = "null"

        outages = opennms.fetch_outages(params)
        return Response(outages)


# ─── THRESHOLDS ───────────────────────────────────────────

class ThresholdRuleView(APIView):

    def get(self, request):
        rules = ThresholdRule.objects.all().order_by("-created_at")
        return Response(ThresholdRuleSerializer(rules, many=True).data)

    def post(self, request):
        s = ThresholdRuleSerializer(data=request.data)
        if s.is_valid():
            s.save(created_by=request.user)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class ThresholdRuleDetailView(APIView):

    def patch(self, request, rule_id):
        try:
            rule = ThresholdRule.objects.get(id=rule_id)
        except ThresholdRule.DoesNotExist:
            return Response({"error": "Rule not found"}, status=404)

        s = ThresholdRuleSerializer(rule, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, rule_id):
        try:
            ThresholdRule.objects.get(id=rule_id).delete()
        except ThresholdRule.DoesNotExist:
            return Response({"error": "Rule not found"}, status=404)
        return Response(status=204)


# ─── NODE ACTIONS ─────────────────────────────────────────

class NodeActionLogView(APIView):

    def get(self, request):
        actions = NodeAction.objects.order_by("-triggered_at")[:100]
        return Response(NodeActionSerializer(actions, many=True).data)


class NodeActionDetailView(APIView):

    def patch(self, request, action_id):
        try:
            action = NodeAction.objects.get(id=action_id)
        except NodeAction.DoesNotExist:
            return Response({"error": "Action not found"}, status=404)

        action.resolved    = True
        action.resolved_by = request.user
        action.save()
        return Response({"status": "resolved"})


# ─── DISCOVERY ────────────────────────────────────────────

class DiscoveryView(APIView):

    def post(self, request):
        ip_range = request.data.get("ip_range")
        if not ip_range:
            return Response({"error": "ip_range is required"}, status=400)

        job = DiscoveryJob.objects.create(
            ip_range   = ip_range,
            status     = "pending",
            created_by = request.user
        )

        # import here to avoid circular import
        # from .tasks import run_discovery
        # run_discovery.delay(job.id, ip_range)

        # return Response(DiscoveryJobSerializer(job).data, status=202)

    def get(self, request):
        jobs = DiscoveryJob.objects.filter(
            created_by=request.user
        ).order_by("-started_at")
        return Response(DiscoveryJobSerializer(jobs, many=True).data)


class DiscoveryStatusView(APIView):

    def get(self, request, job_id):
        try:
            job = DiscoveryJob.objects.get(id=job_id)
        except DiscoveryJob.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)
        return Response(DiscoveryJobSerializer(job).data)