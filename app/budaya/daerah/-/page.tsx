// app/budaya/daerah/-/page.tsx
"use client"

import { use, useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/layout/navigation"
import {
  ArrowLeft,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  AlertCircle,
  X,
} from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"

interface LexiconAsset {
  leksikonId: number
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
}

interface ContributorDetail {
  contributorId: number
  namaContributor: string
  institusi: string
  email: string
  expertiseArea: string
  contactInfo: string
  isCoordinator: boolean
  statusCoordinator: string
  registeredAt: string
}

interface DomainKodifikasi {
  domainKodifikasiId: number
  kode: string
  namaDomain: string
  penjelasan: string
  subcultureId: number
  status: string
  createdAt: string
  updatedAt: string
  subculture: {
    subcultureId: number
    namaSubculture: string
    slug: string
    salam_khas: string
    penjelasan: string
    cultureId: number
    status: string
    statusKonservasi: string
    createdAt: string
    updatedAt: string
    culture: {
      cultureId: number
      namaBudaya: string
      pulauAsal: string
      provinsi: string
      kotaDaerah: string
      klasifikasi: string
      karakteristik: string
      statusKonservasi: string
      latitude: number
      longitude: number
      status: string
      createdAt: string
      updatedAt: string
    }
  }
}

interface OriginalLexiconEntry {
  term: string
  definition: string
  regionKey: string
  subculture: {
    name: string
    province: string
  }
  domain: string
  contributor: string
  details: {
    ipa: string
    transliteration: string
    etymology: string
    culturalMeaning: string
    commonMeaning: string
    translation: string
    variants: string
    translationVariants: string
    otherDescription: string
  }
  audioFile?: string
  leksikonAssets?: LexiconAsset[]
}

interface AdvancedLexiconEntry {
  leksikonId: number
  kataLeksikon: string
  ipa: string
  transliterasi: string
  maknaEtimologi: string
  maknaKultural: string
  commonMeaning: string
  translation: string
  varian: string
  translationVarians: string | null
  deskripsiLain: string | null
  domainKodifikasiId: number
  statusPreservasi: string
  contributorId: number
  status: string
  createdAt: string
  updatedAt: string
  domainKodifikasi: DomainKodifikasi
  contributor: ContributorDetail
  leksikonAssets: any[]
}

type LexiconEntry = OriginalLexiconEntry | AdvancedLexiconEntry

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function isAdvancedEntry(entry: LexiconEntry): entry is AdvancedLexiconEntry {
  return 'kataLeksikon' in entry && 'domainKodifikasi' in entry
}

function normalizeLexiconEntry(entry: LexiconEntry): {
  term: string
  definition: string
  subcultureName: string
  province: string
  domain: string
  contributor: string
  regionKey: string
} {
  if (isAdvancedEntry(entry)) {
    return {
      term: entry.kataLeksikon || 'Unknown',
      definition: entry.commonMeaning || entry.maknaKultural || 'No definition available',
      subcultureName: entry.domainKodifikasi?.subculture?.namaSubculture || 'Unknown',
      province: entry.domainKodifikasi?.subculture?.culture?.provinsi || 'Unknown',
      domain: entry.domainKodifikasi?.namaDomain || 'General',
      contributor: entry.contributor?.namaContributor || 'Anonymous',
      regionKey: entry.domainKodifikasi?.subculture?.slug || 'unknown',
    }
  }
  
  return {
    term: entry.term || 'Unknown',
    definition: entry.definition || 'No definition available',
    subcultureName: entry.subculture?.name || 'Unknown',
    province: entry.subculture?.province || 'Unknown',
    domain: entry.domain || 'General',
    contributor: entry.contributor || 'Anonymous',
    regionKey: entry.regionKey || 'unknown',
  }
}

export default function AllCulturalWordsPage() {
  const { handleNavClick } = useNavigation()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [region, setRegion] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  // 🔧 FIX: Ubah tipe state dari OriginalLexiconEntry[] menjadi LexiconEntry[]
  const [allLexicons, setAllLexicons] = useState<LexiconEntry[]>([])
  const [filteredLexicons, setFilteredLexicons] = useState<LexiconEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  // ✅ FIX: Gunakan ref untuk track query yang sedang di-process
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const currentQueryRef = useRef<string>("")

  const referrer = searchParams.get('from')

  const handleBack = () => {
    if (referrer) {
      router.push(referrer)
    } else if (window.history.length > 2) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const getBackButtonText = () => {
    if (!referrer) return 'Kembali'
    if (referrer === '/') return 'Kembali ke Beranda'
    if (referrer === '/peta-budaya') return 'Kembali ke Peta Budaya'
    if (referrer.startsWith('/budaya/daerah/') && referrer !== '/budaya/daerah/-') {
      return 'Kembali ke Glosarium'
    }
    if (referrer === '/budaya') return 'Kembali ke Budaya'
    return 'Kembali'
  }

  // Fetch all lexicons on initial load
  useEffect(() => {
    const fetchAllLexicons = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/lexicons', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success && Array.isArray(result.data)) {
          const validLexicons = result.data.filter((item: any) => 
            item && 
            typeof item.term === 'string' && 
            item.term.trim() !== ''
          )
          // 🔧 FIX: Langsung simpan sebagai LexiconEntry[]
          setAllLexicons(validLexicons as LexiconEntry[])
          setFilteredLexicons(validLexicons as LexiconEntry[])
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load lexicons')
        setAllLexicons([])
        setFilteredLexicons([])
      } finally {
        setLoading(false)
      }
    }

    fetchAllLexicons()
  }, [])

  // ✅ FIX: Function untuk apply filter by region
  const applyRegionFilter = useCallback((data: LexiconEntry[], regionFilter: string): LexiconEntry[] => {
    if (regionFilter === "all") {
      return data
    }
    
    return data.filter((entry) => {
      if (isAdvancedEntry(entry)) {
        return entry.domainKodifikasi?.subculture?.slug === regionFilter
      }
      return entry.regionKey === regionFilter
    })
  }, [])

  // ✅ FIX: Improved search with better state management
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Update current query ref
    currentQueryRef.current = searchQuery

    const performSearch = async () => {
      const trimmedQuery = searchQuery.trim()
      
      console.log('🔍 Search Effect:', { 
        searchQuery,
        trimmedQuery,
        trimmedLength: trimmedQuery.length,
        currentQueryRef: currentQueryRef.current,
        region
      })
      
      // ✅ CRITICAL FIX: Check if query is empty
      if (trimmedQuery.length === 0) {
        console.log('📋 EMPTY QUERY - Resetting to all data')
        setIsSearching(false)
        
        // Apply region filter to all data
        const results = applyRegionFilter([...allLexicons], region)
        
        console.log('✅ Reset complete:', results.length, 'results')
        setFilteredLexicons(results)
        return
      }

      // ✅ Only search if query has content
      console.log('🌐 Performing search for:', trimmedQuery)
      setIsSearching(true)
      
      try {
        const response = await fetch(
          `https://be-corpora.vercel.app/api/v1/search/advanced?kata=${encodeURIComponent(trimmedQuery)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        // ✅ CRITICAL: Check if query changed during API call
        if (currentQueryRef.current.trim() !== trimmedQuery) {
          console.log('⚠️ Query changed during API call, ignoring results')
          return
        }

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`)
        }

        const result = await response.json()

        // ✅ CRITICAL: Double check query hasn't changed
        if (currentQueryRef.current.trim() !== trimmedQuery) {
          console.log('⚠️ Query changed after API response, ignoring results')
          return
        }

        if (result.success && Array.isArray(result.data)) {
          // 🔧 FIX: Cast result.data sebagai LexiconEntry[] dan apply region filter
          const searchResults = result.data as LexiconEntry[]
          const results = applyRegionFilter(searchResults, region)
          
          console.log('✅ API Results:', results.length)
          setFilteredLexicons(results)
        } else {
          console.log('⚠️ API returned no results')
          setFilteredLexicons([])
        }
      } catch (err) {
        console.error('Search error:', err)
        
        // ✅ Check query hasn't changed before applying fallback
        if (currentQueryRef.current.trim() !== trimmedQuery) {
          console.log('⚠️ Query changed during error, skipping fallback')
          return
        }
        
        // Fallback to client-side search
        const query = trimmedQuery.toLowerCase()
        let results = allLexicons.filter((entry) => {
          // 🔧 FIX: Gunakan normalized entry untuk consistent search
          const normalized = normalizeLexiconEntry(entry)
          
          const termMatch = normalized.term?.toLowerCase().includes(query)
          const definitionMatch = normalized.definition?.toLowerCase().includes(query)
          const domainMatch = normalized.domain?.toLowerCase().includes(query)
          const subcultureMatch = normalized.subcultureName?.toLowerCase().includes(query)
          const contributorMatch = normalized.contributor?.toLowerCase().includes(query)
          
          // Untuk AdvancedEntry, search di field tambahan
          if (isAdvancedEntry(entry)) {
            const transliterasiMatch = entry.transliterasi?.toLowerCase().includes(query)
            const ipaMatch = entry.ipa?.toLowerCase().includes(query)
            const kulturalMatch = entry.maknaKultural?.toLowerCase().includes(query)
            
            return (
              termMatch ||
              definitionMatch ||
              domainMatch ||
              subcultureMatch ||
              contributorMatch ||
              transliterasiMatch ||
              ipaMatch ||
              kulturalMatch
            )
          }
          
          // Untuk OriginalEntry, search di details
          const transliterationMatch = entry.details?.transliteration?.toLowerCase().includes(query)
          const ipaMatch = entry.details?.ipa?.toLowerCase().includes(query)
          const commonMeaningMatch = entry.details?.commonMeaning?.toLowerCase().includes(query)
          const culturalMeaningMatch = entry.details?.culturalMeaning?.toLowerCase().includes(query)

          return (
            termMatch ||
            definitionMatch ||
            transliterationMatch ||
            ipaMatch ||
            domainMatch ||
            subcultureMatch ||
            commonMeaningMatch ||
            culturalMeaningMatch ||
            contributorMatch
          )
        })
        
        // Apply region filter
        results = applyRegionFilter(results, region)
        
        console.log('✅ Fallback Results:', results.length)
        setFilteredLexicons(results)
      } finally {
        // ✅ Only stop loading if query hasn't changed
        if (currentQueryRef.current.trim() === trimmedQuery) {
          setIsSearching(false)
        }
      }
    }

    // Set new debounce timer
    debounceTimerRef.current = setTimeout(performSearch, 300)

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, region, allLexicons, applyRegionFilter])

  // 🔧 FIX: Get unique regions dari allLexicons dengan proper type handling
  const regions = Array.from(new Set(
    allLexicons.map(entry => {
      if (isAdvancedEntry(entry)) {
        return entry.domainKodifikasi?.subculture?.slug
      }
      return entry.regionKey
    }).filter(Boolean)
  )).sort()

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [region, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredLexicons.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedEntries = filteredLexicons.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1)
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
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
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

  // ✅ FIX: Clear search handler
  const handleClearSearch = () => {
    console.log('🧹 Clearing search - setting to empty string')
    setSearchQuery("")
    currentQueryRef.current = ""
  }

  return (
    <div className="min-h-screen bg-[#111827] text-foreground">
      {/* Header */}
      <header className="text-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{getBackButtonText()}</span>
            </button>

            {!referrer && (
              <Link href="/">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Beranda</span>
                </button>
              </Link>
            )}
          </div>
        </div>

        <Badge
          variant="secondary"
          className="bg-blue-950/60 text-blue-300 border border-blue-900 px-4 py-1 rounded-full mb-4"
        >
          🧩 LEKSIKON BUDAYA
        </Badge>

        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Jelajahi Leksikon Budaya
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Temukan kekayaan istilah dan tradisi dari berbagai sub-budaya Jawa Timur.
        </p>

        {/* Filter + Search */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground">
              Filter Subkultur:
            </label>
            <select
              id="region-filter"
              className="px-4 py-2 rounded-md border border-border bg-background text-sm text-foreground shadow-sm cursor-pointer"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="all">Semua Leksikon</option>
              {regions.map((rk) => (
                <option key={rk} value={rk}>
                  {rk}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none z-10" />
            <Input
              placeholder="Cari istilah budaya..."
              value={searchQuery}
              onChange={(e) => {
                const newValue = e.target.value
                console.log('📝 Input onChange:', newValue)
                setSearchQuery(newValue)
              }}
              className="pl-10 pr-10 bg-background/50 border-border focus:ring-primary/20"
            />
            {/* Clear button - only show when there's text */}
            {searchQuery.length > 0 && !isSearching && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10"
                aria-label="Clear search"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {/* Loading indicator */}
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>

        {/* Results info */}
        {!loading && (
          <div className="mt-4 text-sm text-muted-foreground">
            {isSearching ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Mencari...
              </span>
            ) : (
              <>
                Menampilkan {filteredLexicons.length} hasil
                {searchQuery.trim() && ` untuk "${searchQuery.trim()}"`}
                {region !== "all" && ` di ${region}`}
              </>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat leksikon budaya...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-500 mb-2 font-semibold">Terjadi Kesalahan</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="cursor-pointer"
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            {paginatedEntries.length > 0 ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-8">
                {paginatedEntries.map((entry, index) => {
                  const normalized = normalizeLexiconEntry(entry)
                  const termSlug = slugify(normalized.term)
                  const uniqueKey = isAdvancedEntry(entry) 
                    ? `advanced-${entry.leksikonId}-${index}` 
                    : `original-${normalized.term}-${index}`
                  
                  return (
                    <motion.div
                      key={uniqueKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="bg-card/40 border border-border backdrop-blur-sm rounded-2xl p-4 transition-all hover:shadow-lg hover:border-primary/40 h-full flex flex-col">
                        <CardHeader className="pb-2 flex items-center justify-between">
                          <CardTitle className="text-xl font-semibold text-foreground">
                            {normalized.term}
                          </CardTitle>
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="text-lg">🧺</span>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
                            {normalized.definition}
                          </p>

                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <span className="font-medium">Subkultur:</span> {normalized.subcultureName} ({normalized.province})
                          </div>

                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <span className="font-medium">Domain:</span> {normalized.domain}
                          </div>

                          <div className="flex items-center text-xs text-muted-foreground mb-4">
                            <span className="font-medium">Kontributor:</span> {normalized.contributor}
                          </div>

                          <div className="flex justify-between items-center mt-auto">
                            <Link href={`/budaya/daerah/-/${termSlug}`} className="flex-1 mr-2">
                              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white w-full cursor-pointer">
                                Detail
                              </Button>
                            </Link>
                            <Link href={`/budaya/daerah/${normalized.regionKey}`}>
                              <Button
                                variant="outline"
                                className="border border-border hover:bg-background/60 cursor-pointer"
                              >
                                Subculture
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </section>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">Tidak ada hasil ditemukan</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery.trim()
                    ? `Tidak ada leksikon yang cocok dengan "${searchQuery.trim()}"` 
                    : 'Coba kata kunci atau filter yang berbeda'}
                </p>
                {(searchQuery || region !== "all") && (
                  <Button 
                    onClick={() => {
                      setSearchQuery("")
                      setRegion("all")
                      currentQueryRef.current = ""
                    }}
                    variant="outline"
                    className="mt-4 cursor-pointer"
                  >
                    Reset Filter
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {filteredLexicons.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
                <div className="text-sm text-muted-foreground order-2 sm:order-1">
                  Menampilkan <span className="font-medium text-foreground">{startIndex + 1}</span>-
                  <span className="font-medium text-foreground">{Math.min(endIndex, filteredLexicons.length)}</span> dari{' '}
                  <span className="font-medium text-foreground">{filteredLexicons.length}</span> leksikon
                </div>

                <div className="flex items-center gap-2 order-1 sm:order-2">
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Sebelumnya</span>
                  </Button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-muted-foreground">
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

                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'
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
        )}
      </main>
    </div>
  )
}