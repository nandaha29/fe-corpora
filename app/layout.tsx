import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Manrope } from "next/font/google"
import { EB_Garamond } from "next/font/google"
import TransitionProvider from "@/components/ux/transition-provider"
import { SWRProvider } from "@/components/providers/swr-provider"
import { CSSLoader } from "@/components/optimization/css-loader"
import { PerformanceHints } from "@/components/optimization/performance-hints"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
})

export const metadata: Metadata = {
  title: "Warisan Budaya Jawa Timur - Cultural Heritage of East Java",
  description:
    "Explore the priceless cultural heritage of East Java through traditional arts, crafts, and preservation efforts",
  generator: "v0.app",
  icons: {
    icon: [
      // { url: "/Logo.png", sizes: "any" },
      { url: "/logo-ubc-2.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/Logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance hints for external resources */}
        <PerformanceHints />
        
        {/* CRITICAL: Preload fonts to break CSS dependency chain (10,026ms → ~500ms) */}
        {/* These fonts are the slowest loading resources according to Lighthouse */}
        <link
          rel="preload"
          href="/_next/static/media/39a40c15606bb1f5-s.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/59be34f4d8f1ff65-s.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/23081e227a96aa1a-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body 
        className={`${ebGaramond.className} ${ebGaramond.variable} ${GeistSans.variable} ${GeistMono.variable} ${manrope.variable}`}
        suppressHydrationWarning
      >
        <CSSLoader />
        <SWRProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </SWRProvider>
      </body>
    </html>
  )
}
