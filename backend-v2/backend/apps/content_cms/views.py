from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import F
from .models import (
    PageSectionContent, AboutUs, TeamMember, CompanyCredential,
    Solution, Category, Article, ResearchProject, GlossaryTerm
)
from .serializers import (
    PageSectionContentSerializer, AboutUsSerializer, TeamMemberSerializer,
    CompanyCredentialSerializer, SolutionListSerializer, SolutionDetailSerializer,
    CategorySerializer, ArticleListSerializer, ArticleDetailSerializer,
    ResearchProjectSerializer, GlossaryTermSerializer
)

class PageSectionsView(APIView):
    """
    Returns all configured headings, hero sections, and badge text keyed by section_key.
    e.g. GET /api/v1/content/sections/
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        sections = PageSectionContent.objects.all()
        data = {sec.section_key: PageSectionContentSerializer(sec).data for sec in sections}
        return Response(data)


class AboutUsView(APIView):
    """
    Returns About Us content, core principles, leadership bio, and trust credentials.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        about = AboutUs.load()
        serializer = AboutUsSerializer(about)
        return Response(serializer.data)


class SolutionListView(generics.ListAPIView):
    """
    Returns all defense pillars (SOC, VAPT, DFIR, GRC).
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = SolutionListSerializer
    queryset = Solution.objects.filter(is_active=True)


class SolutionDetailView(generics.RetrieveAPIView):
    """
    Returns full technical specs, SLAs, and R&D feedback loop for a solution by slug.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = SolutionDetailSerializer
    queryset = Solution.objects.filter(is_active=True)
    lookup_field = 'slug'


class ArticleListView(generics.ListAPIView):
    """
    Returns published research articles, whitepapers with category filtering.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        qs = Article.objects.filter(is_published=True)
        category_slug = self.request.query_params.get('category')
        if category_slug and category_slug != 'all':
            qs = qs.filter(category__slug=category_slug)
        return qs


class ArticleDetailView(generics.RetrieveAPIView):
    """
    Returns full article content and increments view count.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticleDetailSerializer
    queryset = Article.objects.filter(is_published=True)
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        Article.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CategoryListView(generics.ListAPIView):
    """
    Returns all research categories.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ResearchProjectListView(generics.ListAPIView):
    """
    Returns active R&D lab tools and initiatives.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = ResearchProjectSerializer
    queryset = ResearchProject.objects.filter(is_active=True)


class GlossaryListView(generics.ListAPIView):
    """
    Returns all cybersecurity glossary terms for GEO indexing.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = GlossaryTermSerializer
    queryset = GlossaryTerm.objects.filter(is_active=True)


class GlossaryDetailView(generics.RetrieveAPIView):
    """
    Returns a single glossary term by slug.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = GlossaryTermSerializer
    queryset = GlossaryTerm.objects.filter(is_active=True)
    lookup_field = 'slug'
