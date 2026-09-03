from django.urls import path
from .views import (
    PageSectionsView, AboutUsView, SolutionListView, SolutionDetailView,
    ArticleListView, ArticleDetailView, CategoryListView,
    ResearchProjectListView, GlossaryListView, GlossaryDetailView
)

app_name = 'content_cms'

urlpatterns = [
    path('sections/', PageSectionsView.as_view(), name='sections-list'),
    path('about/', AboutUsView.as_view(), name='about-us'),
    path('solutions/', SolutionListView.as_view(), name='solution-list'),
    path('solutions/<slug:slug>/', SolutionDetailView.as_view(), name='solution-detail'),
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/<slug:slug>/', ArticleDetailView.as_view(), name='article-detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('projects/', ResearchProjectListView.as_view(), name='project-list'),
    path('glossary/', GlossaryListView.as_view(), name='glossary-list'),
    path('glossary/<slug:slug>/', GlossaryDetailView.as_view(), name='glossary-detail'),
]
