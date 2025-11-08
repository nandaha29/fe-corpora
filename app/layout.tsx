import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Manrope } from "next/font/google"
import { EB_Garamond } from "next/font/google"
import TransitionProvider from "@/components/ux/transition-provider"
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
      <body 
        className={`${ebGaramond.className} ${ebGaramond.variable} ${GeistSans.variable} ${GeistMono.variable} ${manrope.variable}`}
        suppressHydrationWarning
      >
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  )
}
