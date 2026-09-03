from rest_framework import serializers
from .models import (
    PageSectionContent, AboutUs, TeamMember, CompanyCredential,
    Solution, Category, Article, ResearchProject, GlossaryTerm
)

class PageSectionContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageSectionContent
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class CompanyCredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyCredential
        fields = '__all__'


class AboutUsSerializer(serializers.ModelSerializer):
    team_members = serializers.SerializerMethodField()
    credentials = serializers.SerializerMethodField()

    class Meta:
        model = AboutUs
        fields = '__all__'

    def get_team_members(self, obj):
        members = TeamMember.objects.filter(is_active=True)
        return TeamMemberSerializer(members, many=True).data

    def get_credentials(self, obj):
        creds = CompanyCredential.objects.filter(is_active=True)
        return CompanyCredentialSerializer(creds, many=True).data


class SolutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ['id', 'name', 'slug', 'tagline', 'lead_definition', 'sla_commitment', 'key_metrics']


class SolutionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ArticleListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'category_name', 'category_slug',
            'author_name', 'author_role', 'excerpt', 'featured_image',
            'read_time_minutes', 'is_featured', 'published_at', 'view_count'
        ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'


class ResearchProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchProject
        fields = '__all__'


class GlossaryTermSerializer(serializers.ModelSerializer):
    related_solution_slug = serializers.CharField(source='related_solution.slug', read_only=True)

    class Meta:
        model = GlossaryTerm
        fields = '__all__'
