// app/gallery/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { Camera, Image as ImageIcon, Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

interface GalleryAsset {
  assetId: number
  namaFile: string
  tipe: string
  penjelasan: string
  url: string
  lexiconTerm?: string
  lexiconSlug?: string
  regionKey?: string
  contributor?: {
    namaContributor: string
    institusi: string
  }
}

export default function GalleryPage() {
  const router = useRouter()
  const { handleNavClick } = useNavigation()
  const [assets, setAssets] = useState<GalleryAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  useEffect(() => {
    const fetchGalleryAssets = async () => {
      try {
        setLoading(true)
        // Fetch collaboration assets dari landing API
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/landing')
        if (!response.ok) throw new Error('Failed to fetch gallery data')
        
        const result = await response.json()
        if (result.success && result.data.collaborationAssets) {
          // Filter hanya image assets
          const imageAssets = result.data.collaborationAssets
            .filter((ca: any) => ca.asset.tipe === 'image')
            .map((ca: any) => ({
              assetId: ca.asset.assetId,
              namaFile: ca.asset.namaFile,
              tipe: ca.asset.tipe,
              penjelasan: ca.asset.penjelasan,
              url: ca.asset.url,
              contributor: {
                namaContributor: ca.contributor.namaContributor,
                institusi: ca.contributor.institusi
              }
            }))
          
          setAssets(imageAssets)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryAssets()
  }, [])

  // Filter assets based on search
  const filteredAssets = assets.filter((asset) =>
    asset.namaFile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.penjelasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.contributor?.namaContributor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedAssets = filteredAssets.slice(startIndex, endIndex)

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedReveal animation="fade-up" delay={200}>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Camera className="h-3 w-3 mr-1" />
              Cultural Gallery
            </Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={400}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Gallery Budaya
              <span className="text-primary block">Jawa Timur</span>
            </h1>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={600}>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Jelajahi koleksi foto dan dokumentasi kegiatan budaya dari berbagai leksikon dan acara budaya di Jawa Timur.
            </p>
          </AnimatedReveal>

          {/* Search Bar */}
          <AnimatedReveal animation="fade-up" delay={800}>
            <div className="relative max-w-md mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari foto, kontributor, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border focus:ring-primary/20"
              />
            </div>
          </AnimatedReveal>

          {/* Results Info */}
          {(searchQuery || filteredAssets.length > 0) && (
            <AnimatedReveal animation="fade-up" delay={1000}>
              <div className="mt-4 text-sm text-muted-foreground">
                {searchQuery ? (
                  <>Menampilkan {filteredAssets.length} hasil untuk "{searchQuery}"</>
                ) : (
                  <>Total {filteredAssets.length} foto</>
                )}
              </div>
            </AnimatedReveal>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Memuat gallery...</p>
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
        ) : paginatedAssets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedAssets.map((asset, index) => (
                <motion.div
                  key={asset.assetId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card/60 backdrop-blur-sm h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={asset.url || "/placeholder.svg"}
                        alt={asset.namaFile}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {asset.namaFile}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                          {asset.penjelasan}
                        </p>
                      </div>

                      {/* Contributor Info */}
                      {asset.contributor && (
                        <div className="pt-3 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-primary">
                                {asset.contributor.namaContributor.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">
                                {asset.contributor.namaContributor}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {asset.contributor.institusi}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
                <div className="text-sm text-muted-foreground order-2 sm:order-1">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredAssets.length)} dari {filteredAssets.length} foto
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
            <p className="text-muted-foreground mb-2">Tidak ada foto ditemukan</p>
            <p className="text-sm text-muted-foreground">
              Coba kata kunci yang berbeda
            </p>
          </div>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  )
}