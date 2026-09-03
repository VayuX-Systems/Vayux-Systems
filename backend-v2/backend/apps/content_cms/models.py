from django.db import models
from django.utils.translation import gettext_lazy as _

class PageSectionContent(models.Model):
    """
    Dynamic headings, badges, and subtitles for any page or section.
    Admin can edit homepage hero headings, about us headings, etc.
    """
    section_key = models.CharField(
        max_length=100, 
        unique=True, 
        help_text="Identifier e.g. home-hero, about-hero, solutions-hero, lab-vs-vendor"
    )
    badge_text = models.CharField(max_length=100, blank=True, help_text="e.g. 🔒 Encrypted Nexus Channel")
    heading = models.CharField(max_length=255, help_text="Main headline text")
    highlight_text = models.CharField(max_length=100, blank=True, help_text="Part of headline with gradient text")
    subheading = models.TextField(help_text="Detailed lead paragraph or subtitle")
    extra_data = models.JSONField(default=dict, blank=True, help_text="Optional key-value pairs (e.g. metrics, stats)")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Page Section & Heading')
        verbose_name_plural = _('Page Sections & Headings')
        ordering = ['section_key']

    def __str__(self):
        return f"{self.section_key}: {self.heading}"


class AboutUs(models.Model):
    """
    About Us page content: Founding story, Core Principles, Leadership Quote.
    """
    hero_badge = models.CharField(max_length=100, default="🛡️ Sovereign Defense Architecture")
    hero_title = models.CharField(max_length=200, default="The Genesis of Sovereign Defense")
    hero_subtitle = models.TextField(default="Constructing unassailable defensive architectures through deep R&D and operational threat telemetry.")
    founding_story = models.TextField(help_text="Detailed narrative about VayuX founding and lab mission")
    leadership_quote = models.TextField(default="True cyber sovereignty is not bought off the shelf; it is forged through rigorous offensive research.")
    leader_name = models.CharField(max_length=100, default="Pragnesh Kumar S. Singh")
    leader_title = models.CharField(max_length=100, default="Founder & Chief Technology Officer")
    core_principles = models.JSONField(
        default=list, 
        help_text="List of principles (e.g. [{'title': 'Autonomous Defense', 'desc': '...'}])"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('About Us Page Content')
        verbose_name_plural = _('About Us Page Content')

    def __str__(self):
        return "About Us Page Content"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class TeamMember(models.Model):
    """
    Team and leadership profiles displayed on About Us and citations.
    """
    name = models.CharField(max_length=150)
    role_designation = models.CharField(max_length=150)
    bio = models.TextField()
    avatar_image = models.ImageField(upload_to='team/', blank=True, null=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    is_founder = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _('Architect / Team Member')
        verbose_name_plural = _('Architects & Team Members')
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} - {self.role_designation}"


class CompanyCredential(models.Model):
    """
    ISO 27001, SOC 2 Type II, CERT-In, and other verified credentials.
    """
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=100, default="Certification")
    issuing_body = models.CharField(max_length=150, blank=True)
    badge_label = models.CharField(max_length=100, default="VERIFIED")
    description = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _('Trust Credential / Badge')
        verbose_name_plural = _('Trust Credentials & Badges')
        ordering = ['display_order']

    def __str__(self):
        return f"{self.name} ({self.badge_label})"


class Solution(models.Model):
    """
    Detailed solutions (SOC, VAPT, DFIR, GRC) powering dedicated routes and schemas.
    """
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=50, unique=True, help_text="soc, vapt, dfir, grc")
    tagline = models.CharField(max_length=255)
    lead_definition = models.TextField(help_text="Plain-language factual definition for GEO citation extraction")
    full_description = models.TextField()
    sla_commitment = models.CharField(max_length=100, default="Sub-15ms Detection")
    key_metrics = models.JSONField(default=list, blank=True, help_text="[{'label': 'SLA', 'val': '<4h'}]")
    methodology_steps = models.JSONField(default=list, help_text="Ordered list of methodology steps")
    capabilities_list = models.JSONField(default=list, help_text="Bulleted list of included capabilities")
    rd_feedback_loop = models.TextField(help_text="How operational telemetry feeds back into VayuX R&D")
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Solution & Defense Pillar')
        verbose_name_plural = _('Solutions & Defense Pillars')
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.slug.upper()})"


class Category(models.Model):
    """
    Categories for research articles, whitepapers, and case studies.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name = _('Research Category')
        verbose_name_plural = _('Research Categories')
        ordering = ['name']

    def __str__(self):
        return self.name


class Article(models.Model):
    """
    Research insights, whitepapers, threat advisories, and technical papers.
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')
    author_name = models.CharField(max_length=150, default="VayuX Research Team")
    author_role = models.CharField(max_length=150, default="Threat Intelligence Division", blank=True)
    excerpt = models.TextField(help_text="Short abstract / summary for SERP and cards")
    content = models.TextField(help_text="Full markdown or HTML article content")
    featured_image = models.ImageField(upload_to='articles/', blank=True, null=True)
    read_time_minutes = models.PositiveIntegerField(default=5)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    published_at = models.DateField()
    view_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Research Article / Whitepaper')
        verbose_name_plural = _('Research Articles & Whitepapers')
        ordering = ['-published_at']

    def __str__(self):
        return f"{self.title} ({self.category.name})"


class ResearchProject(models.Model):
    """
    R&D Lab Innovations & Open Source Security Tools.
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    badge = models.CharField(max_length=100, default="R&D LAB INITIATIVE")
    summary = models.TextField()
    details = models.TextField(blank=True)
    github_repo_url = models.URLField(blank=True)
    live_demo_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('R&D Project / Tool')
        verbose_name_plural = _('R&D Projects & Tools')
        ordering = ['display_order']

    def __str__(self):
        return self.title


class GlossaryTerm(models.Model):
    """
    Cybersecurity Glossary for GEO (AI Engine Optimization) & search snippets.
    e.g. DFIR, MITRE ATT&CK, Zero Trust, DPDP Act 2023, Post-Quantum Cryptography.
    """
    term = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    short_definition = models.TextField(help_text="2-3 sentence factual definition extracted by Perplexity/ChatGPT")
    why_it_matters = models.TextField(help_text="Why this concept is crucial for enterprise defense")
    key_processes = models.JSONField(default=list, help_text="Numbered list of core processes")
    vayux_approach = models.TextField(help_text="How VayuX applies or defends against this")
    target_search_query = models.CharField(max_length=200, blank=True, help_text="e.g. 'what is dfir in cybersecurity'")
    related_solution = models.ForeignKey(Solution, on_delete=models.SET_NULL, null=True, blank=True, related_name='glossary_terms')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Glossary Term (GEO)')
        verbose_name_plural = _('Glossary Terms (GEO)')
        ordering = ['term']

    def __str__(self):
        return f"{self.term} ({self.slug})"
