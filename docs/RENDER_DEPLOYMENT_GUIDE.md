# VayuX Systems — Backend Render Deployment Guide

This guide walks you through deploying the **Django REST Framework Backend** to **[Render.com](https://render.com/)** with zero hassle.

---

## What Has Been Configured

1. **`build.sh`**: Automated build script in `backend-v2/backend/build.sh` that upgrades pip, installs dependencies, runs WhiteNoise `collectstatic`, and applies database migrations.
2. **WhiteNoise (`whitenoise-6.11.0`)**: Configured in `base.py` to serve Django Admin static assets, CSS, and JS directly through Gunicorn with gzip/brotli compression.
3. **Dynamic Host & CSRF Detection**: `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` automatically adapt to Render's `RENDER_EXTERNAL_HOSTNAME` and `*.onrender.com`.
4. **`render.yaml` Blueprint**: Blueprint at the repository root for automated 1-click deployment.
5. **Dockerfile**: Updated with dynamic port binding (`0.0.0.0:${PORT:-8000}`).

---

## Deployment Option A: 1-Click Blueprint (Recommended)

1. Push your repository to **GitHub** or **GitLab**.
2. Log in to [dashboard.render.com](https://dashboard.render.com/).
3. Click **New +** → **Blueprint**.
4. Connect your `vayux-systems` repository.
5. Render will automatically detect `render.yaml` and configure:
   - Service Name: `vayux-backend`
   - Root Directory: `backend-v2/backend`
   - Build Command: `chmod +x build.sh && ./build.sh`
   - Start Command: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 3 --timeout 120`
6. In the environment variables section, enter your `DATABASE_URL` (e.g. Aiven, Neon, Supabase, or Render Postgres).
7. Click **Apply**. Render will build and deploy your backend!

---

## Deployment Option B: Manual Web Service

If you prefer to configure the Web Service manually from the Render dashboard:

1. In Render Dashboard, click **New +** → **Web Service**.
2. Select your repository: `vayux-systems`.
3. Configure the settings:
   - **Name**: `vayux-backend`
   - **Region**: Select closest to your users (e.g. `Singapore` or `Frankfurt`).
   - **Branch**: `main`
   - **Root Directory**: `backend-v2/backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `chmod +x build.sh && ./build.sh`
   - **Start Command**: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 3 --timeout 120`
   - **Plan**: `Free`

4. Scroll down to **Environment Variables** and add:

| Key | Value | Description |
|---|---|---|
| `PYTHON_VERSION` | `3.10.14` | Python runtime version |
| `DJANGO_SETTINGS_MODULE` | `config.settings.production` | Production settings module |
| `DEBUG` | `False` | Disables debug mode in production |
| `SECRET_KEY` | *(Click "Generate" in Render)* | Random secure Django secret key |
| `DATABASE_URL` | `postgres://...` | PostgreSQL connection string (Aiven / Neon / Render) |
| `ALLOWED_HOSTS` | `*` or `.onrender.com,vayux.systems,localhost` | Allowed request hostnames |
| `CORS_ALLOWED_ORIGINS` | `https://vayux.systems,http://localhost:3000` | Frontend origins allowed for API requests |
| `CSRF_TRUSTED_ORIGINS` | `https://*.onrender.com,https://vayux.systems` | Trusted CSRF domains for forms & admin |
| `FIELD_ENCRYPTION_KEY` | `r0h1tV4yuX53nt1n3lK3y32Byt35L0ngS3cur3==` | 32-byte Fernet key for encrypted audit fields |

5. Click **Create Web Service**.

---

## Post-Deployment: Creating a Superuser

To log in to the Django Admin at `https://your-service.onrender.com/admin/`:

1. In the Render Dashboard, go to your `vayux-backend` service.
2. Click on the **Shell** tab on the left menu.
3. Run the following command:
   ```bash
   python manage.py createsuperuser
   ```
4. Enter your desired admin username, email, and password.
5. Visit `https://your-service.onrender.com/admin/` and log in!

---

## Connecting Frontend to Backend

In your Next.js frontend (`vayux-v2`):
Set the environment variable:
```env
NEXT_PUBLIC_API_URL=https://your-service-name.onrender.com
```
And add your frontend URL (e.g. `https://your-frontend.vercel.app`) to `CORS_ALLOWED_ORIGINS` in your Render backend settings.
