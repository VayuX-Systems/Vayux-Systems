# VayuX Systems — Full-Stack Integrations Guide

Complete reference guide detailing the integration protocols, API contracts, caching architecture, and offline resiliency between **Next.js (`vayux-v2`)** and **Django (`backend-v2`)**.

---

## 1. Integration Architecture & Data Flow

Communication between the frontend and backend operates via HTTP/HTTPS REST APIs using JSON payloads and multipart form data for file uploads:

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                         │
│                    (src/lib/api-client.ts)                  │
└──────────────┬──────────────────────────────▲───────────────┘
               │ 1. Request                    │ 4. Response JSON
               │    (with In-Memory Cache Check)│    (Stored in SWR Cache)
               ▼                              │
┌─────────────────────────────────────────────┴───────────────┐
│                    DJANGO REST FRAMEWORK                    │
│                    (backend-v2/backend)                     │
│  • SecurityHeadersMiddleware (CSP, HSTS, DENY)              │
│  • CorsMiddleware (Origin Check)                            │
│  • ThreatProbeDefenseMiddleware (Reconnaissance Filter)     │
│  • DRF Throttling (Rate Limit Enforcement)                  │
│  • Serializer Validation & Strip Tags                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The Unified API Client (`src/lib/api-client.ts`)

The frontend interacts with the Sentinel Backend through a single, strongly-typed singleton `api` object.

### 2.1 In-Memory SWR Caching Layer
To eliminate redundant database load and ensure sub-millisecond page loads:
* Every successful `GET` response is cached in-memory using the endpoint path as the key (`cacheKey`).
* If a route re-renders or another component requests the same resource, the cached data is returned immediately without a network round-trip.
* A `forceRefresh = true` parameter allows programmatic cache busting.
* Invalidate all cached data on demand using `api.clearCache()`.

### 2.2 Fast Timeout & Offline Fault Tolerance
* Every outbound request includes an abort signal: `signal: options.signal || AbortSignal.timeout(3000)`.
* If the backend server is unreachable or offline, the request fails fast within 3 seconds instead of hanging the client browser.
* Frontend pages catch network errors cleanly and preserve static fallback datasets from `site-data-enhanced.ts`.

---

## 3. Comprehensive REST Endpoints Catalog

### 3.1 Content & CMS Endpoints (Read-Only)

| HTTP Method | Endpoint | Description | Cacheable |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/content/sections/` | Returns dynamic page headings, badge labels, and subtitles | Yes |
| `GET` | `/api/v1/content/about/` | Returns company story, core principles, leadership bio, credentials | Yes |
| `GET` | `/api/v1/content/solutions/` | Returns the 4 defense pillars (SOC, VAPT, DFIR, GRC) | Yes |
| `GET` | `/api/v1/content/solutions/<slug>/` | Returns full technical specs, SLAs, and architecture loop | Yes |
| `GET` | `/api/v1/content/articles/` | Returns thought leadership and research papers (supports `?category=`) | Yes |
| `GET` | `/api/v1/content/articles/<slug>/` | Returns full article body, author credentials, and view count | Yes |
| `GET` | `/api/v1/content/glossary/` | Returns cybersecurity terminology dictionary | Yes |

#### Sample Response: `GET /api/v1/content/articles/`
```json
{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "The Evolution of Autonomous SOC: From Alert Triage to Threat Prediction",
      "slug": "autonomous-soc-evolution",
      "category_name": "Research",
      "author_name": "Pragnesh Kumar S. Singh",
      "author_role": "Founder & CTO",
      "excerpt": "Exploring how artificial intelligence and machine learning are transforming security operations centers...",
      "read_time_minutes": 7,
      "is_featured": true,
      "published_at": "2026-08-15"
    }
  ]
}
```

---

### 3.2 Site Configuration & Legal (Read-Only)

| HTTP Method | Endpoint | Description | Cacheable |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/site/settings/` | Returns company legal name, contact emails, emergency phone, SLA clocks | Yes |
| `GET` | `/api/v1/site/legal/` | Returns all published compliance documents (Privacy, Terms, DPDP) | Yes |
| `GET` | `/api/v1/site/legal/<slug>/` | Returns full legal document with revision history and effective dates | Yes |

