from rest_framework.throttling import AnonRateThrottle

class ContactRateThrottle(AnonRateThrottle):
    scope = 'contact_submission'

class EmergencyRateThrottle(AnonRateThrottle):
    scope = 'emergency_submission'

class CareersRateThrottle(AnonRateThrottle):
    scope = 'job_application'

class NewsletterRateThrottle(AnonRateThrottle):
    scope = 'newsletter'
