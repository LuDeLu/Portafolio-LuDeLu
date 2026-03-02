# Lucas Baez — Developer Portfolio

Personal portfolio website for **Lucas Baez** (LuDeLu), a Full Stack developer based in Buenos Aires, Argentina. Built with Next.js 14, TypeScript, Framer Motion, and GSAP, featuring real-time visitors, animated backgrounds, a contact form, and full i18n support.

Live site: [ludelu.dev](https://ludelu.dev)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Features

- **Animated Hero Section** — Terminal-style typewriter intro with GSAP and Framer Motion transitions.
- **Projects Showcase** — Interactive cards with modal detail views, tech badge overlays, and slideshows.
- **Skills Grid** — Visual icon grid across 25+ technologies with color-coded badges.
- **Experience Timeline** — Work history with per-role skill tagging.
- **Contact Form** — Server-side form submission via [Resend](https://resend.com) with Zod validation.
- **Real-Time Visitors** — Socket.IO integration showing live cursors and online users.
- **Multilanguage (i18n)** — Spanish / English switcher via a custom `LanguageContext`.
- **Dark / Light Mode** — `next-themes` powered theme toggle with fun dismissal toasts.
- **Elastic Custom Cursor** — Canvas-based cursor with spring physics.
- **Smooth Scroll** — Lenis-powered scroll with GSAP ScrollTrigger support.
- **Animated Preloader** — GSAP-animated entry screen on first load.
- **SEO Optimized** — Full OpenGraph and Twitter card metadata, robots config.
- **Analytics** — Umami self-hosted analytics integration via environment variable.

---

## Tech Stack

| Category       | Technology                                      |
|----------------|-------------------------------------------------|
| Framework      | [Next.js 14](https://nextjs.org) (App Router)   |
| Language       | TypeScript 5                                    |
| Styling        | Tailwind CSS 3, SCSS Modules                    |
| UI Components  | shadcn/ui, Radix UI                             |
| Animation      | Framer Motion, GSAP + @gsap/react               |
| Smooth Scroll  | Lenis                                           |
| Real-Time      | Socket.IO Client                                |
| Email          | Resend + React Email                            |
| Validation     | Zod                                             |
| Fonts          | Inter, Archivo Black (Google Fonts via next/font)|
| 3D             | Three.js, @splinetool/react-spline              |
| Icons          | Lucide React, React Icons                       |
| Analytics      | Umami                                           |
| Deployment     | Vercel                                          |

---

## Project Structure

```
src/
├── app/
│   ├── api/send/route.ts      # Contact form API endpoint (Resend)
│   ├── globals.css            # Global styles & CSS variables
│   ├── layout.tsx             # Root layout with metadata & providers
│   ├── not-found.tsx          # Custom 404 page
│   └── page.tsx               # Home page — composes all sections
│
├── components/
│   ├── header/                # Futuristic animated navigation header
│   ├── footer/                # Footer with social links & config
│   ├── preloader/             # GSAP animated intro preloader
│   ├── realtime/              # Socket.IO remote cursors & sounds
│   ├── sections/              # Page sections: Hero, Projects, Skills, Experience, Contact
│   ├── social/                # Social media icon links
│   ├── logos/                 # Tech/brand SVG logo components
│   ├── ui/                    # shadcn/ui components + custom: ElasticCursor, Header, typography
│   ├── animated-background.tsx
│   ├── enhanced-background.tsx
│   ├── app-overlays.tsx
│   ├── ContactForm.tsx
│   ├── email-template.tsx
│   ├── hero-terminal.tsx
│   ├── language-selector.tsx
│   ├── providers.tsx
│   ├── reveal-animations.tsx
│   ├── slide-show.tsx
│   └── smooth-scroll.tsx
│
├── contexts/
│   ├── language.tsx           # i18n context (ES / EN)
│   └── socketio.tsx           # Socket.IO context with session persistence
│
├── data/
│   ├── config.ts              # Site metadata, author info, social links
│   ├── constants.ts           # Skills enum/map, experience timeline, theme toasts
│   ├── projects.tsx           # Projects data with descriptions and tech stacks
│   └── lucas-projects.tsx     # Extended project definitions
│
├── hooks/
│   ├── use-media-query.tsx
│   ├── use-mouse-position.ts
│   ├── use-mouse.tsx
│   └── use-throttle.tsx
│
├── lib/
│   ├── avatar.ts              # Avatar generation helper
│   ├── i18n.ts                # Translation strings & helpers
│   ├── lenis/                 # Lenis scroll instance wrapper
│   └── utils.ts               # cn() class utility
│
├── types/
│   └── index.ts               # Shared TypeScript types
│
└── utils/
    └── mouse.ts               # Mouse position utilities
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/LuDeLu/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in the required values (see Environment Variables below)

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file at the root of the project with the following variables:

```env
# Contact form — Resend API key
# Get one at https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Real-time visitors — WebSocket server URL
# Your Socket.IO backend URL
NEXT_PUBLIC_WS_URL=https://your-ws-server.com

# Analytics — Umami (optional)
# Self-hosted Umami script URL and site ID
UMAMI_DOMAIN=https://your-umami-instance.com/script.js
UMAMI_SITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

| Variable              | Required | Description                                |
|-----------------------|----------|--------------------------------------------|
| `RESEND_API_KEY`      | Yes      | Resend API key for the contact form        |
| `NEXT_PUBLIC_WS_URL`  | No       | Socket.IO server URL for real-time cursors |
| `UMAMI_DOMAIN`        | No       | Umami analytics script URL                 |
| `UMAMI_SITE_ID`       | No       | Umami site identifier                      |

> The app works without the optional variables — real-time and analytics features will be silently disabled.

---

## Scripts

| Command        | Description                        |
|----------------|------------------------------------|
| `pnpm dev`     | Start development server           |
| `pnpm build`   | Create an optimized production build|
| `pnpm start`   | Start the production server        |
| `pnpm lint`    | Run ESLint                         |

---

## Deployment

The project is deployed on **Vercel**. Any push to the main branch triggers an automatic deployment.

To deploy your own fork:

1. Import the repository on [vercel.com/new](https://vercel.com/new).
2. Set the environment variables in the Vercel project settings.
3. Deploy.

---

## Contact

| | |
|--|--|
| Email    | [lucasbaez147@gmail.com](mailto:lucasbaez147@gmail.com) |
| LinkedIn | [linkedin.com/in/ludelu](https://www.linkedin.com/in/ludelu/) |
| GitHub   | [github.com/LuDeLu](https://github.com/LuDeLu) |
| Twitter  | [@TheLuDelu](https://x.com/TheLuDelu) |
| Instagram| [@lu.de_lu](https://www.instagram.com/lu.de_lu/) |
| Location | Buenos Aires, Argentina |
