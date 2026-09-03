# VayuX Systems — Architecture & Full Implementation Guide

Comprehensive architectural documentation for both the **Next.js Frontend (`vayux-v2`)** and the **Django Sentinel Backend (`backend-v2`)**.

---

## 1. Executive System Overview

VayuX Systems is an enterprise cybersecurity and sovereign autonomous defense platform. The system operates on a modern decoupled architecture:
* **Frontend (`vayux-v2`)**: Next.js 16.3 (App Router), React 19, TypeScript, Tailwind CSS v4, and Lucide Icons. Pre-rendered with hybrid server-side rendering (SSR), static generation (SSG), and client-side reactive components.
* **Backend (`backend-v2`)**: Django 4.2 LTS, Django REST Framework (DRF), Python 3.9+, SQLite (local) / PostgreSQL via Aiven (production), equipped with cryptographic field encryption and custom threat interceptor middleware.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          USER CLIENT BROWSER                           │
│  (Desktop, Tablet, Mobile with CSS Snap Carousel & Dark/Light Themes)   │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
                   │ (HTML/CSS/JS Assets)            │ (REST API & SWR JSON)
                   ▼                                 ▼
┌────────────────────────────────────┐   ┌───────────────────────────────┐
│     NEXT.JS 16 FRONTEND            │   │    DJANGO 4.2 REST BACKEND    │
│     (vayux-v2 : port 3000)         │   │    (backend-v2 : port 8000)   │
│  • App Router (7 Core Routes)      │   │  • 7 Domain-Specific Apps     │
│  • Phonetic Disambiguation (/yux)  │   │  • Threat Signature Filter    │
│  • Client SWR In-Memory Caching    │   │  • Fernet AES-256 Encryption  │
│  • Dynamic Fallback Resilience     │   │  • DRF Scoped Rate Limiting   │
│  • Tailwind v4 Design Tokens       │   │  • Geo-IP Detection Engine    │
└────────────────────────────────────┘   └───────────────┬───────────────┘
                                                         │
                                                         ▼
                                         ┌───────────────────────────────┐
                                         │ DATABASE (SQLite / PostgreSQL)│
                                         │  • AES-256 Encrypted Reports  │
                                         │  • Audit Trail & Blocked IPs  │
                                         └───────────────────────────────┘
```

---

## 2. Frontend Architecture (`vayux-v2`)

### 2.1 Technology Stack & Dependencies
* **Framework**: Next.js 16.3.3 (React 19.2, React DOM 19.2)
* **Language**: TypeScript 5.8
* **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) with CSS Variable Design Tokens
* **Typography**: Google Fonts (`Inter` & `Outfit` / `Space Grotesk`)
* **Icons**: `lucide-react`
* **Performance**: Zero bulky external UI libraries; purely modular vanilla React components.

### 2.2 Directory Structure & Page Routing

```
vayux-v2/src/
├── app/
│   ├── layout.tsx              # Root HTML layout, font injection, navbar & footer wrappers
│   ├── page.tsx                # Home page wrapper with JSON-LD Organization schema
│   ├── page-content.tsx        # Dynamic Home view (Hero, Stats, Services Rail, Threat Map)
│   ├── globals.css             # Tailwind v4 theme variables, scrollbar utilities, animations
│   ├── sitemap.ts              # Dynamic XML sitemap generator
│   ├── robots.ts               # Automated robots.txt directives
│   ├── solutions/              # Defense pillars (SOC, VAPT, DFIR, GRC)
│   ├── about/                  # Mission, leadership, trust credentials, principles
│   ├── insights/               # Research papers, intelligence advisories, whitepapers
│   ├── careers/                # Open operational roles & multi-part resume application
│   ├── contact/                # Dual-channel portal: Discovery Signal & DFIR Emergency
│   └── yux/                    # Phonetic SEO Disambiguation Hub (Voice search capture)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Responsive navigation, emergency hotline banner, theme toggle
│   │   ├── Footer.tsx          # Seamless threat newsletter, compliance badges, legal links
│   │   └── ContactForm.tsx     # Reusable inquiry form
│   ├── sections/
│   │   └── AnimatedStatCard.tsx# High-density metrics counter with reactive hover states
│   └── ui/
│       ├── SectionHeading.tsx  # Responsive typography with gradient sub-labels
│       ├── EnhancedServiceCard.tsx # Bento-card with glow border, line clamps, and tags
│       └── ScrollReveal.tsx    # Intersection Observer progressive fade-in transitions
└── lib/
    ├── api-client.ts           # Unified Sentinel API client with SWR in-memory caching
    ├── seo-config.ts           # Schema.org builders (Organization, FAQ, Breadcrumb)
    ├── site-data.ts            # Baseline static fallback datasets
    └── site-data-enhanced.ts   # Enriched fallback content and telemetry metrics
