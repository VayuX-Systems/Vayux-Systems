from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import JobRole, JobApplication
from .serializers import JobRoleSerializer, JobApplicationCreateSerializer
from apps.core.throttling import CareersRateThrottle

class JobRoleListView(generics.ListAPIView):
    """
    Public endpoint listing all active open job roles.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = JobRoleSerializer
    queryset = JobRole.objects.filter(is_active=True)


class JobRoleDetailView(generics.RetrieveAPIView):
    """
    Public endpoint retrieving a single job role by slug.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = JobRoleSerializer
    queryset = JobRole.objects.filter(is_active=True)
    lookup_field = 'slug'


class JobApplicationCreateView(generics.CreateAPIView):
    """
    Public endpoint for submitting job applications with resume uploads.
    Rate-limited to prevent automated spam.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = JobApplicationCreateSerializer
    throttle_classes = [CareersRateThrottle]

    def perform_create(self, serializer):
        # Extract IP and country from request
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
            'message': 'Clearance application transmitted securely. Sentinel Recruitment will review your credentials.'
        }, status=status.HTTP_201_CREATED)
