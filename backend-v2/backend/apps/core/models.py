from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """
    Simplified Custom User model for VayuX Sentinel Admin and staff.
    Clean 2-Role model: is_staff / is_superuser determine full vs staff access.
    """
    ROLE_CHOICES = [
        ('ADMIN', 'Sentinel Administrator (Full Access)'),
        ('STAFF', 'Sentinel Analyst / Editor'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='ADMIN')
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True, help_text="Job title / designation")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Sentinel User')
        verbose_name_plural = _('Sentinel Users')
        ordering = ['-date_joined']

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class ActivityAuditLog(models.Model):
    """
    Logs all meaningful API and admin activities for security and threat auditing.
    """
    ip_address = models.GenericIPAddressField(verbose_name=_('Client IP'))
    country_code = models.CharField(max_length=10, default='--', blank=True)
    username = models.CharField(max_length=150, default='anonymous')
    method = models.CharField(max_length=10)
    path = models.CharField(max_length=500)
    status_code = models.IntegerField()
    response_time_ms = models.FloatField(default=0.0)
    user_agent = models.TextField(blank=True)
    is_suspicious = models.BooleanField(default=False)
    threat_details = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = _('Security & Activity Log')
        verbose_name_plural = _('Security & Activity Logs')
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.status_code}] {self.method} {self.path} - {self.ip_address} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"


class BlockedIP(models.Model):
    """
    Temporary or permanent IP blocklist triggered by suspicious probe attempts.
    """
    ip_address = models.GenericIPAddressField(unique=True, verbose_name=_('Blocked IP'))
    reason = models.CharField(max_length=255)
    probe_pattern = models.CharField(max_length=255, blank=True)
    is_permanent = models.BooleanField(default=False)
    blocked_until = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Blocked IP')
        verbose_name_plural = _('Blocked IPs')
        ordering = ['-created_at']

    def __str__(self):
        return f"Blocked: {self.ip_address} ({self.reason})"
