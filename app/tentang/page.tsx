// // app/tentang/page.tsx
// "use client"

// import { useState, useEffect } from "react"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Heart,
//   Users,
//   BookOpen,
//   Globe,
//   Award,
//   Sparkles,
//   ArrowLeft,
//   Play,
//   Library,
//   ExternalLink
// } from "lucide-react"
// import { AnimatedReveal } from "@/components/common/animated-reveal"
// import { Navigation } from "@/components/layout/navigation"
// import { Footer } from "@/components/layout/footer"
// import { useNavigation } from "@/hooks/use-navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import ScrollToTopButton from "@/components/common/scroll-to-top"
// import { aboutPageData } from "@/data/about-page"
// import {
//   AboutHero,
//   AboutOverview,
//   AboutContent,
//   AboutSteps,
//   AboutProcess,
//   AboutRoadmap,
//   AboutFeatures,
//   AboutTeam,
//   AboutGallery,
//   AboutVideo,
//   AboutCTA
// } from "@/components/sections/about"

// interface LandingData {
//   visiMisiSection: {
//     publishedCultures: number
//     publishedSubcultures: number
//     publishedLeksikons: number
//     totalContributors: number
//     totalAssets: number
//   }
//   teamScientis: Array<{
//     namaContributor: string
//     expertiseArea: string
//     institusi?: string
//     email?: string
//   }>
//   collaborationAssets: Array<{
//     asset: {
//       url: string
//       namaFile: string
//       penjelasan: string
//       tipe: string
//     }
//     contributor: {
//       namaContributor: string
//       institusi: string
//     }
//   }>
// }

// export default function AboutPage() {
//   const { handleNavClick } = useNavigation()
//   const [landingData, setLandingData] = useState<LandingData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [activeSection, setActiveSection] = useState<string>("overview")

//   const [isNavSticky, setIsNavSticky] = useState(false)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://be-corpora.vercel.app/api/v1/public/landing')
//         if (!response.ok) throw new Error('Failed to fetch data')
//         const result = await response.json()
//         if (result.success) {
//           setLandingData(result.data)
//         }
//       } catch (err) {
//         console.error('Error fetching landing data:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   useEffect(() => {
//     const handleScroll = () => {
//       const headerHeight = 64
//       setIsNavSticky(window.scrollY > headerHeight)

//       const sections = ["overview", "about", "steps", "process", "roadmap", "features", "team", "gallery", "video"]
//       for (const sectionId of sections) {
//         const element = document.getElementById(sectionId)
//         if (element) {
//           const rect = element.getBoundingClientRect()
//           if (rect.top <= 200) {
//             setActiveSection(sectionId)
//           }
//         }
//       }
//     }

//     window.addEventListener("scroll", handleScroll, { passive: true })
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       const navbarHeight = 80
//       const elementPosition = element.offsetTop - navbarHeight
//       window.scrollTo({
//         top: elementPosition,
//         behavior: "smooth",
//       })
//     }
//   }

//   const handleSectionClick = (sectionId: string) => {
//     setActiveSection(sectionId)

//     const element = document.getElementById(sectionId)
//     if (element) {
//       const navbarHeight = 96
//       const elementPosition = element.offsetTop - navbarHeight

//       window.scrollTo({
//         top: elementPosition,
//         behavior: "smooth",
//       })
//     }
//   }

//   // Filter gallery images from collaboration assets
//   const galleryImages = landingData?.collaborationAssets
//     .filter(ca => ca.asset.tipe === 'image')
//     .map(ca => ({
//       url: ca.asset.url,
//       alt: ca.asset.namaFile,
//       description: ca.asset.penjelasan,
//       contributor: ca.contributor.namaContributor,
//       institution: ca.contributor.institusi
//     })) || []

