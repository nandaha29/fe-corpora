// app/peta-budaya/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import Image from "next/image";
import { ParallaxBackground } from "@/components/common/parallax-background";
import { Navigation } from "@/components/layout/navigation";
import { AdvancedPopupMap, REGIONS } from "@/components/cultural/advanced-popup-map";
import { GlobalSearchBar } from "@/components/cultural/global-search-bar";
import { GlobalSearchResults } from "@/components/cultural/global-search-results";

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

export default function PetaBudayaPage() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<"subculture" | "lexicon" | "all">("all");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [lexiconRegionMap, setLexiconRegionMap] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);
  
  // Ref untuk tracking search query yang sedang diproses
  const searchQueryRef = useRef<string>("");
  const searchAbortControllerRef = useRef<AbortController | null>(null);

  // Global Search Handler dengan debounce dan abort controller
  const handleSearch = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQuery(query);
    searchQueryRef.current = trimmedQuery;

    // Abort previous search request
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    // Reset jika query kosong
    if (!trimmedQuery) {
      console.log('🔍 Empty query - resetting search');
      setShowSearchResults(false);
      setSearchResults([]);
      setLexiconRegionMap({});
      setSelectedRegion(null);
      setIsSearching(false);
      return;
    }

    // Validasi minimum length
    if (trimmedQuery.length < 2) {
      console.log('🔍 Query too short - minimum 2 characters');
      return;
    }

    try {
      setIsSearching(true);
      
      // Create new abort controller
      const abortController = new AbortController();
      searchAbortControllerRef.current = abortController;

      const url = `https://be-corpora.vercel.app/api/v1/search/global?q=${encodeURIComponent(
        trimmedQuery
      )}&category=${encodeURIComponent(searchCategory)}`;
      
      console.log('🔍 Searching:', { query: trimmedQuery, category: searchCategory });
      
      const res = await fetch(url, {
        signal: abortController.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if query changed during fetch
      if (searchQueryRef.current !== trimmedQuery) {
        console.log('⚠️ Query changed during fetch, ignoring results');
        return;
      }

      if (!res.ok) {
        throw new Error(`Search request failed: ${res.status}`);
      }
      
      const json: GlobalSearchResponse = await res.json();

      // Double check query hasn't changed
      if (searchQueryRef.current !== trimmedQuery) {
        console.log('⚠️ Query changed after fetch, ignoring results');
        return;
      }

      console.log('✅ Search response:', json);

      if (json && json.success && json.data) {
        const results = json.data.results || [];
        
        // Filter results based on category
        let filteredResults = results;
        if (searchCategory === "lexicon") {
          filteredResults = results.filter(r => r.type === "lexicon");
        } else if (searchCategory === "subculture") {
          filteredResults = results.filter(r => r.type === "region");
        }

        console.log('📊 Filtered results:', {
          total: results.length,
          filtered: filteredResults.length,
          category: searchCategory
        });

        setSearchResults(filteredResults);
        setLexiconRegionMap(json.data.lexiconRegionMap || {});
        setShowSearchResults(true);

        // Auto-select first region if available
        const firstRegion = filteredResults.find((r) => r.type === "region");
        if (firstRegion && firstRegion.id) {
          setSelectedRegion(firstRegion.id);
        } else {
          setSelectedRegion(null);
        }
      } else {
        console.warn('⚠️ Invalid search response:', json);
        setSearchResults([]);
        setLexiconRegionMap({});
        setShowSearchResults(true);
      }
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('🚫 Search aborted');
        return;
      }

      console.error('❌ Global search failed:', err);
      
      // Only show error if query hasn't changed
      if (searchQueryRef.current === trimmedQuery) {
        setSearchResults([]);
        setLexiconRegionMap({});
        setShowSearchResults(true);
      }
    } finally {
      // Only stop loading if query hasn't changed
      if (searchQueryRef.current === trimmedQuery) {
        setIsSearching(false);
      }
    }
  }, [searchCategory]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // Category Change Handler
  const handleCategoryChange = useCallback((category: "subculture" | "lexicon" | "all") => {
    console.log('🏷️ Category changed:', category);
    setSearchCategory(category);
    
    // Re-filter existing results
    if (searchResults.length > 0) {
      let filteredResults = searchResults;
      if (category === "lexicon") {
        filteredResults = searchResults.filter(r => r.type === "lexicon");
      } else if (category === "subculture") {
        filteredResults = searchResults.filter(r => r.type === "region");
      }
      setSearchResults(filteredResults);
    }
  }, [searchResults]);

  // Clear Search Handler
  const handleClearSearch = useCallback(() => {
    console.log('🧹 Clearing search');
    setSearchQuery("");
    searchQueryRef.current = "";
    setShowSearchResults(false);
    setSearchResults([]);
    setLexiconRegionMap({});
    setSelectedRegion(null);
    
    // Abort any ongoing search
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }
  }, []);

  // Navigation Handlers
  const handleRegionClick = useCallback((regionId: string) => {
    console.log('🗺️ Region clicked:', regionId);
    router.push(`/budaya/daerah/${regionId}`);
  }, [router]);

  const handleLexiconClick = useCallback((termCode: string, term: string) => {
    console.log('📖 Lexicon clicked:', { termCode, term });
    const slug = term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    router.push(`/budaya/daerah/-/${slug}`);
  }, [router]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Navigation
          onNavClick={(section) => {
            const element = document.getElementById(section);
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Hero Section */}
        <section className="relative">
          <ParallaxBackground className="relative h-[320px] md:h-[420px] overflow-hidden">
            <Image
              src="/east-java-temple-sunset-landscape-with-traditional.jpg"
              alt="Cultural landscape of East Java"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background/20 to-background/90" />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-10">
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm text-gray-200 mb-3"
              >
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link href="/daerah/id" className="hover:underline">
                      Subcultural Regions
                    </Link>
                  </li>
                </ol>
              </motion.nav>
              
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-white"
              >
                Discover the Living Tapestry of East Java
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-2 md:mt-3 text-sm md:text-base text-gray-200 max-w-2xl"
              >
                Navigate an elegant cultural map to explore regions, traditions,
                artifacts, and events—curated to reveal identity, history, and
                significance with clarity and beauty.
              </motion.p>

              {/* Search Bar - Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
              >
                <Link href="/budaya/daerah/-?from=/peta-budaya" className="flex-shrink-0">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 cursor-pointer whitespace-nowrap"
                  >
                    Lexicons Glosarium
                  </Button>
                </Link>

                <GlobalSearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  isSearching={isSearching}
                  className="flex-1"
                />
              </motion.div>

              {/* Results Info - Hero Section */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-gray-200"
                >
                  {isSearching ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Searching...
                    </span>
                  ) : (
                    <>
                      {searchResults.length > 0 ? (
                        <>Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</>
                      ) : (
                        <>No results found for "{searchQuery}"</>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </ParallaxBackground>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="w-full">
            {/* Search Results - Main Content Area */}
            {showSearchResults && searchQuery && (
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

            {/* Map Section */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Interactive Map of East Java
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? 
                        `Showing results for "${searchQuery}"` : 
                        'Hover over regions to explore their cultural heritage'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-[600px]">
                <AdvancedPopupMap onRegionClick={handleRegionClick} />
              </div>
            </div>

            {/* Selected Region Preview */}
            <AnimatePresence>
              {selectedRegion && !showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border p-6"
                >
                  {(() => {
                    const region = REGIONS.find((r) => r.id === selectedRegion);
                    if (!region) return null;

                    return (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-foreground">
                            {region.name} — Cultural Glossary
                          </h3>
                          <Link href={`/budaya/daerah/${region.id}`}>
                            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                              View Full Glossary
                            </Button>
                          </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click to explore the full cultural glossary and traditions.
                        </p>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* How it Works Section */}
        <section className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 md:p-5"
          >
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  1
                </span>
                Hover over any region on the map to see detailed information instantly.
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  2
                </span>
                Use the search box to find specific regions and their cultural highlights.
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  3
                </span>
                Click on a region to explore its full cultural glossary and traditions.
              </li>
            </ul>
          </motion.div>
        </section>
      </div>
    </TooltipProvider>
  );
}