---

### 3.3 Communications & Inbound Signals (Rate-Limited Mutations)

#### 1. Transmit Signal (Enterprise Discovery Inquiry)
* **Endpoint**: `POST /api/v1/communications/transmit-signal/`
* **Throttle Rate**: Max **5 requests/hour** per IP.
* **Payload Schema**:
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@enterprise.corp",
    "phone": "+91 98765 43210",
    "vector": "soc",
    "tier": "advanced",
    "message": "We need to integrate our multi-cloud infrastructure into VayuX Autonomous SOC."
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Signal Transmitted Securely. The Sentinel Command will review parameters within 2 operational hours."
  }
  ```

#### 2. Emergency DFIR Breach Dispatch
* **Endpoint**: `POST /api/v1/communications/emergency/`
* **Throttle Rate**: Max **10 requests/hour** per IP.
* **Payload Schema**:
  ```json
  {
    "company_name": "Apex Global Bank",
    "contact_name": "Chief Information Security Officer",
    "emergency_email": "ciso@apexbank.com",
    "emergency_phone": "+91 82006 77905",
    "breach_type": "ransomware",
    "severity": "critical",
    "incident_details": "LockBit 3.0 ransomware detected across 14 VMware ESXi host clusters. Encrypted VMDKs observed."
  }
  ```
* **Storage**: `incident_details` is encrypted with Fernet AES-256 before writing to disk.

#### 3. Threat Bulletin Newsletter Subscription
* **Endpoint**: `POST /api/v1/communications/newsletter/`
* **Throttle Rate**: Max **5 requests/hour** per IP.
* **Payload Schema**:
  ```json
  {
    "email": "threat-analyst@enterprise.com",
    "source_page": "footer"
  }
  ```

---

### 3.4 Careers & Talent Acquisition

* **Endpoint**: `POST /api/v1/careers/apply/`
* **Content-Type**: `multipart/form-data`
* **Throttle Rate**: Max **5 requests/hour** per IP.
* **Payload Schema**:
  * `applicant_name`: Full legal name
  * `email`: Personal/academic email
  * `phone`: Contact number
  * `linkedin_portfolio_url`: LinkedIn profile link
  * `github_url`: GitHub/GitLab repository URL
  * `resume_file`: Binary file upload (restricted to `.pdf`, `.doc`, `.docx`, max 10MB)
  * `cover_note`: Sanitized introductory message

---

## 4. Environment Variables Specification

### Next.js Frontend (`vayux-v2/.env.local`)
```env
# URL of the Django Sentinel Backend REST API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Django Backend (`backend-v2/backend/.env`)
```env
# Application Mode (Set False for Production)
DEBUG=True

# Cryptographic Secret Key
SECRET_KEY=vayux-sentinel-core-production-secret-key-replace-in-cloud

# Whitelisted Domains for Host Header Protection
ALLOWED_HOSTS=localhost,127.0.0.1,vayux.systems,api.vayux.systems,0.0.0.0

# CORS Whitelist for Frontend Access
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,https://vayux.systems

# Database Connection (Leave empty for SQLite, provide URI for PostgreSQL)
DATABASE_URL=

# 32-Byte Key for AES-256 Field-Level Encryption
FIELD_ENCRYPTION_KEY=r0h1tV4yuX53nt1n3lK3y32Byt35L0ngS3cur3==
```

---

## 5. Offline Resiliency Architecture

Both systems are engineered to operate gracefully even when disconnected:
1. **Frontend Isolation**: If the backend server stops, the Next.js frontend catches the timeout cleanly. Pages (`/`, `/solutions`, `/insights`, `/about`) continue rendering with pre-bundled static data from `site-data-enhanced.ts`.
2. **Backend Isolation**: The Django backend is a standalone REST API with independent SQLite/PostgreSQL storage. It can serve mobile apps, external webhooks, or alternate frontends without dependency on Next.js.
