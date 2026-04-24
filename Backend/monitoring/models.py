# monitoring/models.py
from django.db import models
from users.models import CustomUser


class ThresholdRule(models.Model):

    class Action(models.TextChoices):
        ALERT      = "alert",      "Alert only"
        QUARANTINE = "quarantine", "Quarantine node"
        SHUTDOWN   = "shutdown",   "SNMP shutdown"

    class Operator(models.TextChoices):
        GT  = ">",  "Greater than"
        LT  = "<",  "Less than"
        GTE = ">=", "Greater than or equal"
        LTE = "<=", "Less than or equal"

    class PolicyType(models.TextChoices):
        GLOBAL   = "global",   "Global Policy"
        SPECIFIC = "specific", "Node Specific"

    # basic info
    name        = models.CharField(max_length=100)
    policy_type = models.CharField(
        max_length=10,
        choices=PolicyType.choices,
        default=PolicyType.GLOBAL
    )

    # global policy — matches nodes by name/type
    node_filter = models.CharField(
        max_length=100,
        blank=True,
        help_text="Filter by node label — e.g. 'firewall'. Used for global policies."
    )

    # node specific policy — targets exact node
    node_id     = models.CharField(
        max_length=100,
        blank=True,
        help_text="Specific node ID. Used for node specific policies."
    )

    # metric config
    resource_id = models.CharField(max_length=255, blank=True)
    metric      = models.CharField(max_length=100)
    operator    = models.CharField(max_length=3, choices=Operator.choices, default=">")
    threshold   = models.FloatField()

    # action
    action      = models.CharField(max_length=20, choices=Action.choices)
    active      = models.BooleanField(default=True)

    # meta
    created_by  = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.policy_type == self.PolicyType.GLOBAL:
            return f"[GLOBAL] {self.name} — {self.metric} {self.operator} {self.threshold}"
        return f"[NODE] {self.name} — {self.metric} {self.operator} {self.threshold}"

    class Meta:
        ordering = ["-created_at"]


class NodeAction(models.Model):
    node_id      = models.CharField(max_length=50)
    node_label   = models.CharField(max_length=100)
    rule         = models.ForeignKey(ThresholdRule, on_delete=models.SET_NULL, null=True)
    action_taken = models.CharField(max_length=50)
    triggered_at = models.DateTimeField(auto_now_add=True)
    resolved     = models.BooleanField(default=False)
    resolved_by  = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="resolved_actions"
    )

    def __str__(self):
        return f"{self.node_label} — {self.action_taken}"

    class Meta:
        ordering = ["-triggered_at"]


class DiscoveryJob(models.Model):

    class Status(models.TextChoices):
        PENDING   = "pending",   "Pending"
        RUNNING   = "running",   "Running"
        COMPLETED = "completed", "Completed"
        FAILED    = "failed",    "Failed"

    ip_range         = models.CharField(max_length=50)
    status           = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    discovered_count = models.IntegerField(default=0)
    created_by       = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    started_at       = models.DateTimeField(null=True, blank=True)
    completed_at     = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Discovery {self.ip_range} — {self.status}"

    class Meta:
        ordering = ["-started_at"]
