// app/budaya/daerah/[id]/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { Navigation } from "@/components/layout/navigation";
import { useNavigation } from "@/hooks/use-navigation";
import { Footer } from "@/components/layout/footer";
import { Model3DSection, type Model3D } from "@/components/sections/model-3d-section";
import { YouTubeSection, type YouTubeVideo } from "@/components/sections/youtube-section";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/utils";

interface SearchResult {
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
  domainKodifikasi: {
    domainKodifikasiId: number;
    kode: string;
    namaDomain: string;
    penjelasan: string;
    subculture: {
      subcultureId: number;
      namaSubculture: string;
      slug: string;
      culture: {
        cultureId: number;
        namaBudaya: string;
        provinsi: string;
        kotaDaerah: string;
      };
    };
  };
  contributor: {
    contributorId: number;
    namaContributor: string;
    institusi: string;
  };
  leksikonAssets: any[];
  term: string;
  definition: string;
  category: string;
  region: string;
  slug: string;
}

interface SubcultureData {
  subcultureId: number;
  profile: {
    displayName: string;
    history: string;
    highlights: any[];
  };
  galleryImages: Array<{ 
    url: string;
    description?: string;
    caption?: string;
  }>;
  model3dArray: Array<{
    sketchfabId: string;
    title: string;
    description: string;
    artifactType: string;
    tags: any[];
  }>;
  lexicon: Array<{
    term: string;
    definition: string;
    category: string;
    slug: string;
  }>;
  heroImage: string | null;
  videoUrl?: string; // Added this field
  culture: {
    name: string;
    province: string;
    region: string;
  };
}

interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

