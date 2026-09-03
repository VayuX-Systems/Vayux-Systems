from django.contrib import admin
from .models import SocNode, RegionalComplianceRule

@admin.register(SocNode)
class SocNodeAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'country_code', 'node_type', 'status', 'latency_ms', 'display_order', 'is_active')
    list_filter = ('node_type', 'status', 'is_active')
    search_fields = ('name', 'city', 'country_code')


@admin.register(RegionalComplianceRule)
class RegionalComplianceRuleAdmin(admin.ModelAdmin):
    list_display = ('country_code', 'region_name', 'framework_name', 'badge_label', 'emergency_hotline', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('country_code', 'region_name', 'framework_name')
