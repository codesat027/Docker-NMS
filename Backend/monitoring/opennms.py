# import requests
# from django.conf import settings

# BASE = settings.OPENNMS_BASE_URL
# AUTH = (settings.OPENNMS_USERNAME,settings.OPENNMS_PASSWORD)
# HEADERS = {
#     "Content-Type": "application/json",
#     "Accept": "application/json",

# }

# def fetch_alarms(params=None):
#     resp = requests.get(
#         f"{BASE}/rest/alarms",
#         auth = AUTH,
#         headers= HEADERS,
#         params=params or {}

#     )
#     resp.raise_for_status()
#     return resp.json().get("alarm", [])

# def fetch_nodes(params=None):
#     resp = requests.get(
#         f"{BASE}/rest/nodes",
#         auth = AUTH,
#         headers= HEADERS,
#         params=params or {}

#     )
#     resp.raise_for_status()
#     return resp.json().get("node", [])


import requests
from django.conf import settings

BASE = settings.OPENNMS_BASE_URL
AUTH = (settings.OPENNMS_USERNAME, settings.OPENNMS_PASSWORD)
HEADERS = {
    "Content-Type": "application/json",
    "Accept":       "application/json",
}


# ─── NODES ────────────────────────────────────────────────

def fetch_nodes(params=None):
    resp = requests.get(
        f"{BASE}/rest/nodes",
        auth=AUTH,
        headers=HEADERS,
        params=params or {}
    )
    resp.raise_for_status()
    return resp.json().get("node", [])


def fetch_node(node_id):
    resp = requests.get(
        f"{BASE}/rest/nodes/{node_id}",
        auth=AUTH,
        headers=HEADERS,
    )
    resp.raise_for_status()
    return resp.json() 


def create_node(label, foreign_id, ip,
                location="Default",
                node_type="other",
                description="",
                snmp_version="v2c",
                snmp_community="public",
                snmp_port=161,
                snmp_security_name=None,
                snmp_auth_protocol=None,
                snmp_auth_passphrase=None,
                snmp_privacy_protocol=None,
                snmp_privacy_passphrase=None,
                vendor="",
                model="",
                serial_number="",
                building="",
                room="",
                department="",
                services=None):

    if services is None:
        services = ["ICMP", "SNMP"]
    
    foreign_source = settings.OPENNMS_FOREIGN_SOURCE

    
    services_xml = "".join(
        f'<monitored-service service-name="{s}"/>'
        for s in services
    )

    # build asset XML
    assets = {
        "category":     node_type,
        "description":  description,
        "vendor":       vendor,
        "modelNumber":  model,
        "serialNumber": serial_number,
        "building":     building,
        "room":         room,
        "department":   department,
    }
    assets_xml = "".join(
        f'<asset name="{k}" value="{v}"/>'
        for k, v in assets.items() if v
    )

    # build full XML payload
    xml_payload = f"""<?xml version='1.0' encoding='UTF-8'?>
<model-import foreign-source='{foreign_source}'>
    <node foreign-id='{foreign_id}' node-label='{label}' building='{location}'>
        <interface ip-addr='{ip}' snmp-primary='P' status='1'>
            {services_xml}
        </interface>
        {assets_xml}
    </node>
</model-import>"""

    

    

    


    snmp_config = {
        "version": snmp_version,
        "port":    snmp_port,
    }
    if snmp_version in ["v1", "v2c"]:
        snmp_config["community"] = snmp_community
    elif snmp_version == "v3":
        snmp_config["securityName"]      = snmp_security_name
        snmp_config["authProtocol"]      = snmp_auth_protocol
        snmp_config["authPassphrase"]    = snmp_auth_passphrase
        snmp_config["privacyProtocol"]   = snmp_privacy_protocol
        snmp_config["privacyPassphrase"] = snmp_privacy_passphrase

    payload = {
        "foreign-source": settings.OPENNMS_FOREIGN_SOURCE,
        "node": [{
            "foreign-id":  foreign_id,
            "node-label":  label,
            "location":    location,
            "asset": [
                {"name": "category",     "value": node_type},
                {"name": "description",  "value": description},
                {"name": "vendor",       "value": vendor},
                {"name": "modelNumber",  "value": model},
                {"name": "serialNumber", "value": serial_number},
                {"name": "building",     "value": building},
                {"name": "room",         "value": room},
                {"name": "department",   "value": department},
            ],
            "interface": [{
                "ip-addr":      ip,
                "snmp-primary": "P",
                "status":       "1",
                "monitored-service": [
                    {"service-name": s} for s in services
                ]
            }],
            "snmp-config": snmp_config
        }]
    }

    node_xml = f"""<?xml version='1.0' encoding='UTF-8'?>
<node foreign-id='{foreign_id}' node-label='{label}' building='{location}'>
    <interface ip-addr='{ip}' snmp-primary='P' status='1'>
        {services_xml}
    </interface>
    {assets_xml}
</node>"""

    push = requests.post(
        f"{BASE}/rest/requisitions/{foreign_source}/nodes",
        auth=AUTH,
        headers={
            "Content-Type": "application/xml",
            "Accept":       "application/json",
        },
        data=node_xml.encode("utf-8")
    )
    push.raise_for_status()

    requests.put(
        f"{BASE}/rest/requisitions/{foreign_source}/import",
        auth=AUTH,
        headers={"Accept": "application/json"}
    )

    return {"status": "created", "label": label, "ip": ip}

