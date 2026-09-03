from django.urls import path
from .views import (
    PageMetadataView, FAQListView, SitemapXMLView,
    RobotsTxtView, LLMsTxtView
)

app_name = 'seo_engine'

urlpatterns = [
    path('metadata/', PageMetadataView.as_view(), name='page-metadata'),
    path('faqs/', FAQListView.as_view(), name='faq-list'),
    path('sitemap.xml', SitemapXMLView.as_view(), name='sitemap-xml'),
    path('robots.txt', RobotsTxtView.as_view(), name='robots-txt'),
    path('llms.txt', LLMsTxtView.as_view(), name='llms-txt'),
]
