# reports/generators.py
import csv
import io
from datetime import datetime, timedelta
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.enums import TA_CENTER, TA_LEFT


def get_date_range(period):
    """
    Returns start and end datetime based on period.
    period = 'daily', 'weekly', 'monthly'
    """
    end   = datetime.now()
    start = {
        "daily":   end - timedelta(days=1),
        "weekly":  end - timedelta(weeks=1),
        "monthly": end - timedelta(days=30),
    }.get(period, end - timedelta(weeks=1))

    return start, end


# ─── CSV GENERATORS ───────────────────────────────────────

def generate_alarms_csv(alarms):
    buffer = io.StringIO()
    writer = csv.writer(buffer)

    writer.writerow([
        "ID", "Node", "Severity", "Description",
        "Last Event Time", "Acknowledged"
    ])

    for a in alarms:
        writer.writerow([
            a.get("id", ""),
            a.get("nodeLabel", "N/A"),
            a.get("severity", "N/A"),
            a.get("description", "")[:100],
            a.get("lastEventTime", ""),
            "Yes" if a.get("ackTime") else "No",
        ])

    buffer.seek(0)
    return buffer


def generate_nodes_csv(nodes):
    buffer = io.StringIO()
    writer = csv.writer(buffer)

    writer.writerow([
        "ID", "Label", "Location", "Foreign Source",
        "Type", "Create Time"
    ])

    for n in nodes:
        writer.writerow([
            n.get("id", ""),
            n.get("label", "N/A"),
            n.get("location", "N/A"),
            n.get("foreignSource", "N/A"),
            n.get("type", "N/A"),
            n.get("createTime", ""),
        ])

    buffer.seek(0)
    return buffer


def generate_outages_csv(outages):
    buffer = io.StringIO()
    writer = csv.writer(buffer)

    writer.writerow([
        "ID", "Node", "IP Address", "Service",
        "Down Since", "Restored", "Still Down"
    ])

    for o in outages:
        writer.writerow([
            o.get("id", ""),
            o.get("nodeLabel", "N/A"),
            o.get("ipAddress", "N/A"),
            o.get("serviceType", {}).get("name", "N/A"),
            o.get("ifLostService", ""),
            o.get("ifRegainedService", ""),
            "Yes" if not o.get("ifRegainedService") else "No",
        ])

    buffer.seek(0)
    return buffer


def generate_full_csv(alarms, nodes, outages):
    """Combines all data into one CSV with multiple sections"""
    buffer = io.StringIO()
    writer = csv.writer(buffer)

    # header
    writer.writerow([f"PulseMonitor Full Report — {datetime.now().strftime('%Y-%m-%d %H:%M')}"])
    writer.writerow([])

    # summary
    writer.writerow(["SUMMARY"])
    writer.writerow(["Total Nodes",   len(nodes)])
    writer.writerow(["Total Alarms",  len(alarms)])
    writer.writerow(["Total Outages", len(outages)])
    writer.writerow([])

    # alarms section
    writer.writerow(["ALARMS"])
    writer.writerow(["ID", "Node", "Severity", "Description", "Last Event Time"])
    for a in alarms:
        writer.writerow([
            a.get("id", ""),
            a.get("nodeLabel", "N/A"),
            a.get("severity", "N/A"),
            a.get("description", "")[:80],
            a.get("lastEventTime", ""),
        ])
    writer.writerow([])

    # nodes section
    writer.writerow(["NODES"])
    writer.writerow(["ID", "Label", "Location", "Type"])
    for n in nodes:
        writer.writerow([
            n.get("id", ""),
            n.get("label", "N/A"),
            n.get("location", "N/A"),
            n.get("type", "N/A"),
        ])
    writer.writerow([])

    # outages section
    writer.writerow(["OUTAGES"])
    writer.writerow(["Node", "Service", "Down Since", "Restored"])
    for o in outages:
        writer.writerow([
            o.get("nodeLabel", "N/A"),
            o.get("serviceType", {}).get("name", "N/A"),
            o.get("ifLostService", ""),
            o.get("ifRegainedService", "Still Down"),
        ])

    buffer.seek(0)
    return buffer


# ─── PDF GENERATORS ───────────────────────────────────────

