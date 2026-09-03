from django.contrib import admin, messages
from django.utils.html import format_html
from django.utils import timezone
from .models import JobRole, JobApplication

@admin.register(JobRole)
class JobRoleAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'tag', 'location', 'is_active', 'display_order', 'application_count')
    list_filter = ('department', 'is_active', 'location')
    search_fields = ('title', 'description', 'requirements')
    prepopulated_fields = {'slug': ('title',)}

    def application_count(self, obj):
        return obj.applications.count()
    application_count.short_description = 'Applicants'


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('applicant_name', 'email', 'role_badge', 'status_badge', 'social_links', 'resume_download_link', 'created_at', 'delete_action')
    list_filter = ('status', 'role', 'created_at', 'country_code')
    search_fields = ('applicant_name', 'email', 'phone', 'cover_note', 'admin_notes', 'linkedin_portfolio_url', 'github_url')
    readonly_fields = ('created_at', 'updated_at', 'ip_address', 'country_code')
    date_hierarchy = 'created_at'
    actions = ['purge_applications_and_free_storage', 'purge_rejected_and_free_storage', 'mark_as_reviewed', 'mark_as_rejected']

    fieldsets = (
        ('Candidate Credentials', {
            'description': 'Direct submission details, verified profiles, and resume vault.',
            'fields': ('role', 'role_title_fallback', 'applicant_name', 'email', 'phone', 'linkedin_portfolio_url', 'github_url', 'resume_file', 'cover_note')
        }),
        ('Application Status & Internal Review', {
            'description': 'Update recruitment pipeline stage and add confidential reviewer notes.',
            'fields': ('status', 'admin_notes')
        }),
        ('Telemetry & Audit Trail', {
            'fields': ('ip_address', 'country_code', 'created_at', 'updated_at')
        }),
    )

    def role_badge(self, obj):
        return obj.role.title if obj.role else obj.role_title_fallback or 'Open Alignment'
    role_badge.short_description = 'Applied Role'

    def social_links(self, obj):
        links = []
        if obj.linkedin_portfolio_url:
            links.append(f'<a href="{obj.linkedin_portfolio_url}" target="_blank" style="color: #00A8FF; font-weight: bold; margin-right: 8px;">LinkedIn 🔗</a>')
        if obj.github_url:
            links.append(f'<a href="{obj.github_url}" target="_blank" style="color: #10B981; font-weight: bold;">GitHub 🐙</a>')
        return format_html(''.join(links)) if links else "-"
    social_links.short_description = 'Profiles'

    def status_badge(self, obj):
        color_map = {
            'NEW': '#00A8FF',       # Cyan
            'REVIEWED': '#F59E0B',  # Amber
            'INTERVIEW': '#8B5CF6', # Purple
            'OFFER': '#10B981',     # Emerald
            'REJECTED': '#6B7280',  # Gray
        }
        color = color_map.get(obj.status, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 11px;">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'

    def resume_download_link(self, obj):
        if obj.resume_file:
            return format_html('<a href="{}" target="_blank" style="color: #00A8FF; font-weight: bold;">Download CV 📄</a>', obj.resume_file.url)
        return '<span style="color: #64748B; font-size: 11px;">No file</span>'
    resume_download_link.short_description = 'Resume'

    def delete_action(self, obj):
        return format_html(
            '<a href="/admin/careers/jobapplication/{}/delete/" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.35); font-weight: bold; font-size: 11px; text-decoration: none; display: inline-block;">🗑️ Delete</a>',
            obj.id
        )
    delete_action.short_description = 'Delete'

    # ── Custom Bulk Actions for Storage Management ──

    @admin.action(description="🗑️ Delete selected applications AND purge resumes from disk (Free Storage)")
    def purge_applications_and_free_storage(self, request, queryset):
        count = queryset.count()
        for app in queryset:
            if app.resume_file:
                try:
                    app.resume_file.delete(save=False)
                except Exception as e:
                    pass
            app.delete()
        self.message_user(
            request,
            f"Successfully deleted {count} application(s) and purged associated files from disk to free storage.",
            messages.SUCCESS
        )

    @admin.action(description="🧹 Purge all REJECTED applications & resumes in selection")
    def purge_rejected_and_free_storage(self, request, queryset):
        rejected_qs = queryset.filter(status='REJECTED')
        count = rejected_qs.count()
        for app in rejected_qs:
            if app.resume_file:
                try:
                    app.resume_file.delete(save=False)
                except Exception as e:
                    pass
            app.delete()
        self.message_user(
            request,
            f"Purged {count} rejected application(s) and cleared their resume files from disk.",
            messages.SUCCESS
        )

    @admin.action(description="✓ Mark selected as Reviewed")
    def mark_as_reviewed(self, request, queryset):
        updated = queryset.update(status='REVIEWED')
        self.message_user(request, f"{updated} applications marked as Reviewed.", messages.SUCCESS)

    @admin.action(description="✗ Mark selected as Rejected / Archive")
    def mark_as_rejected(self, request, queryset):
        updated = queryset.update(status='REJECTED')
        self.message_user(request, f"{updated} applications marked as Rejected.", messages.SUCCESS)
