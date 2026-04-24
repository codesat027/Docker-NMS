from django.urls import path
from . import views

urlpatterns = [
    path("health/",                          views.HealthCheckView.as_view()),
    path("dashboard/",                       views.DashboardView.as_view()),

    # nodes
    path("nodes/",                           views.NodeListView.as_view()),
    path("nodes/bulk/",                      views.NodeBulkImportView.as_view()),
    path("nodes/<str:node_id>/",             views.NodeDetailView.as_view()),
    path("nodes/<str:node_id>/resources/",   views.NodeResourcesView.as_view()),

    # alarms + outages
    path("alarms/",                          views.AlarmListView.as_view()),
    path("outages/",                         views.OutageListView.as_view()),

    # thresholds
    path("thresholds/",                      views.ThresholdRuleView.as_view()),
    path("thresholds/<int:rule_id>/",        views.ThresholdRuleDetailView.as_view()),

    # actions
    path("actions/",                         views.NodeActionLogView.as_view()),
    path("actions/<int:action_id>/",         views.NodeActionDetailView.as_view()),

    # discovery
    path("discovery/",                       views.DiscoveryView.as_view()),
    path("discovery/<int:job_id>/status/",   views.DiscoveryStatusView.as_view()),

]