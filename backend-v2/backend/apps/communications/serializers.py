import re
from django.utils.html import strip_tags
from rest_framework import serializers
from .models import TransmitSignal, EmergencyIncidentReport, NewsletterSubscriber

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
PHONE_REGEX = re.compile(r'^\+?[0-9\s\-()]{7,25}$')

class TransmitSignalSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmitSignal
        fields = ['name', 'email', 'phone', 'vector', 'tier', 'message']

    def validate_name(self, value):
        val = strip_tags(value.strip())
        if len(val) < 2:
            raise serializers.ValidationError("Please provide your full official name (minimum 2 characters).")
        return val

    def validate_email(self, value):
        val = value.strip().lower()
        if not EMAIL_REGEX.match(val):
            raise serializers.ValidationError("Please provide a valid business or personal email address.")
        return val

    def validate_phone(self, value):
        if not value:
            return ""
        val = value.strip()
        if not PHONE_REGEX.match(val):
            raise serializers.ValidationError("Please enter a valid phone number (e.g. +91 98765 43210).")
        return val

    def validate_message(self, value):
        val = strip_tags(value.strip())
        if len(val) < 10:
            raise serializers.ValidationError("Please provide at least 10 characters describing your operational scope or consultation needs.")
        return val


class EmergencyIncidentReportCreateSerializer(serializers.ModelSerializer):
    incident_details = serializers.CharField(write_only=True, required=True, help_text="Detailed breach parameters")

    class Meta:
        model = EmergencyIncidentReport
        fields = [
            'company_name', 'contact_name', 'emergency_email',
            'emergency_phone', 'breach_type', 'severity',
            'incident_details'
        ]

    def validate_company_name(self, value):
        val = strip_tags(value.strip())
        if len(val) < 2:
            raise serializers.ValidationError("Please specify your company or organization name.")
        return val

    def validate_contact_name(self, value):
        val = strip_tags(value.strip())
        if len(val) < 2:
            raise serializers.ValidationError("Please specify the primary incident commander or contact name.")
        return val

    def validate_emergency_email(self, value):
        val = value.strip().lower()
        if not EMAIL_REGEX.match(val):
            raise serializers.ValidationError("Please provide a valid emergency contact email for immediate response dispatch.")
        return val

    def validate_emergency_phone(self, value):
        val = value.strip()
        if not PHONE_REGEX.match(val):
            raise serializers.ValidationError("Emergency hotline phone number is required (min 8 digits, e.g. +91 8200677905).")
        return val

    def validate_incident_details(self, value):
        val = strip_tags(value.strip())
        if len(val) < 15:
            raise serializers.ValidationError("Please describe the incident parameters in greater detail (minimum 15 characters, e.g. affected systems, ransom notes, IOC indicators).")
        return val

    def create(self, validated_data):
        details = validated_data.pop('incident_details', '')
        instance = EmergencyIncidentReport(**validated_data)
        instance.incident_payload = details
        instance.save()
        return instance


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email', 'source_page']

    def validate_email(self, value):
        val = value.strip().lower()
        if not EMAIL_REGEX.match(val):
            raise serializers.ValidationError("Please enter a valid email address to receive threat intelligence advisories.")
        return val

    def create(self, validated_data):
        email = validated_data.get('email')
        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=email,
            defaults={'source_page': validated_data.get('source_page', 'homepage')}
        )
        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.save()
        return subscriber
