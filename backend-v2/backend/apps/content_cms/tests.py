from django.test import TestCase, Client
from django.urls import reverse
from .models import Solution, Category, Article, GlossaryTerm
import datetime

class ContentCMSAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        self.category = Category.objects.create(name='Offensive R&D', slug='offensive-rd')
        self.article = Article.objects.create(
            title='Adversarial Simulation in Cloud Enclaves',
            slug='adversarial-simulation-cloud',
            category=self.category,
            author_name='VayuX Red Team',
            excerpt='Analyzing novel evasion patterns in hardened cloud enclaves.',
            content='# Cloud Enclave Evasion\nTechnical analysis of memory resident payloads.',
            read_time_minutes=8,
            is_published=True,
            published_at=datetime.date(2026, 8, 20)
        )
        self.solution = Solution.objects.create(
            name='Managed SOC',
            slug='soc',
            tagline='Autonomous detection',
            lead_definition='VayuX SOC provides 24/7 detection',
            full_description='Enterprise SOC',
            sla_commitment='Sub-15ms',
            is_active=True
        )
        self.glossary = GlossaryTerm.objects.create(
            term='DFIR',
            slug='dfir',
            short_definition='Digital Forensics and Incident Response definition',
            why_it_matters='Critical for containment',
            key_processes=['Memory', 'Disk'],
            vayux_approach='Sub-4-hour SLA',
            is_active=True
        )

    def test_solution_list_and_detail(self):
        res_list = self.client.get(reverse('content_cms:solution-list'))
        self.assertEqual(res_list.status_code, 200)
        self.assertEqual(len(res_list.json()['results']), 1)

        res_detail = self.client.get(reverse('content_cms:solution-detail', kwargs={'slug': 'soc'}))
        self.assertEqual(res_detail.status_code, 200)
        self.assertEqual(res_detail.json()['slug'], 'soc')

    def test_article_list_and_detail(self):
        res_list = self.client.get(reverse('content_cms:article-list'))
        self.assertEqual(res_list.status_code, 200)
        self.assertEqual(len(res_list.json()['results']), 1)

        res_detail = self.client.get(reverse('content_cms:article-detail', kwargs={'slug': 'adversarial-simulation-cloud'}))
        self.assertEqual(res_detail.status_code, 200)
        self.assertEqual(res_detail.json()['view_count'], 1)

    def test_glossary_list_and_detail(self):
        res_list = self.client.get(reverse('content_cms:glossary-list'))
        self.assertEqual(res_list.status_code, 200)
        self.assertEqual(len(res_list.json()['results']), 1)

        res_detail = self.client.get(reverse('content_cms:glossary-detail', kwargs={'slug': 'dfir'}))
        self.assertEqual(res_detail.status_code, 200)
        self.assertEqual(res_detail.json()['slug'], 'dfir')
