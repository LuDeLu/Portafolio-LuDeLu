import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import FuturisticHeader from "@/components/header/futuristic-header";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import AppOverlays from "@/components/app-overlays";
import { Providers } from "@/components/providers";
import AnimatedBackground from "@/components/animated-background";
import EnhancedBackground from "@/components/enhanced-background";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

/**
 * `metadataBase` is what turns every relative asset below — including the
 * opengraph-image / twitter-image / icon file conventions — into the absolute
 * URLs that crawlers require. Without it Next emits relative paths and no
 * social platform can resolve the preview image.
 */
export const metadata: Metadata = {
  metadataBase: new URL(config.site),
  title: {
    default: config.title,
    template: `%s · ${config.author}`,
  },
  description: config.description.long,
  keywords: config.keywords,
  applicationName: `${config.author} · Portfolio`,
  authors: [{ name: config.author, url: config.site }],
  creator: config.author,
  publisher: config.author,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    siteName: `${config.author} · Portfolio`,
    title: config.title,
    description: config.description.short,
    url: "/",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    firstName: "Lucas",
    lastName: "Baez",
    username: "LuDeLu",
    // Image, dimensions, type and alt come from src/app/opengraph-image.jpg
    // plus its .alt.txt sidecar — declaring them here would override that.
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    creator: "@TheLuDelu",
    site: "@TheLuDelu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfb" },
    { media: "(prefers-color-scheme: dark)", color: "#171123" },
  ],
  colorScheme: "dark light",
};

/** Structured data so search engines resolve the site to a real person. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: config.author,
  alternateName: "LuDeLu",
  url: config.site,
  image: config.ogImg,
  jobTitle: "Desarrollador Web Full Stack",
  email: `mailto:${config.email}`,
  telephone: config.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  knowsLanguage: ["es", "en"],
  knowsAbout: config.keywords,
  sameAs: Object.values(config.social).filter(Boolean),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${config.author} · Portfolio`,
  url: config.site,
  inLanguage: "es-AR",
  author: { "@type": "Person", name: config.author },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={[inter.variable, archivoBlack.variable, "font-display"].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        ></Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Analytics />
      </head>
      <body>
        <Providers>
          <EnhancedBackground />
          <AnimatedBackground />
          <FuturisticHeader />
          {children}
          <Footer />
          <AppOverlays />
        </Providers>
      </body>
    </html>
  );
}