def update_node(foreign_id, foreign_source=None, label=None, location=None,
                node_type=None, description=None,
                snmp_version=None, snmp_community="public",
                snmp_security_name=None,
                snmp_auth_protocol=None,
                snmp_auth_passphrase=None,
                snmp_privacy_protocol=None,
                snmp_privacy_passphrase=None,
                vendor=None, model=None,
                serial_number=None, building=None,
                room=None, department=None,
                services=None):

    fs = foreign_source or settings.OPENNMS_FOREIGN_SOURCE

    # fetch existing node
    existing = requests.get(
        f"{BASE}/rest/requisitions/{fs}/nodes/{foreign_id}",
        auth=AUTH,
        headers={"Accept": "application/json"}
    )
    existing.raise_for_status()
    current = existing.json()

    updated_label    = label    or current.get("node-label")
    updated_location = location or current.get("building") or "Default"

    if services is None:
        existing_services = current.get("interface", [{}])[0].get("monitored-service", [])
        services = [s.get("service-name") for s in existing_services] or ["ICMP", "SNMP"]

    existing_ip = current.get("interface", [{}])[0].get("ip-addr", "")

    # build services XML
    services_xml = "".join(
        f'<monitored-service service-name="{s}"/>'
        for s in services
    )

    # build assets XML
    assets = {
        "category":     node_type or "",
        "description":  description or "",
        "vendor":       vendor or "",
        "modelNumber":  model or "",
        "serialNumber": serial_number or "",
        "building":     building or "",
        "room":         room or "",
        "department":   department or "",
    }
    assets_xml = "".join(
        f'<asset name="{k}" value="{v}"/>'
        for k, v in assets.items() if v
    )

    # Instead of PUT to single node, POST the full requisition with updated node
    xml_payload = f"""<?xml version='1.0' encoding='UTF-8'?>
<model-import foreign-source='{fs}'>
    <node foreign-id='{foreign_id}' node-label='{updated_label}' building='{updated_location}'>
        <interface ip-addr='{existing_ip}' snmp-primary='P' status='1'>
            {services_xml}
        </interface>
        {assets_xml}
    </node>
</model-import>"""

    resp = requests.post(
        f"{BASE}/rest/requisitions",
        auth=AUTH,
        headers={
            "Content-Type": "application/xml",
            "Accept":       "application/json",
        },
        data=xml_payload.encode("utf-8")
    )
    resp.raise_for_status()

    # trigger import
    requests.put(
        f"{BASE}/rest/requisitions/{fs}/import",
        auth=AUTH,
        headers={"Accept": "application/json"}
    )

    return {
        "status":        "updated",
        "foreignId":     foreign_id,
        "foreignSource": fs,
        "label":         updated_label
    }



               

