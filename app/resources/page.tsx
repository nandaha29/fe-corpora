// app/resource/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { Camera, Image as ImageIcon, Loader2, Search, Library } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface GalleryAsset {
  referensiId: number
  judul: string
  tipeReferensi: string
  penjelasan: string
  url: string
  penulis: string
  tahunTerbit: string
  createdAt?: string
  updatedAt?: string
}

export default function ResourcePage() {
  const router = useRouter()
  const { handleNavClick } = useNavigation()
  const [assets, setAssets] = useState<GalleryAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchResourceAssets = async () => {
      try {
        setLoading(true)
        // Fetch references dari backend API
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/references')
        if (!response.ok) throw new Error('Failed to fetch resource data')
        
        const result = await response.json()
        if (result.success && result.data) {
          // Process references data
          const references = result.data.map((ref: any) => ({
            referensiId: ref.referensiId,
            judul: ref.judul,
            tipeReferensi: ref.tipeReferensi,
            penjelasan: ref.penjelasan,
            url: ref.url,
            penulis: ref.penulis,
            tahunTerbit: ref.tahunTerbit,
            createdAt: ref.createdAt,
            updatedAt: ref.updatedAt
          }))
          
          setAssets(references)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchResourceAssets()
  }, [])

  // Filter assets based on search
  const filteredAssets = assets.filter((asset) =>
    asset.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.penjelasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.penulis.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAssets = filteredAssets.slice(startIndex, endIndex)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

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
              Cultural Resource & References
            </Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={400}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cultural Resource
              <span className="text-primary block">East Java</span>
            </h1>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={600}>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore resource collections and documentation of cultural activities from various lexicons and cultural events in East Java.
            </p>
          </AnimatedReveal>

          {/* Search Bar */}
          <AnimatedReveal animation="fade-up" delay={800}>
            <div className="relative max-w-md mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by title, author, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border focus:ring-primary/20"
              />
            </div>
          </AnimatedReveal>

          {/* Results Info */}
          {(searchQuery || filteredAssets.length > 0) && (
            <AnimatedReveal animation="fade-up" delay={1000}>
              <div className="mt-4 text-lg text-muted-foreground">
                {searchQuery ? (
                  <>Showing {filteredAssets.length} results for "{searchQuery}"</>
                ) : (
                  <>Total {filteredAssets.length} references</>
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
              <p className="text-muted-foreground">Loading references...</p>
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
        ) : filteredAssets.length > 0 ? (
          <>
            {/* References Section */}
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
                      <h3 className="text-xl text-muted-foreground">
                        {filteredAssets.length} academic sources • Page {currentPage} of {totalPages}
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paginatedAssets.map((asset, idx) => (
                      <div
                        key={asset.referensiId}
                        className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-xl text-foreground line-clamp-2 flex-1">
                            {asset.judul}
                          </h4>
                        </div>
                        <h3 className="text-xl text-muted-foreground mb-2">
                          {asset.penulis} • {asset.tahunTerbit}
                        </h3>
                        {asset.penjelasan && (
                          <h3 className="text-xl text-muted-foreground mb-2 line-clamp-2">
                            {asset.penjelasan}
                          </h3>
                        )}
                        <div className="flex gap-1 flex-wrap">
                          <Badge variant="outline" className="text-xl">
                            {asset.tipeReferensi}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <div className="text-lg text-muted-foreground">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredAssets.length)} of {filteredAssets.length} references
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                            if (pageNum > totalPages) return null
                            
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className="w-8 h-8 p-0"
                              >
                                {pageNum}
                              </Button>
                            )
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">No references found</p>
            <p className="text-lg text-muted-foreground">
              Try different keywords
            </p>
          </div>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  )
}