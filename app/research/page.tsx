// app/research/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
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
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true)
        // Fetch dari landing API untuk mendapatkan contributor data
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/landing')
        if (!response.ok) throw new Error('Failed to fetch contributors data')
        
        const result = await response.json()
        if (result.success) {
          // Ekstrak unique contributors dari collaborationAssets
          const contributorMap = new Map<number, Contributor>()
          
          if (result.data.collaborationAssets) {
            result.data.collaborationAssets.forEach((ca: any) => {
              const contributor = ca.contributor
              if (!contributorMap.has(contributor.contributorId)) {
                contributorMap.set(contributor.contributorId, {
                  ...contributor,
                  assetCount: 1
                })
              } else {
                const existing = contributorMap.get(contributor.contributorId)!
                existing.assetCount = (existing.assetCount || 0) + 1
              }
            })
          }

          // Tambahkan team scientists jika ada
          if (result.data.teamScientis) {
            result.data.teamScientis.forEach((scientist: any, index: number) => {
              const id = 1000 + index // ID sementara untuk team scientists
              if (!contributorMap.has(id)) {
                contributorMap.set(id, {
                  contributorId: id,
                  namaContributor: scientist.namaContributor,
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

          const contributorsList = Array.from(contributorMap.values())
          setContributors(contributorsList)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [])

  // Get unique roles for filter
  const roles = Array.from(new Set(contributors.map(c => c.expertiseArea))).filter(Boolean)

  // Filter contributors based on search and role
  const filteredContributors = contributors.filter((contributor) => {
    const matchesSearch = 
      contributor.namaContributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributor.institusi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributor.expertiseArea.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = filterRole === "all" || contributor.expertiseArea === filterRole

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

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    const roleLower = role.toLowerCase()
    if (roleLower.includes('research') || roleLower.includes('riset')) return BookOpen
    if (roleLower.includes('kurator') || roleLower.includes('curator')) return Award
    if (roleLower.includes('developer') || roleLower.includes('engineer')) return GraduationCap
    return Users
  }

  const getRoleColor = (role: string) => {
    const roleLower = role.toLowerCase()
    if (roleLower.includes('research') || roleLower.includes('riset')) return 'from-blue-100 to-blue-200 border-blue-200'
    if (roleLower.includes('kurator') || roleLower.includes('curator')) return 'from-purple-100 to-purple-200 border-purple-200'
    if (roleLower.includes('developer') || roleLower.includes('engineer')) return 'from-green-100 to-green-200 border-green-200'
    if (roleLower.includes('desain') || roleLower.includes('design')) return 'from-pink-100 to-pink-200 border-pink-200'
    return 'from-gray-100 to-gray-200 border-gray-200'
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
              Tim Peneliti & Kontributor
              <span className="text-primary block">UB Corpora</span>
            </h1>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={600}>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Tim multidisipliner yang berdedikasi untuk melestarikan dan mendokumentasikan 
              warisan budaya Jawa Timur melalui penelitian dan kolaborasi.
            </p>
          </AnimatedReveal>

          {/* Search and Filter */}
          <AnimatedReveal animation="fade-up" delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari nama, institusi, atau keahlian..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border focus:ring-primary/20"
                />
              </div>

              {/* Role Filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background/50 text-sm text-foreground shadow-sm cursor-pointer hover:bg-background transition-colors"
              >
                <option value="all">Semua Role</option>
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
              <div className="mt-4 text-sm text-muted-foreground">
                {searchQuery || filterRole !== "all" ? (
                  <>Menampilkan {filteredContributors.length} kontributor</>
                ) : (
                  <>Total {filteredContributors.length} kontributor</>
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
              <p className="text-muted-foreground">Memuat data kontributor...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Coba Lagi
              </Button>
            </div>
          </div>
        ) : paginatedContributors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedContributors.map((contributor, index) => {
                const RoleIcon = getRoleIcon(contributor.expertiseArea)
                const roleColor = getRoleColor(contributor.expertiseArea)

                return (
                  <motion.div
                    key={contributor.contributorId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-card/60 backdrop-blur-sm h-full">
                      <CardContent className="p-6">
                        {/* Header with Avatar and Role Badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${roleColor} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                            <span className="text-2xl font-bold text-foreground">
                              {contributor.namaContributor.charAt(0).toUpperCase()}
                            </span>
                          </div>

                          {contributor.assetCount !== undefined && contributor.assetCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {contributor.assetCount} Kontribusi
                            </Badge>
                          )}
                        </div>

                        {/* Name */}
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {contributor.namaContributor}
                        </h3>

                        {/* Role with Icon */}
                        <div className="flex items-center gap-2 mb-3">
                          <RoleIcon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            {contributor.expertiseArea}
                          </span>
                        </div>

                        {/* Institution */}
                        {contributor.institusi && (
                          <div className="flex items-start gap-2 mb-3">
                            <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {contributor.institusi}
                            </span>
                          </div>
                        )}

                        {/* Email */}
                        {contributor.email && (
                          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                            <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <a 
                              href={`mailto:${contributor.email}`}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors truncate"
                            >
                              {contributor.email}
                            </a>
                          </div>
                        )}

                        {/* Registration Date */}
                        {contributor.registeredAt && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            Bergabung: {new Date(contributor.registeredAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
                <div className="text-sm text-muted-foreground order-2 sm:order-1">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredContributors.length)} dari {filteredContributors.length} kontributor
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
                    <span className="hidden sm:inline ml-1">Sebelumnya</span>
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
                    <span className="hidden sm:inline mr-1">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="sm:hidden text-sm text-muted-foreground order-3">
                  Halaman {currentPage} dari {totalPages}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">Tidak ada kontributor ditemukan</p>
            <p className="text-sm text-muted-foreground">
              Coba kata kunci atau filter yang berbeda
            </p>
          </div>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  )
}