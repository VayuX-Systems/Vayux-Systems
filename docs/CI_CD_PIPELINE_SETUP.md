# VayuX Systems — CI/CD Pipeline Architecture & Setup

This document describes the automated Continuous Integration and Continuous Deployment (CI/CD) pipelines configured with **GitHub Actions**:
- **Frontend**: Next.js 16 (`vayux-v2/`) → **[Vercel](https://vercel.com/)**
- **Backend**: Django REST Framework (`backend-v2/backend/`) → **[Render](https://render.com/)**

---

## 1. Pipeline Architecture

```
GitHub Repository (main branch)
       │
       ├──► Push / PR on 'vayux-v2/**'
       │       └──► GitHub Action: frontend-ci-cd.yml
       │               ├── 1. Install (npm ci)
       │               ├── 2. TypeScript Validation (tsc --noEmit)
       │               ├── 3. Production Build (next build)
       │               └── 4. CD: Auto-Deploy to Vercel (on main)
       │
       └──► Push / PR on 'backend-v2/**'
               └──► GitHub Action: backend-ci-cd.yml
                       ├── 1. Python 3.10 Setup & Pip Cache
                       ├── 2. Dependencies (pip install -r requirements.txt)
                       ├── 3. Django Production System Check
                       ├── 4. Migration Sanity Check (makemigrations --check)
                       ├── 5. WhiteNoise Staticfiles Collection Test
                       └── 6. CD: Trigger Render Deploy Hook (on main)
```

Path filtering ensures that changes to the frontend do not trigger unnecessary backend builds, and vice-versa.

---

## 2. GitHub Secrets Setup

To enable automated deployments, add the following secrets in your GitHub repository:
**GitHub Repository** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

### A. Backend Secrets (Render)

| Secret Name | Description | Where to Find It |
|---|---|---|
| `RENDER_DEPLOY_HOOK_URL` | Webhook URL to trigger instant deployment on Render | Render Dashboard → `vayux-backend` service → **Settings** → Scroll to **Deploy Hook** → Click **Create Deploy Hook** or copy URL |

> **Note:** If Render is directly connected to your GitHub repository with auto-deploy enabled, Render will also automatically deploy whenever code is pushed to `main`. The `RENDER_DEPLOY_HOOK_URL` ensures GitHub Actions waits for CI checks to pass *before* triggering the release!

### B. Frontend Secrets (Vercel)

You can choose either **Option 1 (Deploy Hook)** or **Option 2 (Vercel Action)**:

#### Option 1: Vercel Deploy Hook (Quickest)
| Secret Name | Description | Where to Find It |
|---|---|---|
| `VERCEL_DEPLOY_HOOK_URL` | Webhook URL to trigger Vercel deployment | Vercel Dashboard → Your Project → **Settings** → **Git** → **Deploy Hooks** → Create Hook for `main` branch |

#### Option 2: Vercel Action (Full CLI Integration)
| Secret Name | Description | Where to Find It |
|---|---|---|
| `VERCEL_TOKEN` | Vercel Personal Access Token | Vercel Dashboard → Account Settings → **Tokens** → Create Token |
| `VERCEL_ORG_ID` | Vercel Team / Account ID | Inside `.vercel/project.json` or Vercel Project Settings |
| `VERCEL_PROJECT_ID` | Vercel Project ID | Inside `.vercel/project.json` or Vercel Project Settings |

---

## 3. Workflow Details

### 1. Frontend Workflow (`.github/workflows/frontend-ci-cd.yml`)
- **Triggers**: Pushes & PRs to `main` branch modifying `vayux-v2/**`.
- **Jobs**:
  - `frontend-ci`:
    - Checks out code.
    - Sets up Node 20 with npm package cache.
    - Runs `npm ci`.
    - Validates types with `npx tsc --noEmit`.
    - Runs production bundle optimization with `npm run build`.
  - `frontend-cd`:
    - Executes only on pushes to `main` after `frontend-ci` passes.
    - Deploys the production build to Vercel.

### 2. Backend Workflow (`.github/workflows/backend-ci-cd.yml`)
- **Triggers**: Pushes & PRs to `main` branch modifying `backend-v2/**` or `render.yaml`.
- **Jobs**:
  - `backend-ci`:
    - Checks out code.
    - Sets up Python 3.10 with pip dependency cache.
    - Installs dependencies from `requirements.txt`.
    - Verifies production configuration: `python manage.py check --settings=config.settings.production`.
    - Confirms all model changes have migrations: `python manage.py makemigrations --check --dry-run`.
    - Tests WhiteNoise static asset collection: `python manage.py collectstatic --no-input`.
  - `backend-cd`:
    - Executes only on pushes to `main` after `backend-ci` passes.
    - Sends a POST request to Render Deploy Hook with status verification.

---

## 4. Manual Triggers
Both workflows include `workflow_dispatch:`, allowing you to trigger them manually at any time from the **Actions** tab on GitHub with one click.
