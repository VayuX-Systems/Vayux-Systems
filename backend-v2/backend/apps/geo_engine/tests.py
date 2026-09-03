from django.test import TestCase, Client
from django.urls import reverse
from .models import SocNode, RegionalComplianceRule

class GeoEngineAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        SocNode.objects.create(
            name='Vadodara Primary Nexus',
            city='Vadodara',
            country_code='IN',
            lat=22.3072,
            lng=73.1812,
            node_type='PRIMARY_NEXUS',
            status='OPERATIONAL',
            latency_ms=8,
            is_active=True
        )
        RegionalComplianceRule.objects.create(
            country_code='IN',
            region_name='India',
            framework_name='DPDP Act 2023',
            badge_label='SOVEREIGN COMPLIANCE',
            banner_headline='Indian Data Sovereignty',
            banner_description='DPDP Act compliant',
            emergency_hotline='+91-8200677905',
            is_active=True
        )

    def test_visitor_context_detection(self):
        res = self.client.get(reverse('geo_engine:visitor-context'), HTTP_CF_IPCOUNTRY='IN')
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data['detected_country'], 'IN')
        self.assertEqual(data['compliance']['framework_name'], 'DPDP Act 2023')

    def test_soc_nodes_list(self):
        res = self.client.get(reverse('geo_engine:soc-nodes'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.json()['results']), 1)
        self.assertEqual(res.json()['results'][0]['city'], 'Vadodara')
