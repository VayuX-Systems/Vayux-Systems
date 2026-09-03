from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import TransmitSignal, EmergencyIncidentReport, NewsletterSubscriber
from .serializers import (
    TransmitSignalSerializer, EmergencyIncidentReportCreateSerializer,
    NewsletterSubscriberSerializer
)
from apps.core.throttling import ContactRateThrottle, EmergencyRateThrottle, NewsletterRateThrottle

class TransmitSignalCreateView(generics.CreateAPIView):
    """
    Public endpoint for contact submissions ('Transmit Signal').
    Rate-limited to prevent automated spam.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = TransmitSignalSerializer
    throttle_classes = [ContactRateThrottle]

    def perform_create(self, serializer):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        country = getattr(self.request, 'country_code', '--')
        serializer.save(ip_address=ip, country_code=country)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'status': 'success',
            'message': 'Signal Transmitted Securely. The Sentinel Command will review parameters within 2 operational hours.'
        }, status=status.HTTP_201_CREATED)


class EmergencyIncidentCreateView(generics.CreateAPIView):
    """
    Public endpoint for DFIR Emergency Breach hotline dispatch.
    Sub-4-hour SLA response clock is initialized upon submission.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = EmergencyIncidentReportCreateSerializer
    throttle_classes = [EmergencyRateThrottle]

    def perform_create(self, serializer):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        country = getattr(self.request, 'country_code', '--')
        serializer.save(ip_address=ip, country_code=country)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'status': 'emergency_dispatch_triggered',
            'message': 'EMERGENCY PROTOCOL ACTIVATED: DFIR on-call commanders have been notified. Standby on provided telephone/email link.'
        }, status=status.HTTP_201_CREATED)


class NewsletterSubscribeView(generics.CreateAPIView):
    """
    Public endpoint for subscribing to threat intelligence advisories.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = NewsletterSubscriberSerializer
    throttle_classes = [NewsletterRateThrottle]

    def perform_create(self, serializer):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        serializer.save(ip_address=ip)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'status': 'success',
            'message': 'Encrypted subscription confirmed. You are now linked to VayuX Threat Intelligence advisories.'
        }, status=status.HTTP_201_CREATED)
