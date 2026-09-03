import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "img-src 'self' data: blob: https://vayux.systems https://lh3.googleusercontent.com; " +
      "connect-src 'self' http://localhost:8000 https://api.vayux.systems https://vayux.systems; " +
      "frame-ancestors 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self';",
  },
];

const nextConfig: NextConfig = {
  distDir: "dist",
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/whyux",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/why-ux",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/y-ux",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/vaayux",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/vayu-x",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/wayux",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/wayu-x",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/vux",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/vayuks",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/vayuksh",
        destination: "/yux",
        permanent: true,
      },
      {
        source: "/pronunciation",
        destination: "/yux",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
