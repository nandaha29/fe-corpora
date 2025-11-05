// app/budaya/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Home, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { Footer } from "@/components//layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface SubcultureData {
  id: string
  name: string
  description: string
  image: string | null
  culture: {
    name: string
    province: string
  }
}

export default function SubculturesGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subcultures, setSubcultures] = useState<SubcultureData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { handleNavClick, handleCategoryNavigation } = useNavigation()
  const router = useRouter()
  const searchParams = useSearchParams()

  // ===== PAGINATION STATE =====
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 8
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null)

  // Get referrer from URL params
  const referrer = searchParams.get('from')

  useEffect(() => {
    const fetchSubcultures = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }
        params.append('page', currentPage.toString());
        params.append('limit', ITEMS_PER_PAGE.toString());

                const response = await fetch(`https://be-corpora.vercel.app/api/v1/public/subcultures?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setSubcultures(result.data || []);
          setPagination(result.pagination);
          // Sync currentPage with server response
          if (result.pagination && result.pagination.page !== currentPage) {
            setCurrentPage(result.pagination.page);
          }
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setSubcultures([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcultures();
  }, [searchQuery, currentPage]);

  // Smart back navigation
  const handleBack = () => {
    if (referrer) {
      router.push(referrer)
    } else if (window.history.length > 2) {
      router.back()
    } else {
      router.push('/')
    }
  }

  // Get back button text based on referrer
  const getBackButtonText = () => {
    if (!referrer) return 'Kembali'
    
    if (referrer === '/') return 'Kembali ke Beranda'
    if (referrer === '/peta-budaya') return 'Kembali ke Peta Budaya'
    if (referrer === '/tentang') return 'Kembali ke Tentang'
    
    return 'Kembali'
  }

  const handleCategoryClick = (category: string) => {
    handleCategoryNavigation(category)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1) // Reset to page 1 when searching
  }

  // ===== PAGINATION LOGIC =====
  const totalPages = pagination?.totalPages || 0;
  const paginatedSubcultures = subcultures; // Already paginated from server

  // Computed pagination helpers
  const hasPrev = pagination ? pagination.page > 1 : false;
  const hasNext = pagination ? pagination.page < pagination.totalPages : false;

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  // Generate page numbers to display
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

  return (
    <div className="min-h-screen bg-[#111827] text-foreground">
      {/* === HEADER === */}
      <header className="text-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{getBackButtonText()}</span>
            </button>

            {/* Home Button (fallback) */}
            {!referrer && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Beranda</span>
              </Button>
            )}
          </div>
        </div>

        {/* Badge */}
        <Badge
          variant="secondary"
          className="bg-blue-950/60 text-blue-300 border border-blue-900 px-4 py-1 rounded-full mb-4"
        >
          🗺️ SUBKULTUR BUDAYA
        </Badge>

        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Jelajahi Subkultur Budaya
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Setiap subkultur memiliki karakter dan tradisi unik yang memperkaya identitas budaya Jawa Timur.
          Pilih salah satu wilayah untuk menjelajah lebih jauh.
        </p>

        {/* === Search Bar === */}
        <AnimatedReveal animation="fade-up" delay={150}>
          <div className="relative max-w-md mx-auto mt-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari wilayah budaya..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-background/50 border border-border focus:ring-primary/20"
              />
            </div>
          </div>
        </AnimatedReveal>

        {/* Results info */}
        {(searchQuery || subcultures.length > 0) && (
          <div className="mt-4 text-sm text-muted-foreground">
            {searchQuery ? (
              <>
                Menampilkan {pagination?.total || 0} hasil
                {searchQuery && ` untuk "${searchQuery}"`}
              </>
            ) : (
              <>Total {pagination?.total || 0} subkultur</>
            )}
          </div>
        )}
      </header>

      {/* === CONTENT === */}
      <main className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading subcultures...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            {paginatedSubcultures.length > 0 ? (
              <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr mb-8">
                {paginatedSubcultures.map((sc, index) => (
                  <motion.div
                    key={sc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="group relative overflow-hidden rounded-2xl bg-card/40 border border-border backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/40 h-full flex flex-col">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${sc.image || "/placeholder.jpg"}')` }}
                          role="img"
                          aria-label={`Image of ${sc.name}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                            {sc.culture?.province || "Sub-region"}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-2">
                          {sc.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                          {sc.description}
                        </p>

                        <EnhancedButton
                          size="lg"
                          className="w-full cursor-pointer mt-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white border-none"
                          onClick={() => router.push(`/budaya/daerah/${sc.id}`)}
                        >
                          Explore
                        </EnhancedButton>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </section>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">Tidak ada hasil ditemukan</p>
                <p className="text-sm text-muted-foreground">
                  Coba kata kunci yang berbeda
                </p>
              </div>
            )}

            {/* Pagination */}
            {subcultures.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
                {/* Info */}
                <div className="text-sm text-muted-foreground order-2 sm:order-1">
                  Menampilkan <span className="font-medium text-foreground">{pagination ? (pagination.page - 1) * pagination.limit + 1 : 0}</span>-
                  <span className="font-medium text-foreground">{pagination ? Math.min(pagination.page * pagination.limit, pagination.total) : 0}</span> dari{' '}
                  <span className="font-medium text-foreground">{pagination?.total || 0}</span> subkultur
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2 order-1 sm:order-2">
                  {/* Previous Button */}
                  <Button
                    onClick={goToPreviousPage}
                    disabled={!hasPrev}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all ${
                      !hasPrev
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Sebelumnya</span>
                  </Button>

                  {/* Page Numbers */}
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
                          className={`min-w-[40px] cursor-pointer transition-all ${
                            currentPage === page
                              ? 'bg-primary text-primary-foreground font-semibold'
                              : 'hover:bg-primary/10'
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <Button
                    onClick={goToNextPage}
                    disabled={!hasNext}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all ${
                      !hasNext
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    <span className="hidden sm:inline mr-1">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile: Page Info */}
                <div className="sm:hidden text-sm text-muted-foreground order-3">
                  Halaman {pagination?.page || 1} dari {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer onNavClick={handleNavClick} onCategoryClick={handleCategoryClick} />
    </div>
  )
}