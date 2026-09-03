from django.contrib import admin
from .models import SiteConfiguration, LegalDocument

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Company & Brand Identity', {
            'fields': ('company_name', 'legal_name', 'tagline', 'copyright_text')
        }),
        ('Contact Points & Emergency Hotline', {
            'fields': ('support_email', 'emergency_dfir_email', 'careers_email', 'primary_phone', 'emergency_phone', 'operating_hours')
        }),
        ('Physical Nexus (Headquarters)', {
            'fields': ('headquarters_city', 'headquarters_state', 'headquarters_country', 'headquarters_address')
        }),
        ('Digital Presences & Social Channels', {
            'fields': ('linkedin_url', 'github_url', 'twitter_x_url')
        }),
        ('Operational SLAs & Status', {
            'fields': ('soc_sla_response_time', 'dfir_emergency_sla', 'is_maintenance_mode')
        }),
    )

    def has_add_permission(self, request):
        # Disallow adding more than 1 singleton configuration
        return not SiteConfiguration.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(LegalDocument)
class LegalDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'doc_type', 'slug', 'version', 'effective_date', 'is_active', 'updated_at')
    list_filter = ('doc_type', 'is_active')
    search_fields = ('title', 'summary', 'content')
    prepopulated_fields = {'slug': ('title',)}
