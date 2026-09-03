from django.contrib import admin
from django.utils.html import format_html
from .models import (
    PageSectionContent, AboutUs, TeamMember, CompanyCredential,
    Solution, Category, Article, ResearchProject, GlossaryTerm
)

@admin.register(PageSectionContent)
class PageSectionContentAdmin(admin.ModelAdmin):
    list_display = ('section_key', 'badge_text', 'heading', 'highlight_text', 'updated_at')
    search_fields = ('section_key', 'heading', 'subheading')
    fieldsets = (
        ('Section Identifier', {
            'description': 'Select or verify the section key mapped to frontend pages (e.g. home-hero, home-solutions).',
            'fields': ('section_key',)
        }),
        ('Headings & Badges', {
            'description': 'Configure the main headline and top badge text visible on the page.',
            'fields': ('badge_text', 'heading', 'highlight_text', 'subheading')
        }),
    )


@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('1. Hero Presentation', {
            'description': 'Configure the top headline and badge of the /about page.',
            'fields': ('hero_badge', 'hero_title', 'hero_subtitle')
        }),
        ('2. Founding Narrative & Lab Mission', {
            'description': 'The core genesis story of VayuX Systems and Vadodara R&D lab.',
            'fields': ('founding_story',)
        }),
        ('3. Leadership Philosophy Quote', {
            'description': 'The executive philosophy quote featured prominently on the About page.',
            'fields': ('leadership_quote', 'leader_name', 'leader_title')
        }),
        ('4. Core Principles (Bento Grid)', {
            'description': 'JSON array of core tenets: [{"title": "...", "desc": "..."}].',
            'fields': ('core_principles',)
        }),
    )

    def has_add_permission(self, request):
        return not AboutUs.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role_designation', 'founder_badge', 'display_order', 'status_badge')
    list_filter = ('is_founder', 'is_active')
    search_fields = ('name', 'role_designation', 'bio')
    list_editable = ('display_order',)
    fieldsets = (
        ('Identity & Executive Role', {
            'description': 'Team member personal details and official leadership title.',
            'fields': ('name', 'role_designation', 'is_founder', 'avatar_image')
        }),
        ('Professional Bio', {
            'description': 'Deep technical background and research domain.',
            'fields': ('bio',)
        }),
        ('Social & Professional Channels', {
            'description': 'Verified public profile links.',
            'fields': ('linkedin_url', 'github_url')
        }),
        ('Visibility & Order', {
            'fields': ('display_order', 'is_active')
        }),
    )

    def founder_badge(self, obj):
        if obj.is_founder:
            return format_html('<span style="background: rgba(0,168,255,0.2); color: #00A8FF; padding: 3px 8px; border-radius: 999px; font-weight: bold; font-size: 11px;">FOUNDER</span>')
        return format_html('<span style="color: #94A3B8; font-size: 11px;">LEADERSHIP</span>')
    founder_badge.short_description = 'Tier'

    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="color: #10B981; font-weight: bold;">● Active</span>')
        return format_html('<span style="color: #EF4444;">○ Inactive</span>')
    status_badge.short_description = 'Status'


@admin.register(CompanyCredential)
class CompanyCredentialAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'badge_label', 'issuing_body', 'display_order', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'badge_label', 'issuing_body')
    list_editable = ('display_order', 'is_active')


@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'sla_commitment', 'display_order', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('name', 'tagline', 'lead_definition', 'full_description')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('display_order', 'is_active')
    fieldsets = (
        ('1. Defense Pillar Identification', {
            'description': 'Core solution name, slug, and service level agreement.',
            'fields': ('name', 'slug', 'tagline', 'sla_commitment')
        }),
        ('2. Technical Descriptions', {
            'description': 'High-level lead definition and full architecture breakdown.',
            'fields': ('lead_definition', 'full_description')
        }),
        ('3. Capabilities & Operational Telemetry', {
            'description': 'Structured JSON metrics and R&D feedback loop description.',
            'fields': ('capabilities_list', 'key_metrics', 'methodology_steps', 'rd_feedback_loop')
        }),
        ('4. Display Settings', {
            'fields': ('display_order', 'is_active')
        }),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'published_at', 'read_time_minutes', 'is_featured', 'status_badge', 'view_count')
    list_filter = ('category', 'is_featured', 'is_published', 'published_at')
    search_fields = ('title', 'excerpt', 'content', 'author_name')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    fieldsets = (
        ('1. Whitepaper Identity', {
            'description': 'Title, URL slug, and research category classification.',
            'fields': ('title', 'slug', 'category', 'featured_image')
        }),
        ('2. Author & Publication Details', {
            'description': 'Lead researcher name, division, publication date, and read time.',
            'fields': ('author_name', 'author_role', 'published_at', 'read_time_minutes', 'is_featured', 'is_published')
        }),
        ('3. Abstract & Full Content', {
            'description': 'Excerpt for SERP cards, and full Markdown/HTML technical whitepaper.',
            'fields': ('excerpt', 'content')
        }),
        ('4. Telemetry Metrics', {
            'fields': ('view_count',)
        }),
    )

    def status_badge(self, obj):
        if obj.is_published:
            return format_html('<span style="color: #10B981; font-weight: bold;">● Published</span>')
        return format_html('<span style="color: #F59E0B; font-weight: bold;">○ Draft</span>')
    status_badge.short_description = 'Publish State'


@admin.register(ResearchProject)
class ResearchProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'badge', 'display_order', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'summary', 'details')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(GlossaryTerm)
class GlossaryTermAdmin(admin.ModelAdmin):
    list_display = ('term', 'slug', 'target_search_query', 'related_solution', 'is_active', 'updated_at')
    list_filter = ('is_active', 'related_solution')
    search_fields = ('term', 'short_definition', 'detailed_explanation', 'target_search_query')
    prepopulated_fields = {'slug': ('term',)}
