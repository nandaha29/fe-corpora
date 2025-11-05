// app/tentang/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Heart, 
  Users, 
  BookOpen, 
  Globe, 
  Award, 
  Sparkles,
  ArrowLeft,
  Play
} from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

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
      const sections = ["overview", "about", "team", "gallery", "video"]
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />

      {/* Hero Section - Similar to Subculture */}
      <section aria-label="Hero" className="relative overflow-hidden border-b border-border">
        <div className="relative">
          <img
            src="/east-java-temple-sunset-landscape-with-traditional.jpg"
            alt="UB Corpora Cultural Heritage"
            className="h-[65vh] md:h-[80vh] w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-16 lg:px-24">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-gray-200 mb-3"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <span className="text-primary">About</span>
                </li>
              </ol>
            </motion.nav>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Preserving Cultural Heritage
              <span className="block text-primary">Through Digital Innovation</span>
            </motion.h1>

            <motion.p
              className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              UB Corpora adalah platform digital inovatif yang didedikasikan untuk mendokumentasikan, 
              melestarikan, dan memperkenalkan kekayaan budaya Jawa Timur kepada generasi masa kini dan mendatang.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs - Similar to Subculture */}
      <nav
        aria-label="Halaman sub-bab"
        className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
            <li>
              <button
                onClick={() => scrollToSection("overview")}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "overview"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Overview
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "about"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Tentang UB Corpora
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <button
                onClick={() => scrollToSection("team")}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "team"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Tim Kami
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <button
                onClick={() => scrollToSection("gallery")}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "gallery"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Galeri Kegiatan
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <button
                onClick={() => scrollToSection("video")}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "video"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Video
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 space-y-8 scroll-smooth">
        {/* Overview Section */}
        <section id="overview" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
            
                <Badge variant="secondary" className="text-sm">
                  About the Platform
                </Badge>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Preserving Cultural Heritage
                <span className="text-primary block">East Java</span>
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                A digital platform dedicated to preserving, documenting, and
                introducing the cultural wealth of East Java to present and future
                generations.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium">Digital Documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium">Cultural Preservation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium">Interactive Learning</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg border border-rose-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-rose-700">
                  {landingData?.visiMisiSection.publishedCultures || 500}+
                </div>
                <div className="text-sm text-rose-600/80">
                  Documented Cultures
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg border border-teal-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-teal-700">
                  {landingData?.visiMisiSection.publishedSubcultures || 38}
                </div>
                <div className="text-sm text-teal-600/80">Subcultures</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg border border-orange-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-700">
                  {landingData?.visiMisiSection.publishedLeksikons || 12}
                </div>
                <div className="text-sm text-orange-600/80">Leksikons</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg border border-purple-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">
                  {landingData?.visiMisiSection.totalContributors || 100}+
                </div>
                <div className="text-sm text-purple-600/80">Contributors</div>
              </div>
            </div>
          </div>
        </section>

        {/* About UB Corpora Section */}
        <section id="about" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">Apa itu UB Corpora?</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                UB Corpora adalah inisiatif digital dari Universitas Brawijaya yang bertujuan untuk 
                mendokumentasikan dan melestarikan warisan budaya Jawa Timur. Platform ini menggabungkan 
                teknologi modern dengan kearifan lokal untuk menciptakan pengalaman eksplorasi budaya 
                yang interaktif dan mendalam.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Melalui kolaborasi dengan komunitas lokal, praktisi budaya, dan akademisi, kami 
                menghadirkan konten yang autentik, komprehensif, dan mudah diakses oleh siapa saja, 
                di mana saja.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-rose-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Vision</h3>
                  <p className="text-muted-foreground text-pretty">
                    To be the leading digital platform for the preservation and
                    promotion of East Java's culture.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Mission</h3>
                  <p className="text-muted-foreground text-pretty">
                    To document, conserve, and showcase the rich cultural heritage
                    of East Java to the world.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Objective</h3>
                  <p className="text-muted-foreground text-pretty">
                    To enhance public appreciation and understanding of local
                    cultural heritage.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">Pencetus & Kontributor UB Corpora</h2>
          <p className="text-muted-foreground mb-8">
            Tim multidisipliner yang berdedikasi untuk melestarikan dan memperkenalkan 
            warisan budaya Jawa Timur kepada dunia.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-lg animate-pulse">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
                  </CardContent>
                </Card>
              ))
            ) : (
              landingData?.teamScientis.map((member, index) => (
                <Card key={index} className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">{member.namaContributor}</h3>
                    <p className="text-sm text-primary mb-2">{member.expertiseArea}</p>
                    
                    {member.institusi && (
                      <p className="text-xs text-muted-foreground">{member.institusi}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">Galeri Kegiatan UB Corpora</h2>
          <p className="text-muted-foreground mb-8">
            Dokumentasi kegiatan penelitian, dokumentasi, dan kolaborasi dengan 
            komunitas budaya di Jawa Timur.
          </p>

          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-border bg-background/50 hover:scale-[1.02] transition-transform shadow-sm group"
                >
                  <div className="aspect-video relative">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {image.description && (
                    <div className="p-4">
                      <p className="text-sm text-foreground font-medium mb-1">{image.description}</p>
                      {image.contributor && (
                        <p className="text-xs text-muted-foreground">
                          By {image.contributor} {image.institution && `• ${image.institution}`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Galeri kegiatan akan segera ditambahkan</p>
            </div>
          )}
        </section>

        {/* Video Section */}
        <section id="video" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">Mengenal UB Corpora Lebih Dekat</h2>
          <p className="text-muted-foreground mb-8">
            Tonton video pengenalan untuk memahami visi, misi, dan dampak UB Corpora 
            dalam pelestarian budaya Jawa Timur.
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                {/* Placeholder - akan diganti dengan video embed */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Video akan segera tersedia</p>
                  <p className="text-sm text-muted-foreground mt-2">Coming Soon</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mulai Jelajahi Budaya Jawa Timur
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Bergabunglah dengan ribuan pengguna lain dalam melestarikan dan 
            mengenal warisan budaya yang kaya dari Jawa Timur.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => handleNavClick("eksplorasi")}
            >
              <Globe className="h-5 w-5" />
              Jelajahi Sekarang
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleNavClick("kontak")}
            >
              Hubungi Kami
            </Button>
          </div>
        </section>
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  )
}