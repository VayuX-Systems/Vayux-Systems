from django.db import models
from django.utils.translation import gettext_lazy as _

class PageSEO(models.Model):
    """
    Dynamic metadata overrides and OpenGraph/Twitter card controls per route.
    """
    route_path = models.CharField(
        max_length=200, 
        unique=True, 
        help_text="e.g. /, /about, /solutions/soc, /solutions/dfir, /glossary"
    )
    meta_title = models.CharField(max_length=200, help_text="SERP Title (<60 chars)")
    meta_description = models.TextField(help_text="SERP Description (150-160 chars)")
    canonical_url = models.URLField(blank=True, help_text="e.g. https://vayux.systems/solutions/dfir")
    og_image_url = models.URLField(blank=True, default="https://vayux.systems/og-image.png")
    og_type = models.CharField(max_length=50, default="website")
    twitter_card = models.CharField(max_length=50, default="summary_large_image")
    robots_directive = models.CharField(
        max_length=150, 
        default="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    )
    keywords = models.TextField(blank=True, help_text="Comma-separated keywords")
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Page SEO & GEO Metadata')
        verbose_name_plural = _('Page SEO & GEO Metadata')
        ordering = ['route_path']

    def __str__(self):
        return f"{self.route_path} -> {self.meta_title[:50]}"


class FAQItem(models.Model):
    """
    Factual FAQ questions and answers used for UI display and FAQPage JSON-LD generation.
    """
    CATEGORY_CHOICES = [
        ('homepage', 'Homepage FAQ'),
        ('about', 'About Us / Transparency FAQ'),
        ('solutions', 'General Solutions FAQ'),
        ('soc', 'SOC Management FAQ'),
        ('vapt', 'VAPT Services FAQ'),
        ('dfir', 'DFIR Incident Response FAQ'),
        ('grc', 'GRC & DPDP Compliance FAQ'),
        ('contact', 'Contact & Engagement FAQ'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='homepage')
    question = models.CharField(max_length=255)
    answer = models.TextField(help_text="Clear factual answer formatted for Google rich snippets and AI engines")
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('FAQ Item & Schema Pair')
        verbose_name_plural = _('FAQ Items & Schema Pairs')
        ordering = ['category', 'display_order']

    def __str__(self):
        return f"[{self.get_category_display()}] {self.question}"
