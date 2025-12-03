// app/budaya/daerah/-/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/navigation";
import {
  ArrowLeft,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  AlertCircle,
  X,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useNavigation } from "@/hooks/use-navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";
import { useLexicons, useDomainSearch } from "@/hooks/use-api";

interface LexiconAsset {
  leksikonId: number;
  assetId: number;
  assetRole: string;
  createdAt: string;
  asset: {
    assetId: number;
    namaFile: string;
    tipe: string;
    penjelasan: string;
    url: string;
    fileSize: string;
    hashChecksum: string;
    metadataJson: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ContributorDetail {
  contributorId: number;
  namaContributor: string;
  institusi: string;
  email: string;
  expertiseArea: string;
  contactInfo: string;
  isCoordinator: boolean;
  statusCoordinator: string;
  registeredAt: string;
}

interface DomainKodifikasi {
  domainKodifikasiId: number;
  kode: string;
  namaDomain: string;
  penjelasan: string;
  subcultureId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  subculture: {
    subcultureId: number;
    namaSubculture: string;
    slug: string;
    salam_khas: string;
    penjelasan: string;
    cultureId: number;
    status: string;
    statusKonservasi: string;
    createdAt: string;
    updatedAt: string;
    culture: {
      cultureId: number;
      namaBudaya: string;
      pulauAsal: string;
      provinsi: string;
      kotaDaerah: string;
      klasifikasi: string;
      karakteristik: string;
      statusKonservasi: string;
      latitude: number;
      longitude: number;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface OriginalLexiconEntry {
  id?: string | number;
  term: string;
  definition: string;
  regionKey: string;
  subculture: {
    name: string;
    province: string;
  };
  domain: string;
  contributor: string;
  details: {
    ipa: string;
    transliteration: string;
    etymology: string;
    culturalMeaning: string;
    commonMeaning: string;
    translation: string;
    variants: string;
    translationVariants: string;
    otherDescription: string;
  };
  audioFile?: string;
  leksikonAssets?: LexiconAsset[];
}

interface AdvancedLexiconEntry {
  leksikonId: number;
  kataLeksikon: string;
  ipa: string;
  transliterasi: string;
  maknaEtimologi: string;
  maknaKultural: string;
  commonMeaning: string;
  translation: string;
  varian: string;
  translationVarians: string | null;
  deskripsiLain: string | null;
  domainKodifikasiId: number;
  statusPreservasi: string;
  contributorId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  domainKodifikasi: DomainKodifikasi;
  contributor: ContributorDetail;
  leksikonAssets: any[];
}

type LexiconEntry = OriginalLexiconEntry | AdvancedLexiconEntry;

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function isAdvancedEntry(entry: LexiconEntry): entry is AdvancedLexiconEntry {
  return "kataLeksikon" in entry && "domainKodifikasi" in entry;
}

// Helper function to get lexicon ID from entry
function getLexiconId(entry: LexiconEntry): string | number | null {
  if (isAdvancedEntry(entry)) {
    return entry.leksikonId;
  }
  return entry.id || null;
}

function normalizeLexiconEntry(entry: LexiconEntry): {
  term: string;
  definition: string;
  subcultureName: string;
  province: string;
  domain: string;
  contributor: string;
  regionKey: string;
  lexiconId: string | number | null;
} {
  if (isAdvancedEntry(entry)) {
    return {
      term: entry.kataLeksikon || "Unknown",
      definition:
        entry.commonMeaning || entry.maknaKultural || "No definition available",
      subcultureName:
        entry.domainKodifikasi?.subculture?.namaSubculture || "Unknown",
      province:
        entry.domainKodifikasi?.subculture?.culture?.provinsi || "Unknown",
      domain: entry.domainKodifikasi?.namaDomain || "General",
      contributor: entry.contributor?.namaContributor || "Anonymous",
      regionKey: entry.domainKodifikasi?.subculture?.slug || "unknown",
      lexiconId: entry.leksikonId,
    };
  }

  return {
    term: entry.term || "Unknown",
    definition: entry.definition || "No definition available",
    subcultureName: entry.subculture?.name || "Unknown",
    province: entry.subculture?.province || "Unknown",
    domain: entry.domain || "General",
    contributor: entry.contributor || "Anonymous",
    regionKey: entry.regionKey || "unknown",
    lexiconId: entry.id || null,
  };
}

export default function AllCulturalWordsPage() {
  const { handleNavClick } = useNavigation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [region, setRegion] = useState<string>("all");
  const [domain, setDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [lexiconTranslations, setLexiconTranslations] = useState<Record<string, string>>({});

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to page 1 when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Create mapping from domain name to domain_id
  // First, fetch all lexicons to build the mapping (only when domain filter is active)
  const { 
    data: allLexiconsForMapping, 
    error: mappingError 
  } = useLexicons(
    region !== "all" ? region : undefined,
    undefined, // No search query for mapping
    undefined, // No pagination for mapping
    undefined // No limit for mapping
  );

  // Build domain name to domain_id mapping
  const domainIdMap = useMemo(() => {
    const map: Record<string, number> = {};
    if (allLexiconsForMapping?.data) {
      const lexicons = Array.isArray(allLexiconsForMapping.data) 
        ? allLexiconsForMapping.data 
        : allLexiconsForMapping.data;
      
      lexicons.forEach((entry: any) => {
        if (entry.domainKodifikasi?.domainKodifikasiId && entry.domainKodifikasi?.namaDomain) {
          map[entry.domainKodifikasi.namaDomain] = entry.domainKodifikasi.domainKodifikasiId;
        }
      });
    }
    return map;
  }, [allLexiconsForMapping]);

  // Get domain_id from selected domain
  const selectedDomainId = domain !== "all" ? domainIdMap[domain] : null;

  // Use domain search endpoint when domain filter is active
  const { 
    data: domainSearchResponse, 
    error: domainSearchError, 
    isLoading: isLoadingDomainSearch 
  } = useDomainSearch(
    selectedDomainId || undefined,
    debouncedSearchQuery || undefined,
    domain !== "all" ? currentPage : undefined,
    domain !== "all" ? ITEMS_PER_PAGE : undefined
  );

  // Use regular lexicons endpoint when domain filter is not active
  const { 
    data: lexiconsResponse, 
    error: fetchError, 
    isLoading: isLoadingLexicons 
  } = useLexicons(
    region !== "all" ? region : undefined,
    debouncedSearchQuery || undefined,
    domain === "all" ? currentPage : undefined,
    domain === "all" ? ITEMS_PER_PAGE : undefined
  );

  // Extract data and pagination from response
  // Use domain search response if domain filter is active, otherwise use regular lexicons response
  const lexiconsData = useMemo(() => {
    if (domain !== "all" && selectedDomainId) {
      // Use domain search response
      if (!domainSearchResponse) return { data: [], pagination: null };
      if (Array.isArray(domainSearchResponse)) {
        return { data: domainSearchResponse, pagination: null };
      }
      return {
        data: domainSearchResponse.data || [],
        pagination: domainSearchResponse.pagination || null,
      };
    } else {
      // Use regular lexicons response
      if (!lexiconsResponse) return { data: [], pagination: null };
      if (Array.isArray(lexiconsResponse)) {
        return { data: lexiconsResponse, pagination: null };
      }
      return {
        data: lexiconsResponse.data || [],
        pagination: lexiconsResponse.pagination || null,
      };
    }
  }, [domain, selectedDomainId, domainSearchResponse, lexiconsResponse]);

  // Process lexicons
  const allLexicons = useMemo<LexiconEntry[]>(() => {
    if (!lexiconsData.data) return [];
    return lexiconsData.data.filter(
      (item: any) =>
        item && typeof (item.term || item.kataLeksikon) === "string" && 
        (item.term || item.kataLeksikon).trim() !== ""
    ) as LexiconEntry[];
  }, [lexiconsData.data]);

  // No need for client-side domain filtering anymore since we use domain search endpoint
  const filteredLexicons = allLexicons;
  
  const loading = domain !== "all" && selectedDomainId 
    ? isLoadingDomainSearch 
    : isLoadingLexicons;
  const error = domain !== "all" && selectedDomainId
    ? (domainSearchError ? (domainSearchError instanceof Error ? domainSearchError.message : "Failed to load lexicons") : null)
    : (fetchError ? (fetchError instanceof Error ? fetchError.message : "Failed to load lexicons") : null);


  const referrer = searchParams.get("from");

  const handleBack = () => {
    if (referrer) {
      router.push(referrer);
    } else if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const getBackButtonText = () => {
    if (!referrer) return "Back";
    if (referrer === "/") return "Back to Home";
    if (referrer === "/peta-budaya") return "Back to Cultural Map";
    if (
      referrer.startsWith("/budaya/daerah/") &&
      referrer !== "/budaya/daerah/-"
    ) {
      return "Back to Glossary";
    }
    if (referrer === "/budaya") return "Back to Culture";
    return "Back";
  };

  // Fetch translations for lexicons when data is loaded
  useEffect(() => {
    if (!filteredLexicons || filteredLexicons.length === 0) {
      return;
    }

    // Fetch translations for lexicons that don't have translations yet
    const entriesToFetch = filteredLexicons.filter((entry: LexiconEntry) => {
      const lexiconId = getLexiconId(entry);
      return lexiconId !== null && !lexiconTranslations[lexiconId.toString()];
    });

    if (entriesToFetch.length > 0) {
      // Fetch translations in parallel
      Promise.all(
        entriesToFetch.map(async (entry: LexiconEntry) => {
          const lexiconId = getLexiconId(entry);
          if (!lexiconId) return null;
          try {
            const detailResponse = await fetch(
              `${API_BASE_URL}lexicons/${lexiconId}`
            );
            if (!detailResponse.ok) return null;
            const detailResult = await detailResponse.json();
            if (detailResult.success && detailResult.data) {
              const translation = detailResult.data.details?.translation || "";
              return { lexiconId: lexiconId.toString(), translation };
            }
          } catch (error) {
            console.error(`Error fetching translation for ${lexiconId}:`, error);
          }
          return null;
        })
      ).then((translations) => {
        // Build translation map
        const translationMap: Record<string, string> = {};
        translations.forEach((t) => {
          if (t) {
            translationMap[t.lexiconId] = t.translation;
          }
        });
        
        // Set translations (merge with existing)
        if (Object.keys(translationMap).length > 0) {
          setLexiconTranslations((prev) => ({ ...prev, ...translationMap }));
        }
      });
    }
  }, [filteredLexicons, lexiconTranslations]);


  // 🔧 FIX: Get unique regions dari allLexicons dengan proper type handling
  const regions = Array.from(
    new Set(
      allLexicons
        .map((entry) => {
          if (isAdvancedEntry(entry)) {
            return entry.domainKodifikasi?.subculture?.slug;
          }
          return entry.regionKey;
        })
        .filter(Boolean)
    )
  ).sort();

  // 🔧 FIX: Get unique domains dari allLexicons dengan proper type handling
  const domains = Array.from(
    new Set(
      allLexicons
        .map((entry) => {
          if (isAdvancedEntry(entry)) {
            return entry.domainKodifikasi?.namaDomain;
          }
          return entry.domain;
        })
        .filter(Boolean)
    )
  ).sort();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [region, debouncedSearchQuery, domain]);

  // Server-side pagination: API already paginated the data for both cases
  const paginatedEntries = filteredLexicons;
  
  // Calculate total pages - use server-side pagination from API
  const totalPages = useMemo(() => {
    if (lexiconsData.pagination) {
      // Try to use totalPages first
      if (lexiconsData.pagination.totalPages && lexiconsData.pagination.totalPages > 0) {
        return lexiconsData.pagination.totalPages;
      }
      // Fallback: calculate from totalItems
      if (lexiconsData.pagination.totalItems && lexiconsData.pagination.totalItems > 0) {
        return Math.ceil(lexiconsData.pagination.totalItems / ITEMS_PER_PAGE);
      }
    }
    
    // Fallback: if we have exactly ITEMS_PER_PAGE items, assume there might be more pages
    if (filteredLexicons.length === ITEMS_PER_PAGE) {
      return 2;
    }
    
    // Otherwise, calculate from current data
    if (filteredLexicons.length === 0) return 0;
    const calculatedPages = Math.ceil(filteredLexicons.length / ITEMS_PER_PAGE);
    return Math.max(1, calculatedPages);
  }, [lexiconsData.pagination, filteredLexicons.length, ITEMS_PER_PAGE]);

  // Debug: log pagination info (remove in production)
  useEffect(() => {
    if (!loading && filteredLexicons.length > 0) {
      console.log('🔍 Pagination Debug:', {
        totalPages,
        filteredLexiconsLength: filteredLexicons.length,
        currentPage,
        ITEMS_PER_PAGE,
        hasPagination: !!lexiconsData.pagination,
        pagination: lexiconsData.pagination,
        domain,
        shouldShow: totalPages > 1
      });
    }
  }, [totalPages, filteredLexicons.length, currentPage, loading, lexiconsData.pagination, domain]);
  
  // Calculate display info
  const startIndex = useMemo(() => {
    if (domain === "all" && lexiconsData.pagination) {
      return (currentPage - 1) * ITEMS_PER_PAGE + 1;
    } else {
      return (currentPage - 1) * ITEMS_PER_PAGE + 1;
    }
  }, [domain, lexiconsData.pagination, currentPage, ITEMS_PER_PAGE]);
  
  const endIndex = useMemo(() => {
    if (domain === "all" && lexiconsData.pagination) {
      return Math.min(
        currentPage * ITEMS_PER_PAGE,
        lexiconsData.pagination.totalItems || filteredLexicons.length
      );
    } else {
      return Math.min(currentPage * ITEMS_PER_PAGE, filteredLexicons.length);
    }
  }, [domain, lexiconsData.pagination, currentPage, ITEMS_PER_PAGE, filteredLexicons.length]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Clear search handler
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#111827] text-foreground">
      {/* Header */}
      <header className="text-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-base md:text-lg text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{getBackButtonText()}</span>
            </button>

            {!referrer && (
              <Link href="/">
                <button className="flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </button>
              </Link>
            )}
          </div>
        </div>

        <Badge
          variant="secondary"
          className="bg-blue-950/60 text-blue-300 text-lg border border-blue-900 px-4 py-1 rounded-full mb-4"
        >
          🧩 Cultural Lexicon
        </Badge>

        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Explore Cultural Lexicons of East Java
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Explore East Java’s rich vocabulary and cultural expressions — each term reflecting deep tradition, history, and local wisdom. Search, filter by subculture, and experience the language of heritage.
        </p>

        {/* Filter + Search */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="region-filter"
              className="text-xl font-medium text-muted-foreground"
            >
              Subculture Filter:
            </label>
            <select
              id="region-filter"
              className="px-4 py-2 rounded-md border border-border bg-background text-lg text-foreground shadow-sm cursor-pointer"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="all">All Lexicons</option>
              {regions.map((rk) => (
                <option key={rk} value={rk}>
                  {rk}
                </option>
              ))}
            </select>
          </div>

                    <div className="flex items-center gap-2">
            <label
              htmlFor="domain-filter"
              className="text-xl font-medium text-muted-foreground"
            >
              Domain Filter:
            </label>
            <select
              id="domain-filter"
              className="px-4 py-2 rounded-md border border-border bg-background text-lg text-foreground shadow-sm cursor-pointer"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value="all">All Domains</option>
              {domains.map((dk) => (
                <option key={dk} value={dk}>
                  {dk}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none z-10" />
            <Input
              placeholder="Search Cultural Term..."
              value={searchQuery}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log("📝 Input onChange:", newValue);
                setSearchQuery(newValue);
              }}
              className="pl-10 pr-10 bg-background/50 border-border focus:ring-primary/20"
            />
            {/* Clear button - only show when there's text */}
            {searchQuery.length > 0 && searchQuery === debouncedSearchQuery && (
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
            {loading && searchQuery !== debouncedSearchQuery && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>

        {/* Results info */}
        {!loading && (
          <div className="mt-4 text-lg text-muted-foreground">
            {searchQuery !== debouncedSearchQuery ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </span>
            ) : (
              <>
                {lexiconsData.pagination ? (
                  <>
                    Showing {startIndex}-{endIndex} of {lexiconsData.pagination.totalItems || filteredLexicons.length} results
                    {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
                    {region !== "all" && ` in ${region}`}
                    {domain !== "all" && ` domain ${domain}`}
                  </>
                ) : (
                  <>
                    Showing {filteredLexicons.length} result
                    {debouncedSearchQuery && ` untuk "${debouncedSearchQuery}"`}
                    {region !== "all" && ` di ${region}`}
                    {domain !== "all" && ` dalam domain ${domain}`}
                  </>
                )}
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
              <h3 className="text-xl text-muted-foreground">Loading...</h3>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-500 mb-2 font-semibold">
                Error
              </p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="cursor-pointer"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            {paginatedEntries.length > 0 ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-8">
                {paginatedEntries.map((entry, index) => {
                  const normalized = normalizeLexiconEntry(entry);
                  const termSlug = slugify(normalized.term);
                  const uniqueKey = isAdvancedEntry(entry)
                    ? `advanced-${entry.leksikonId}-${index}`
                    : `original-${normalized.term}-${index}`;

                  return (
                    <motion.div
                      key={uniqueKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="bg-card/40 border border-border backdrop-blur-sm rounded-2xl p-4 transition-all hover:shadow-lg hover:border-primary/40 h-full flex flex-col">
                        <CardHeader className="pb-2 flex items-center justify-between">
                          <CardTitle className="text-2xl font-extrabold text-foreground capitalize leading-tight">
                            {normalized.term.charAt(0).toUpperCase() + normalized.term.slice(1)}
                          </CardTitle>
                          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="text-xl">🧺</span>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col">
                          <h3 className="text-xl text-muted-foreground mb-6 line-clamp-3 flex-1">
                            {(() => {
                              const translation = normalized.lexiconId && lexiconTranslations[normalized.lexiconId.toString()]
                                ? lexiconTranslations[normalized.lexiconId.toString()]
                                : null;
                              
                              if (!translation || translation.trim() === "" || translation === "NaN") {
                                return "Translation not available";
                              }
                              
                              return translation;
                            })()}
                          </h3>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-bold text-lg text-muted-foreground">Subculture:</span>
                            <span className="bg-blue-950/60 text-blue-300 text-base border border-blue-900 px-3 py-1 rounded-full font-semibold">
                              {normalized.subcultureName}
                            </span>
                            <span className="bg-blue-950/40 text-blue-200 text-base border border-blue-900 px-3 py-1 rounded-full font-medium">
                              {normalized.province}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-bold text-lg text-muted-foreground">Domain:</span>
                            <span className="bg-blue-950/60 text-blue-300 text-base border border-blue-900 px-3 py-1 rounded-full font-semibold">
                              {normalized.domain}
                            </span>
                          </div>

                          {/* <div className="flex items-center text-lg text-muted-foreground mb-6">
                            <span className="font-bold">Contributor:</span>{" "}
                            {normalized.contributor}
                          </div> */}

                          <div className="flex justify-between items-center mt-auto">
                            <Link
                              href={`/budaya/daerah/-/${termSlug}`}
                              className="flex-1 mr-2"
                            >
                              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white w-full cursor-pointer text-lg py-3">
                                Detail
                              </Button>
                            </Link>
                            <Link
                              href={`/budaya/daerah/${normalized.regionKey}`}
                            >
                              <Button
                                variant="outline"
                                className="border border-border hover:bg-background/60 cursor-pointer text-lg py-3"
                              >
                                Subculture
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </section>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">
                  No Result
                </p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery.trim()
                    ? ` There are no lexicons that match "${searchQuery.trim()}"`
                    : "Coba kata kunci atau filter yang berbeda"}
                </p>
                {(debouncedSearchQuery || region !== "all" || domain !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setRegion("all");
                      setDomain("all");
                    }}
                    variant="outline"
                    className="mt-4 cursor-pointer"
                  >
                    Reset Filter
                  </Button>
                )}
              </div>
            )}

            {/* Pagination - Show if there's data and (more than 1 page OR exactly ITEMS_PER_PAGE items which suggests more pages) */}
            {!loading && filteredLexicons.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border text-lg">
                <div className="text-lg text-muted-foreground order-2 sm:order-1">
                  {lexiconsData.pagination ? (
                    <>
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {startIndex}
                      </span>
                      -
                      <span className="font-medium text-foreground">
                        {endIndex}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-foreground">
                        {lexiconsData.pagination.totalItems || filteredLexicons.length}
                      </span>{" "}
                      Lexicons
                    </>
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {startIndex}
                      </span>
                      -
                      <span className="font-medium text-foreground">
                        {endIndex}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-foreground">
                        {filteredLexicons.length}
                      </span>{" "}
                      Lexicons
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 order-1 sm:order-2 text-lg">
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all text-lg ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline ml-1">Previous</span>
                  </Button>

                  <div className="flex items-center gap-1 text-lg">
                    {getPageNumbers().map((pageNum, idx) => {
                      if (pageNum === "...") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-3 py-2 text-muted-foreground text-lg"
                          >
                            ...
                          </span>
                        );
                      }

                      const page = pageNum as number;
                      return (
                        <Button
                          key={page}
                          onClick={() => goToPage(page)}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className={`min-w-[40px] cursor-pointer transition-all text-lg ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "hover:bg-primary/10"
                          }`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all text-lg ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <span className="hidden sm:inline mr-1">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                <div className="sm:hidden text-lg text-muted-foreground order-3">
                  Pages {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
