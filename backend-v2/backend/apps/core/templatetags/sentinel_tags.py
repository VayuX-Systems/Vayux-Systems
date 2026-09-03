from django import template

from apps.communications.models import TransmitSignal, EmergencyIncidentReport, NewsletterSubscriber
from apps.careers.models import JobApplication
from apps.core.models import ActivityAuditLog

register = template.Library()

@register.simple_tag
def get_sentinel_metrics():
    """
    Returns live operational metrics for the Sentinel Command dashboard.
    """
    return {
        'new_signals': TransmitSignal.objects.filter(status='NEW').count(),
        'total_signals': TransmitSignal.objects.count(),
        'active_dfir': EmergencyIncidentReport.objects.filter(status='ACTIVE_DISPATCH').count(),
        'total_dfir': EmergencyIncidentReport.objects.count(),
        'pending_applicants': JobApplication.objects.filter(status='NEW').count(),
        'total_applicants': JobApplication.objects.count(),
        'subscribers': NewsletterSubscriber.objects.filter(is_active=True).count(),
        'blocked_probes': ActivityAuditLog.objects.filter(is_suspicious=True).count(),
    }
