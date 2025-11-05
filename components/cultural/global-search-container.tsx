// components/cultural/global-search-container.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalSearchBar } from "./global-search-bar"
import { GlobalSearchResults } from "./global-search-results"

interface SearchResult {
  term: string
  definition: string
  transliterasi?: string
  termCode: string
  type: "lexicon" | "region"
  name?: string
  description?: string
  highlights?: string[]
  color?: string
  id?: string
}

interface GlobalSearchResponse {
  success: boolean
  message: string
  data: {
    results: SearchResult[]
    lexiconRegionMap: Record<string, string>
    total: number
  }
}

interface GlobalSearchContainerProps {
  onRegionSelect?: (regionId: string | null) => void
  showResultsInline?: boolean // NEW: Control where results appear
}

export function GlobalSearchContainer({ 
  onRegionSelect,
  showResultsInline = false // Default: results appear separately
}: GlobalSearchContainerProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState<"subculture" | "lexicon" | "all">("all")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [lexiconRegionMap, setLexiconRegionMap] = useState<Record<string, string>>({})
  const [isSearching, setIsSearching] = useState(false)

  // Global Search Handler
  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setShowSearchResults(false)
      setSearchResults([])
      setLexiconRegionMap({})
      onRegionSelect?.(null)
      return
    }

    try {
      setIsSearching(true)
      const url = `https://be-corpora.vercel.app/api/v1/search/global?q=${encodeURIComponent(
        query
      )}&category=${encodeURIComponent(searchCategory)}`
      
      const res = await fetch(url)
      if (!res.ok) throw new Error("Global search request failed")
      
      const json: GlobalSearchResponse = await res.json()

      if (json && json.success && json.data) {
        const results = json.data.results || []
        setSearchResults(results)
        setLexiconRegionMap(json.data.lexiconRegionMap || {})
        setShowSearchResults(true)

        // Auto-select first region
        const firstRegion = results.find((r) => r.type === "region")
        if (firstRegion && firstRegion.id) {
          onRegionSelect?.(firstRegion.id)
        } else {
          onRegionSelect?.(null)
        }
      } else {
        throw new Error(json?.message || "Invalid search response")
      }
    } catch (err) {
      console.error("Global search failed:", err)
      setSearchResults([])
      setShowSearchResults(true)
    } finally {
      setIsSearching(false)
    }
  }

  // Category Change Handler
  const handleCategoryChange = (category: "subculture" | "lexicon" | "all") => {
    setSearchCategory(category)
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
    }
  }

  // Clear Search Handler
  const handleClearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
    setSearchResults([])
    onRegionSelect?.(null)
  }

  // Navigation Handlers
  const handleRegionClick = (regionId: string) => {
    router.push(`/budaya/daerah/${regionId}`)
  }

  const handleLexiconClick = (termCode: string, term: string) => {
    const slug = term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    router.push(`/budaya/daerah/-/${slug}`)
  }

  return (
    <>
      {/* Search Bar - Always visible */}
      <GlobalSearchBar
        value={searchQuery}
        onChange={handleSearch}
        isSearching={isSearching}
      />

      {/* Results Count - Only show if there are results */}
      {(searchQuery || searchResults.length > 0) && !showResultsInline && (
        <div className="text-sm text-gray-200 mt-2">
          {searchQuery ? (
            <>Menampilkan {searchResults.length} hasil untuk "{searchQuery}"</>
          ) : (
            <>Total {searchResults.length} hasil</>
          )}
        </div>
      )}

      {/* Search Results - Conditionally rendered */}
      {showSearchResults && showResultsInline && (
        <GlobalSearchResults
          searchQuery={searchQuery}
          searchResults={searchResults}
          lexiconRegionMap={lexiconRegionMap}
          isSearching={isSearching}
          selectedCategory={searchCategory}
          onCategoryChange={handleCategoryChange}
          onClear={handleClearSearch}
          onRegionClick={handleRegionClick}
          onLexiconClick={handleLexiconClick}
        />
      )}
    </>
  )
}

// Export state for parent to access
export function useGlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState<"subculture" | "lexicon" | "all">("all")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [lexiconRegionMap, setLexiconRegionMap] = useState<Record<string, string>>({})
  const [isSearching, setIsSearching] = useState(false)

  return {
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    showSearchResults,
    setShowSearchResults,
    searchResults,
    setSearchResults,
    lexiconRegionMap,
    setLexiconRegionMap,
    isSearching,
    setIsSearching,
  }
}