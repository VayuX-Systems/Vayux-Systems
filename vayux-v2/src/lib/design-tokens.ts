// Aetheric Sentinel Design System — Design Tokens
// "Angel Protector" aesthetic: luminous, airy, ultra-luxurious

export const colors = {
  // Core Surfaces
  surface: '#f9f9ff',
  'surface-dim': '#cfdaf2',
  'surface-bright': '#f9f9ff',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#f0f3ff',
  'surface-container': '#e7eeff',
  'surface-container-high': '#dee8ff',
  'surface-container-highest': '#d8e3fb',

  // On-surface
  'on-surface': '#111c2d',
  'on-surface-variant': '#3e4852',
  'inverse-surface': '#263143',
  'inverse-on-surface': '#ecf1ff',

  // Outline
  outline: '#6f7883',
  'outline-variant': '#bec7d3',

  // Surface tint
  'surface-tint': '#006399',

  // Primary — Radiant Cyan / Celestial Blue
  primary: '#006399',
  'on-primary': '#ffffff',
  'primary-container': '#00a8ff',
  'on-primary-container': '#003a5c',
  'inverse-primary': '#95ccff',

  // Secondary
  secondary: '#00668a',
  'on-secondary': '#ffffff',
  'secondary-container': '#40c2fd',
  'on-secondary-container': '#004d6a',

  // Tertiary
  tertiary: '#595f66',
  'on-tertiary': '#ffffff',
  'tertiary-container': '#9ba1a8',
  'on-tertiary-container': '#31383e',

  // Error
  error: '#ba1a1a',
  'on-error': '#ffffff',
  'error-container': '#ffdad6',
  'on-error-container': '#93000a',

  // Fixed variants
  'primary-fixed': '#cde5ff',
  'primary-fixed-dim': '#95ccff',
  'on-primary-fixed': '#001d32',
  'on-primary-fixed-variant': '#004a75',
  'secondary-fixed': '#c4e7ff',
  'secondary-fixed-dim': '#7bd0ff',
  'on-secondary-fixed': '#001e2c',
  'on-secondary-fixed-variant': '#004c69',
  'tertiary-fixed': '#dde3eb',
  'tertiary-fixed-dim': '#c1c7cf',
  'on-tertiary-fixed': '#161c22',
  'on-tertiary-fixed-variant': '#41474e',

  // Background
  background: '#f9f9ff',
  'on-background': '#111c2d',
  'surface-variant': '#d8e3fb',
} as const;

export const typography = {
  'display-lg': {
    fontFamily: 'var(--font-plus-jakarta)',
    fontSize: '72px',
    fontWeight: '700',
    lineHeight: '80px',
    letterSpacing: '-0.02em',
  },
  'headline-lg': {
    fontFamily: 'var(--font-plus-jakarta)',
    fontSize: '48px',
    fontWeight: '600',
    lineHeight: '56px',
    letterSpacing: '-0.01em',
  },
  'headline-lg-mobile': {
    fontFamily: 'var(--font-plus-jakarta)',
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '40px',
    letterSpacing: '-0.01em',
  },
  'headline-md': {
    fontFamily: 'var(--font-plus-jakarta)',
    fontSize: '32px',
    fontWeight: '500',
    lineHeight: '40px',
    letterSpacing: '0.01em',
  },
  'body-lg': {
    fontFamily: 'var(--font-inter)',
    fontSize: '18px',
    fontWeight: '300',
    lineHeight: '28px',
    letterSpacing: '0.01em',
  },
  'body-md': {
    fontFamily: 'var(--font-inter)',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    letterSpacing: '0px',
  },
  'label-md': {
    fontFamily: 'var(--font-inter)',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px',
    letterSpacing: '0.05em',
  },
} as const;

export const spacing = {
  'container-max': '1440px',
  gutter: '32px',
  'margin-desktop': '80px',
  'margin-mobile': '20px',
  'section-gap': '160px',
} as const;

export const borderRadius = {
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

// Three.js material colors (hex values for use in shaders/materials)
export const threeColors = {
  metalSilver: 0xc0c0c0,
  cyanGlow: 0x00a8ff,
  deepBlue: 0x006399,
  darkCharcoal: 0x111c2d,
  alabaster: 0xf9f9ff,
  platinum: 0xbec7d3,
  softCyan: 0x40c2fd,
} as const;
