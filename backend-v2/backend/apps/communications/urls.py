from django.urls import path
from .views import TransmitSignalCreateView, EmergencyIncidentCreateView, NewsletterSubscribeView

app_name = 'communications'

urlpatterns = [
    path('transmit/', TransmitSignalCreateView.as_view(), name='transmit-signal'),
    path('dfir-emergency/', EmergencyIncidentCreateView.as_view(), name='dfir-emergency'),
    path('newsletter/', NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
]
