from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SocNode, RegionalComplianceRule
from .serializers import SocNodeSerializer, RegionalComplianceRuleSerializer
from apps.site_config.models import SiteConfiguration

class VisitorContextView(APIView):
    """
    Returns detected visitor country, applicable compliance guidelines (e.g. DPDP Act, GDPR),
    and local emergency hotline.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        country_code = getattr(request, 'country_code', 'IN')
        rule = RegionalComplianceRule.objects.filter(country_code=country_code, is_active=True).first()
        
        # Fallback to India or Global default rule
        if not rule:
            rule = RegionalComplianceRule.objects.filter(country_code='IN', is_active=True).first()
            
        config = SiteConfiguration.load()
        
        return Response({
            'detected_country': country_code,
            'compliance': RegionalComplianceRuleSerializer(rule).data if rule else None,
            'primary_hotline': config.emergency_phone,
            'primary_email': config.emergency_dfir_email,
        })


class SocNodeListView(generics.ListAPIView):
    """
    Returns all active global SOC nodes for the Next.js 3D Globe.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = SocNodeSerializer
    queryset = SocNode.objects.filter(is_active=True)
