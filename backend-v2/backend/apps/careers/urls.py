from django.urls import path
from .views import JobRoleListView, JobRoleDetailView, JobApplicationCreateView

app_name = 'careers'

urlpatterns = [
    path('roles/', JobRoleListView.as_view(), name='job-roles-list'),
    path('roles/<slug:slug>/', JobRoleDetailView.as_view(), name='job-role-detail'),
    path('apply/', JobApplicationCreateView.as_view(), name='job-apply'),
]
