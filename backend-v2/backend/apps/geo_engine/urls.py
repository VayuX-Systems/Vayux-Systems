from django.urls import path
from .views import VisitorContextView, SocNodeListView

app_name = 'geo_engine'

urlpatterns = [
    path('visitor-context/', VisitorContextView.as_view(), name='visitor-context'),
    path('nodes/', SocNodeListView.as_view(), name='soc-nodes'),
]
