import os
from .base import *
from .security import *

DEBUG = False

# Production Security Overrides
SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', 'True').lower() in ('true', '1')

# Prevent missing static file references from crashing production collectstatic
WHITENOISE_MANIFEST_STRICT = False

# Email Configuration via SMTP
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.sendgrid.net')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'True').lower() in ('true', '1')
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')

DEFAULT_FROM_EMAIL = os.environ.get('NOTIFICATION_EMAIL_SENDER', 'sentinel@vayux.systems')
SERVER_EMAIL = DEFAULT_FROM_EMAIL
