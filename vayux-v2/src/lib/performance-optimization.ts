// ============================================================================
// Performance Optimization Guide for VayuX v2
// Production-Ready Configuration
// ============================================================================

/**
 * CRITICAL PERFORMANCE OPTIMIZATIONS
 *
 * 1. IMAGE OPTIMIZATION
 * - Use Next.js Image component for all images
 * - Provide multiple sizes for responsive images
 * - Enable automatic WebP conversion
 * - Set explicit width/height to prevent layout shift
 */

export const imageOptimizationConfig = {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
};

/**
 * 2. CODE SPLITTING & LAZY LOADING
 * - Use dynamic imports for heavy components
 * - Lazy load 3D scenes (Three.js)
 * - Defer non-critical animations
 */

export const dynamicComponents = {
  // Import patterns for lazy loading
  AIWorkflow: 'import dynamic from "next/dynamic";\nconst AIWorkflow = dynamic(() => import("@/components/sections/AIWorkflow"), { ssr: true, loading: () => <div className="h-96" /> });',

  DefensePipeline: 'import dynamic from "next/dynamic";\nconst DefensePipeline = dynamic(() => import("@/components/sections/DefensePipeline"), { ssr: true });',

  ThreeScene: 'import dynamic from "next/dynamic";\nconst GlobeScene = dynamic(() => import("@/components/three/GlobeScene"), { ssr: false });',
};

/**
 * 3. BUNDLE ANALYSIS
 * Target: < 200KB main bundle, < 50KB per page route
 *
 * Run: npm run analyze (requires @next/bundle-analyzer)
 */

export const bundleOptimizations = [
  '✅ Tree-shake unused icons from lucide-react',
  '✅ Split Framer Motion into separate chunk',
  '✅ Lazy load GSAP plugins only when needed',
  '✅ Use CSS modules for component styles',
  '✅ Remove console.logs in production',
];

/**
 * 4. CACHING STRATEGY
 *
 * Static pages (regenerate daily):
 * - Home page
 * - About page
 * - Solutions pages
 * - Legal pages
 *
 * ISR (Incremental Static Regeneration):
 * - Insights/blog (revalidate: 3600) - 1 hour
 * - Careers (revalidate: 86400) - 1 day
 *
 * Dynamic:
 * - Contact form submission
 * - Search results
 */

export const revalidateConfig = {
  home: 86400, // 24 hours
  about: 604800, // 7 days
  solutions: 86400, // 24 hours
  insights: 3600, // 1 hour
  careers: 604800, // 7 days
  contact: 0, // Dynamic
};

/**
 * 5. NEXT.JS CONFIG OPTIMIZATIONS
 *
 * export const nextConfig = {
 *   // Production optimizations
 *   reactStrictMode: true,
 *   swcMinify: true,
 *   compress: true,
 *   poweredByHeader: false,
 *
 *   // Image optimization
 *   images: {
 *     formats: ['image/avif', 'image/webp'],
 *     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
 *     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
 *     minimumCacheTTL: 60,
 *   },
 *
 *   // Headers
 *   async headers() {
 *     return [{
 *       source: '/:path*',
 *       headers: [
 *         { key: 'X-Content-Type-Options', value: 'nosniff' },
 *         { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
 *         { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
 *       ],
 *     }];
 *   },
 *
 *   // Redirects
 *   async redirects() {
 *     return [
 *       { source: '/blog', destination: '/insights', permanent: true },
 *       { source: '/services', destination: '/solutions', permanent: true },
 *     ];
 *   },
 * };
 */

/**
 * 6. PERFORMANCE MONITORING
 *
 * Lighthouse Target:
 * - Performance: 90+
 * - Accessibility: 95+
 * - Best Practices: 90+
 * - SEO: 100
 *
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): < 2.5s
 * - FID (First Input Delay): < 100ms
 * - CLS (Cumulative Layout Shift): < 0.1
 */

export const performanceTargets = {
  lighthouse: {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 100,
  },
  coreWebVitals: {
    lcp: '< 2.5s',
    fid: '< 100ms',
    cls: '< 0.1',
  },
  bundles: {
    main: '< 200KB',
    perRoute: '< 50KB',
    images: '< 100KB per image',
  },
};

/**
 * 7. FONT OPTIMIZATION
 *
 * Using system font fallback + preload critical fonts
 */

export const fontOptimization = {
  preload: [
    {
      href: '/fonts/plus-jakarta-sans.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      href: '/fonts/inter.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ],
  display: 'swap', // Prevent FOIT/FOUT
};

/**
 * 8. SCRIPT OPTIMIZATION
 *
 * - Use next/script with strategy prop
 * - Defer non-critical scripts
 * - Load analytics after page interactive
 */

export const scriptStrategy = {
  analytics: 'afterInteractive',
  thirdParty: 'lazyOnload',
  hotjar: 'lazyOnload',
  gtag: 'afterInteractive',
};

/**
 * 9. CSS OPTIMIZATION
 *
 * - Tailwind CSS purges unused styles
 * - Critical CSS inlined
 * - Remove unused custom properties
 */

export const cssOptimization = [
  '✅ Tailwind CSS with content purging',
  '✅ CSS custom properties only for design tokens',
  '✅ Remove unused Tailwind variants',
  '✅ Enable CSS minification (default in Next.js)',
];

/**
 * 10. DEPLOYMENT CHECKLIST
 *
 * Before production release:
 */

export const deploymentChecklist = [
  '✅ Run Lighthouse audit - target 90+ all metrics',
  '✅ Test Core Web Vitals on real device',
  '✅ Verify all images are optimized (WebP, < 100KB)',
  '✅ Check bundle analysis - < 200KB main',
  '✅ Test 3G slow network performance',
  '✅ Verify 404 and error pages',
  '✅ Test all forms (contact, newsletter)',
  '✅ Check security headers in DevTools',
  '✅ Verify robots.txt and sitemap.xml',
  '✅ Test SEO metadata on all pages',
  '✅ Verify HTTPS and security',
  '✅ Test mobile responsiveness',
  '✅ Verify analytics tracking',
  '✅ Check dark/light mode switching',
  '✅ Verify all CTAs link correctly',
  '✅ Test search functionality',
];

/**
 * 11. MONITORING & ANALYTICS
 *
 * Recommended tools:
 * - Google Analytics 4
 * - Sentry for error tracking
 * - Vercel Analytics (built-in)
 * - Lighthouse CI for automated testing
 */

export const monitoringSetup = {
  googleAnalytics: {
    trackingId: 'G-XXXXXXXXXX', // Set in .env
    trackPageView: true,
    trackEvents: ['form_submit', 'contact_click', 'demo_request'],
  },
  sentry: {
    dsn: 'https://xxx@xxx.ingest.sentry.io/xxx',
    environment: 'production',
    tracesSampleRate: 0.1,
  },
  vercelAnalytics: {
    enabled: true,
    debug: false,
  },
};

export default {
  imageOptimizationConfig,
  dynamicComponents,
  bundleOptimizations,
  revalidateConfig,
  performanceTargets,
  fontOptimization,
  scriptStrategy,
  cssOptimization,
  deploymentChecklist,
  monitoringSetup,
};
