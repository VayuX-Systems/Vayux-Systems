from django.test import TestCase, Client
from django.urls import reverse
from .models import PageSEO, FAQItem

class SEOEngineAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        PageSEO.objects.create(
            route_path='/solutions/dfir',
            meta_title='DFIR Emergency Response | VayuX Systems',
            meta_description='Sub-4-hour emergency SLA deployment.',
            canonical_url='https://vayux.systems/solutions/dfir'
        )
        FAQItem.objects.create(
            category='dfir',
            question='What is your DFIR emergency SLA?',
            answer='VayuX guarantees sub-4-hour emergency dispatch.',
            display_order=1
        )

    def test_page_metadata_endpoint(self):
        res = self.client.get(reverse('seo_engine:page-metadata') + '?path=/solutions/dfir')
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data['meta']['title'], 'DFIR Emergency Response | VayuX Systems')
        self.assertTrue(len(data['json_ld_schemas']) >= 2)

    def test_sitemap_xml(self):
        res = self.client.get(reverse('root-sitemap'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res['Content-Type'], 'application/xml')
        self.assertIn('<urlset', res.content.decode('utf-8'))

    def test_robots_txt(self):
        res = self.client.get(reverse('root-robots'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res['Content-Type'], 'text/plain')
        content = res.content.decode('utf-8')
        self.assertIn('GPTBot', content)
        self.assertIn('PerplexityBot', content)

    def test_llms_txt(self):
        res = self.client.get(reverse('root-llms'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res['Content-Type'], 'text/plain')
        self.assertIn('# VayuX Systems', res.content.decode('utf-8'))
