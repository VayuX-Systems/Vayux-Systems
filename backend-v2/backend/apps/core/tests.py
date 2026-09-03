from django.test import TestCase, Client
from django.urls import reverse
from .models import User, ActivityAuditLog, BlockedIP

class CoreSecurityTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_health_check(self):
        response = self.client.get(reverse('health-check'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'healthy')

    def test_security_headers_present(self):
        response = self.client.get(reverse('health-check'))
        self.assertIn('X-Content-Type-Options', response.headers)
        self.assertEqual(response.headers['X-Content-Type-Options'], 'nosniff')
        self.assertIn('X-Frame-Options', response.headers)
        self.assertEqual(response.headers['X-Frame-Options'], 'DENY')
        self.assertIn('Content-Security-Policy', response.headers)

    def test_threat_probe_defense(self):
        # A malicious scan for .env or wp-admin must be blocked with 403
        response = self.client.get('/.env')
        self.assertEqual(response.status_code, 403)
        self.assertTrue(ActivityAuditLog.objects.filter(is_suspicious=True).exists())

        response_wp = self.client.get('/wp-admin/login.php')
        self.assertEqual(response_wp.status_code, 403)