```

### 2.3 Mobile-First Responsive Engineering
To eliminate excessive vertical scroll fatigue, mobile screens (< 768px) utilize:
1. **Horizontal CSS Snap Rails (`snap-x snap-mandatory`)**:
   * Applied to the 4 primary services on the homepage.
   * Mobile users swipe horizontally across cards with active indicator dots (`[ • ○ ○ ○ ]`), saving over **1,500px of vertical space**.
2. **2-Column High-Density Metrics Grid**:
   * Replaced single-column vertical stat stacks with a compact `grid-cols-2 lg:grid-cols-5` telemetry dashboard.
3. **Adaptive Typography & Clamping**:
   * `line-clamp-2 sm:line-clamp-none` prevents long descriptions from blowing out card heights.

### 2.4 Design Tokens & Theme System (`globals.css`)
Tailwind v4 `@theme` mappings adapt seamlessly between Light and Dark modes:
* **Light Mode**: `--color-surface: #f9f9ff;`, `--color-on-surface: #111c2d;`, `--color-primary: #006399;`, `--color-surface-container: #e7eeff;`.
* **Dark Mode (`.dark`)**: `--color-surface: #09090b;`, `--color-on-surface: #f8fafc;`, `--color-primary: #00a8ff;` / `#38bdf8;`.

---

## 3. Backend Architecture (`backend-v2`)

### 3.1 Technology Stack & Configuration
* **Core**: Python 3.9+, Django 4.2 LTS, Django REST Framework 3.14+
* **CORS Management**: `django-cors-headers`
* **Database Abstraction**: `dj-database-url` (SQLite for local dev; PostgreSQL with SSL for production)
* **Encryption**: `cryptography.fernet` (AES-256)
* **Configuration Structure**: Split settings inside `config/settings/`:
  * `base.py`: Common installed apps, database routing, DRF throttles, payload limits.
  * `development.py`: Local settings with `DEBUG = True`.
  * `production.py`: Hardened SSL redirects, database pooling, HSTS enforcement.
  * `security.py`: CSP dictionaries and cookie flags.

### 3.2 Modular Django Applications

```
backend-v2/backend/apps/
├── core/
│   ├── models.py               # Custom User, ActivityAuditLog, BlockedIP, SystemHealthMetric
│   ├── middleware.py           # SecurityHeadersMiddleware, ThreatProbeDefenseMiddleware, ActivityAuditMiddleware
│   ├── throttling.py           # Scoped throttles (Contact, Emergency, Careers, Newsletter)
│   └── encryption.py           # Fernet AES cipher helpers (encrypt_text, decrypt_text)
├── site_config/
│   ├── models.py               # SiteConfig (singleton), LegalDocument (Privacy, Terms, DPDP)
│   ├── views.py                # Public read-only endpoints for legal and system metadata
│   └── serializers.py          # Serializer definitions
├── content_cms/
│   ├── models.py               # Solution, Article, ResearchProject, TeamMember, GlossaryTerm
│   ├── views.py                # ReadOnly endpoints for defense pillars, insights, and glossary
│   └── serializers.py          # Nested serializers with category resolution
├── communications/
│   ├── models.py               # TransmitSignal, EmergencyIncidentReport, NewsletterSubscriber
│   ├── views.py                # Rate-limited creation views for inbound leads and emergency triage
│   └── serializers.py          # Strict sanitization (strip_tags), regex validation
├── careers/
│   ├── models.py               # JobRole, JobApplication
│   ├── views.py                # Roles listing & multi-part resume application handling
│   └── serializers.py          # File extension whitelisting & applicant sanitization
├── seo_engine/
│   ├── models.py               # MetaTagConfig, CanonicalRule, RedirectRule
│   └── views.py                # Dynamic sitemap.xml, robots.txt, and llms.txt endpoints
└── geo_engine/
    ├── models.py               # GeoIPRule, RegionalOffice
    └── middleware.py           # GeoLocationMiddleware (Cloudflare CF-IPCountry header parsing)
```

### 3.3 Database Models & Data Flow
* **Read-Only Models**: `Solution`, `Article`, `PageSectionContent`, and `LegalDocument` serve dynamic public content managed exclusively by authenticated admins via the Django Sentinel Admin console.
* **Mutation Models**:
  * `TransmitSignal`: Inbound enterprise discovery requests.
  * `EmergencyIncidentReport`: Sensitive breach disclosures (encrypted via Fernet).
  * `JobApplication`: Secure applicant profiles with resume file attachments.
  * `ActivityAuditLog`: Automated access audit trail logging method, IP, country, latency, and status code.

---

## 4. Administrative Console

The backend exposes the **VayuX Sentinel Command** portal at `/admin/`:
* Protected by Django authentication, session hardening, and threat probe defenses.
* Provides live oversight of inbound DFIR emergency incident reports with decrypted payload review for cleared commanders.
* Content management for real-time publishing of threat bulletins, research whitepapers, and defense solutions.
