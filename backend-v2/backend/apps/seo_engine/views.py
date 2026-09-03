from django.http import HttpResponse
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PageSEO, FAQItem
from .serializers import PageSEOSerializer, FAQItemSerializer
from .schema_builder import (
    build_organization_schema, build_website_schema,
    build_service_schema, build_faq_schema
)
from apps.content_cms.models import Solution, Article, GlossaryTerm
from apps.site_config.models import LegalDocument

class PageMetadataView(APIView):
    """
    Returns SEO metadata, OpenGraph tags, and combined JSON-LD Schema for any route.
    Used directly by Next.js SSR / generateMetadata().
    e.g. GET /api/v1/seo/metadata/?path=/solutions/dfir
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        path = request.query_params.get('path', '/')
        seo = PageSEO.objects.filter(route_path=path, is_active=True).first()

        # Fallback defaults if specific route not configured yet
        if not seo:
            meta = {
                'title': 'VayuX Systems | Sovereign Cybersecurity R&D & Managed Defense',
                'description': 'VayuX Systems is an innovation-driven cybersecurity R&D firm providing 24/7 Managed SOC, VAPT, DFIR Incident Response, and GRC compliance services with an operational telemetry feedback loop.',
                'canonical': f'https://vayux.systems{path}',
                'og_image': 'https://vayux.systems/logo-light.png',
                'og_type': 'website',
                'robots': 'index, follow, max-snippet:-1, max-image-preview:large',
                'keywords': 'cybersecurity R&D, managed SOC, DFIR, VAPT, DPDP Act 2023, India'
            }
        else:
            meta = {
                'title': seo.meta_title,
                'description': seo.meta_description,
                'canonical': seo.canonical_url or f'https://vayux.systems{path}',
                'og_image': seo.og_image_url,
                'og_type': seo.og_type,
                'robots': seo.robots_directive,
                'keywords': seo.keywords
            }

        # Build combined JSON-LD Schemas based on route
        schemas = [build_organization_schema(), build_website_schema()]
        
        # Check if route is a service route (e.g. /solutions/dfir)
        for slug in ['soc', 'vapt', 'dfir', 'grc']:
            if slug in path.lower():
                service_schema = build_service_schema(slug)
                if service_schema:
                    schemas.append(service_schema)
                faq_schema = build_faq_schema(slug)
                if faq_schema:
                    schemas.append(faq_schema)
                break
        
        # Check homepage FAQs
        if path == '/':
            home_faq = build_faq_schema('homepage')
            if home_faq:
                schemas.append(home_faq)

        return Response({
            'meta': meta,
            'json_ld_schemas': [s for s in schemas if s is not None]
        })


class FAQListView(generics.ListAPIView):
    """
    Returns FAQs by category (e.g. ?category=homepage or ?category=dfir).
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = FAQItemSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category:
            return FAQItem.objects.filter(category=category, is_active=True)
        return FAQItem.objects.filter(is_active=True)


