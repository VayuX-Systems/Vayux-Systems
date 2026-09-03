import csv
from django.contrib import admin, messages
from django.http import HttpResponse
from django.utils.html import format_html
from .models import TransmitSignal, EmergencyIncidentReport, NewsletterSubscriber

@admin.register(TransmitSignal)
class TransmitSignalAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_links', 'vector_badge', 'tier_badge', 'status_badge', 'country_code', 'created_at', 'delete_action')
    list_filter = ('status', 'vector', 'tier', 'country_code', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message', 'admin_notes', 'assigned_analyst')
    readonly_fields = ('ip_address', 'country_code', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'

    fieldsets = (
        ('Inbound Signal Details', {
            'description': 'Direct client inquiry parameters and contact communication channel.',
            'fields': ('name', 'email', 'phone', 'vector', 'tier', 'message')
        }),
        ('Sentinel Triage & Engagement', {
            'description': 'Assign commander and update client onboarding status.',
            'fields': ('status', 'assigned_analyst', 'admin_notes')
        }),
        ('Security & Telemetry Audit', {
            'fields': ('ip_address', 'country_code', 'created_at', 'updated_at')
        }),
    )

    def contact_links(self, obj):
        links = [f'<a href="mailto:{obj.email}" style="color: #00A8FF; font-weight: bold;">{obj.email}</a>']
        if obj.phone:
            links.append(f'<a href="tel:{obj.phone}" style="color: #94A3B8; font-size: 11px; margin-left: 6px;">📞 {obj.phone}</a>')
        return format_html(''.join(links))
    contact_links.short_description = 'Contact Link'

    def vector_badge(self, obj):
        return obj.get_vector_display()
    vector_badge.short_description = 'Engagement Vector'

    def tier_badge(self, obj):
        return obj.get_tier_display()
    tier_badge.short_description = 'Tier'

    def status_badge(self, obj):
        color_map = {
            'NEW': '#00A8FF',       # Cyan
            'IN_REVIEW': '#F59E0B', # Amber
            'ENGAGED': '#8B5CF6',   # Purple
            'RESOLVED': '#10B981',  # Emerald
            'ARCHIVED': '#6B7280',  # Gray
        }
        color = color_map.get(obj.status, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 11px;">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Triage Status'

    def delete_action(self, obj):
        return format_html(
            '<a href="/admin/communications/transmitsignal/{}/delete/" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.35); font-weight: bold; font-size: 11px; text-decoration: none; display: inline-block;">🗑️ Delete</a>',
            obj.id
        )
    delete_action.short_description = 'Action'


@admin.register(EmergencyIncidentReport)
class EmergencyIncidentReportAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_name', 'emergency_hotline', 'breach_type', 'severity_badge', 'status_badge', 'created_at', 'delete_action')
    list_filter = ('severity', 'status', 'breach_type', 'country_code', 'created_at')
    search_fields = ('company_name', 'contact_name', 'emergency_email', 'emergency_phone', 'lead_incident_commander', 'admin_notes')
    readonly_fields = ('ip_address', 'country_code', 'created_at', 'updated_at', 'decrypted_incident_details_display')
    date_hierarchy = 'created_at'

    fieldsets = (
        ('Breach Scope & Entity', {
            'description': 'Target organization parameters and direct 24/7 hotline numbers.',
            'fields': ('company_name', 'contact_name', 'emergency_email', 'emergency_phone', 'breach_type', 'severity', 'sla_deadline_hours')
        }),
        ('Decrypted Incident Details (Confidential Logs)', {
            'description': 'Decrypted attack indicators, compromised IPs, and ransom parameters.',
            'fields': ('decrypted_incident_details_display',)
        }),
        ('Dispatch Commander & Playbook Actions', {
            'description': 'Incident containment stage and assigned lead commander.',
            'fields': ('status', 'lead_incident_commander', 'admin_notes')
        }),
        ('Telemetry & Audit Trail', {
            'fields': ('ip_address', 'country_code', 'created_at', 'updated_at')
        }),
    )

    def emergency_hotline(self, obj):
        return format_html(
            '<a href="tel:{}" style="color: #EF4444; font-weight: bold; font-family: monospace; font-size: 12px; background: rgba(239, 68, 68, 0.1); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(239, 68, 68, 0.3);">🚨 {}</a>',
            obj.emergency_phone, obj.emergency_phone
        )
    emergency_hotline.short_description = 'Emergency Hotline'

    def decrypted_incident_details_display(self, obj):
        payload = obj.incident_payload
        return format_html('<pre style="background: #0f172a; color: #10B981; padding: 14px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.3); white-space: pre-wrap; font-family: monospace; font-size: 12px;">{}</pre>', payload)
    decrypted_incident_details_display.short_description = 'Decrypted Attack Scope & Logs'

    def severity_badge(self, obj):
        color_map = {
            'CRITICAL': '#EF4444', # Red
            'HIGH': '#F59E0B',     # Amber
            'MEDIUM': '#3B82F6',   # Blue
        }
        color = color_map.get(obj.severity, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 11px;">{}</span>',
            color, obj.get_severity_display()
        )
    severity_badge.short_description = 'Severity'

    def status_badge(self, obj):
        color_map = {
            'ACTIVE_DISPATCH': '#EF4444',
            'TRIAGED': '#F59E0B',
            'CONTAINED': '#3B82F6',
            'REMEDIATED': '#10B981',
            'CLOSED': '#6B7280',
        }
        color = color_map.get(obj.status, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 11px;">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Dispatch Status'

    def delete_action(self, obj):
        return format_html(
            '<a href="/admin/communications/emergencyincidentreport/{}/delete/" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.35); font-weight: bold; font-size: 11px; text-decoration: none; display: inline-block;">🗑️ Delete</a>',
            obj.id
        )
    delete_action.short_description = 'Action'


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'source_page', 'status_badge', 'created_at', 'delete_action')
    list_filter = ('is_active', 'source_page', 'created_at')
    search_fields = ('email',)
    readonly_fields = ('created_at', 'ip_address')
    date_hierarchy = 'created_at'
    actions = ['export_as_csv', 'mark_as_unsubscribed', 'mark_as_active']

    def status_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background: rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.4); padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 11px;">🟢 Active Subscriber</span>')
        return format_html('<span style="background: rgba(107, 114, 128, 0.2); color: #94A3B8; border: 1px solid rgba(107, 114, 128, 0.4); padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 11px;">⚪ Unsubscribed</span>')
    status_badge.short_description = 'Status'

    def delete_action(self, obj):
        return format_html(
            '<a href="/admin/communications/newslettersubscriber/{}/delete/" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.35); font-weight: bold; font-size: 11px; text-decoration: none; display: inline-block;">🗑️ Delete</a>',
            obj.id
        )
    delete_action.short_description = 'Action'

    @admin.action(description="📥 Export Selected Subscribers to CSV (Mailing List)")
    def export_as_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="vayux_subscribers.csv"'
        writer = csv.writer(response)
        writer.writerow(['Email', 'Active Status', 'Source Page', 'Subscribed Date', 'IP Address'])
        for s in queryset:
            writer.writerow([s.email, 'Active' if s.is_active else 'Unsubscribed', s.source_page, s.created_at.strftime('%Y-%m-%d %H:%M:%S'), s.ip_address or ''])
        return response

    @admin.action(description="✓ Mark Selected as Active")
    def mark_as_active(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated} subscriber(s) marked as Active.", messages.SUCCESS)

    @admin.action(description="✗ Mark Selected as Unsubscribed / Inactive")
    def mark_as_unsubscribed(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} subscriber(s) marked as Unsubscribed.", messages.SUCCESS)
