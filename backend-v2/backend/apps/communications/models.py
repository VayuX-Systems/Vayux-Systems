from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.core.encryption import encrypt_text, decrypt_text

class TransmitSignal(models.Model):
    """
    Contact inquiries submitted via the 'Transmit Signal' Secure Discovery Portal.
    """
    VECTOR_CHOICES = [
        ('consultancy', 'Consultancy as a Service'),
        ('training', 'Corporate Training'),
        ('research', 'R&D Collaboration'),
        ('soc', 'SOC Operations Engagement'),
        ('vapt', 'Vulnerability Assessment & Penetration Testing'),
        ('dfir', 'Digital Forensics & Incident Response'),
        ('grc', 'Governance, Risk & Compliance'),
    ]
    TIER_CHOICES = [
        ('standard', 'Standard Analysis'),
        ('advanced', 'Advanced Architecture'),
        ('elite', 'Elite Strategic Defense'),
    ]
    STATUS_CHOICES = [
        ('NEW', 'New Inbound Signal'),
        ('IN_REVIEW', 'Under Sentinel Triage'),
        ('ENGAGED', 'Client Engaged / In Discussion'),
        ('RESOLVED', 'Completed / Contract Signed'),
        ('ARCHIVED', 'Archived / Closed'),
    ]

    name = models.CharField(max_length=150, verbose_name=_('Clearance Name'))
    email = models.EmailField(verbose_name=_('Secure Comm Link'))
    phone = models.CharField(max_length=40, blank=True)
    vector = models.CharField(max_length=50, choices=VECTOR_CHOICES, default='consultancy')
    tier = models.CharField(max_length=50, choices=TIER_CHOICES, default='standard')
    message = models.TextField(verbose_name=_('Mission Parameters'))
    
    # Internal Sentinel State
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    assigned_analyst = models.CharField(max_length=150, blank=True, help_text="Analyst handling this lead")
    admin_notes = models.TextField(blank=True, help_text="Internal notes")
    
    # Telemetry
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    country_code = models.CharField(max_length=10, default='--', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Transmit Signal (Inquiry)')
        verbose_name_plural = _('Transmit Signals (Inquiries)')
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_status_display()}] {self.name} - {self.get_vector_display()} ({self.created_at.strftime('%Y-%m-%d')})"


class EmergencyIncidentReport(models.Model):
    """
    High-priority DFIR Emergency Breach submission.
    Sensitive attack details are encrypted at rest using AES-Fernet encryption.
    """
    BREACH_TYPES = [
        ('RANSOMWARE', 'Ransomware / Encrypted Systems'),
        ('ACTIVE_INTRUSION', 'Active Cyber Intrusion / Lateral Movement'),
        ('DATA_EXFILTRATION', 'Suspected Data Exfiltration'),
        ('ZERO_DAY', 'Zero-Day / Critical Vulnerability Exploitation'),
        ('DDOS', 'Severe Distributed Denial of Service (DDoS)'),
        ('OTHER', 'Other Critical Security Breach'),
    ]
    SEVERITY_CHOICES = [
        ('CRITICAL', 'Critical (Operations Halted)'),
        ('HIGH', 'High (Production Impacted)'),
        ('MEDIUM', 'Medium (Contained / Suspicious)'),
    ]
    STATUS_CHOICES = [
        ('ACTIVE_DISPATCH', 'Active Dispatch (Sub-4-Hour SLA Triggered)'),
        ('TRIAGED', 'Triaged / Containment In Progress'),
        ('CONTAINED', 'Threat Contained'),
        ('REMEDIATED', 'Remediated & Forensic Report Delivered'),
        ('CLOSED', 'Closed'),
    ]

    company_name = models.CharField(max_length=200)
    contact_name = models.CharField(max_length=150)
    emergency_email = models.EmailField()
    emergency_phone = models.CharField(max_length=40)
    breach_type = models.CharField(max_length=50, choices=BREACH_TYPES, default='RANSOMWARE')
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='CRITICAL')
    
    # Encrypted payload containing technical logs, ransom notes, affected IP ranges
    _encrypted_payload = models.TextField(
        verbose_name=_('Encrypted Incident Details'),
        help_text="AES encrypted incident scope, ransom notes, and affected assets"
    )
    
    sla_deadline_hours = models.PositiveIntegerField(default=4, help_text="Target response SLA in hours")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='ACTIVE_DISPATCH')
    lead_incident_commander = models.CharField(max_length=150, blank=True)
    admin_notes = models.TextField(blank=True)
    
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    country_code = models.CharField(max_length=10, default='--', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('DFIR Emergency Incident Alert')
        verbose_name_plural = _('DFIR Emergency Incident Alerts')
        ordering = ['-created_at']

    def __str__(self):
        return f"🚨 [{self.get_severity_display()}] {self.company_name} - {self.get_breach_type_display()} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"

    @property
    def incident_payload(self) -> str:
        """Decrypts and returns the incident payload."""
        return decrypt_text(self._encrypted_payload)

    @incident_payload.setter
    def incident_payload(self, value: str):
        """Encrypts before storing."""
        self._encrypted_payload = encrypt_text(value)


class NewsletterSubscriber(models.Model):
    """
    Subscribers to VayuX research papers and monthly threat landscape advisories.
    """
    email = models.EmailField(unique=True)
    source_page = models.CharField(max_length=100, default='homepage')
    is_active = models.BooleanField(default=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Newsletter Subscriber')
        verbose_name_plural = _('Newsletter Subscribers')
        ordering = ['-created_at']

    def __str__(self):
        return self.email
