from rest_framework import serializers
from .models import SiteConfiguration, LegalDocument

class SiteConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = '__all__'


class LegalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalDocument
        fields = [
            'id',
            'doc_type',
            'title',
            'slug',
            'version',
            'effective_date',
            'last_reviewed_date',
            'summary',
            'content',
            'updated_at',
        ]