class SitemapXMLView(APIView):
    """
    Serves dynamic XML sitemap aggregating static routes, solutions, articles, and glossary.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        base_url = 'https://vayux.systems'
        
        # Core Static Routes
        urls = [
            {'loc': f"{base_url}/", 'priority': '1.0', 'changefreq': 'weekly'},
            {'loc': f"{base_url}/about", 'priority': '0.9', 'changefreq': 'monthly'},
            {'loc': f"{base_url}/solutions", 'priority': '0.95', 'changefreq': 'weekly'},
            {'loc': f"{base_url}/insights", 'priority': '0.85', 'changefreq': 'daily'},
            {'loc': f"{base_url}/careers", 'priority': '0.7', 'changefreq': 'weekly'},
            {'loc': f"{base_url}/contact", 'priority': '0.9', 'changefreq': 'monthly'},
            {'loc': f"{base_url}/glossary", 'priority': '0.8', 'changefreq': 'weekly'},
        ]
        
        # Solutions
        for sol in Solution.objects.filter(is_active=True):
            urls.append({'loc': f"{base_url}/solutions/{sol.slug}", 'priority': '0.9', 'changefreq': 'weekly'})
            
        # Insights / Articles
        for art in Article.objects.filter(is_published=True):
            urls.append({'loc': f"{base_url}/insights/{art.slug}", 'priority': '0.8', 'changefreq': 'monthly'})
            
        # Glossary Terms
        for term in GlossaryTerm.objects.filter(is_active=True):
            urls.append({'loc': f"{base_url}/glossary/{term.slug}", 'priority': '0.75', 'changefreq': 'monthly'})
            
        # Legal Docs
        for leg in LegalDocument.objects.filter(is_active=True):
            urls.append({'loc': f"{base_url}/legal/{leg.slug}", 'priority': '0.5', 'changefreq': 'monthly'})

        xml_lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        ]
        for item in urls:
            xml_lines.append('  <url>')
            xml_lines.append(f"    <loc>{item['loc']}</loc>")
            xml_lines.append(f"    <changefreq>{item['changefreq']}</changefreq>")
            xml_lines.append(f"    <priority>{item['priority']}</priority>")
            xml_lines.append('  </url>')
        xml_lines.append('</urlset>')

        return HttpResponse('\n'.join(xml_lines), content_type='application/xml')


class RobotsTxtView(APIView):
    """
    Serves dynamic robots.txt explicitly allowing high-value AI / GEO crawlers
    and blocking low-value scrapers.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        content = (
            "# ==================================================\n"
            "# VayuX Systems — robots.txt\n"
            "# Sovereign Cybersecurity R&D Nexus\n"
            "# ==================================================\n\n"
            "# Default: Allow general indexing, block sensitive paths\n"
            "User-agent: *\n"
            "Allow: /\n"
            "Disallow: /admin/\n"
            "Disallow: /api/v1/communications/transmit/\n"
            "Disallow: /api/v1/communications/dfir-emergency/\n\n"
            "# Premium AI / GEO Crawlers (Generative Engine Optimization)\n"
            "User-agent: GPTBot\n"
            "Allow: /\n\n"
            "User-agent: ChatGPT-User\n"
            "Allow: /\n\n"
            "User-agent: PerplexityBot\n"
            "Allow: /\n\n"
            "User-agent: anthropic-ai\n"
            "Allow: /\n\n"
            "User-agent: ClaudeBot\n"
            "Allow: /\n\n"
            "User-agent: Google-Extended\n"
            "Allow: /\n\n"
            "User-agent: Applebot\n"
            "Allow: /\n\n"
            "User-agent: CCBot\n"
            "Allow: /\n\n"
            "# Blocked Aggressive Scrapers\n"
            "User-agent: AhrefsBot\n"
            "Disallow: /\n\n"
            "User-agent: SemrushBot\n"
            "Disallow: /\n\n"
            "User-agent: MJ12bot\n"
            "Disallow: /\n\n"
            "User-agent: PetalBot\n"
            "Disallow: /\n\n"
            "Sitemap: https://vayux.systems/sitemap.xml\n"
        )
        return HttpResponse(content, content_type='text/plain')


class LLMsTxtView(APIView):
    """
    Serves /llms.txt for AI crawlers per the llmstxt.org specification.
    Provides clear, factual summary of VayuX research & services.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        content = (
            "# VayuX Systems\n"
            "> Cybersecurity R&D firm providing managed SOC, VAPT, DFIR, and GRC services.\n\n"
            "## About\n"
            "VayuX Systems is an innovation-driven cybersecurity R&D firm headquartered in Vadodara, "
            "Gujarat, India. Founded in 2024, VayuX operates a proprietary operational feedback loop "
            "that channels real-world threat telemetry from active client engagements into autonomous "
            "security architecture research.\n\n"
            "## Core Defense Pillars\n"
            "- Security Operations Center (SOC): 24/7 managed detection and response with sub-15ms event correlation.\n"
            "- VAPT: Vulnerability Assessment & Penetration Testing covering OWASP Top 10, cloud assets, and supply chain risks.\n"
            "- DFIR: Digital Forensics & Incident Response with guaranteed sub-4-hour emergency deployment SLA.\n"
            "- GRC: Governance, Risk & Compliance consulting for DPDP Act 2023, CERT-In, ISO 27001, and SOC 2 Type II.\n\n"
            "## Key Personnel & Leadership\n"
            "- Pragnesh Kumar S. Singh: Founder & Chief Technology Officer\n\n"
            "## Official Links\n"
            "- Website: https://vayux.systems\n"
            "- Solutions: https://vayux.systems/solutions\n"
            "- Insights & Whitepapers: https://vayux.systems/insights\n"
            "- Glossary: https://vayux.systems/glossary\n"
            "- Emergency DFIR Hotline: +91-8200677905 (dfir@vayux.systems)\n"
        )
        return HttpResponse(content, content_type='text/plain')