//   // Filter videos from collaboration assets
//   const videos = landingData?.collaborationAssets
//     .filter(ca => ca.asset.tipe === 'video')
//     .map(ca => ({
//       url: ca.asset.url,
//       title: ca.asset.namaFile,
//       description: ca.asset.penjelasan,
//       thumbnail: ca.asset.url.replace(/\.[^/.]+$/, ".jpg"), // Simple thumbnail assumption
//       duration: "00:00", // Placeholder
//       contributor: ca.contributor.namaContributor,
//       institution: ca.contributor.institusi
//     })) || []

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
//       <Navigation onNavClick={handleNavClick} />

//       {/* Hero Section */}
//       <AboutHero data={aboutPageData.hero} />

//       {/* Navigation Tabs - Similar to Subculture */}
//       <nav
//         aria-label="Page subsections"
//         className={`bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b border-border transition-shadow duration-200 ${isNavSticky ? "shadow-md" : ""
//           }`}
//       >
//         <div className="container mx-auto px-4">
//           <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar items-center">
//             <li>
//               <button
//                 onClick={() => handleSectionClick("overview")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "overview"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Overview
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("about")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "about"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   About UB Corpora
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("steps")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "steps"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Project Steps
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("process")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "process"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Process
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("roadmap")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "roadmap"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Roadmap
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("features")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "features"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Features
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("team")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "team"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Team
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("gallery")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "gallery"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Gallery
//                 </div>
//               </button>
//             </li>
//             <li aria-hidden="true" className="text-muted-foreground">
//               /
//             </li>
//             <li>
//               <button
//                 onClick={() => handleSectionClick("video")}
//                 className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${activeSection === "video"
//                     ? "bg-primary/20 text-primary font-medium"
//                     : "hover:bg-accent/20 text-foreground"
//                   }`}
//               >
//                 <div className="text-xl">
//                   Video
//                 </div>
//               </button>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <main className="container mx-auto px-4 py-6 space-y-8 scroll-smooth">
//         {/* Overview Section */}
//         <AboutOverview
//           data={aboutPageData.overview}
//           stats={landingData?.visiMisiSection}
//         />

//         {/* About UB Corpora Section */}
//         <AboutContent data={aboutPageData.about} />

//         {/* Project Steps Section */}
//         <AboutSteps data={aboutPageData.steps} />

//         {/* Process Section */}
//         <AboutProcess data={aboutPageData.process} />

//         {/* Roadmap Section */}
//         <AboutRoadmap data={aboutPageData.roadmap} />

//         {/* Features Section */}
//         <AboutFeatures data={aboutPageData.features} />

//         {/* Team Section */}
//         <AboutTeam
//           data={aboutPageData.team}
//           loading={loading}
//         />

//         {/* Gallery Section */}
//         <AboutGallery
//           data={aboutPageData.gallery}
//           galleryImages={galleryImages}
//         />

//         {/* Video Section */}
//         <AboutVideo
//           data={{
//             ...aboutPageData.video,
//             emptyMessage: "No videos available at the moment."
//           }}
//           videos={videos}
//         />

//       </main>

