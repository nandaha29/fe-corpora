// app/research/page.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { useLandingData } from "@/hooks/use-api"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { 
  Users, 
  Loader2, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Mail,
  Building2,
  Award,
  BookOpen,
  GraduationCap
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { API_BASE_URL } from "@/lib/config"

interface Contributor {
  contributorId: number
  namaContributor: string
  institusi: string
  email: string
  expertiseArea: string
  contactInfo: string
  registeredAt: string
  assetCount?: number
}

export default function ResearchPage() {
  const router = useRouter()
  const { handleNavClick } = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  // Use SWR hook for data fetching
  const { 
    data: landingData, 
    error: fetchError, 
    isLoading: isLoadingData 
  } = useLandingData();

  // Process contributors from landing data
  const contributors = useMemo<Contributor[]>(() => {
    if (!landingData) return [];
    
    const contributorMap = new Map<number, Contributor>()
    
    // Ekstrak unique contributors dari collaborationAssets
    if (landingData.collaborationAssets) {
      landingData.collaborationAssets.forEach((ca: any) => {
        const contributor = ca.contributor
        if (contributor && !contributorMap.has(contributor.contributorId)) {
          contributorMap.set(contributor.contributorId, {
            ...contributor,
            assetCount: 1
          })
        } else if (contributor) {
          const existing = contributorMap.get(contributor.contributorId)!
          existing.assetCount = (existing.assetCount || 0) + 1
        }
      })
    }

    // Tambahkan team scientists jika ada
    if (landingData.teamScientis) {
      landingData.teamScientis.forEach((scientist: any, index: number) => {
        const id = 1000 + index // ID sementara untuk team scientists
        if (!contributorMap.has(id)) {
          contributorMap.set(id, {
            contributorId: id,
            namaContributor: scientist.contributorName,
            institusi: scientist.institusi || "Universitas Brawijaya",
            email: scientist.email || "",
            expertiseArea: scientist.expertiseArea,
            contactInfo: "",
            registeredAt: new Date().toISOString(),
            assetCount: 0
          })
        }
      })
    }

    return Array.from(contributorMap.values())
  }, [landingData]);

  const loading = isLoadingData;
  const error = fetchError ? (fetchError instanceof Error ? fetchError.message : 'An error occurred') : null;

  // Get unique roles for filter
  const roles = Array.from(new Set(contributors.map(c => c.expertiseArea))).filter(Boolean)

  // Filter contributors based on search and role
  const filteredContributors = contributors.filter((contributor) => {
    const matchesSearch =
      (contributor.namaContributor?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (contributor.institusi?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (contributor.expertiseArea?.toLowerCase() || "").includes(searchQuery.toLowerCase())

    const matchesRole = filterRole === "all" || (contributor.expertiseArea && contributor.expertiseArea === filterRole)

    return matchesSearch && matchesRole
  })

  // Pagination
  const totalPages = Math.ceil(filteredContributors.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedContributors = filteredContributors.slice(startIndex, endIndex)

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterRole])

  // Ensure currentPage is within bounds when totalPages changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    } else if (currentPage < 1) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const getRoleIcon = (role: string) => {
    if (!role) return Users
    const roleLower = role.toLowerCase()
    if (roleLower.includes('research') || roleLower.includes('riset')) return BookOpen
    if (roleLower.includes('kurator') || roleLower.includes('curator')) return Award
    if (roleLower.includes('developer') || roleLower.includes('engineer')) return GraduationCap
    return Users
  }

  const getRoleColor = (role: string) => {
    if (!role) return 'from-slate-900 to-slate-800 border-slate-700'
    const roleLower = role.toLowerCase()
    if (roleLower.includes('research') || roleLower.includes('riset')) return 'from-cyan-500/20 to-blue-600/20 border-cyan-400/30'
    if (roleLower.includes('kurator') || roleLower.includes('curator')) return 'from-violet-500/20 to-purple-600/20 border-violet-400/30'
    if (roleLower.includes('developer') || roleLower.includes('engineer')) return 'from-emerald-500/20 to-teal-600/20 border-emerald-400/30'
    if (roleLower.includes('desain') || roleLower.includes('design')) return 'from-rose-500/20 to-pink-600/20 border-rose-400/30'
    return 'from-slate-500/20 to-gray-600/20 border-slate-400/30'
  }

  const getCardGradient = (role: string) => {
    // Menggunakan warna yang sama untuk semua card
    return 'from-slate-950/85 via-slate-900/65 to-slate-800/85'
  }

  const getGlowColors = (role: string) => {
    // Menggunakan glow yang sama untuk semua card
    return 'from-slate-400/15 via-gray-300/12 to-slate-400/15'
  }

  const getNeonBorder = (role: string) => {
    // Menggunakan border yang sama untuk semua card
    return 'from-slate-400/50 via-gray-300/40 to-slate-400/50'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedReveal animation="fade-up" delay={200}>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Users className="h-3 w-3 mr-1" />
              Research Team
            </Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={400}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
             Scientific Organizer and Contributor
              <span className="text-primary block">UB Corpora</span>
            </h1>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={600}>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A multidisciplinary team dedicated to preserving and documenting 
              East Java's cultural heritage through research and collaboration.
            </p>
          </AnimatedReveal>

          {/* Search and Filter */}
          <AnimatedReveal animation="fade-up" delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, institution, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border focus:ring-primary/20"
                />
              </div>

              {/* Role Filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background/50 text-lg text-foreground shadow-sm cursor-pointer hover:bg-background transition-colors"
              >
                <option value="all">All Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </AnimatedReveal>

          {/* Results Info */}
          {(searchQuery || filterRole !== "all" || filteredContributors.length > 0) && (
            <AnimatedReveal animation="fade-up" delay={1000}>
              <div className="mt-4 text-lg text-muted-foreground">
                {searchQuery || filterRole !== "all" ? (
                  <>Show {filteredContributors.length} Contributor</>
                ) : (
                  <>Total {filteredContributors.length} Contributor</>
                )}
              </div>
            </AnimatedReveal>
          )}
        </div>
      </section>

      {/* Contributors Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading contributor data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        ) : paginatedContributors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedContributors.map((contributor, index) => {
                const RoleIcon = getRoleIcon(contributor.expertiseArea || "")
                const roleColor = getRoleColor(contributor.expertiseArea || "")
                const cardGradient = getCardGradient(contributor.expertiseArea || "")
                const glowColors = getGlowColors(contributor.expertiseArea || "")
                const neonBorder = getNeonBorder(contributor.expertiseArea || "")

                return (
                  <motion.div
                    key={contributor.contributorId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Card
                      className={`group hover:shadow-2xl transition-all duration-700 border-2 h-full cursor-pointer overflow-hidden relative bg-gradient-to-br ${cardGradient}`}
                      style={{
                        transform: "perspective(1200px)",
                        transformStyle: "preserve-3d",
                        boxShadow: `0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)`
                      }}
                    >
                      {/* Neon Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${glowColors} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg blur-sm`} />

                      {/* Animated Neon Border */}
                      <div className="absolute inset-0 rounded-lg border-2 border-transparent p-[2px]">
                        <div className={`w-full h-full bg-gradient-to-r ${neonBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg p-[1px]`}>
                          <div className={`w-full h-full bg-gradient-to-br ${cardGradient} backdrop-blur-xl rounded-lg`} />
                        </div>
                      </div>

                      {/* Dynamic Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-lg" />
                      </div>

                      <CardContent className="p-6 relative z-10 group-hover:scale-[0.98] transition-transform duration-500">
                        {/* Header with Avatar and Role Badge */}
                        <motion.div
                          className="flex items-start justify-between mb-4"
                          initial={{ y: 0 }}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className={`w-16 h-16 bg-gradient-to-br ${roleColor} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}
                            whileHover={{
                              scale: 1.1,
                              rotate: [0, -5, 5, 0],
                              transition: { duration: 0.3 }
                            }}
                          >
                            <motion.span
                              className="text-2xl font-bold text-foreground"
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.2 }}
                            >
                              {(contributor.namaContributor?.charAt(0) || "?").toUpperCase()}
                            </motion.span>
                          </motion.div>

                          {contributor.assetCount !== undefined && contributor.assetCount > 0 && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-xs bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 transition-all duration-300"
                              >
                                {contributor.assetCount} Contributions
                              </Badge>
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Name */}
                        <motion.h3
                          className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {contributor.namaContributor}
                        </motion.h3>

                        {/* Role with Icon */}
                        {contributor.expertiseArea && (
                          <motion.div
                            className="flex items-center gap-2 mb-3"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              whileHover={{
                                rotate: [0, -10, 10, 0],
                                scale: 1.2
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <RoleIcon className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                            </motion.div>
                            <span className="text-lg font-medium text-primary group-hover:text-primary/90 transition-colors duration-300">
                              {contributor.expertiseArea}
                            </span>
                          </motion.div>
                        )}

                        {/* Institution */}
                        {contributor.institusi && (
                          <motion.div
                            className="flex items-start gap-2 mb-3"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Building2 className="w-4 h-4 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-lg text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                              {contributor.institusi}
                            </span>
                          </motion.div>
                        )}

                        {/* Email */}
                        {contributor.email && (
                          <motion.div
                            className="flex items-center gap-2 pt-3 border-t border-border/50 border-opacity-50 group-hover:border-primary/30 transition-colors duration-300"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 flex-shrink-0" />
                            </motion.div>
                            <motion.a
                              href={`mailto:${contributor.email}`}
                              className="text-lg text-muted-foreground hover:text-primary transition-colors truncate"
                              whileHover={{ color: "var(--primary)" }}
                              transition={{ duration: 0.2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {contributor.email}
                            </motion.a>
                          </motion.div>
                        )}

                        {/* Registration Date */}
                        {contributor.registeredAt && (
                          <motion.div
                            className="mt-3 text-lg text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300"
                            initial={{ opacity: 0.7 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              Joined: {new Date(contributor.registeredAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long'
                              })}
                            </motion.span>
                          </motion.div>
                        )}

                        {/* Interactive Sparkle Effect */}
                        <motion.div
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: [0, 1, 0.8, 1], rotate: [0, 180, 360] }}
                          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
                        </motion.div>
                      </CardContent>

                      {/* Bottom Wave Effect */}
                      <motion.div
                        className={`absolute bottom-0 left-0 w-full h-1 ${neonBorder} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, var(--primary) 20%, var(--accent) 50%, var(--primary) 80%, transparent 100%)`
                        }}
                      />
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
                <div className="text-lg text-muted-foreground order-2 sm:order-1">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredContributors.length)} of {filteredContributors.length} contributors
                </div>

                <div className="flex items-center gap-2 order-1 sm:order-2">
                  <Button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Previous</span>
                  </Button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-3 py-2 text-muted-foreground"
                          >
                            ...
                          </span>
                        )
                      }

                      const page = pageNum as number
                      return (
                        <Button
                          key={page}
                          onClick={() => goToPage(page)}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className={`min-w-[40px] cursor-pointer ${
                            currentPage === page
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-primary/10'
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="hidden sm:inline mr-1">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="sm:hidden text-lg text-muted-foreground order-3">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">No contributors found</p>
            <p className="text-lg text-muted-foreground">
              Try a different keyword or filter
            </p>
          </div>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  )
}
