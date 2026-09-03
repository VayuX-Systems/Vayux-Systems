from django.test import TestCase, Client
from apps.site_config.models import SiteConfiguration, LegalDocument
import datetime

class SiteConfigurationAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        self.config = SiteConfiguration.objects.create(
            company_name='VayuX Systems Testing',
            support_email='support@vayux.systems',
            primary_phone='+91-8200677905',
        )
        self.privacy_doc = LegalDocument.objects.create(
            doc_type='PRIVACY',
            title='Privacy Policy & Telemetry Notice',
            slug='privacy-policy',
            version='1.0',
            effective_date=datetime.date.today(),
            content='# Privacy Policy\nVayuX protects sovereign client telemetry.',
            is_active=True,
        )

    def test_get_site_settings(self):
        """Verify GET /api/v1/site/settings/ returns singleton configuration."""
        response = self.client.get('/api/v1/site/settings/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['company_name'], 'VayuX Systems Testing')
        self.assertEqual(data['support_email'], 'support@vayux.systems')

    def test_list_legal_documents(self):
        """Verify GET /api/v1/site/legal/ returns active legal documents."""
        response = self.client.get('/api/v1/site/legal/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        results = data.get('results', data) if isinstance(data, dict) else data
        slugs = [doc['slug'] for doc in results]
        self.assertIn('privacy-policy', slugs)

    def test_legal_document_detail(self):
        """Verify GET /api/v1/site/legal/<slug>/ returns document content."""
        response = self.client.get('/api/v1/site/legal/privacy-policy/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['title'], 'Privacy Policy & Telemetry Notice')
        self.assertIn('VayuX protects sovereign client telemetry', data['content'])