//       <Footer onNavClick={handleNavClick} />
//       <ScrollToTopButton />
//     </div>
//   )
// }


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

  // Hero image for about page
  const heroImageUrl = "/east-java-temple-sunset-landscape-with-traditional.jpg"
  const regionId = "UB Corpora"

  // Mock subculture data for about page
  const subcultureData = {
    profile: {
      salamKhas: "Preserving Cultural Heritage",
      displayName: "UB Corpora",
      artiSalamKhas: "UB Corpora is an innovative digital platform dedicated to documenting, preserving, and introducing the cultural wealth of East Java to present and future generations."
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

      {/* Hero Section */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden border-b border-border"
      >
        <div className="relative">
          <img
            src={heroImageUrl}
            alt="UB Corpora Cultural Heritage"
            className="h-[65vh] md:h-[80vh] w-full object-cover blur-sm"
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
                    <div className="text-xl">
                      Home
                    </div>
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link href="/peta-budaya" className="hover:underline">
                    <div className="text-xl">
                      About Us
                    </div>
                  </Link>
                </li>
              </ol>
            </motion.nav>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {subcultureData?.profile?.salamKhas ||
                `Discover the Living Tapestry of ${subcultureData?.profile?.displayName || regionId
                }`}
            </motion.h1>

            <motion.p
              className="mt-4 text-2xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subcultureData?.profile?.artiSalamKhas || "Special greeting meaning here"}
            </motion.p>
          </div>
        </div>
      </section>

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
                  Our Team
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
                  Activity Gallery
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
        <section id="overview" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">

                <Badge variant="secondary" className="text-xl">
                  About the Platform
                </Badge>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Preserving Cultural Heritage
                <span className="text-primary block">East Java</span>
              </h2>

              <h3 className="text-muted-foreground leading-relaxed text-xl">
                A digital platform dedicated to preserving, documenting, and
                introducing the cultural wealth of East Java to present and future
                generations.
              </h3>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-xl font-medium">Digital Documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-xl font-medium">Cultural Preservation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-xl font-medium">Interactive Learning</span>
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
                <div className="text-xl text-rose-600/80">
                  Documented Cultures
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg border border-teal-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-teal-700">
                  {landingData?.visiMisiSection.publishedSubcultures || 38}
                </div>
                <div className="text-xl text-teal-600/80">Subcultures</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg border border-orange-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-700">
                  {landingData?.visiMisiSection.publishedLeksikons || 12}
                </div>
                <div className="text-xl text-orange-600/80">Leksikons</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg border border-purple-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">
                  {landingData?.visiMisiSection.totalContributors || 100}+
                </div>
                <div className="text-xl text-purple-600/80">Contributors</div>
              </div>
            </div>
          </div>
        </section>

        {/* About UB Corpora Section */}
        <section id="about" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">What is UB Corpora?</h2>

          <div className="space-y-6">
            <div className="space-y-4">

              <h3 className="text-xl text-muted-foreground leading-relaxed">
                UB Corpora is a digital initiative from Universitas Brawijaya aimed at
                documenting and preserving the cultural heritage of East Java. This platform combines
                modern technology with local wisdom to create an interactive and in-depth
                cultural exploration experience.
              </h3>
              <div className=" text-xl text-muted-foreground leading-relaxed">
                <h1>Introduction</h1>
                <h3 className="  text-muted-foreground leading-relaxed">
                  What does corpus and corpora mean? In the classic linguistics, corpus often defines “a collection of utterances recorded on a tape or taken down from dictation” (Martinet, 1960:40). Susan Hunston (2002), one of the pioneers of the linguistics corpora in the English Department at the University of Birmingham, introduces modern uses of corpus studies through her book, Corpora in Applied Linguistics. The word of corpus is referring to “a collection of naturally occurring examples of language, consisting of anything from a few sentences to a set of written texts or tape recordings, which have been collected for linguistic study. More recently, the word has been reserved for collections of texts (or parts of text) that are stored and accessed electronically” (Hunston, 2002:2). What we learned from previous scholars on corpora implies that corpus is focusing on collecting of textual artefact. However, as we know that cultural artefacts have multilayered aspects (Arps 2016:28-29). We also agree that textuality are the vital aspects in making sense the complexity of multistranded of cultural artefacts. Considering the complexity of understanding the cultural artefacts, we propose that textual corpora in this regard should be accompanied by non-textual element. So, we are trying to initiate the corpus-multimodal in specific context.

                  In this project, we are trying to introduce the peculiarity of cultural expression of East Java through digital platform. East Java has unique cultural landscapes (see figure 1) and symbolizes variety of ethnic groups, traditions, and cultural artefacts. The specific purpose of this project is documenting, selecting, presenting cultural artefact in the existing of subcultures in East Java. More specifically, we are focusing to document culture-specific expressions, also known as culture-specific items, words or phrases that carries a particular meaning in special context. Those words are so hard to find equivalent words to other languages (translation challenges) because their concepts may not exist or be understood in other cultures. Apart from the textuality, this project present non-textual element through advance media, e.g., videos, photos, music, and 3D model.
                  By combining software engineering expertise and humanities approaches, this project is endeavored to provide database of textual artefacts and its multimodal.

                </h3>
              </div>
              {/* Sources Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-card/60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <Library className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-xl font-semibold">Key References</CardTitle>
                        <h3 className="text-xl text-muted-foreground">5 academic sources</h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-2">
                      {[
                        {
                          judul: "Tall Tree, Nest of the Wind: the Javanese Shadow-play Dewa Ruci Performed by Ki Anom Soeroto: A Study in Performance Philology",
                          penulis: "B. Arps",
                          tahunTerbit: "2016",
                          penjelasan: "Comprehensive study of Javanese shadow-play performance and philology",
                          tipeReferensi: "Book",
                          citationNote: "Performance Philology"
                        },
                        {
                          judul: "Elements of General Linguistics",
                          penulis: "André Martinet",
                          tahunTerbit: "1960",
                          penjelasan: "Classic work on general linguistics principles, translated by Elisabeth Palmer",
                          tipeReferensi: "Book",
                          citationNote: "Linguistic Theory"
                        },
                        {
                          judul: "Corpora in Applied Linguistics",
                          penulis: "Susan Hunston",
                          tahunTerbit: "2002",
                          penjelasan: "Pioneering work on corpus linguistics applications in applied linguistics",
                          tipeReferensi: "Book",
                          citationNote: "Corpus Linguistics"
                        },
                        {
                          judul: "Pemetaan Kebudayaan di Jawa Timur",
                          penulis: "Ayu Sutarto",
                          tahunTerbit: "2004",
                          penjelasan: "Cultural mapping and documentation of East Java cultural heritage",
                          tipeReferensi: "Book",
                          citationNote: "Cultural Mapping"
                        },
                        {
                          judul: "Theater as Data: Computational Journeys into Theater Research",
                          penulis: "Miguel Escobar Varela",
                          tahunTerbit: "2021",
                          penjelasan: "Computational approaches to theater research and digital humanities",
                          tipeReferensi: "Book",
                          citationNote: "Digital Humanities"
                        }
                      ].map((ref, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-xl text-foreground line-clamp-2 flex-1">
                              {ref.judul}
                            </h4>
                          </div>
                          <h3 className="text-xl text-muted-foreground mb-2">
                            {ref.penulis} • {ref.tahunTerbit}
                          </h3>
                          {ref.penjelasan && (
                            <h3 className="text-xl text-muted-foreground mb-2 line-clamp-2">
                              {ref.penjelasan}
                            </h3>
                          )}
                          <div className="flex gap-1 flex-wrap">
                            <Badge variant="outline" className="text-xl">
                              {ref.tipeReferensi}
                            </Badge>
                            <Badge variant="outline" className="text-xl">
                              {ref.citationNote}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Steps Section */}
        <section id="steps" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Steps of the Project</h2>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to documenting and digitalizing cultural heritage
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto pl-24">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500"></div>

            <div className="space-y-12">
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
                <div className="absolute -left-24 top-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Focus Area</h3>
                <div className="text-xl text-white/80 leading-relaxed">
                  The project began by focusing on culture-specific and language-specific expressions
                  found in East Java subcultures, such as Tengger and Panaraga.
                </div>
              </div>

              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
                <div className="absolute -left-24 top-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Data Collection</h3>
                <div className="text-xl text-white/80 leading-relaxed">
                  Cultural expressions were collected through extensive and systematic literature reviews:
                  <ul className="mt-4 space-y-2 list-none">
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-xl">Early 20th century (colonial scholars' journals and reports)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-xl">Mid-20th century scholarly works</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-xl">Early 21st century contemporary research</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
                <div className="absolute -left-24 top-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Expert Consultation</h3>
                <div className="text-xl text-white/80 leading-relaxed">
                  The team regularly consults with scholars and cultural activists specializing
                  in the studied subcultures to ensure accuracy and cultural sensitivity.
                </div>
              </div>

              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
                <div className="absolute -left-24 top-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  4
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Data Categorization</h3>
                <div className="text-xl text-white/80 leading-relaxed">
                  Collected data are divided into types or domains based on unique characteristics:
                  <ul className="mt-4 space-y-2 list-none">
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span>Tenggerese and Nature</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span >Tenggerese Ritual Performance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span>Daily Language and Expressions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span>Traditional Arts and Crafts</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
                <div className="absolute -left-24 top-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  5
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Digital Platform Development</h3>
                <div className="text-xl text-white/80 leading-relaxed">
                  Designed a comprehensive digital platform featuring:
                  <ul className="mt-4 space-y-2 list-none">
                    <li className="flex items-start gap-3">
                      <span className=" text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-xl">Cultural-specific expressions (words and phrases)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-xl">Glosses from academic sources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-xl">Commentaries and annotations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-xl">Photos, videos, and 3D models for each artifact</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
                <div className="absolute -left-24 top-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  6
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Field Documentation</h3>
                <div className="text-xl text-white/80 leading-relaxed">
                  Conducted cultural trips to document real-life cultural events using advanced
                  media technology including 4K video, 360° photography, and 3D scanning.
                </div>
              </div>

              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
                <div className="absolute -left-24 top-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  7
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Objective</h3>
                <div className="text-xl text-white/80 leading-relaxed">
                  To present the complexity of cultural artifacts and their context in a digital,
                  user-friendly form accessible to both experts and the general public.
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Project Process Section */}
        <section id="process" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24" style={{background: 'rgba(255, 255, 255, 0.02)'}}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Project Process</h2>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Multi-disciplinary approach with specialist teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-3">Specialist Teams</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Each stage is handled by dedicated specialist teams ensuring smooth
                  and accurate execution of all project components.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-3">Textual Analysis</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Comprehensive transcription, transliteration, translation, and
                  annotation of cultural texts and expressions.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold mb-3">Physical Analysis</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Body movement analysis through biomechanical methods to understand
                  traditional dance and performance art.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-semibold mb-3">Auditory Analysis</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Documentation and analysis of sounds and music embedded in
                  cultural performances and rituals.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Data Integration</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Systematic organization of multi-modal data into a unified,
                  searchable digital database.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-3">Public Access</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Development of user-friendly interfaces for scholars, students,
                  and the general public to access cultural data.
                </h3>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Project Roadmap Section */}
        <section id="roadmap" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Roadmap</h2>
            <h3 className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Three-year implementation plan leading to Brawijaya Corpora establishment
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="group border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full hover:from-primary/10 hover:to-primary/5 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-muted-foreground mb-2 group-hover:text-primary transition-colors duration-300">2025</div>
                  <div className="text-xl font-semibold mb-4">Phase 1: Foundation</div>
                  <div className="text-left">
                    <ul className="space-y-2 text-lg text-muted-foreground">
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                       <h3 className="text-xl">
                        Database development
                       </h3>
                      </li>
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                       <h3 className="text-xl">
                        Preliminary website launch
                       </h3>
                      </li>
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        Initial data collection
                        </h3>
                      </li>
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                       <h3 className="text-xl">
                        Team formation
                       </h3>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                </Card>

                <Card className="group border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full hover:from-primary/10 hover:to-primary/5 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-muted-foreground mb-2 group-hover:text-primary transition-colors duration-300">2026</div>
                  <div className="text-xl font-semibold mb-4">Phase 2: Expansion</div>
                  <div className="text-left">
                    <ul className="space-y-2 text-lg text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className=" w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        Database expansion
                        </h3>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        Full website establishment
                        </h3>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        Additional subcultures
                        </h3>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        Public beta testing
                        </h3>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                </Card>

                <Card className="group border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full hover:from-primary/10 hover:to-primary/5 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-muted-foreground mb-2 group-hover:text-primary transition-colors duration-300">2027</div>
                  <div className="text-xl font-semibold mb-4">Phase 3: Institutionalization</div>
                  <div className="text-left">
                    <ul className="space-y-2 text-lg text-muted-foreground">
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        Brawijaya Corpora established
                        </h3>
                      </li>
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        Special task unit formation
                        </h3>
                      </li>
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                        <h3 className="text-xl">
                        University integration
                        </h3>
                      </li>
                      <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full hover:bg-primary transition-colors duration-300"></div>
                       <h3 className="text-xl">
                        Long-term sustainability
                       </h3>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section id="features" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24" style={{background: 'rgba(255, 255, 255, 0.02)'}}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <h3 className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets traditional culture
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🗂️</div>
                <h3 className="text-xl font-semibold mb-3">Comprehensive Database</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Systematic organization of cultural expressions with multi-layered annotations,
                  glosses, and contextual information from verified academic sources.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-semibold mb-3">Rich Media Documentation</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  High-quality photos, 4K videos, 360° panoramas, and 3D models accompanying
                  each cultural artifact for immersive exploration.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-3">Advanced Search</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Powerful search capabilities across multiple parameters: subculture, domain,
                  time period, artifact type, and linguistic features.
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-3">Academic Resources</h3>
                <h3 className="text-xl text-muted-foreground leading-relaxed">
                  Curated references, scholarly annotations, and citation tools for researchers
                  and students conducting cultural studies.
                </h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-4">Scientific Organizer & Contributors of UB Corpora</h2>
          <h3 className="text-muted-foreground mb-8 text-xl">
            A multidisciplinary team dedicated to preserving and introducing
            the cultural heritage of East Java to the world.
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-lg animate-pulse">
                  <CardContent className="p-6">
                    <div className="w-16h-16 bg-muted rounded-full mx-auto mb-4" />
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

                    <h3 className="font-semibold text-xl mb-1 text-xl">{member.namaContributor}</h3>
                    <h3 className="text-xl text-primary mb-2">{member.expertiseArea}</h3>

                    {member.institusi && (
                      <h3 className="text-xl text-muted-foreground">{member.institusi}</h3>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">UB Corpora Activity Gallery</h2>
          <h3 className="text-muted-foreground mb-8 text-xl">
            Documentation of research activities, documentation, and collaboration with
            cultural communities in East Java.
          </h3>

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
                      <p className="text-lg text-foreground font-medium mb-1">{image.description}</p>
                      {image.contributor && (
                        <h3 className="text-lg text-muted-foreground">
                          By {image.contributor} {image.institution && `• ${image.institution}`}
                        </h3>
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
              <h3 className="text-muted-foreground text-xl">Activity gallery will be added soon</h3>
            </div>
          )}
        </section>

        {/* Video Section */}
        <section id="video" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">Getting to Know UB Corpora Better</h2>
          <h3 className="text-muted-foreground mb-8 text-xl">
            Watch the introduction video to understand UB Corpora's vision, mission, and impact
            in preserving East Java's culture.
          </h3>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                {/* Placeholder - akan diganti dengan video embed */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Video will be available soon</p>
                  <p className="text-lg text-muted-foreground mt-2">Coming Soon</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Exploring East Java Culture
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of other users in preserving and
            learning about the rich cultural heritage of East Java.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => handleNavClick("eksplorasi")}
            >
              <Globe className="h-5 w-5" />
              Explore Now
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleNavClick("kontak")}
            >
              Contact Us
            </Button>
          </div>
        </section> */}
      </main>

      <Footer onNavClick={handleNavClick} />

      {/* Scroll to top button (instant by default). */}
      <ScrollToTopButton smooth={false} threshold={200} />
    </div>
  )
}