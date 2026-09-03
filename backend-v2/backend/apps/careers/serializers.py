import re
from rest_framework import serializers
from .models import JobRole, JobApplication

from django.utils.html import strip_tags

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
PHONE_REGEX = re.compile(r'^\+?[0-9\s\-()]{7,25}$')

class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields = [
            'id', 'title', 'slug', 'department', 'location',
            'tag', 'icon', 'description', 'responsibilities',
            'requirements', 'subject', 'display_order'
        ]


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=JobRole.objects.all(), required=False, allow_null=True)
    resume_file = serializers.FileField(required=False, allow_null=True)
    linkedin_portfolio_url = serializers.CharField(required=True, allow_blank=False)
    github_url = serializers.CharField(required=True, allow_blank=False)
    role_title_fallback = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    cover_note = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = JobApplication
        fields = [
            'role', 'role_title_fallback', 'applicant_name',
            'email', 'phone', 'resume_file', 'cover_note',
            'linkedin_portfolio_url', 'github_url'
        ]

    def validate_applicant_name(self, value):
        val = strip_tags(value.strip())
        if len(val) < 2:
            raise serializers.ValidationError("Please provide your full legal name (minimum 2 characters).")
        return val

    def validate_cover_note(self, value):
        if not value:
            return ""
        return strip_tags(value.strip())

    def validate_email(self, value):
        val = value.strip().lower()
        if not EMAIL_REGEX.match(val):
            raise serializers.ValidationError("Please enter a valid personal or academic email address.")
        return val

    def validate_phone(self, value):
        if not value:
            return ""
        val = value.strip()
        if not PHONE_REGEX.match(val):
            raise serializers.ValidationError("Please enter a valid phone number (e.g. +91 98765 43210).")
        return val

    def validate_linkedin_portfolio_url(self, value):
        if not value:
            raise serializers.ValidationError("LinkedIn profile URL is mandatory for identity verification.")
        val = value.strip()
        if not val.startswith(('http://', 'https://')):
            val = f"https://{val}"
        if len(val) < 10 or '.' not in val:
            raise serializers.ValidationError("Please enter a valid LinkedIn profile URL (e.g. linkedin.com/in/username).")
        return val

    def validate_github_url(self, value):
        if not value:
            raise serializers.ValidationError("GitHub profile or technical repository URL is mandatory.")
        val = value.strip()
        if not val.startswith(('http://', 'https://')):
            val = f"https://{val}"
        if len(val) < 10 or '.' not in val:
            raise serializers.ValidationError("Please enter a valid GitHub repository or profile URL (e.g. github.com/username).")
        return val

    def validate_resume_file(self, value):
        if not value:
            return None
        # Validate file extension (pdf, doc, docx)
        ext = value.name.split('.')[-1].lower()
        if ext not in ['pdf', 'doc', 'docx']:
            raise serializers.ValidationError("Only PDF and DOC/DOCX resume files are accepted.")
        # Validate file size (max 10MB)
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("Resume file size must not exceed 10MB.")
        return value
