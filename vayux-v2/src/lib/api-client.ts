/**
 * VayuX Sentinel Backend REST API Client
 * Connects Next.js (vayux-v2) with the Django Sentinel Backend (vayux-backend)
 * Features Smart In-Memory & Session Caching (SWR) to eliminate database load.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://vayux-backend.onrender.com';

export interface SiteConfig {
  company_name: string;
  legal_name: string;
  tagline: string;
  support_email: string;
  emergency_dfir_email: string;
  careers_email: string;
  primary_phone: string;
  emergency_phone: string;
  headquarters_city: string;
  headquarters_state: string;
  headquarters_country: string;
  headquarters_address: string;
  linkedin_url: string;
  github_url: string;
  twitter_x_url: string;
  soc_sla_response_time: string;
  dfir_emergency_sla: string;
  operating_hours: string;
  copyright_text: string;
  is_maintenance_mode: boolean;
}

export interface LegalDocument {
  id: number;
  doc_type: string;
  title: string;
  slug: string;
  version: string;
  effective_date: string;
  last_reviewed_date: string;
  summary: string;
  content: string;
  updated_at: string;
}

export interface Solution {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  lead_definition: string;
  full_description: string;
  sla_commitment: string;
  key_metrics: Array<{ label: string; val: string }>;
  methodology_steps: string[];
  capabilities_list: string[];
  rd_feedback_loop: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  category_slug: string;
  author_name: string;
  author_role: string;
  excerpt: string;
  content?: string;
  featured_image: string | null;
  read_time_minutes: number;
  is_featured: boolean;
  published_at: string;
  view_count: number;
}

export interface GlossaryTerm {
  id: number;
  term: string;
  slug: string;
  short_definition: string;
  why_it_matters: string;
  key_processes: string[];
  vayux_approach: string;
  target_search_query: string;
  related_solution_slug?: string;
}

export interface JobRole {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  tag: string;
  icon: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  subject: string;
  display_order: number;
}

export interface TransmitSignalPayload {
  name: string;
  email: string;
  phone?: string;
  vector: string;
  tier: string;
  message: string;
}

export interface EmergencyDFIRPayload {
  company_name: string;
  contact_name: string;
  emergency_email: string;
  emergency_phone: string;
  breach_type: string;
  severity: string;
  incident_details: string;
}

export interface PageMetadataResponse {
  meta: {
    title: string;
    description: string;
    canonical: string;
    og_image: string;
    og_type: string;
    robots: string;
    keywords: string;
  };
  json_ld_schemas: any[];
}

export interface VisitorContextResponse {
  detected_country: string;
  compliance: {
    country_code: string;
    region_name: string;
    framework_name: string;
    badge_label: string;
    banner_headline: string;
    banner_description: string;
    emergency_hotline: string;
  } | null;
  primary_hotline: string;
  primary_email: string;
}

export interface SocNode {
  id: number;
  name: string;
  city: string;
  country_code: string;
  lat: number;
  lng: number;
  node_type: string;
  status: string;
  latency_ms: number;
}

// ── Smart Multi-Tier Cache Layer (Memory + SessionStorage) ──

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();
const DEFAULT_CACHE_TTL_MS = 15 * 1000; // 15 Seconds Cache (Instant responsiveness for CMS admin updates)

function getCachedData<T>(key: string, ttlMs = DEFAULT_CACHE_TTL_MS): T | null {
  const now = Date.now();

  // 1. Check memory cache first
  const mem = memoryCache.get(key);
  if (mem && now - mem.timestamp < ttlMs) {
    return mem.data as T;
  }

  // 2. Check browser sessionStorage if available
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const stored = window.sessionStorage.getItem(`vayux_cache_${key}`);
      if (stored) {
        const parsed: CacheEntry<T> = JSON.parse(stored);
        if (now - parsed.timestamp < ttlMs) {
          memoryCache.set(key, parsed);
          return parsed.data;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  return null;
}

function setCachedData<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
  };

  // Set memory cache
  memoryCache.set(key, entry);

  // Set sessionStorage
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(`vayux_cache_${key}`, JSON.stringify(entry));
    } catch {
      // Ignore quota errors
    }
  }
}

export function clearApiCache(): void {
  memoryCache.clear();
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const keys = Object.keys(window.sessionStorage);
      for (const k of keys) {
        if (k.startsWith('vayux_cache_')) {
          window.sessionStorage.removeItem(k);
        }
      }
    } catch {
      // Ignore
    }
  }
}

// ── Generic Fetch Helper with SWR & Cache ──
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  bypassCache = false
): Promise<T> {
  const isGet = !options.method || options.method.toUpperCase() === 'GET';
  const cacheKey = endpoint;

  // If it's a GET request and not explicitly bypassing cache, check cache first
  if (isGet && !bypassCache) {
    const cached = getCachedData<T>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Sentinel API Error [${res.status}]: ${errorText || res.statusText}`);
  }

  const data = (await res.json()) as T;

  // Cache successful GET responses
  if (isGet) {
    setCachedData(cacheKey, data);
  }

  return data;
}

// ── API Functions ──

export const api = {
  // Cache Management
  clearCache: clearApiCache,

  // Site Configuration & Legal
  getSiteSettings: (forceRefresh = false) =>
    apiFetch<SiteConfig>('/api/v1/site/settings/', {}, forceRefresh),
  getLegalDocuments: (forceRefresh = false) =>
    apiFetch<LegalDocument[]>('/api/v1/site/legal/', {}, forceRefresh),
  getLegalDocumentBySlug: (slug: string, forceRefresh = false) =>
    apiFetch<LegalDocument>(`/api/v1/site/legal/${slug}/`, {}, forceRefresh),

  // Content CMS
  getPageSections: (forceRefresh = false) =>
    apiFetch<Record<string, any>>('/api/v1/content/sections/', {}, forceRefresh),
  getAboutUs: (forceRefresh = false) =>
    apiFetch<any>('/api/v1/content/about/', {}, forceRefresh),
  getSolutions: (forceRefresh = false) =>
    apiFetch<{ results: Solution[] }>('/api/v1/content/solutions/', {}, forceRefresh),
  getSolutionBySlug: (slug: string, forceRefresh = false) =>
    apiFetch<Solution>(`/api/v1/content/solutions/${slug}/`, {}, forceRefresh),
  getCategories: (forceRefresh = false) =>
    apiFetch<{ results: { id: number; name: string; slug: string; description: string }[] }>(
      '/api/v1/content/categories/',
      {},
      forceRefresh
    ),
  getArticles: (category?: string, forceRefresh = false) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category.toLowerCase())}` : '';
    return apiFetch<{ results: Article[] }>(`/api/v1/content/articles/${query}`, {}, forceRefresh);
  },
  getArticleBySlug: (slug: string, forceRefresh = false) =>
    apiFetch<Article>(`/api/v1/content/articles/${slug}/`, {}, forceRefresh),
  getGlossaryTerms: (forceRefresh = false) =>
    apiFetch<{ results: GlossaryTerm[] }>('/api/v1/content/glossary/', {}, forceRefresh),
  getGlossaryTermBySlug: (slug: string, forceRefresh = false) =>
    apiFetch<GlossaryTerm>(`/api/v1/content/glossary/${slug}/`, {}, forceRefresh),

  // Careers
  getJobRoles: (forceRefresh = false) =>
    apiFetch<{ results: JobRole[] }>('/api/v1/careers/roles/', {}, forceRefresh),
  getJobRoleBySlug: (slug: string, forceRefresh = false) =>
    apiFetch<JobRole>(`/api/v1/careers/roles/${slug}/`, {}, forceRefresh),
  submitJobApplication: (formData: FormData) =>
    apiFetch<{ status: string; message: string }>('/api/v1/careers/apply/', {
      method: 'POST',
      body: formData,
    }),

  // Communications & Leads (Mutations are NEVER cached)
  transmitSignal: (data: TransmitSignalPayload) =>
    apiFetch<{ status: string; message: string }>('/api/v1/communications/transmit/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  submitDFIREmergency: (data: EmergencyDFIRPayload) =>
    apiFetch<{ status: string; message: string }>('/api/v1/communications/dfir-emergency/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  subscribeNewsletter: (email: string, source_page = 'homepage') =>
    apiFetch<{ status: string; message: string }>('/api/v1/communications/newsletter/', {
      method: 'POST',
      body: JSON.stringify({ email, source_page }),
    }),

  // SEO & GEO
  getPageMetadata: (path: string, forceRefresh = false) =>
    apiFetch<PageMetadataResponse>(
      `/api/v1/seo/metadata/?path=${encodeURIComponent(path)}`,
      {},
      forceRefresh
    ),
  getVisitorContext: (forceRefresh = false) =>
    apiFetch<VisitorContextResponse>('/api/v1/geo/visitor-context/', {}, forceRefresh),
  getSocNodes: (forceRefresh = false) =>
    apiFetch<{ results: SocNode[] }>('/api/v1/geo/nodes/', {}, forceRefresh),
};
