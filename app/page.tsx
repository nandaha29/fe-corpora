"use client"

import { Navigation } from "@/components/layout/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { CulturalGalleries } from "@/components/sections/cultural-galleries"
import { GlobeSection } from "@/components/sections/globe-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { ShowcaseSection } from "@/components/sections/showcase-section"
// import { NewsletterSection } from "@/components/sections/newsletter-section"
// import { ExplorationSection } from "@/components/sections/exploration-section"
import { useState, useEffect } from "react"

interface LandingData {
  heroSection: {
    cultureName: string
    assets: any[]
  }
  subcultures: Array<{
    subcultureId: number
    namaSubculture: string
    penjelasan: string
    cultureId: number
    status: string
    statusKonservasi: string
    createdAt: string
    updatedAt: string
    subcultureAssets?: Array<{
      subcultureId: number
      assetId: number
      assetRole: string
      createdAt: string
      asset: {
        assetId: number
        namaFile: string
        tipe: string
        penjelasan: string
        url: string
        fileSize: string
        hashChecksum: string
        metadataJson: string
        status: string
        createdAt: string
        updatedAt: string
      }
    }>
  }>
  collaborationAssets: Array<{
    contributorId: number
    assetId: number
    assetNote: string
    createdAt: string
    asset: {
      assetId: number
      namaFile: string
      tipe: string
      penjelasan: string
      url: string
      fileSize: string
      hashChecksum: string
      metadataJson: string
      status: string
      createdAt: string
      updatedAt: string
    }
    contributor: {
      contributorId: number
      namaContributor: string
      institusi: string
      email: string
      expertiseArea: string
      contactInfo: string
      registeredAt: string
    }
  }>
  visiMisiSection: {
    publishedCultures: number
    publishedSubcultures: number
    publishedLeksikons: number
    totalContributors: number
    totalAssets: number
  }
  teamScientis: Array<{
    namaContributor: string
    expertiseArea: string
  }>
}

export default function CulturalHeritagePage() {
  const { handleNavClick, handleCategoryNavigation } = useNavigation()
  const [landingData, setLandingData] = useState<LandingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch landing and subcultures in parallel. We prefer the /subcultures
        // endpoint for populating the galleries section (so landing page
        // uses the same list as /budaya page).
        const [landingRes, subculturesRes] = await Promise.all([
          fetch('https://be-corpora.vercel.app/api/v1/public/landing'),
          fetch('https://be-corpora.vercel.app/api/v1/public/subcultures'),
        ])

        if (!landingRes.ok) {
          throw new Error('Failed to fetch landing data')
        }
        if (!subculturesRes.ok) {
          // we'll still try to use landing data if subcultures endpoint fails
          // but surface a warning via the error state
          throw new Error('Failed to fetch subcultures data')
        }

        const landingJson = await landingRes.json()
        const subculturesJson = await subculturesRes.json()

        if (!landingJson.success) {
          throw new Error(landingJson.message || 'Failed to fetch landing data')
        }

        // Base landing data
        const mergedData = { ...landingJson.data }

        // If subcultures API returns success, override/attach subcultures
        if (subculturesJson && subculturesJson.success) {
          mergedData.subcultures = subculturesJson.data
        }

        setLandingData(mergedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCategoryClick = (category: string) => {
    handleCategoryNavigation(category)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background with cultural patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='batik-pattern' x='0' y='0' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23ca8a04' opacity='0.4'/%3E%3Ccircle cx='60' cy='60' r='12' fill='%23ca8a04' opacity='0.3'/%3E%3Ccircle cx='100' cy='20' r='6' fill='%23ca8a04' opacity='0.5'/%3E%3Ccircle cx='20' cy='100' r='10' fill='%23ca8a04' opacity='0.2'/%3E%3Cpath d='M40 40 Q60 20 80 40 Q60 60 40 40' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3Cpath d='M80 80 Q100 60 120 80 Q100 100 80 80' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23batik-pattern)'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.02] rotate-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='textile-pattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 40 Q20 20 40 40 Q60 60 80 40' fill='none' stroke='%23dc2626' strokeWidth='1' opacity='0.6'/%3E%3Cpath d='M40 0 Q60 20 40 40 Q20 60 40 80' fill='none' stroke='%23dc2626' strokeWidth='1' opacity='0.6'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23dc2626' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23textile-pattern)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Cultural motif decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.025] rotate-12">
          <div className="w-full h-full text-amber-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 C60 15 65 25 60 35 L65 50 C70 60 65 70 55 75 L50 90 L45 75 C35 70 30 60 35 50 L40 35 C35 25 40 15 50 10 Z" />
              <circle cx="45" cy="30" r="3" fill="white" />
              <circle cx="55" cy="30" r="3" fill="white" />
            </svg>
          </div>
        </div>

        <div className="absolute top-40 right-20 w-24 h-24 opacity-[0.03] -rotate-45">
          <div className="w-full h-full text-emerald-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 20 Q60 30 50 40 Q40 30 50 20 Z" />
              <path d="M50 60 Q60 70 50 80 Q40 70 50 60 Z" />
              <path d="M20 50 Q30 40 40 50 Q30 60 20 50 Z" />
              <path d="M80 50 Q70 40 60 50 Q70 60 80 50 Z" />
              <circle cx="50" cy="50" r="8" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-32 left-1/4 w-28 h-28 opacity-[0.02] rotate-45">
          <div className="w-full h-full text-orange-600">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <rect x="20" y="60" width="60" height="30" />
              <polygon points="15,60 50,30 85,60" />
              <rect x="40" y="70" width="20" height="20" />
              <rect x="45" y="40" width="10" height="30" />
            </svg>
          </div>
        </div>

        <div className="absolute top-1/3 right-1/3 w-20 h-20 opacity-[0.03] -rotate-12">
          <div className="w-full h-full text-red-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 L52 20 L48 30 L52 40 L48 50 L52 60 L48 70 L50 80 L48 70 L52 60 L48 50 L52 40 L48 30 L52 20 Z" />
              <ellipse cx="50" cy="15" rx="8" ry="4" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 opacity-[0.02] rotate-90">
          <div className="w-full h-full text-blue-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M50 10 Q70 30 50 50 Q30 70 50 90 Q70 70 50 50 Q30 30 50 10" />
              <circle cx="50" cy="50" r="15" />
              <circle cx="50" cy="50" r="25" />
            </svg>
          </div>
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-orange-50/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-50/20 via-transparent to-blue-50/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-50/10 via-transparent to-yellow-50/15" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-amber-50/5 to-transparent" />
      </div>

      {/* Main content with higher z-index */}
      <div className="relative z-10">
        <Navigation onNavClick={handleNavClick} />

        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading cultural heritage...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        ) : landingData ? (
          <>
            <HeroSection 
              onNavClick={handleNavClick} 
              cultureName={landingData.heroSection.cultureName}
              assets={landingData.heroSection.assets}
            />

            <CulturalGalleries 
              onNavClick={handleNavClick} 
              subcultures={landingData.subcultures} 
            />

            {/* <ExplorationSection /> */}

            <ShowcaseSection collaborationAssets={landingData.collaborationAssets} />

            <GlobeSection />

            <AboutSection 
              onNavClick={handleNavClick} 
              stats={landingData.visiMisiSection}
              team={landingData.teamScientis}
            />

            <ContactSection />

            {/* <NewsletterSection /> */}

            <Footer onNavClick={handleNavClick} onCategoryClick={handleCategoryClick} />
          </>
        ) : null}
      </div>
    </div>
  )
}


