from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

# In development, relax strict HTTPS redirect
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Console email backend for testing
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# CORS
CORS_ALLOW_ALL_ORIGINS = True