def delete_node(node_id):
    resp = requests.delete(
        f"{BASE}/rest/nodes/{node_id}",
        auth=AUTH,
        headers=HEADERS
    )
    resp.raise_for_status()
    return True


def bulk_create_nodes(nodes):
    foreign_source = settings.OPENNMS_FOREIGN_SOURCE

    nodes_xml = ""
    for n in nodes:
        nodes_xml += f"""
    <node foreign-id='{n["foreign_id"]}' node-label='{n["label"]}'>
        <interface ip-addr='{n["ip"]}' snmp-primary='P' status='1'>
            <monitored-service service-name='ICMP'/>
            <monitored-service service-name='SNMP'/>
        </interface>
    </node>"""

    xml_payload = f"""<?xml version='1.0' encoding='UTF-8'?>
<model-import foreign-source='{foreign_source}'>
    {nodes_xml}
</model-import>"""



    payload = {
        "foreign-source": settings.OPENNMS_FOREIGN_SOURCE,
        
         
        "node": [
            {
                "foreign-id":  n["foreign_id"],
                "node-label":  n["label"],
                "location":    n.get("location", "Default"),
                "asset": [{"name": "category", "value": n.get("type", "other")}],
                "interface": [{
                    "ip-addr":      n["ip"],
                    "snmp-primary": "P",
                    "status":       "1",
                    "monitored-service": [
                        {"service-name": "ICMP"},
                        {"service-name": "SNMP"}
                    ]
                }]
            }
            for n in nodes
        ]
    }

    push = requests.post(
        f"{BASE}/rest/requisitions",
        auth=AUTH,
        headers={
            "Content-Type": "application/xml",
            "Accept":       "application/json",
        },
        data=xml_payload.encode("utf-8")
        
    )
    push.raise_for_status()

    requests.put(
        f"{BASE}/rest/requisitions/{settings.OPENNMS_FOREIGN_SOURCE}/import",
        auth=AUTH,
        headers={"Accept": "application/json"}
    )

    return len(nodes)


# ─── ALARMS ───────────────────────────────────────────────

def fetch_alarms(params=None):
    resp = requests.get(
        f"{BASE}/rest/alarms",
        auth=AUTH,
        headers=HEADERS,
        params=params or {}
    )
    resp.raise_for_status()
    return resp.json().get("alarm", [])


# ─── OUTAGES ──────────────────────────────────────────────

def fetch_outages(params=None):
    resp = requests.get(
        f"{BASE}/rest/outages",
        auth=AUTH,
        headers=HEADERS,
        params=params or {}
    )
    resp.raise_for_status()
    return resp.json().get("outage", [])


def fetch_node_outages(node_id):
    resp = requests.get(
        f"{BASE}/rest/outages/forNode/{node_id}",
        auth=AUTH,
        headers=HEADERS,
    )
    resp.raise_for_status()
    return resp.json().get("outage", [])


# ─── DASHBOARD ────────────────────────────────────────────

def fetch_dashboard_stats():
    nodes  = fetch_nodes()
    alarms = fetch_alarms()

    severity_counts = {"CRITICAL": 0, "MAJOR": 0, "MINOR": 0, "WARNING": 0}
    for a in alarms:
        sev = a.get("severity", "").upper()
        if sev in severity_counts:
            severity_counts[sev] += 1

    return {
        "total_nodes":     len(nodes),
        "nodes_up":        len(nodes),
        "nodes_down":      0,
        "total_alarms":    len(alarms),
        "critical_alarms": severity_counts["CRITICAL"],
        "major_alarms":    severity_counts["MAJOR"],
        "minor_alarms":    severity_counts["MINOR"],
        "warning_alarms":  severity_counts["WARNING"],
    }


# ─── RESOURCES + METRICS ──────────────────────────────────

# def fetch_node_resources(node_id):
#     resp = requests.get(
#         f"{BASE}/rest/resources",
#         auth=AUTH,
#         headers=HEADERS,
#         params={"nodeId": node_id}
#     )
#     resp.raise_for_status()
#     data    = resp.json()
#     metrics = []

