"""
Master URL Configuration for VayuX Sentinel Backend
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from apps.seo_engine.views import SitemapXMLView, RobotsTxtView, LLMsTxtView

# Custom Admin Site Branding
admin.site.site_header = "VayuX Sentinel Command"
admin.site.site_title = "VayuX Sentinel Admin"
admin.site.index_title = "Sovereign Defense Control Center"

def health_check(request):
    return JsonResponse({
        'status': 'healthy',
        'service': 'VayuX Sentinel Backend',
        'version': '2.0.0-PROD',
        'environment': 'development' if settings.DEBUG else 'production'
    })

urlpatterns = [
    # Health Check Endpoint
    path('health/', health_check, name='health-check'),
    
    # Root Crawl & Machine Feeds
    path('sitemap.xml', SitemapXMLView.as_view(), name='root-sitemap'),
    path('robots.txt', RobotsTxtView.as_view(), name='root-robots'),
    path('llms.txt', LLMsTxtView.as_view(), name='root-llms'),

    # Sentinel Admin Panel
    path('admin/', admin.site.urls),

    # REST APIs (v1)
    path('api/v1/site/', include('apps.site_config.urls', namespace='site_config')),
    path('api/v1/content/', include('apps.content_cms.urls', namespace='content_cms')),
    path('api/v1/careers/', include('apps.careers.urls', namespace='careers')),
    path('api/v1/communications/', include('apps.communications.urls', namespace='communications')),
    path('api/v1/seo/', include('apps.seo_engine.urls', namespace='seo_engine')),
    path('api/v1/geo/', include('apps.geo_engine.urls', namespace='geo_engine')),
]

# Media file serving in local/development mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
