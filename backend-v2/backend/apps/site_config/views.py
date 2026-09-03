from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteConfiguration, LegalDocument
from .serializers import SiteConfigurationSerializer, LegalDocumentSerializer

class SiteConfigurationView(APIView):
    """
    Public endpoint returning active global configuration, contact info, and social links.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfiguration.load()
        serializer = SiteConfigurationSerializer(config)
        return Response(serializer.data)


class LegalDocumentListView(generics.ListAPIView):
    """
    Public endpoint listing all active legal documents.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LegalDocumentSerializer
    queryset = LegalDocument.objects.filter(is_active=True)


class LegalDocumentDetailView(generics.RetrieveAPIView):
    """
    Public endpoint retrieving a single legal document by slug (e.g. /legal/terms).
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LegalDocumentSerializer
    queryset = LegalDocument.objects.filter(is_active=True)
    lookup_field = 'slug'
