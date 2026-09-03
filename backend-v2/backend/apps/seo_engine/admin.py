from django.contrib import admin
from .models import PageSEO, FAQItem

@admin.register(PageSEO)
class PageSEOAdmin(admin.ModelAdmin):
    list_display = ('route_path', 'meta_title', 'canonical_url', 'og_type', 'is_active', 'updated_at')
    list_filter = ('is_active', 'og_type')
    search_fields = ('route_path', 'meta_title', 'meta_description', 'keywords')


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'display_order', 'is_active', 'updated_at')
    list_filter = ('category', 'is_active')
    search_fields = ('question', 'answer')
