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
                `Discover the Living Tapestry of ${
                  subcultureData?.profile?.displayName || regionId
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
        className={`bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b border-border transition-shadow duration-200 ${
          isNavSticky ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar items-center">
            <li>
              <button
                onClick={() => handleSectionClick("overview")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${
                  activeSection === "overview"
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
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${
                  activeSection === "about"
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
                onClick={() => handleSectionClick("team")}
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${
                  activeSection === "team"
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
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${
                  activeSection === "gallery"
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
                className={`px-3 py-2 rounded-md text-xl transition-colors inline-block cursor-pointer ${
                  activeSection === "video"
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
                Tengger in Old Javanese means “highlands” (Gericke and Roorda, 1901:918), and thus the meaning of Wong Tengger would have mean persons who lived in highlands. In nowadays Java, Tengger no longer refer to that, but cover to “perch and sit above” (Hefner, 1985:25). Wong Tengger ‘Tengger People’ are indigenous community who resides and surrounds around the slope of Mountain Brahma (Bromo). The Tengger highlands locates to the northeast from Malang. There are three gates to reach there: (1) the first route is going to the north from Malang to Pasuruan or Purwodadi, we will find the main entrance Wonokitri village in Tosari district and going up to the Ngadiwono village. These regions well known as western side (brang kulon) of Tengger highlands; (2) the second route is heading to Probolinggo, we will reach the main entrance is Cemoro Lawang village (Ngadisari district) and directly overlooks mount Bromo and Tengger caldera. These gates are popularly known as eastern side (brang wetan) of Tengger highlands; (3) the third access has two kinds of gates: (1) heading to Tumpang, Malang then we will reach the Gubugklakah, and the main gate is Ngadas village; (2) heading to Lumajang, and climbing to Senduro, Ranupani. These regions are known as southern (brang kidul) of Tengger highlands.
              </h3>       
              </div>
         

              <div className="text-xl text-muted-foreground leading-relaxed">
                <h1>Hong hulun Basuki Langgeng</h1>
<h3>
Hong Hulun Basuki Langgeng is Tenggerese salutation. This formula consists of four words in Old Javenese: Oṅ or Om is often referred to mantra or formula praise; ṅhulun is the usual pronoun for the first person (Zoetmulder:1982). Whilst the rest of the words are still existed in modern Javanese, basuki means well-being, and laṅgĕṅ holds the meaning permanent. So, the Tenggerese salutation can be interpreted in the following: “Om, (Brahmā, Visnū, Sivā), I wish for eternal well-being”. Then, the receiver will reply: basuki laṅgĕṅ ‘well-being forever’. This salutation is given when someone visit their relatives by knocking the door or for maintaining social relationship among Tenggerese when they meet each other in market or climbing up to the Bromo.
              </h3>
            </div>

    <div className=" text-xl text-muted-foreground leading-relaxed">

                <h1>Dukun Panḍita as divine actors</h1>
                <h3>In order to maintain the divine relationship between the people of Tengger and their deities and ancestor, the role of dukun panḍita (priest of Tengger) is central (Sukmawan, 2022:14). In the rituals that they perform, the priest is acting like the middleman who mediate the realm world to divine world. By uttering their formulas (mantra) and mentioning the means of the ritual, the priest communicates to the unseen figures to the man who dedicated their offerings to their deities or ancestors. In all the rituals that are performed by Tenggerese, the priest is the main actor. Tenggerese often call the name of the dukun as Rama. Every Tengger villages has dukun and the assistant of the dukun. </h3>
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
                      <CardTitle className="text-base text-xl font-semibold">Key References</CardTitle>
                      <h3 className="text-xl text-muted-foreground">4 academic sources</h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-2">
                    {[
                      {
                        judul: "Javaansch-Nederlandsch Handwoordenboek",
                        penulis: "J. F. C. Gericke",
                        tahunTerbit: "1901",
                        penjelasan: "Comprehensive Javanese-Dutch dictionary with contributions from Dr. A.C. Vreede and Dr. J.G.H. Gunning",
                        tipeReferensi: "Dictionary",
                        citationNote: "Linguistic Reference"
                      },
                      {
                        judul: "Hindu Javanese: Tengger Tradition and Islam",
                        penulis: "Robert W. Hefner",
                        tahunTerbit: "1985",
                        penjelasan: "Ethnographic study of Tengger community and their Hindu-Buddhist cultural traditions",
                        tipeReferensi: "Book",
                        citationNote: "Cultural Study"
                      },
                      {
                        judul: "Mendaras Puja, Mengemas Tamasya",
                        penulis: "Sony Sukmawan, Elvin Nurul Firdaus, Salamah, Asri Kamila Ramadhani",
                        tahunTerbit: "2022",
                        penjelasan: "Contemporary research on Tenggerese rituals and cultural practices",
                        tipeReferensi: "Book",
                        citationNote: "Primary Source"
                      },
                      {
                        judul: "Old Javanese-English Dictionary Part 1: A-O",
                        penulis: "P. J. Zoetmulder with S.O. Robson",
                        tahunTerbit: "1982",
                        penjelasan: "Essential reference for Old Javanese language and terminology (Part 1: A-O)",
                        tipeReferensi: "Dictionary",
                        citationNote: "Language Reference"
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

        {/* Team Section */}
        <section id="team" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-6">Founders & Contributors of UB Corpora</h2>
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
    </div>
  )
}