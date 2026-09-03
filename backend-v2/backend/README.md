# 🛡️ VayuX Sentinel — Production Django Backend (v2.0)

Production-grade, enterprise-hardened Django backend powering **VayuX Systems** (`vayux-v2`).

---

## ⚡ Core Architecture Highlights

- **2-Role Architecture**:
  - **Admin / Staff**: Full access to the custom **Sentinel Command** Admin panel via secure session authentication.
  - **Public Visitors**: Unauthenticated visitors browsing content, submitting contact signals, applying for jobs, reporting DFIR breaches, and subscribing to newsletters with strict IP rate limiting.
- **Enterprise Defense & Security**:
  - `SecurityHeadersMiddleware`: HSTS (1-year), Strict Content Security Policy (CSP), X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`), Referrer-Policy.
  - `ThreatProbeDefenseMiddleware`: Auto-detects and returns 403 Forbidden on malicious scanning patterns (`.env`, `wp-admin`, `phpinfo`, SQL injection, path traversal) and logs offending IPs.
  - `ActivityAuditMiddleware`: Asynchronously logs requests, response times, client IP, and country code.
  - Fernet AES-256 field-level encryption for sensitive DFIR incident scopes.
- **Dynamic SEO & GEO Engine**:
  - `/api/v1/seo/metadata/?path=...`: Dynamic meta tags + auto-built JSON-LD schemas (`Organization`, `Service`, `FAQPage`, `WebSite`).
  - `/sitemap.xml`: Auto-updating XML sitemap.
  - `/robots.txt`: AI crawler allowlist (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot`, `CCBot`) + scraper blocks.
  - `/llms.txt`: Structured plain-text description for AI models.
- **GeoIP & Regional Compliance**:
  - `/api/v1/geo/visitor-context/`: Real-time visitor country detection, India DPDP Act 2023 / EU GDPR compliance data, and local hotline.
  - `/api/v1/geo/nodes/`: Global SOC nodes (Vadodara Primary Nexus, Frankfurt, Singapore) powering the 3D globe.
- **Dynamic Content & Legal CMS**:
  - Edit site contact info (email, phones, Vadodara headquarters address, social links) directly from Admin.
  - Full CRUD control over job listings, candidate resumes, legal terms, privacy policies, research whitepapers, and cybersecurity glossary terms.
- **Sentinel Command Admin Dashboard**:
  - Dark luxury cyber aesthetic (`#080c14`, `#0f172a`, glowing `#00A8FF` accents).
  - Live KPI overview cards (New Signals, Emergency DFIR Alerts, Job Applicants, Subscribers, Blocked Probes).

---

## 🚀 Quickstart Guide (Local Development)

### 1. Activate Virtual Environment
```bash
# Windows
..\.venv\Scripts\activate.bat
```

### 2. Apply Migrations & Seed Initial Data
```bash
python manage.py migrate
python manage.py seed_vayux_data
```

> **Default Superuser Credentials**:
> - **Username**: `admin`
> - **Password**: `VayuxSentinel2026!`
> - **Admin URL**: `http://localhost:8000/admin/`

### 3. Run Development Server
```bash
python manage.py runserver 8000
```

---

## 🧪 Running Automated Tests
```bash
python manage.py test apps.core.tests apps.communications.tests apps.content_cms.tests apps.seo_engine.tests apps.geo_engine.tests
```

---

## 🌐 Production Deployment (Docker)

```bash
docker-compose up -d --build
```
