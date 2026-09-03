from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, ActivityAuditLog, BlockedIP

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'title', 'is_staff', 'is_superuser', 'is_active')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'title')
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'title')}),
        (_('Clearance & Role'), {'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )


@admin.register(ActivityAuditLog)
class ActivityAuditLogAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'status_code_badge', 'method', 'path', 'ip_address', 'country_code', 'username', 'response_time_ms', 'is_suspicious')
    list_filter = ('status_code', 'is_suspicious', 'method', 'country_code', 'created_at')
    search_fields = ('ip_address', 'path', 'username', 'threat_details', 'user_agent')
    readonly_fields = ('created_at', 'ip_address', 'country_code', 'username', 'method', 'path', 'status_code', 'response_time_ms', 'user_agent', 'is_suspicious', 'threat_details')
    ordering = ('-created_at',)

    def has_add_permission(self, request):
        return False

    def status_code_badge(self, obj):
        from django.utils.html import format_html
        if obj.status_code < 300:
            color = "#10B981"  # Emerald
        elif obj.status_code < 400:
            color = "#00A8FF"  # Cyan
        elif obj.status_code < 500:
            color = "#F59E0B"  # Amber
        else:
            color = "#EF4444"  # Red
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">{}</span>',
            color, obj.status_code
        )
    status_code_badge.short_description = 'Status'


@admin.register(BlockedIP)
class BlockedIPAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'reason', 'is_permanent', 'blocked_until', 'created_at')
    list_filter = ('is_permanent', 'created_at')
    search_fields = ('ip_address', 'reason', 'probe_pattern')
