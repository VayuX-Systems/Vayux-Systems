from django.db import models
from django.utils.translation import gettext_lazy as _

class JobRole(models.Model):
    """
    Job openings displayed on the /careers page.
    Admin can add, modify requirements, or close vacancies.
    """
    DEPARTMENT_CHOICES = [
        ('OFFENSIVE', 'Offensive Security & Red Team'),
        ('SOC', 'Security Operations & Blue Team'),
        ('GRC', 'Governance, Risk & Compliance'),
        ('ENGINEERING', 'Autonomous Systems & Infrastructure'),
        ('RESEARCH', 'Threat Intelligence & Cryptography Lab'),
    ]
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, default='OFFENSIVE')
    location = models.CharField(max_length=100, default='Vadodara / Hybrid')
    tag = models.CharField(max_length=100, default='OFFENSIVE · FULL-TIME', help_text="e.g. DEFENSE · 24/7 ROSTER")
    icon = models.CharField(max_length=50, default='ShieldAlert', help_text="Lucide icon name: ShieldAlert, Search, CheckSquare, Code2, PenTool")
    description = models.TextField()
    responsibilities = models.JSONField(default=list, blank=True, help_text="List of responsibilities")
    requirements = models.JSONField(default=list, blank=True, help_text="List of qualifications / skills")
    subject = models.CharField(max_length=200, default="Application - Job Role")
    is_active = models.BooleanField(default=True, help_text="Uncheck to hide vacancy from website")
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Job Role / Opening')
        verbose_name_plural = _('Job Roles & Openings')
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.tag})"


class JobApplication(models.Model):
    """
    Submissions from candidates with attached resumes.
    """
    STATUS_CHOICES = [
        ('NEW', 'New Application'),
        ('REVIEWED', 'Under Technical Review'),
        ('INTERVIEW', 'Interview Scheduled'),
        ('OFFER', 'Offer Extended'),
        ('REJECTED', 'Archived / Not Selected'),
    ]
    role = models.ForeignKey(JobRole, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications')
    role_title_fallback = models.CharField(max_length=150, blank=True, help_text="Used if applying for Open Talent Alignment")
    applicant_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    resume_file = models.FileField(upload_to='resumes/%Y/%m/', null=True, blank=True, help_text="PDF / DOCX resume")
    cover_note = models.TextField(blank=True)
    linkedin_portfolio_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    admin_notes = models.TextField(blank=True, help_text="Internal reviewer comments")
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    country_code = models.CharField(max_length=10, default='--', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Job Application')
        verbose_name_plural = _('Job Applications')
        ordering = ['-created_at']

    def delete(self, *args, **kwargs):
        if self.resume_file:
            self.resume_file.delete(save=False)
        super().delete(*args, **kwargs)

    def __str__(self):
        role_name = self.role.title if self.role else self.role_title_fallback or 'Open Alignment'
        return f"{self.applicant_name} -> {role_name} ({self.get_status_display()})"
