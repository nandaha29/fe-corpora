// components/cultural/global-search-results.tsx
"use client"

import { motion } from "framer-motion"
import { SearchCategoryFilter } from "./search-category-filter"
import { MapPin, BookOpen } from "lucide-react"

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

interface GlobalSearchResultsProps {
  searchQuery: string
  searchResults: SearchResult[]
  lexiconRegionMap: Record<string, string>
  isSearching: boolean
  selectedCategory: "subculture" | "lexicon" | "all"
  onCategoryChange: (category: "subculture" | "lexicon" | "all") => void
  onClear: () => void
  onRegionClick: (regionId: string) => void
  onLexiconClick: (termCode: string, term: string) => void
}

export function GlobalSearchResults({
  searchQuery,
  searchResults,
  lexiconRegionMap,
  isSearching,
  selectedCategory,
  onCategoryChange,
  onClear,
  onRegionClick,
  onLexiconClick,
}: GlobalSearchResultsProps) {
  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    try {
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-primary/20 text-primary font-semibold rounded px-1">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch (error) {
      // Jika regex error, return text biasa
      return text;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border p-4"
    >
      {/* Category Filter */}
      <SearchCategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        resultsCount={searchResults.length}
        onClear={onClear}
      />

      {/* Results List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {searchResults.length > 0 ? (
          searchResults.map((item, idx) => {
            const isRegion = item.type === "region";
            const Icon = isRegion ? MapPin : BookOpen;
            
            return (
              <motion.div
                key={`search-${item.type}-${isRegion ? item.id : item.termCode}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-lg border border-border bg-card/60 p-4 cursor-pointer hover:bg-card/80 hover:border-primary/50 transition-all`}
                onClick={() =>
                  isRegion && item.id
                    ? onRegionClick(item.id)
                    : !isRegion && onLexiconClick(item.termCode, item.term)
                }
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isRegion ? 'bg-blue-500/10' : 'bg-purple-500/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isRegion ? 'text-blue-500' : 'text-purple-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-foreground truncate">
                        {highlightText(
                          isRegion ? item.name || "" : item.term,
                          searchQuery
                        )}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${
                        isRegion 
                          ? 'bg-blue-500/10 text-blue-500' 
                          : 'bg-purple-500/10 text-purple-500'
                      }`}>
                        {isRegion ? "Region" : "Term"}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {highlightText(
                        isRegion ? item.description || "" : item.definition,
                        searchQuery
                      )}
                    </p>

                    {!isRegion && item.transliterasi && (
                      <div className="text-xs text-muted-foreground mt-2 italic">
                        Transliterasi: {item.transliterasi}
                      </div>
                    )}

                    {!isRegion && lexiconRegionMap[item.termCode] && (
                      <div className="text-xs text-primary mt-2 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>From: <span className="font-semibold">{lexiconRegionMap[item.termCode]}</span></span>
                      </div>
                    )}

                    {isRegion && item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.highlights.slice(0, 3).map((highlight, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 rounded bg-muted/50 text-muted-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                        {item.highlights.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded bg-muted/50 text-muted-foreground">
                            +{item.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-8">
            {isSearching ? (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary/30 border-t-primary" />
                <p className="text-sm">Searching...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-xs text-muted-foreground">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}