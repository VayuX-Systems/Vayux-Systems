<div align="center">

# 🛡️ VayuX Systems
### *Architecting a Safer, Self-Defending Online World*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Django](https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CI/CD](https://img.shields.io/badge/GitHub_Actions-Automated-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/VayuX-Systems/Vayux-Systems/actions)
[![Tests](https://img.shields.io/badge/Tests-22%2F22%20Passing-success?style=for-the-badge&logo=pytest&logoColor=white)](https://github.com/VayuX-Systems/Vayux-Systems)
[![Deployment](https://img.shields.io/badge/Render%20%2B%20Vercel-Production%20Live-brightgreen?style=for-the-badge)](https://vayux-backend.onrender.com/health/)

<p align="center">
  <b>Enterprise Autonomous Cybersecurity R&D Laboratory · 24/7 Managed SOC · Emergency DFIR Dispatch · Sovereign GRC</b>
  <br />
  Headquartered in Vadodara, Gujarat, India
</p>

---

</div>

## 📌 Executive Overview

**VayuX Systems** is an innovation-driven cybersecurity research and development firm engineered to replace static, fragmented security tools with autonomous, self-defending architectures.

Unlike conventional vendors who treat engagements as routine ticket handling, VayuX operates on an uncompromising doctrine: **"The Lab vs. The Vendor"**. Every real-world operational engagement—spanning 24/7 SOC telemetry, systemic VAPT assessments, and DFIR forensic extractions—serves as an operational feedback loop channeling raw threat data directly into fundamental systems research.

```
                  THE VAYUX OPERATIONAL FEEDBACK LOOP
                  
  [ Frontline SOC & DFIR ] ──(Raw Telemetry)──> [ Kernel & Systems Lab ]
             ▲                                            │
             │                                            ▼
  [ Client Infrastructure ] <──(Adaptive Defense)─── [ Neural Heuristics ]
```

---

## 🏛️ System Architecture

```mermaid
graph TD
    User([🌐 Global Client / Enterprise])
    
    subgraph Frontend ["Next.js 16 Frontend (Vercel)"]
        UI["React 19 Server & Client Components"]
        Cache["15s Smart Cache (Session + Memory)"]
        Client["Sentinel REST API Client"]
    end
    
    subgraph Backend ["Django 5 Sentinel Core (Render)"]
        Gunicorn["Gunicorn WSGI / WhiteNoise Storage"]
        CSP["Security Headers & Strict CSP Engine"]
        DRF["Django REST Framework (v1 APIs)"]
        Auth["Fernet 256-Bit PII Field Encryption"]
        Health["Database-Verified Health Check (/health/)"]
    end

    subgraph Database ["PostgreSQL (Aiven Cloud)"]
        DB[(Cloud Hosted PostgreSQL 16)]
    end

    subgraph Operations ["The 4 Sovereign Defense Pillars"]
        SOC["🛡️ 24/7 SOC Operations (<15ms)"]
        VAPT["⚡ Adversarial Simulation & VAPT"]
        DFIR["🔍 Sub-4-Hour Emergency DFIR"]
        GRC["⚖️ Sovereign GRC (DPDP 2023 / ISO)"]
    end

    User -->|HTTPS| UI
    UI --> Cache
    Cache --> Client
    Client -->|REST JSON / Bearer| Gunicorn
    Gunicorn --> CSP
    CSP --> DRF
    DRF --> Auth
    Auth --> DB
    DRF --> Operations
    Health -->|Keeps Alive| DB
```

---

## 🎯 4 Core Applied Solutions (2x2 Sovereign Matrix)

| Pillar | Subtitle & Focus | SLA / Technical Specification | Lead Vector |
| :--- | :--- | :--- | :--- |
| **🛡️ SOC Operations** | 24/7 Autonomous Threat Monitoring & Triage | **Sub-15ms** Correlation Latency | Continuous behavioral anomaly scoring & playbook isolation |
| **⚡ VAPT Assessment** | Adversarial Simulation & Red Team Exploitation | Zero-Day Architectural Auditing | Full web, mobile, cloud perimeter & kernel exploitation |
| **🔍 DFIR Protocols** | Emergency Breach Containment & Forensics | **Sub-4-Hour** Deployment Guarantee | Memory volatility extraction & court-admissible chain of custody |
| **⚖️ GRC Alignment** | Sovereign Compliance (DPDP Act 2023 / ISO 27001) | Statutory Regulatory Readiness | Mandatory CERT-In 6-hour disclosure & zero-trust governance |

---

## 📂 Repository Structure

```
vayux-systems/
├── .github/
│   └── workflows/
│       ├── backend-ci-cd.yml       # Production check, migrations, 22 unit tests, Render deploy hook
│       ├── frontend-ci-cd.yml      # TypeScript verification, Next.js build, Vercel deployment
│       └── keep-alive-cron.yml     # Automated 12-min cron ping to prevent Render free-tier cold starts
├── backend-v2/
│   └── backend/
│       ├── apps/
│       │   ├── careers/            # Job vacancies, applicant tracking & resume submissions
│       │   ├── communications/     # Transmit Signal, Emergency DFIR intake, newsletter subscriptions
│       │   ├── content_cms/        # Page sections, solutions, about us, team members, publications
│       │   ├── core/               # Singleton models, Fernet encryption, seed data command
│       │   ├── geo_engine/         # Global SOC nodes, visitor IP/country geolocation
│       │   ├── seo_engine/         # Dynamic sitemaps, robots.txt, llms.txt machine feeds
│       │   └── site_config/        # Site configuration, emergency SLAs, statutory legal documents
│       ├── config/
│       │   ├── settings/           # Modular Django settings (base, development, production, security)
│       │   ├── urls.py             # Root URL routing, health check endpoints
│       │   └── wsgi.py             # WSGI entry point for Gunicorn
│       ├── build.sh                # Automated Render build script (pip install, collectstatic, migrate)
│       ├── Dockerfile              # Containerized deployment with dynamic $PORT binding
│       ├── manage.py               # Django management CLI
│       └── requirements.txt        # Python production dependencies (Django 5, DRF, WhiteNoise, etc.)
├── vayux-v2/
│   ├── public/
│   │   └── images/                 # High-resolution assets, founder portrait, leadership avatars
│   ├── src/
│   │   ├── app/                    # Next.js App Router (37 static & dynamic routes)
│   │   │   ├── about/              # Company genesis, founder spotlight, core defense architects
│   │   │   ├── careers/            # Job openings & fellowship applications
│   │   │   ├── contact/            # Discovery portal & high-priority DFIR emergency form
│   │   │   ├── insights/           # Whitepapers, research advisories, threat intelligence
│   │   │   ├── legal/              # Privacy policy, terms of service, statutory DPDP disclosures
│   │   │   ├── solutions/          # Deep technical solution pages (SOC, VAPT, DFIR, GRC)
│   │   │   └── page.tsx            # High-impact animated homepage
│   │   ├── components/             # Reusable UI components, 3D card tilt, theme toggle, navigation
│   │   └── lib/                    # api-client.ts (15s cache, SWR, DRF integration), site-data.ts
│   ├── next.config.ts              # Strict Content Security Policy (CSP), security headers
│   ├── package.json                # Frontend dependencies (Next 16, React 19, Lucide, Framer Motion)
│   └── tsconfig.json               # TypeScript configuration
├── docs/                           # Comprehensive technical guides & security reports
│   ├── ARCHITECTURE_AND_IMPLEMENTATION.md
│   ├── CI_CD_PIPELINE_SETUP.md
│   ├── INTEGRATIONS_GUIDE.md
│   ├── RENDER_DEPLOYMENT_GUIDE.md
│   ├── SECURITY_AND_HARDENING_REPORT.md
│   └── SEO_GEO_AND_PHONETIC_STRATEGY.md
├── render.yaml                     # Render Infrastructure-as-Code blueprint
└── README.md                       # Master documentation (this file)
```

---

## ⚡ Quickstart & Local Development

### 1. Prerequisites
- **Node.js**: v20.x or higher
- **Python**: v3.11 or higher
- **Git**: Latest version

### 2. Backend Setup (Django Sentinel Core)
```bash
# Navigate to backend directory
cd backend-v2/backend

# Create and activate virtual environment
python -m venv ..\.venv
# Windows:
..\.venv\Scripts\activate
# Linux/macOS:
# source ../.venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed initial database records (Company profile, Solutions, Founder, Credentials)
python manage.py seed_vayux_data

# Run backend automated test suite (22 tests with in-memory SQLite in ~1s)
python manage.py test

# Launch development server (Port 8000)
python manage.py runserver 0.0.0.0:8000
```

*Django Admin control center will be available at: `http://localhost:8000/admin/`*

### 3. Frontend Setup (Next.js 16 Web Application)
```bash
# Navigate to frontend directory in a new terminal
cd vayux-v2

# Install dependencies
npm install

# Create local environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run production build validation (all 37 routes)
npm run build

# Start Next.js local dev server (Port 3000)
npm run dev
```

*Frontend web application will be accessible at: `http://localhost:3000/`*

---

## 🔐 Security & Hardening Features

- **256-Bit PII Encryption**: Sensitive customer parameters, emergency DFIR telemetry, and applicant contact details are encrypted at rest using AES-256 (Fernet) keys before saving into PostgreSQL.
- **Strict Content Security Policy (CSP)**: Hardened headers blocking XSS, object injection, clickjacking (`frame-ancestors 'none'`), and whitelisting only authorized APIs (`https://vayux-backend.onrender.com`).
- **Dynamic CORS & CSRF Protection**: Strict regex-based origin whitelisting matching enterprise production domains (`https://*.vercel.app`, `https://*.onrender.com`, `https://vayux.systems`).
- **WhiteNoise Static Serving**: Zero dependency on external storage buckets for administrative staticfiles; compressed and hashed assets served directly with immutable cache-control headers.
- **24/7 Automated Keep-Alive Cron**: A scheduled GitHub Actions workflow pinging `/health/` every 12 minutes to keep free-tier instances permanently warm without cold starts.

---

## 🌐 Environment Variables Configuration

| Variable | Target | Description | Example |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Frontend (Vercel) | Full base URL of deployed backend | `https://vayux-backend.onrender.com` |
| `DATABASE_URL` | Backend (Render) | PostgreSQL connection string | `postgres://user:pass@host:port/dbname?sslmode=require` |
| `SECRET_KEY` | Backend (Render) | Cryptographic Django secret key | *Random 64-char string* |
| `FIELD_ENCRYPTION_KEY` | Backend (Render) | 32-byte Fernet encryption key | *32-byte URL-safe base64 key* |
| `DJANGO_SETTINGS_MODULE` | Backend (Render) | Settings module path | `config.settings.production` |
| `ALLOWED_HOSTS` | Backend (Render) | Comma-separated hostnames | `.onrender.com,vayux.systems` |

---

## 👥 Executive Leadership

- **Pragnesh Kumar Singh** — *Founder & Chief Technology Officer*
  - Fundamental research in kernel architecture, autonomous heuristic defense, and adversarial exploit mitigation.
  - Profile: [`LinkedIn`](https://www.linkedin.com/in/pragnesh-singh-rajput/) · [`GitHub`](https://github.com/pragnesh-singh-rajput)
- **Vikramaditya Sharma** — *Co-Founder & VP of Systems Defense*
- **Aarav Patel** — *Head of Threat Intelligence & Neural Modeling*
- **Nandini Joshi** — *Director of Sovereign GRC & Compliance*

---

## 📞 Sovereign Contact & Emergency DFIR Dispatch

- **Corporate Headquarters**: Sector 7G, Cyber District, Vadodara, Gujarat - 390001, India
- **Primary Telemetry Link**: `nexus@vayux.systems`
- **24/7 Emergency DFIR Hotline**: `+91-8200677905` / `admin@vayux.systems`
- **Official Portal**: [https://vayux.systems](https://vayux.systems)

---

<div align="center">
  <small>© 2026 VayuX Systems Private Limited. All rights reserved. Sovereign Cybersecurity R&D.</small>
</div>
