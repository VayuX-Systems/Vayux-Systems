from django.test import TestCase, Client
from django.urls import reverse
from apps.careers.models import JobRole, JobApplication

class CareersAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        self.active_role = JobRole.objects.create(
            title='Senior Offensive Security Specialist',
            slug='senior-offensive-security-specialist',
            department='OFFENSIVE',
            location='Vadodara / Hybrid',
            tag='OFFENSIVE · FULL-TIME',
            description='Conduct advanced adversary emulation and red teaming.',
            is_active=True,
            display_order=1,
        )
        self.inactive_role = JobRole.objects.create(
            title='Archived Intern Role',
            slug='archived-intern-role',
            department='RESEARCH',
            location='Remote',
            tag='RESEARCH · INTERNSHIP',
            description='Former research internship position.',
            is_active=False,
            display_order=10,
        )

    def test_list_active_job_roles(self):
        """Verify GET /api/v1/careers/ returns only active job vacancies."""
        response = self.client.get('/api/v1/careers/roles/')
        self.assertEqual(response.status_code, 200)
        
        # Handle paginated or plain list
        data = response.json()
        results = data.get('results', data) if isinstance(data, dict) else data
        
        slugs = [r['slug'] for r in results]
        self.assertIn('senior-offensive-security-specialist', slugs)
        self.assertNotIn('archived-intern-role', slugs)

    def test_job_role_detail_by_slug(self):
        """Verify GET /api/v1/careers/roles/<slug>/ returns job details."""
        response = self.client.get(f'/api/v1/careers/roles/{self.active_role.slug}/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['title'], 'Senior Offensive Security Specialist')
        self.assertEqual(data['department'], 'OFFENSIVE')

    def test_submit_job_application_success(self):
        """Verify POST /api/v1/careers/apply/ successfully creates application."""
        payload = {
            'role': self.active_role.id,
            'applicant_name': 'Aarav Patel',
            'email': 'aarav.patel@securityresearch.io',
            'phone': '+91 9876543210',
            'cover_note': 'Interested in applying for the offensive security specialist role.',
            'linkedin_portfolio_url': 'https://linkedin.com/in/aarav-patel',
            'github_url': 'https://github.com/aarav-patel',
        }
        response = self.client.post('/api/v1/careers/apply/', data=payload)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(JobApplication.objects.filter(email='aarav.patel@securityresearch.io').exists())

    def test_submit_job_application_invalid_email(self):
        """Verify POST /api/v1/careers/apply/ rejects invalid emails."""
        payload = {
            'role': self.active_role.id,
            'applicant_name': 'Invalid User',
            'email': 'not-an-email',
        }
        response = self.client.post('/api/v1/careers/apply/', data=payload)
        self.assertEqual(response.status_code, 400)
