# reports/views.py
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from monitoring import opennms
from .generators import (
    generate_full_csv,
    generate_alarms_csv,
    generate_nodes_csv,
    generate_outages_csv,
    generate_full_pdf,
    get_date_range,
)


class DownloadCSVView(APIView):

    def get(self, request):
        period      = request.query_params.get("period", "weekly")
        report_type = request.query_params.get("type", "full")
        start, end  = get_date_range(period)

        alarms  = opennms.fetch_alarms()
        nodes   = opennms.fetch_nodes()
        outages = opennms.fetch_outages()

        if report_type == "alarms":
            buffer   = generate_alarms_csv(alarms)
            filename = f"alarms_{period}.csv"
        elif report_type == "nodes":
            buffer   = generate_nodes_csv(nodes)
            filename = f"nodes_{period}.csv"
        elif report_type == "outages":
            buffer   = generate_outages_csv(outages)
            filename = f"outages_{period}.csv"
        else:
            buffer   = generate_full_csv(alarms, nodes, outages)
            filename = f"pulse_monitor_report_{period}.csv"

        response = HttpResponse(buffer.read(), content_type="text/csv")
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response


class DownloadPDFView(APIView):

    def get(self, request):
        period     = request.query_params.get("period", "weekly")
        start, end = get_date_range(period)

        alarms  = opennms.fetch_alarms()
        nodes   = opennms.fetch_nodes()
        outages = opennms.fetch_outages()

        buffer   = generate_full_pdf(alarms, nodes, outages, period)
        filename = f"pulse_monitor_report_{period}.pdf"

        response = HttpResponse(buffer.read(), content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response