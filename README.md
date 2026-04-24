# NMS Dashboard

A network monitoring dashboard built on top of OpenNMS. Provides a modern React UI with a Django REST API backend for managing nodes, alarms, outages, discovery jobs, and reports.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + Tailwind CSS |
| Backend | Django 6 + Django REST Framework |
| Monitoring | OpenNMS Horizon |
| Database | PostgreSQL 14 (for OpenNMS) |
| Proxy | Nginx |

## Running with Docker

```bash
docker compose up -d --build
```

First run takes 5-10 minutes. OpenNMS itself takes an additional 3-5 minutes to initialize.

| Service | URL |
|---|---|
| Dashboard | `http://SERVER_IP` |
| OpenNMS UI | `http://SERVER_IP:8980` |

## Project Structure

```
Docker-NMS/
├── Frontend/       # React app (served via Nginx)
├── Backend/        # Django REST API
└── docker-compose.yaml
```

## Environment

Backend reads OpenNMS connection details from `Backend/.env`:

```
OPENNMS_BASE_URL=http://opennms:8980/opennms
OPENNMS_USERNAME=admin
OPENNMS_PASSWORD=admin
OPENNMS_FOREIGN_SOURCE=PulseMonitor
```

> This file is gitignored — create it manually on the server before running.
