"""
JSON-LD Schema Builder for VayuX Systems — Enterprise SEO & Generative Engine Optimization
"""
from apps.site_config.models import SiteConfiguration
from apps.content_cms.models import Solution, TeamMember, CompanyCredential
from .models import FAQItem

def build_organization_schema():
    config = SiteConfiguration.load()
    founder = TeamMember.objects.filter(is_founder=True).first()
    credentials = CompanyCredential.objects.filter(is_active=True)
    
    cred_list = [
        {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": cred.name
        }
        for cred in credentials
    ]
    
    schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://vayux.systems/#organization",
        "name": config.company_name,
        "legalName": config.legal_name,
        "url": "https://vayux.systems",
        "logo": {
            "@type": "ImageObject",
            "url": "https://vayux.systems/logo-light.png",
            "width": 512,
            "height": 512
        },
        "description": "VayuX Systems is an innovation-driven cybersecurity R&D firm headquartered in Vadodara, India, providing managed SOC operations, VAPT, DFIR incident response, and GRC compliance services with an operational feedback loop.",
        "foundingDate": "2024",
        "foundingLocation": {
            "@type": "Place",
            "name": f"{config.headquarters_city}, {config.headquarters_state}, {config.headquarters_country}"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": config.headquarters_city,
            "addressRegion": config.headquarters_state,
            "addressCountry": "IN"
        },
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "contactType": "Sales & General Operations",
                "email": config.support_email,
                "telephone": config.primary_phone,
                "availableLanguage": ["English", "Hindi"]
            },
            {
                "@type": "ContactPoint",
                "contactType": "Emergency Incident Response (DFIR)",
                "email": config.emergency_dfir_email,
                "telephone": config.emergency_phone,
                "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                },
                "availableLanguage": ["English"]
            }
        ],
        "sameAs": [link for link in [config.linkedin_url, config.github_url, config.twitter_x_url] if link],
        "knowsAbout": [
            "Cybersecurity R&D",
            "Security Operations Center (SOC)",
            "Vulnerability Assessment and Penetration Testing (VAPT)",
            "Digital Forensics and Incident Response (DFIR)",
            "Governance Risk and Compliance (GRC)",
            "DPDP Act 2023 Compliance",
            "CERT-In Directive Compliance",
            "Zero Trust Architecture",
            "MITRE ATT&CK Framework",
            "Post-Quantum Cryptography",
            "Autonomous Threat Detection"
        ],
        "hasCredential": cred_list
    }
    
    if founder:
        schema["founder"] = {
            "@type": "Person",
            "name": founder.name,
            "jobTitle": founder.role_designation
        }
        
    return schema


def build_website_schema():
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://vayux.systems/#website",
        "name": "VayuX Systems",
        "url": "https://vayux.systems",
        "publisher": {
            "@id": "https://vayux.systems/#organization"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://vayux.systems/glossary?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }


def build_service_schema(solution_slug: str):
    solution = Solution.objects.filter(slug=solution_slug, is_active=True).first()
    if not solution:
        return None
    
    config = SiteConfiguration.load()
    
    offers = []
    if isinstance(solution.capabilities_list, list):
        for cap in solution.capabilities_list:
            offers.append({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": cap if isinstance(cap, str) else cap.get('title', str(cap)),
                    "description": cap.get('desc', '') if isinstance(cap, dict) else ''
                }
            })
            
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": f"https://vayux.systems/solutions/{solution.slug}/#service",
        "name": solution.name,
        "serviceType": f"Cybersecurity {solution.name}",
        "description": solution.lead_definition or solution.full_description[:250],
        "provider": {
            "@id": "https://vayux.systems/#organization"
        },
        "areaServed": [
            {"@type": "Country", "name": "India"},
            {"@type": "Country", "name": "United States"},
            {"@type": "Country", "name": "Global"}
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": f"{solution.name} Capabilities",
            "itemListElement": offers
        },
        "termsOfService": "https://vayux.systems/legal/terms",
        "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://vayux.systems/contact",
            "servicePhone": config.emergency_phone if solution_slug == 'dfir' else config.primary_phone
        }
    }


def build_faq_schema(category: str):
    faqs = FAQItem.objects.filter(category=category, is_active=True)
    if not faqs.exists():
        return None
        
    main_entities = [
        {
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }
        for faq in faqs
    ]
    
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": main_entities
    }
