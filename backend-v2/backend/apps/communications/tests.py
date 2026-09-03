from django.test import TestCase, Client
from django.urls import reverse
from .models import TransmitSignal, EmergencyIncidentReport, NewsletterSubscriber

class CommunicationsAPITests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_transmit_signal_submission(self):
        payload = {
            'name': 'Commander Alex Mercer',
            'email': 'alex@defense-nexus.corp',
            'phone': '+91-9876543210',
            'vector': 'soc',
            'tier': 'elite',
            'message': 'Requesting 24/7 SOC integration with sub-15ms SLA for 5,000 cloud endpoints.'
        }
        response = self.client.post(reverse('communications:transmit-signal'), payload, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(TransmitSignal.objects.count(), 1)
        signal = TransmitSignal.objects.first()
        self.assertEqual(signal.name, 'Commander Alex Mercer')
        self.assertEqual(signal.status, 'NEW')

    def test_emergency_incident_submission_and_encryption(self):
        payload = {
            'company_name': 'AeroCyber Labs',
            'contact_name': 'Dr. Elena Vance',
            'emergency_email': 'elena@aerocyber.io',
            'emergency_phone': '+91-8200677905',
            'breach_type': 'RANSOMWARE',
            'severity': 'CRITICAL',
            'incident_details': 'Active ransomware detected across 50 production hypervisors. Ransom note requires 4.5 BTC.'
        }
        response = self.client.post(reverse('communications:dfir-emergency'), payload, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(EmergencyIncidentReport.objects.count(), 1)
        report = EmergencyIncidentReport.objects.first()
        self.assertEqual(report.company_name, 'AeroCyber Labs')
        # Verify payload is encrypted in DB and property decrypts properly
        self.assertNotEqual(report._encrypted_payload, payload['incident_details'])
        self.assertEqual(report.incident_payload, payload['incident_details'])

    def test_newsletter_subscription(self):
        payload = {'email': 'researcher@infosec.org', 'source_page': 'insights'}
        response = self.client.post(reverse('communications:newsletter-subscribe'), payload, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(NewsletterSubscriber.objects.count(), 1)
