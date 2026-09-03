from django.urls import path
from .views import SiteConfigurationView, LegalDocumentListView, LegalDocumentDetailView

app_name = 'site_config'

urlpatterns = [
    path('settings/', SiteConfigurationView.as_view(), name='site-settings'),
    path('legal/', LegalDocumentListView.as_view(), name='legal-list'),
    path('legal/<slug:slug>/', LegalDocumentDetailView.as_view(), name='legal-detail'),
]
