from rest_framework import serializers
from .models import SocNode, RegionalComplianceRule

class SocNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocNode
        fields = '__all__'


class RegionalComplianceRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionalComplianceRule
        fields = '__all__'
