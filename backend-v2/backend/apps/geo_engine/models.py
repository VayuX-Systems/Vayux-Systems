from django.db import models
from django.utils.translation import gettext_lazy as _

class SocNode(models.Model):
    """
    Global SOC defense and research nodes plotted on the 3D interactive globe.
    """
    NODE_TYPES = [
        ('PRIMARY_NEXUS', 'Primary Command & R&D Nexus'),
        ('SOVEREIGN_NODE', 'Sovereign Regional Defense Node'),
        ('RELAY_GATEWAY', 'Telemetry Relay Gateway'),
    ]
    STATUS_CHOICES = [
        ('OPERATIONAL', 'Fully Operational (100% SLA)'),
        ('ELEVATED', 'Elevated Alert Status'),
        ('MAINTENANCE', 'Scheduled Maintenance'),
    ]

    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country_code = models.CharField(max_length=10, default="IN")
    lat = models.FloatField(help_text="Latitude coordinate (e.g. 22.3072 for Vadodara)")
    lng = models.FloatField(help_text="Longitude coordinate (e.g. 73.1812 for Vadodara)")
    node_type = models.CharField(max_length=30, choices=NODE_TYPES, default='SOVEREIGN_NODE')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='OPERATIONAL')
    latency_ms = models.PositiveIntegerField(default=12, help_text="Average internal event correlation latency in ms")
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _('Global SOC Node')
        verbose_name_plural = _('Global SOC Nodes')
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.city}, {self.country_code}) - {self.get_status_display()}"


class RegionalComplianceRule(models.Model):
    """
    Regional compliance rules displayed based on visitor geolocation.
    e.g. India (DPDP Act 2023), EU (GDPR), US (NIST CSF / FedRAMP).
    """
    country_code = models.CharField(max_length=10, unique=True, help_text="ISO country code (e.g. IN, US, DE, GB)")
    region_name = models.CharField(max_length=100, default="India")
    framework_name = models.CharField(max_length=100, default="DPDP Act 2023 & CERT-In Directives")
    badge_label = models.CharField(max_length=100, default="SOVEREIGN COMPLIANCE")
    banner_headline = models.CharField(max_length=200, default="Indian Data Sovereignty & DPDP Compliance")
    banner_description = models.TextField(default="VayuX Systems complies with the Digital Personal Data Protection Act 2023 and CERT-In 6-hour cybersecurity reporting directives.")
    emergency_hotline = models.CharField(max_length=50, default="+91-8200677905")
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _('Regional Compliance Rule')
        verbose_name_plural = _('Regional Compliance Rules')
        ordering = ['country_code']

    def __str__(self):
        return f"{self.country_code} - {self.framework_name}"