def generate_full_pdf(alarms, nodes, outages, period="weekly"):
    buffer   = io.BytesIO()
    doc      = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=0.5*inch,
        leftMargin=0.5*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch
    )
    styles   = getSampleStyleSheet()
    elements = []

    # title style
    title_style = ParagraphStyle(
        'CustomTitle',
        parent    = styles['Title'],
        fontSize  = 20,
        alignment = TA_CENTER,
        textColor = colors.HexColor('#1a73e8'),
        spaceAfter= 6,
    )

    # section header style
    section_style = ParagraphStyle(
        'SectionHeader',
        parent     = styles['Heading2'],
        fontSize   = 13,
        textColor  = colors.HexColor('#1a73e8'),
        spaceBefore= 12,
        spaceAfter = 6,
    )

    # ── Title ──
    elements.append(Paragraph("PulseMonitor Report", title_style))
    elements.append(Paragraph(
        f"Period: {period.capitalize()} | Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        styles['Normal']
    ))
    elements.append(Spacer(1, 0.2*inch))

    # ── Summary cards ──
    elements.append(Paragraph("Summary", section_style))
    summary_data = [
        ["Total Nodes", "Total Alarms", "Total Outages"],
        [str(len(nodes)), str(len(alarms)), str(len(outages))],
    ]
    summary_table = Table(summary_data, colWidths=[2.2*inch, 2.2*inch, 2.2*inch])
    summary_table.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, 0), colors.HexColor("#1a73e8")),
        ("TEXTCOLOR",    (0, 0), (-1, 0), colors.white),
        ("FONTSIZE",     (0, 0), (-1, 0), 11),
        ("FONTSIZE",     (0, 1), (-1, 1), 16),
        ("FONTNAME",     (0, 1), (-1, 1), "Helvetica-Bold"),
        ("ALIGN",        (0, 0), (-1, -1), "CENTER"),
        ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [colors.HexColor("#f0f4ff")]),
        ("GRID",         (0, 0), (-1, -1), 0.5, colors.HexColor("#dddddd")),
        ("ROWHEIGHT",    (0, 0), (-1, -1), 30),
    ]))
    elements.append(summary_table)
    elements.append(Spacer(1, 0.2*inch))

    # ── Alarms table ──
    elements.append(Paragraph("Alarms", section_style))
    if alarms:
        alarm_data = [["ID", "Node", "Severity", "Description"]]
        for a in alarms[:30]:  # cap at 30 rows
            alarm_data.append([
                str(a.get("id", "")),
                a.get("nodeLabel", "N/A"),
                a.get("severity", "N/A"),
                a.get("description", "")[:50],
            ])

        alarm_table = Table(alarm_data, colWidths=[0.6*inch, 1.5*inch, 1.2*inch, 3.3*inch])
        alarm_table.setStyle(TableStyle([
            ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1a73e8")),
            ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
            ("FONTSIZE",      (0, 0), (-1, 0), 10),
            ("FONTSIZE",      (0, 1), (-1, -1), 8),
            ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f5f5")]),
            ("GRID",          (0, 0), (-1, -1), 0.25, colors.HexColor("#dddddd")),
            ("ALIGN",         (0, 0), (-1, -1), "LEFT"),
            ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
            ("ROWHEIGHT",     (0, 0), (-1, -1), 20),
        ]))
        elements.append(alarm_table)
    else:
        elements.append(Paragraph("No alarms in this period.", styles["Normal"]))

    elements.append(Spacer(1, 0.2*inch))

    # ── Nodes table ──
    elements.append(Paragraph("Nodes", section_style))
    if nodes:
        node_data = [["ID", "Label", "Location", "Type"]]
        for n in nodes[:30]:
            node_data.append([
                str(n.get("id", "")),
                n.get("label", "N/A"),
                n.get("location", "N/A"),
                n.get("type", "N/A"),
            ])

        node_table = Table(node_data, colWidths=[0.6*inch, 2*inch, 2*inch, 2*inch])
        node_table.setStyle(TableStyle([
            ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1a73e8")),
            ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
            ("FONTSIZE",      (0, 0), (-1, 0), 10),
            ("FONTSIZE",      (0, 1), (-1, -1), 8),
            ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f5f5")]),
            ("GRID",          (0, 0), (-1, -1), 0.25, colors.HexColor("#dddddd")),
            ("ALIGN",         (0, 0), (-1, -1), "LEFT"),
            ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
            ("ROWHEIGHT",     (0, 0), (-1, -1), 20),
        ]))
        elements.append(node_table)
    else:
        elements.append(Paragraph("No nodes found.", styles["Normal"]))

    elements.append(Spacer(1, 0.2*inch))

    # ── Outages table ──
    elements.append(Paragraph("Outages", section_style))
    if outages:
        outage_data = [["Node", "Service", "Down Since", "Restored"]]
        for o in outages[:30]:
            outage_data.append([
                o.get("nodeLabel", "N/A"),
                o.get("serviceType", {}).get("name", "N/A"),
                o.get("ifLostService", "")[:19],
                o.get("ifRegainedService", "Still Down"),
            ])

        outage_table = Table(outage_data, colWidths=[1.8*inch, 1.2*inch, 2*inch, 1.6*inch])
        outage_table.setStyle(TableStyle([
            ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1a73e8")),
            ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
            ("FONTSIZE",      (0, 0), (-1, 0), 10),
            ("FONTSIZE",      (0, 1), (-1, -1), 8),
            ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f5f5")]),
            ("GRID",          (0, 0), (-1, -1), 0.25, colors.HexColor("#dddddd")),
            ("ALIGN",         (0, 0), (-1, -1), "LEFT"),
            ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
            ("ROWHEIGHT",     (0, 0), (-1, -1), 20),
        ]))
        elements.append(outage_table)
    else:
        elements.append(Paragraph("No outages in this period.", styles["Normal"]))

    doc.build(elements)
    buffer.seek(0)
    return buffer