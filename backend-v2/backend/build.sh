#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -o errexit

echo "========================================="
echo "==> VayuX Sentinel — Render Build Script"
echo "========================================="

echo "==> Step 1: Upgrading pip..."
python -m pip install --upgrade pip

echo "==> Step 2: Installing dependencies..."
pip install -r requirements.txt

echo "==> Step 3: Collecting static files with WhiteNoise..."
python manage.py collectstatic --no-input --clear

echo "==> Step 4: Applying database migrations..."
python manage.py migrate --no-input

echo "========================================="
echo "==> VayuX Backend Build Complete!"
echo "========================================="
