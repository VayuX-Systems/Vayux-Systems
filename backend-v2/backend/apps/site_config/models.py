from django.db import models
from django.utils.translation import gettext_lazy as _

class SiteConfiguration(models.Model):
    """
    Global configuration for VayuX Systems contact details, social links, and operation info.
    Admin can edit this at any time without touching code.
    """
    company_name = models.CharField(max_length=150, default="VayuX Systems")
    legal_name = models.CharField(max_length=200, default="VayuX Systems Private Limited")
    tagline = models.CharField(max_length=255, default="Sovereign Cybersecurity R&D · Autonomous Defense")
    
    # Contact Points
    support_email = models.EmailField(default="admin@vayux.systems")
    emergency_dfir_email = models.EmailField(default="dfir@vayux.systems")
    careers_email = models.EmailField(default="careers@vayux.systems")
    primary_phone = models.CharField(max_length=40, default="+91-8200677905")
    emergency_phone = models.CharField(max_length=40, default="+91-8200677905")
    
    # Physical Nexus
    headquarters_city = models.CharField(max_length=100, default="Vadodara")
    headquarters_state = models.CharField(max_length=100, default="Gujarat")
    headquarters_country = models.CharField(max_length=100, default="India")
    headquarters_address = models.TextField(default="Vadodara, Gujarat, India - 390001")
    
    # Digital Presences / Social Links
    linkedin_url = models.URLField(default="https://www.linkedin.com/company/vayux-systems", blank=True)
    github_url = models.URLField(default="https://github.com/vayux-systems", blank=True)
    twitter_x_url = models.URLField(default="https://twitter.com/VayuXSystems", blank=True)
    
    # Operational parameters
    soc_sla_response_time = models.CharField(max_length=50, default="Sub-15ms Event Correlation")
    dfir_emergency_sla = models.CharField(max_length=50, default="Sub-4-Hour Deployment Guarantee")
    operating_hours = models.CharField(max_length=100, default="24/7/365 Continuous SOC & Emergency Incident Response")
    copyright_text = models.CharField(max_length=200, default="© 2026 VayuX Systems Private Limited. All rights reserved.")
    
    is_maintenance_mode = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Site Global Settings')
        verbose_name_plural = _('Site Global Settings')

    def __str__(self):
        return f"{self.company_name} Configuration (Last updated: {self.updated_at.strftime('%Y-%m-%d')})"

    def save(self, *args, **kwargs):
        # Keep as singleton: always ID 1
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class LegalDocument(models.Model):
    """
    Terms & Conditions, Privacy Policy, DPDP Act 2023 Compliance, and Disclosures.
    Admin can edit Markdown/HTML content directly from Sentinel Admin.
    """
    DOC_TYPES = [
        ('TERMS', 'Terms & Conditions'),
        ('PRIVACY', 'Privacy Policy'),
        ('DPDP', 'DPDP Act 2023 Compliance Notice'),
        ('SECURITY', 'Responsible Security Disclosure Policy'),
        ('COOKIE', 'Cookie & Telemetry Policy'),
    ]
    doc_type = models.CharField(max_length=30, choices=DOC_TYPES, unique=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=100, unique=True, help_text="e.g. terms, privacy, dpdp-act")
    version = models.CharField(max_length=20, default="1.0")
    effective_date = models.DateField()
    last_reviewed_date = models.DateField(auto_now=True)
    summary = models.TextField(blank=True, help_text="Short executive summary of this legal document")
    content = models.TextField(help_text="Full markdown or HTML text of the legal terms")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Legal Document & Policy')
        verbose_name_plural = _('Legal Documents & Policies')
        ordering = ['doc_type']

    def __str__(self):
        return f"{self.title} (v{self.version})"
