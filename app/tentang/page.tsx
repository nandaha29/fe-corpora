// app/tentang/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  Users,
  BookOpen,
  Globe,
  Award,
  Sparkles,
  ArrowLeft,
  Play,
  Library,
  ExternalLink
} from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import ScrollToTopButton from "@/components/common/scroll-to-top"
import { aboutPageData } from "@/data/about-page"
import {
  AboutHero,
  AboutOverview,
  AboutContent,
  AboutSteps,
  AboutProcess,
  AboutRoadmap,
  AboutFeatures,
  AboutTeam,
  AboutGallery,
  AboutVideo,
  AboutCTA
} from "@/components/sections/about"

interface LandingData {
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
    institusi?: string
    email?: string
  }>
  collaborationAssets: Array<{
    asset: {
      url: string
      namaFile: string
      penjelasan: string
      tipe: string
    }
    contributor: {
      namaContributor: string
      institusi: string
    }
  }>
}

export default function AboutPage() {
  const { handleNavClick } = useNavigation()
  const [landingData, setLandingData] = useState<LandingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string>("overview")

  const [isNavSticky, setIsNavSticky] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/landing')
        if (!response.ok) throw new Error('Failed to fetch data')
        const result = await response.json()
        if (result.success) {
          setLandingData(result.data)
        }
      } catch (err) {
        console.error('Error fetching landing data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64
      setIsNavSticky(window.scrollY > headerHeight)

      const sections = ["overview", "about", "steps", "process", "roadmap", "features", "team", "gallery", "video"]
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(sectionId)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.offsetTop - navbarHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)

    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 96
      const elementPosition = element.offsetTop - navbarHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  // Filter gallery images from collaboration assets
  const galleryImages = landingData?.collaborationAssets
    .filter(ca => ca.asset.tipe === 'image')
    .map(ca => ({
      url: ca.asset.url,
      alt: ca.asset.namaFile,
      description: ca.asset.penjelasan,
      contributor: ca.contributor.namaContributor,
      institution: ca.contributor.institusi
    })) || []

  // Filter videos from collaboration assets
  const videos = landingData?.collaborationAssets
    .filter(ca => ca.asset.tipe === 'video')
    .map(ca => ({
      url: ca.asset.url,
      title: ca.asset.namaFile,
      description: ca.asset.penjelasan,
      thumbnail: ca.asset.url.replace(/\.[^/.]+$/, ".jpg"), // Simple thumbnail assumption
      duration: "00:00", // Placeholder
      contributor: ca.contributor.namaContributor,
      institution: ca.contributor.institusi
    })) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />

      {/* Hero Section */}
      <AboutHero data={aboutPageData.hero} />

      {/* Navigation Tabs - Similar to Subculture */}
      <nav
        aria-label="Page subsections"
        className={`bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b border-border transition-shadow duration-200 ${isNavSticky ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar items-center">
            <li>
              <button
                onClick={() => handleSectionClick("overview")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "overview"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Overview
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("about")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "about"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  About UB Corpora
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("steps")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "steps"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Project Steps
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("process")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "process"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Process
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("roadmap")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "roadmap"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Roadmap
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("features")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "features"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Features
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("team")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "team"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Team
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("gallery")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "gallery"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Gallery
                </div>
              </button>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              /
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("video")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "video"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                  }`}
              >
                <div className="text-xl">
                  Video
                </div>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 space-y-8 scroll-smooth">
        {/* Overview Section */}
        <AboutOverview
          data={aboutPageData.overview}
          stats={landingData?.visiMisiSection}
        />

        {/* About UB Corpora Section */}
        <AboutContent data={aboutPageData.about} />

        {/* Project Steps Section */}
        <AboutSteps data={aboutPageData.steps} />

        {/* Process Section */}
        <AboutProcess data={aboutPageData.process} />

        {/* Roadmap Section */}
        <AboutRoadmap data={aboutPageData.roadmap} />

        {/* Features Section */}
        <AboutFeatures data={aboutPageData.features} />

        {/* Team Section */}
        <AboutTeam
          data={aboutPageData.team}
          loading={loading}
        />

        {/* Gallery Section */}
        <AboutGallery
          data={aboutPageData.gallery}
          galleryImages={galleryImages}
        />

        {/* Video Section */}
        <AboutVideo
          data={{
            ...aboutPageData.video,
            emptyMessage: "No videos available at the moment."
          }}
          videos={videos}
        />

      </main>

      <Footer onNavClick={handleNavClick} />
      <ScrollToTopButton />
    </div>
  )
}