interface ApiSuccessResponse {
  success: true;
  data: SubcultureData;
  message?: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export default function RegionDetailPage() {
  const params = useParams();
  const regionId = params.id as string;

  const { handleNavClick } = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [subcultureData, setSubcultureData] = useState<SubcultureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<{
    statusCode?: number;
    technicalError?: string;
  } | null>(null);

  const [isNavSticky, setIsNavSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("region-profile");

  const [showLexiconOnly, setShowLexiconOnly] = useState(false);

  // Lexicon state for server-side search
  const [lexiconItems, setLexiconItems] = useState<SearchResult[]>([]);
  const [lexiconLoading, setLexiconLoading] = useState(false);

  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryAutoPlaying, setIsGalleryAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DURATION = 5000;

  // Fetch subculture data
  useEffect(() => {
    const fetchSubcultureData = async () => {
      try {
        setLoading(true);
        setError(null);
        setErrorDetails(null);

        const response = await fetch(
          `https://be-corpora.vercel.app/api/v1/public/subcultures/${regionId}`
        );

        const result: ApiResponse = await response.json();

        if (!result.success) {
          const errorResponse = result as ApiErrorResponse;
          setError(errorResponse.message || "Failed to fetch subculture data");
          setErrorDetails({
            statusCode: errorResponse.statusCode || response.status,
            technicalError: errorResponse.error,
          });
          setSubcultureData(null);
          return;
        }

        if (!response.ok) {
          setError(result.message || `HTTP Error: ${response.status} ${response.statusText}`);
          setErrorDetails({
            statusCode: response.status,
          });
          setSubcultureData(null);
          return;
        }

        const successResponse = result as ApiSuccessResponse;
        setSubcultureData(successResponse.data);
        setError(null);
        setErrorDetails(null);

      } catch (err) {
        console.error("Fetch error:", err);
        
        if (err instanceof TypeError && err.message.includes("fetch")) {
          setError("Network error: Unable to connect to the server. Please check your internet connection.");
        } else if (err instanceof SyntaxError) {
          setError("Data parsing error: Received invalid response from server.");
        } else {
          setError(err instanceof Error ? err.message : "An unexpected error occurred");
        }
        
        setErrorDetails({
          technicalError: err instanceof Error ? err.toString() : "Unknown error",
        });
        setSubcultureData(null);
      } finally {
        setLoading(false);
      }
    };

    if (regionId) {
      fetchSubcultureData();
    }
  }, [regionId]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setErrorDetails(null);
    window.location.reload();
  };

  // Gallery images with safety checks and proper structure
  const galleryImages = useMemo(() => {
    if (subcultureData?.galleryImages && subcultureData.galleryImages.length > 0) {
      return subcultureData.galleryImages.map((img, idx) => ({
        url: img.url || "/placeholder.svg",
        description: img.description || `${subcultureData.profile?.displayName} - Image ${idx + 1}`,
        caption: img.caption || `Cultural heritage of ${subcultureData.profile?.displayName}`
      }));
    }
    
    // Fallback images
    return [
      {
        url: "/subculture-gallery-1.jpg",
        description: "Traditional Architecture",
        caption: "Historic buildings showcasing traditional design"
      },
      {
        url: "/subculture-gallery-2.jpg",
        description: "Cultural Ceremonies",
        caption: "Local ceremonies and traditional practices"
      },
      {
        url: "/subculture-gallery-3.jpg",
        description: "Daily Life",
        caption: "Everyday activities and community life"
      },
    ];
  }, [subcultureData]);

  useEffect(() => {
    if (currentGalleryIndex >= galleryImages.length) {
      setCurrentGalleryIndex(0);
    }
  }, [galleryImages.length, currentGalleryIndex]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    if (galleryImages.length <= 1) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentGalleryIndex((prev) => {
        const nextIndex = (prev + 1) % galleryImages.length;
        return Math.max(0, Math.min(nextIndex, galleryImages.length - 1));
      });
    }, AUTOPLAY_DURATION);
  }, [galleryImages.length]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isGalleryAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isGalleryAutoPlaying, startAutoPlay, stopAutoPlay]);

  const goToPreviousImage = () => {
    setIsGalleryAutoPlaying(false);
    stopAutoPlay();
    setCurrentGalleryIndex((prev) => {
      const newIndex = prev === 0 ? (galleryImages.length - 1) : prev - 1;
      return Math.max(0, Math.min(newIndex, galleryImages.length - 1));
    });
  };

  const goToNextImage = () => {
    setIsGalleryAutoPlaying(false);
    stopAutoPlay();
    setCurrentGalleryIndex((prev) => {
      const newIndex = (prev + 1) % galleryImages.length;
      return Math.max(0, Math.min(newIndex, galleryImages.length - 1));
    });
  };

  const goToImage = (index: number) => {
    setIsGalleryAutoPlaying(false);
    stopAutoPlay();
    const safeIndex = Math.max(0, Math.min(index, galleryImages.length - 1));
    setCurrentGalleryIndex(safeIndex);
  };

  const toggleAutoPlay = () => {
    setIsGalleryAutoPlaying((prev) => !prev);
  };

  // Transform model3dArray to Model3D format
  const models3D: Model3D[] = useMemo(() => {
    if (subcultureData?.model3dArray && subcultureData.model3dArray.length > 0) {
      return subcultureData.model3dArray.map((model) => ({
        id: model.sketchfabId,
        title: model.title,
        description: model.description,
        artifactType: model.artifactType,
        tags: model.tags,
      }));
    }
    return [];
  }, [subcultureData]);

  // Transform videoUrl to YouTubeVideo format
  const youtubeVideos: YouTubeVideo[] = useMemo(() => {
    const videos: YouTubeVideo[] = [];
    
    // Add video from videoUrl field
    if (subcultureData?.videoUrl) {
      const videoId = extractYouTubeId(subcultureData.videoUrl);
      if (videoId) {
        videos.push({
          videoId: videoId,
          title: `${subcultureData.profile?.displayName} - Cultural Documentation`,
          description: subcultureData.profile?.history || "Explore the cultural heritage and traditions",
          thumbnail: getYouTubeThumbnail(videoId, "maxres"),
          duration: "",
        });
      }
    }
    
    return videos;
  }, [subcultureData]);

  // Search functionality - fetch all lexicon entries for subculture on load
  useEffect(() => {
    const fetchLexiconData = async () => {
      // Don't fetch if subculture data is not loaded yet
      if (!subcultureData?.subcultureId) {
        return;
      }

      // If no search query, fetch all entries for this subculture
      if (!searchQuery.trim()) {
        setLexiconLoading(true);

        try {
          const searchParams = new URLSearchParams();
          searchParams.append('subculture_id', subcultureData.subcultureId.toString());

          const response = await fetch(
            `https://be-corpora.vercel.app/api/v1/search/advanced?${searchParams.toString()}`
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const result = await response.json();

          if (result.success && result.data) {
            const lexicons = result.data;
            const mappedItems = lexicons.map((entry: any) => ({
              ...entry,
              // Add computed fields for compatibility
              term: entry.kataLeksikon,
              definition: entry.commonMeaning || entry.translation || entry.maknaKultural,
              category: entry.domainKodifikasi?.namaDomain || "",
              region: entry.domainKodifikasi?.subculture?.namaSubculture || "",
              slug: entry.kataLeksikon
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
            }));

            setLexiconItems(mappedItems);
          } else {
            setLexiconItems([]);
          }
        } catch (error) {
          console.error('Initial lexicon load error:', error);
          setLexiconItems([]);
        } finally {
          setLexiconLoading(false);
        }
        return;
      }

      // If there is a search query, search within the subculture
      setLexiconLoading(true);

      try {
        const searchParams = new URLSearchParams();
        searchParams.append('kata', searchQuery.trim());
        searchParams.append('subculture_id', subcultureData.subcultureId.toString());

        const response = await fetch(
          `https://be-corpora.vercel.app/api/v1/search/advanced?${searchParams.toString()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const lexicons = result.data;
          const mappedItems = lexicons.map((entry: any) => ({
            ...entry,
            // Add computed fields for compatibility
            term: entry.kataLeksikon,
            definition: entry.commonMeaning || entry.translation || entry.maknaKultural,
            category: entry.domainKodifikasi?.namaDomain || "",
            region: entry.domainKodifikasi?.subculture?.namaSubculture || "",
            slug: entry.kataLeksikon
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, ""),
          }));

          setLexiconItems(mappedItems);
        } else {
          setLexiconItems([]);
        }
      } catch (error) {
        console.error('Advanced search error:', error);
        setLexiconItems([]);
      } finally {
        setLexiconLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchLexiconData, searchQuery ? 300 : 0);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, subcultureData?.subcultureId]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64;
      setIsNavSticky(window.scrollY > headerHeight);

      const sections = [
        "region-profile",
        "photo-gallery",
        "viewer-3d",
        "youtube-videos",
        "search-and-explore",
      ];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // No longer needed since we removed pagination
  }, [searchQuery]);

  // Use server-side data for display
  const displayItems = lexiconItems;

  function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const SCROLL_OFFSET = 96;
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    } else {
      window.location.hash = `#${id}`;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading subculture details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
        <div className="max-w-md w-full">
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>

            <h1 className="text-2xl font-bold text-center text-foreground mb-3">
              Unable to Load Subculture
            </h1>

            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-destructive font-medium text-center">
                {error}
              </p>
            </div>

            {errorDetails && (
              <details className="mb-6">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors mb-2">
                  Technical Details
                </summary>
                <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                  {errorDetails.statusCode && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Status Code:</span> {errorDetails.statusCode}
                    </p>
                  )}
                  {errorDetails.technicalError && (
                    <p className="text-xs text-muted-foreground break-all">
                      <span className="font-medium">Error:</span> {errorDetails.technicalError}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Region ID:</span> {regionId}
                  </p>
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleRetry}
                className="flex-1 gap-2 cursor-pointer"
                variant="default"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Link href="/peta-budaya" className="flex-1">
                <Button variant="outline" className="w-full cursor-pointer">
                  Back to Map
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              If the problem persists, please contact support or try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!subcultureData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Subculture Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The subculture "{regionId}" could not be found in our database.
          </p>
          <Link href="/peta-budaya">
            <Button variant="outline" className="cursor-pointer">
              <MapPin className="w-4 h-4 mr-2" />
              Back to Culture Map
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentGalleryImage = galleryImages[currentGalleryIndex] || galleryImages[0] || {
    url: "/placeholder.svg",
    description: "Gallery Image",
    caption: "Cultural heritage image"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />

      {/* Hero Section */}
      <section aria-label="Hero" className="relative overflow-hidden border-b border-border">
        <div className="relative">
          <img
            src={subcultureData.heroImage || "/placeholder.svg"}
            alt={`${regionId} cultural landscape`}
            className="h-[65vh] md:h-[80vh] w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-16 lg:px-24">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-gray-200 mb-3"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link href="/peta-budaya" className="hover:underline">Culture Map</Link>
                </li>
              </ol>
            </motion.nav>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Discover the Living Tapestry of{" "}
              {subcultureData.profile?.displayName || regionId}
            </motion.h1>

            <motion.p
              className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Navigate an elegant cultural map to explore regions, traditions,
              artifacts, and events—curated to reveal identity, history, and
              significance with clarity and beauty.
            </motion.p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 space-y-8 scroll-smooth">
        {/* Navigation Tabs */}
        <nav
          aria-label="Halaman sub-bab"
          className={`bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b border-border transition-shadow duration-200 ${
            isNavSticky ? "shadow-md" : ""
          }`}
        >
          <div className="container mx-auto px-4">
            <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar items-center">
              <li>
                <a
                  href="#region-profile"
                  onClick={(e) => {
                    scrollToSection(e, "region-profile");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "region-profile" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Profile Subkulture
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <a
                  href="#photo-gallery"
                  onClick={(e) => {
                    scrollToSection(e, "photo-gallery");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "photo-gallery" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Photo Gallery
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <a
                  href="#viewer-3d"
                  onClick={(e) => {
                    scrollToSection(e, "viewer-3d");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "viewer-3d" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Model 3D
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <a
                  href="#youtube-videos"
                  onClick={(e) => {
                    scrollToSection(e, "youtube-videos");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "youtube-videos" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Video YouTube
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <button
                  onClick={() => {
                    setShowLexiconOnly(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Kumpulan kata
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {!showLexiconOnly ? (
          <>
            {/* Region Profile Section */}
            <section
              id="region-profile"
              className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24"
            >
              {(() => {
                const profile = subcultureData.profile;
                if (!profile)
                  return (
                    <p className="text-sm text-muted-foreground">
                      Detailed profile for this subculture is not yet available.
                    </p>
                  );

                const { displayName, history } = profile;

                return (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      About {displayName}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {history}
                    </p>
                  </div>
                );
              })()}
            </section>

            {/* Photo Gallery Section */}
            <section
              id="photo-gallery"
              className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Serba-serbi {subcultureData.profile?.displayName}
              </h2>

              {/* Main Carousel Display */}
              <div className="relative rounded-xl overflow-hidden border border-border bg-background/50 mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGalleryIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-video"
                  >
                    <img
                      src={currentGalleryImage.url}
                      alt={currentGalleryImage.description}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold mb-2"
                      >
                        {currentGalleryImage.description}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-200"
                      >
                        {currentGalleryImage.caption}
                      </motion.p>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {currentGalleryIndex + 1} / {galleryImages.length}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={goToPreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Auto-play toggle */}
                {galleryImages.length > 1 && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <button
                      onClick={toggleAutoPlay}
                      className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-black/70 transition-colors"
                    >
                      {isGalleryAutoPlaying ? "⏸ Pause" : "▶ Play"}
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        idx === currentGalleryIndex
                          ? "border-primary shadow-lg scale-105"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="aspect-video">
                        <img
                          src={img.url || "/placeholder.svg"}
                          alt={img.description || `Gallery image ${idx + 1}`}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                      {idx === currentGalleryIndex && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs truncate">
                          {img.description || `Image ${idx + 1}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Progress indicator */}
              {isGalleryAutoPlaying && galleryImages.length > 1 && (
                <div className="mt-4">
                  <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden">
                    <motion.div
                      key={`progress-${currentGalleryIndex}`}
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: AUTOPLAY_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* 3D Model Section */}
            <section
              id="viewer-3d"
              className="scroll-mt-24"
            >
              <Model3DSection
                models={models3D}
                title="3D Cultural Artifacts & Environments"
                description={`Explore interactive 3D models of cultural artifacts and the environment of the ${subcultureData.profile?.displayName} tribe.`}
                subcultureName={subcultureData.profile?.displayName}
                showControls={true}
                autoRotate={true}
                height="600px"
              />
            </section>

            {/* YouTube Videos Section */}
            <section
              id="youtube-videos"
              className="scroll-mt-24"
            >
              <YouTubeSection
                videos={youtubeVideos}
                title="Cultural Documentation Videos"
                description={`Watch cultural documentation videos and daily life of the ${subcultureData.profile?.displayName} tribe.`}
                subcultureName={subcultureData.profile?.displayName}
                autoPlay={false}
                showThumbnails={true}
                columns={3}
              />
            </section>
          </>
        ) : (
          <>
            {/* Lexicon Section */}
            <section
              id="search-and-explore"
              className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24"
            >
              <div className="flex flex-col gap-4" role="search">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {subcultureData.profile?.displayName} Cultural Lexicon
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse all lexicon entries for {subcultureData.profile?.displayName}. Use the search box below to filter terms by word, meaning,
                    transliteration, or cultural context specific to this subculture.
                  </p>
                </div>
                <SearchInput
                  aria-label={`Search within ${subcultureData.profile?.displayName} cultural lexicon`}
                  placeholder={`Search terms, meanings, transliterations in ${subcultureData.profile?.displayName}...`}
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery("")}
                  resultCount={displayItems.length}
                  showResultCount={true}
                />
              </div>
            </section>

            <section aria-label="Lexicon search results" className="scroll-mt-24">
              {(() => {
                if (lexiconLoading) {
                  return (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">
                          {searchQuery ? `Searching ${subcultureData.profile?.displayName} lexicon...` : `Loading ${subcultureData.profile?.displayName} lexicon...`}
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <>
                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {displayItems.map((entry, i) => {
                        const termSlug = entry.term
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "");

                        return (
                          <article
                            key={`${entry.term}-${i}`}
                            className="rounded-xl shadow-sm border bg-card/60 border-border overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="px-4 py-3">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-foreground text-lg">
                                  {entry.kataLeksikon}
                                </h3>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  {entry.domainKodifikasi?.subculture?.namaSubculture}
                                </span>
                              </div>

                              {entry.transliterasi && (
                                <p className="text-sm text-muted-foreground mb-1">
                                  <span className="font-medium">Transliteration:</span> {entry.transliterasi}
                                </p>
                              )}

                              {entry.ipa && (
                                <p className="text-sm text-muted-foreground mb-2 font-mono">
                                  <span className="font-medium">IPA:</span> {entry.ipa}
                                </p>
                              )}

                              <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                                {entry.commonMeaning || entry.translation || entry.maknaKultural}
                              </p>

                              {entry.domainKodifikasi?.namaDomain && (
                                <p className="text-xs text-primary/70 mb-2">
                                  Category: {entry.domainKodifikasi.namaDomain}
                                </p>
                              )}

                              {entry.varian && entry.varian !== "Belum ditemukan varian atau sinonim dari Ancak wilayah yang lain." && (
                                <p className="text-xs text-muted-foreground">
                                  <span className="font-medium">Variants:</span> {entry.varian}
                                </p>
                              )}
                            </div>

                            <div className="px-4 pb-4">
                              <Link
                                href={`/budaya/daerah/-/${termSlug}`}
                                aria-label={`View details for term ${entry.kataLeksikon}`}
                                className="block"
                              >
                                <Button
                                  size="lg"
                                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-md py-3 cursor-pointer"
                                >
                                  View Details &nbsp;→
                                </Button>
                              </Link>
                            </div>
                          </article>
                        );
                      })}

                      {displayItems.length === 0 && (
                        <div className="text-center py-12 col-span-full">
                          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {searchQuery ? "No results found" : "No lexicon entries available"}
                          </h3>
                          <p className="text-muted-foreground">
                            {searchQuery
                              ? `No lexicon entries match "${searchQuery}". Try different keywords or check spelling.`
                              : `The ${subcultureData.profile?.displayName} lexicon database is currently empty.`}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Results Summary */}
                    {displayItems.length > 0 && (
                      <div className="mt-6 p-4 bg-card/40 rounded-xl border border-border">
                        <div className="text-sm text-muted-foreground text-center">
                          Found {displayItems.length} lexicon entries
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </section>
          </>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  );
}