# monitoring/serializers.py
from rest_framework import serializers
from .models import ThresholdRule, NodeAction, DiscoveryJob


class ThresholdRuleSerializer(serializers.ModelSerializer):
    created_by  = serializers.StringRelatedField(read_only=True)
    policy_type_display = serializers.CharField(
        source='get_policy_type_display',
        read_only=True
    )
    action_display = serializers.CharField(
        source='get_action_display',
        read_only=True
    )
    operator_display = serializers.CharField(
        source='get_operator_display',
        read_only=True
    )

    class Meta:
        model  = ThresholdRule
        fields = [
            'id', 'name', 'policy_type', 'policy_type_display',
            'node_filter', 'node_id', 'resource_id',
            'metric', 'operator', 'operator_display',
            'threshold', 'action', 'action_display',
            'active', 'created_by', 'created_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at']

    def validate(self, data):
        policy_type = data.get('policy_type', 'global')

        # global policy must have node_filter
        if policy_type == 'global' and not data.get('node_filter'):
            raise serializers.ValidationError(
                "Global policy requires a node_filter (e.g. 'firewall')"
            )

        # node specific policy must have node_id
        if policy_type == 'specific' and not data.get('node_id'):
            raise serializers.ValidationError(
                "Node specific policy requires a node_id"
            )

        return data


class NodeActionSerializer(serializers.ModelSerializer):
    rule        = serializers.StringRelatedField(read_only=True)
    resolved_by = serializers.StringRelatedField(read_only=True)
    action_taken_display = serializers.SerializerMethodField()

    class Meta:
        model  = NodeAction
        fields = [
            'id', 'node_id', 'node_label', 'rule',
            'action_taken', 'action_taken_display',
            'triggered_at', 'resolved', 'resolved_by'
        ]
        read_only_fields = ['id', 'triggered_at']

    def get_action_taken_display(self, obj):
        ACTION_LABELS = {
            'alert':      'Alert only',
            'quarantine': 'Quarantine node',
            'shutdown':   'SNMP shutdown',
        }
        return ACTION_LABELS.get(obj.action_taken, obj.action_taken)


class DiscoveryJobSerializer(serializers.ModelSerializer):
    created_by     = serializers.StringRelatedField(read_only=True)
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )
    duration = serializers.SerializerMethodField()

    class Meta:
        model  = DiscoveryJob
        fields = [
            'id', 'ip_range', 'status', 'status_display',
            'discovered_count', 'created_by',
            'started_at', 'completed_at', 'duration'
        ]
        read_only_fields = [
            'id', 'status', 'discovered_count',
            'created_by', 'started_at', 'completed_at'
        ]

    def get_duration(self, obj):
        """Returns how long the discovery took in seconds"""
        if obj.started_at and obj.completed_at:
            delta = obj.completed_at - obj.started_at
            return round(delta.total_seconds())
        return None