#     for resource in data.get("resource", []):
#         for child in resource.get("children", {}).get("resource", []):
#             resource_id   = child.get("id")
#             resource_type = child.get("typeLabel")
#             for metric_name in child.get("rrdGraphAttributes", {}).keys():
#                 metrics.append({
#                     "resource_id":   resource_id,
#                     "resource_type": resource_type,
#                     "metric":        metric_name,
#                 })

#     return metrics




def fetch_node_resources(node_id):
    resp = requests.get(
        f"{BASE}/rest/resources/fornode/{node_id}", # Using fornode is faster for specific nodes
        auth=AUTH,
        headers=HEADERS
    )
    resp.raise_for_status()
    data = resp.json()

    # This is where we will store our 7 targets
    # We use a dict so we can easily find them later
    found_metrics = {
        "cpu": None,
        "mem_total": None,
        "mem_free": None,
        "disk": None,
        "traffic_in": None,
        "traffic_out": None
    }

    # Helper to recursively scan the resource tree
    def scan(resource_list):
        for res in resource_list:
            r_id = res.get("id")
            r_type = res.get("typeLabel", "")
            attrs = res.get("rrdGraphAttributes", {})

            # 1. Check for CPU (Linux/Unix standard)
            if "ssCpuRawUser" in attrs:
                found_metrics["cpu"] = {"id": r_id, "attr": "ssCpuRawUser"}
            
            # 2 & 3. Check for Memory
            if "memTotalReal" in attrs:
                found_metrics["mem_total"] = {"id": r_id, "attr": "memTotalReal"}
            if "memAvailReal" in attrs:
                found_metrics["mem_free"] = {"id": r_id, "attr": "memAvailReal"}

            # 4. Check for Disk (takes the first disk found, usually root)
            if "dskPercent" in attrs and not found_metrics["disk"]:
                found_metrics["disk"] = {"id": r_id, "attr": "dskPercent"}

            # 5 & 6. Check for Traffic (takes the first interface found, like eth0)
            if "ifInOctets" in attrs and not found_metrics["traffic_in"]:
                found_metrics["traffic_in"] = {"id": r_id, "attr": "ifInOctets"}
            if "ifOutOctets" in attrs and not found_metrics["traffic_out"]:
                found_metrics["traffic_out"] = {"id": r_id, "attr": "ifOutOctets"}

            # If this resource has children, scan them too
            children = res.get("children", {}).get("resource", [])
            if children:
                scan(children)

    # Start the scan from the top level
    # OpenNMS returns 'resource' as a list or a single dict
    top_resources = data.get("resource", [])
    if isinstance(top_resources, dict): top_resources = [top_resources]
    
    scan(top_resources)
    return found_metrics


def fetch_metric_value(resource_id, metric_name, is_traffic = False):
    encoded_id = requests.utils.quote(resource_id, safe='')
    resp = requests.get(
        f"{BASE}/rest/measurements/{encoded_id}/{metric_name}",
        auth=AUTH,
        headers=HEADERS,
        params={
            "start": "-300000",
            "end":   "0",
            "step":  "300000",
        }
    )
    if not resp.ok:
        return None

    data   = resp.json()
    values = data.get("columns", [{}])[0].get("values", [])
    valid  = [v for v in values if v is not None and str(v) != "NaN"]
    last_val = valid[-1]

    if is_traffic:
        return round((last_val)/8/300/1000000,2)
    
    return round(last_val,2)


# ─── ACTIONS ──────────────────────────────────────────────

def quarantine_node(node_id):
    requests.post(
        f"{BASE}/rest/nodes/{node_id}/categories",
        auth=AUTH,
        headers=HEADERS,
        json={"name": "Quarantined"}
    )


# ─── CELERY DEPENDENT — uncomment when Celery is set up ───

# def trigger_discovery(ip_range): ...
# def fetch_nodes_since(timestamp_ms): ...
# def snmp_shutdown(node_id): ...