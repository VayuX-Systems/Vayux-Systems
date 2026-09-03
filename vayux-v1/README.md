# VayuX Systems — Continuous Cybersecurity Platform

<div align="center">

![VayuX Logo](/public/logo.png)

**Engineering-Grade Autonomous Cyber Defense & Adaptive Posture Management**

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Compliance](https://img.shields.io/badge/Compliance-DPDP_Act_2023_%7C_CERT--In_%7C_SOC2-0e7c7b.svg?style=flat-square)](#compliance--regulatory-alignment)

</div>

---

## Overview

**VayuX Systems** is a modern, high-performance cybersecurity frontend application designed for high-stakes enterprise defense. Built with modern engineering principles, the platform integrates continuous telemetry ingestion, automated incident containment, adversarial simulations, and adaptive governance to deliver a security posture that learns faster than attackers.

---

## Key Feature Modules

### 1. The VayuX Loop Engine (`/loop`)
An interactive, physics-inspired continuous cyber defense feedback loop visualizer:
- **Orbital 6-Stage Loop**: Smooth continuous rotation featuring 6 dedicated operational nodes (`Training`, `GRC`, `Threat`, `DFIR`, `R&D Lab`, and `SOC`) orbiting a central VAYUX engine hub.
- **Hover Definitions & Deep Navigation**: Hovering over any node dynamically highlights the stage and reveals an instant definition popover with direct single-click navigation to the dedicated service.
- **Interactive Telemetry Console**: Real-time inspection buffer rendering raw security payloads, dynamic triage outputs, and automated containment actions for each stage.
- **5/6-Stage Chronological Timeline**: Deep-dive stepped architectural comparison contrasting legacy reactive security with autonomous defense loops.

### 2. Managed SOC (`/managed-soc`)
- Real-time SLA monitoring with `< 15 Min` active triage and endpoint containment.
- 4-Step Engineering Pipeline: *Baseline Architecture*, *Rule Ingestion*, *Autonomous Containment*, and *Forensic Post-Mortem*.
- Live telemetry simulator with IoC signature matching metrics and threat severity tracking.

### 3. Comprehensive Security Service Suites
- **VAPT (`/vapt`)**: Adversarial simulation, black-box web/API testing, cloud infrastructure audits, and zero-day vulnerability discovery.
- **DFIR (`/dfir`)**: Rapid-response forensic imaging, volatile memory analysis, C2 beacon severance, and sandbox malware detonation.
- **GRC Compliance (`/grc`)**: Automated policy mapping for DPDP Act 2023, ISO 27001, SOC2 Type II, and CERT-In 6-hour incident disclosure alignment.
- **Security Training (`/training`)**: Role-based developer secure-coding modules, executive threat briefings, and simulated spear-phishing campaigns.
- **vCISO Consulting (`/consultation`)**: On-demand executive leadership, board-level risk transparency, and vendor security risk auditing.

### 4. Interactive Modals & Intake Systems
- **Incident Response Intake (`IncidentModal`)**: Urgent Sev-1/Sev-2 incident reporting modal with triage questionnaires, affected asset selectors, and direct containment dispatcher.
- **Consultation & Quote Dispatcher (`ContactModal`)**: Pre-filled service routing for enterprise consultation, quote estimation, and technical scoping.
- **Research Article Reader (`ArticleReaderModal`)**: Full-screen markdown-style threat advisory reader with key indicators of compromise (IoCs), attack paths, and remediation steps.
- **Careers Application Center (`JobApplicationModal`)**: Interactive recruitment portal with resume intake and portfolio validation.

### 5. Research, Insights & Company
- **Threat Research Hub (`/insights`)**: Filterable security advisories, vulnerability disclosures, and technical deep-dives with client-side localStorage article bookmarking.
- **Company & Leadership (`/company`)**: Technical manifesto, certifications roster, leadership bios, and open engineering positions.

---

## Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React 19** | Modern functional components, hooks, dynamic code splitting with `React.lazy` |
| **Language** | **TypeScript 5.8** | Full strict-mode type safety across data contracts, UI props, and state |
| **Styling** | **Tailwind CSS 4** | Ultra-performant CSS token engine, custom cyber dark-mode palette, and CSS keyframe animations |
| **Build Tool** | **Vite 6** | Instant Hot Module Replacement (HMR) and optimized rollup production bundling |
| **Icons** | **Lucide React** | Clean, accessible, lightweight vector iconography |
| **State & Navigation** | **Custom Hash/State Router** | Zero-latency navigation with synchronized browser history and URL hash support |

---

## Design System & Aesthetics

- **Color Palette**:
  - Background Primary: `#07151e` (Deep Midnight Cyber Slate)
  - Background Secondary: `#0c1a25` (Card Surface)
  - Background Tertiary: `#132431` (Elevated Panels)
  - Primary Brand Accent: `#0e7c7b` / `#7cd5d3` (Cyan/Teal Engine Glow)
  - Alert Brand Accent: `#ffb4ab` (Crimson Warning) / `#71dba2` (Emerald Verification)
- **Glassmorphism & Lighting**: Multi-layered backdrop blurs (`backdrop-blur-xl`), glowing radial masks, and smooth orbital rotational physics.
- **Accessibility & Contrast**: Built-in `focus-visible` ring indicators, semantic ARIA roles, and responsive layouts tailored for mobile, tablet, and widescreen displays.

---

## Project Directory Structure

```text
vayux-systems/
├── public/
│   └── logo.png                 # Primary brand emblem & vector assets
├── src/
│   ├── components/
│   │   ├── modals/              # Interactive dialogs & form overlays
│   │   │   ├── ArticleReaderModal.tsx
│   │   │   ├── ContactModal.tsx
│   │   │   ├── IncidentModal.tsx
│   │   │   └── JobApplicationModal.tsx
│   │   ├── screens/             # Dedicated route view components
│   │   │   ├── CompanyScreen.tsx
│   │   │   ├── ConsultationScreen.tsx
│   │   │   ├── DfirScreen.tsx
│   │   │   ├── GrcScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── InsightsScreen.tsx
│   │   │   ├── LoopScreen.tsx
│   │   │   ├── ManagedSOCScreen.tsx
│   │   │   ├── ServicesScreen.tsx
│   │   │   ├── TrainingScreen.tsx
│   │   │   └── VaptScreen.tsx
│   │   ├── Footer.tsx           # Global footer with quick links & status
│   │   ├── Navigation.tsx       # Responsive header navigation & mobile drawer
│   │   └── VayuXLoopAnimation.tsx # Core 6-node interactive rotating loop
│   ├── data/
│   │   └── mockData.ts          # Mock telemetry feeds, stages, and articles
│   ├── App.tsx                  # Root application controller & lazy router
│   ├── index.css                # Global CSS tokens, themes & keyframes
│   ├── main.tsx                 # React DOM mount entry
│   └── types.ts                 # Global TypeScript definitions & interfaces
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration & plugin setup
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0+) or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/vayux-systems.git
   cd vayux-systems
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run TypeScript type checks**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

6. **Preview production build locally**:
   ```bash
   npm run preview
   ```

### Deploy to Vercel

#### Method 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

#### Method 2: Vercel Git Integration
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Vercel will automatically detect **Vite**, set the build command to `npm run build`, and output to `dist`.
4. Click **Deploy**.

---

## Compliance & Regulatory Alignment

VayuX Systems is engineered from the ground up to support modern compliance requirements:
- **DPDP Act 2023**: Indian Digital Personal Data Protection Act compliance tracking and data audit trails.
- **CERT-In Directives**: Aligned with the 6-hour cybersecurity incident reporting window.
- **SOC2 Type II & ISO 27001**: Continuous control testing and evidence gathering.

---

## License

This project is proprietary and confidential. All rights reserved &copy; **VayuX Systems**.
