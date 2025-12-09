// app/budaya/daerah/-/[term]/page.tsx/page.tsx
"use client"

import { use, useState, useEffect, useRef, useCallback, useLayoutEffect, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/navigation";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Loader2,
  Image as ImageIcon,
  Maximize2,
  AlertCircle,
  Play,
  BookOpen,
  FileText,
  ExternalLink,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Info,
  Sparkles,
  Library,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useNavigation } from "@/hooks/use-navigation";
import { motion, AnimatePresence } from "framer-motion";
import { YouTubeSection } from "@/components/sections/youtube-section";
import { Model3DSection } from "@/components/sections/model-3d-section";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/utils";
import ScrollToTopButton from '@/components/common/scroll-to-top';
import { useLexiconDetail } from "@/hooks/use-api";

interface LexiconAsset {
  lexiconId: string | number;
  assetId: string | number;
  assetRole: string;
  createdAt: string;
  asset: {
    assetId: string | number;
    fileName: string;
    fileType: string;
    description: string;
    url: string;
    fileSize: string;
    hashChecksum: string;
    metadataJson: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface LexiconReference {
  lexiconId: string | number;
  referenceId: string | number;
  referenceRole: string;
  displayOrder: string | number;
  createdAt: string;
  reference: {
    referenceId: string | number;
    title: string;
    referenceType: string;
    description: string;
    url: string;
    authors: string;
    publicationYear: string;
    topicCategory: string;
    citationNote: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface GalleryImage {
  url: string;
  description?: string;
  caption?: string;
  assetId?: number;
}

interface LexiconEntry {
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
  galleryImages?: GalleryImage[];
  lexiconAssets?: LexiconAsset[];
  lexiconReferences?: LexiconReference[];
}

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
}

interface Model3D {
  id: string;
  title: string;
  description: string;
  artifactType?: string;
  tags?: string[];
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function capitalize(input: string): string {
  if (!input) return input;
  return input
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function CulturalWordDetailPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { handleNavClick } = useNavigation();
  const resolvedParams = use(params);
  const metadataRef = useRef<HTMLDivElement | null>(null);
  const [sourcesTop, setSourcesTop] = useState<number | undefined>(96); // undefined when not sticky
  const [isLarge, setIsLarge] = useState<boolean>(typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false);
  
  // Use SWR hook for data fetching
  const { 
    data: fetchedEntry, 
    error: fetchError, 
    isLoading: isLoadingEntry 
  } = useLexiconDetail(resolvedParams.term);
  
  const [translation, setTranslation] = useState<string>("");

  // Audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
  const [hasAudioFile, setHasAudioFile] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Gallery states
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryAutoPlaying, setIsGalleryAutoPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DURATION = 5000;

  // Media states
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [models3D, setModels3D] = useState<Model3D[]>([]);

  // Process entry data from SWR
  const entry = useMemo<LexiconEntry | null>(() => {
    return fetchedEntry as LexiconEntry | null;
  }, [fetchedEntry]);

  // Process media data from entry
  useEffect(() => {
    if (!entry) return;

    // Set translation
    const fetchedTranslation = entry.details?.translation || "";
    setTranslation(fetchedTranslation);

    const processedImages: GalleryImage[] = [];

    if (entry.galleryImages && Array.isArray(entry.galleryImages)) {
      const directImages: GalleryImage[] = entry.galleryImages.map((img: any, idx: number) => ({
        url: img.url || img,
        description: img.description || `${entry.term} - Image ${idx + 1}`,
        caption: img.caption || `Cultural heritage of ${entry.term}`,
      }));
      processedImages.push(...directImages);
    }

    if (entry.lexiconAssets && Array.isArray(entry.lexiconAssets)) {
      const audioAsset = entry.lexiconAssets.find(
        (asset: LexiconAsset) =>
          asset.assetRole === "PRONUNCIATION" &&
          asset.asset.fileType === "AUDIO"
      );

      if (audioAsset && audioAsset.asset.url) {
        setHasAudioFile(true);
        setAudioUrl(audioAsset.asset.url);
      }

      const imageAssets = entry.lexiconAssets.filter(
        (asset: LexiconAsset) => {
          const isImageType = 
            asset.asset.fileType === "FOTO" || 
            asset.asset.fileType === "IMAGE" ||
            asset.asset.fileType === "GAMBAR" ||
            asset.asset.fileType === "PHOTO";
          
          const isGalleryRole = 
            asset.assetRole === "GALLERY" || 
            asset.assetRole === "FOTO" ||
            asset.assetRole === "IMAGE" ||
            asset.assetRole === "PHOTO";
          
          return isImageType || isGalleryRole;
        }
      );

      const assetImages: GalleryImage[] = imageAssets.map((asset: LexiconAsset) => ({
        url: asset.asset.url,
        description: asset.asset.fileName || entry.term,
        caption: asset.asset.description || `Cultural heritage of ${entry.term}`,
        assetId: typeof asset.asset.assetId === 'number' ? asset.asset.assetId : parseInt(asset.asset.assetId as string),
      }));

      processedImages.push(...assetImages);

      const videoAssets = entry.lexiconAssets.filter(
        (asset: LexiconAsset) => asset.asset.fileType === "VIDEO"
      );

      const videos: YouTubeVideo[] = videoAssets
        .map((asset: LexiconAsset): YouTubeVideo | null => {
          const videoId = extractYouTubeId(asset.asset.url);
          if (videoId) {
            return {
              videoId: videoId,
              title: asset.asset.fileName || "Video",
              description: asset.asset.description || "",
              thumbnail: getYouTubeThumbnail(videoId, "maxres"),
              duration: "",
            };
          }
          return null;
        })
        .filter(
          (video: YouTubeVideo | null): video is YouTubeVideo =>
            video !== null
        );

      setYoutubeVideos(videos);

      const modelAssets = entry.lexiconAssets.filter(
        (asset: LexiconAsset) => asset.asset.fileType === "MODEL_3D"
      );

      const models: Model3D[] = modelAssets.map(
        (asset: LexiconAsset) => {
          const urlMatch = asset.asset.url.match(
            /\/3d-models\/[^/]+-([a-f0-9]+)/
          );
          const sketchfabId = urlMatch ? urlMatch[1] : "";

          return {
            id: sketchfabId || asset.asset.assetId.toString(),
            title: asset.asset.fileName || "3D Model",
            description: asset.asset.description || "",
            artifactType: "Cultural Artifact",
            tags: [],
          };
        }
      );

      setModels3D(models);
    }

    const uniqueImages = processedImages.filter((img, index, self) =>
      index === self.findIndex((t) => t.url === img.url)
    );

    setGalleryImages(uniqueImages);

    if (uniqueImages.length === 0) {
      setGalleryImages([
        {
          url: "/placeholder.svg",
          description: entry.term,
          caption: `Cultural heritage of ${entry.term}`,
        }
      ]);
    }
  }, [entry]);

  // Handle 404 error
  useEffect(() => {
    if (fetchError && (fetchError as any).status === 404) {
      notFound();
    }
  }, [fetchError]);

  const loading = isLoadingEntry;
  const error = fetchError ? (fetchError instanceof Error ? fetchError.message : "An error occurred") : null;

  useLayoutEffect(() => {
    const baseTop = 96; // Tailwind `top-24` -> 6rem -> 96px
    const gap = 16; // spacing between cards

    const computeTop = () => {
      if (!isLarge) {
        setSourcesTop(undefined);
        return;
      }

      const metaHeight = metadataRef.current ? Math.ceil(metadataRef.current.getBoundingClientRect().height) : 0;
      setSourcesTop(baseTop + metaHeight + gap);
    };

    // recompute after images/fonts load and on resize/viewport change
    computeTop();
    window.addEventListener("resize", computeTop);
    window.addEventListener("load", computeTop);

    const mql = window.matchMedia("(min-width: 1024px)");
    const handleMq = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsLarge(e.matches);
      // compute after change
      setTimeout(computeTop, 50);
    };

    // older browsers use addListener
    if (mql.addEventListener) mql.addEventListener("change", handleMq as any);
    else mql.addListener(handleMq as any);

    return () => {
      window.removeEventListener("resize", computeTop);
      window.removeEventListener("load", computeTop);
      if (mql.removeEventListener) mql.removeEventListener("change", handleMq as any);
      else mql.removeListener(handleMq as any);
    };
  }, [entry, isLarge]);

  useEffect(() => {
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.src = "";
        audioInstance.load();
      }
    };
  }, [audioInstance]);

  const handlePlayAudio = async () => {
    if (!audioUrl) {
      setAudioError("Audio file not available for this term");
      return;
    }

    if (isPlaying && audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      setAudioError(null);
      setAudioLoading(true);

      if (audioInstance) {
        audioInstance.pause();
        audioInstance.src = "";
        audioInstance.load();
      }

      const audio = new Audio();

      audio.onloadstart = () => setAudioLoading(true);
      audio.oncanplay = () => setAudioLoading(false);
      audio.onplay = () => {
        setIsPlaying(true);
        setAudioLoading(false);
      };
      audio.onended = () => {
        setIsPlaying(false);
        setAudioLoading(false);
      };
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = () => {
        setAudioError("Failed to load audio file");
        setIsPlaying(false);
        setAudioLoading(false);
      };

      audio.src = audioUrl;
      audio.load();
      setAudioInstance(audio);

      await audio.play();
    } catch (err) {
      console.error("Audio playback error:", err);
      setAudioError("Failed to play audio");
      setIsPlaying(false);
      setAudioLoading(false);
    }
  };

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
    if (isGalleryAutoPlaying && galleryImages.length > 1) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isGalleryAutoPlaying, startAutoPlay, stopAutoPlay, galleryImages.length]);

  useEffect(() => {
    if (currentGalleryIndex >= galleryImages.length && galleryImages.length > 0) {
      setCurrentGalleryIndex(0);
    }
  }, [galleryImages.length, currentGalleryIndex]);

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

  const openLightbox = (index: number) => {
    setCurrentGalleryIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-xl text-muted-foreground">Loading...</h3>
        </div>
      </div>
    );
  }

  if (error || !entry) {
    notFound();
  }

  const regionId = entry.regionKey;
  const currentGalleryImage = galleryImages[currentGalleryIndex] || {
    url: "/placeholder.svg",
    description: entry.term,
    caption: `Cultural heritage of ${entry.term}`
  };

  // Check if media sections have content
  const hasGallery = galleryImages.length > 0 && galleryImages[0].url !== "/placeholder.svg";
  const hasVideos = youtubeVideos.length > 0;
  const has3DModels = models3D.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Compact Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link href={`/budaya/daerah/${regionId}`}>
                <Button variant="ghost" size="sm" className="px-2 py-1 h-8 gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-lg">{capitalize(regionId)}</span>
                </Button>
              </Link>
              <span className="text-muted-foreground text-lg">/</span>
              <Link href="/budaya/daerah/-">
                <Button variant="ghost" size="lg" className="px-2 py-1 h-8 gap-1">
                  <span className="text-lg">All Lexicons</span>
                </Button>
              </Link>
            </div>
            <Link href="/">
              <Button variant="ghost" size="lg" className="px-2 py-1 h-8">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-foreground truncate">
                  {capitalize(entry.term)}
                </h1>
                <Button
                  onClick={handlePlayAudio}
                  disabled={audioLoading || !hasAudioFile}
                  variant="ghost"
                  size="sm"
                  className={`h-7 w-7 p-0 ${
                    hasAudioFile ? "hover:bg-primary/10 cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {audioLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  ) : !hasAudioFile ? (
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                  ) : isPlaying ? (
                    <div className="relative">
                      <Volume2 className="w-4 h-4 text-primary" />
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    </div>
                  ) : (
                    <Volume2 className="w-4 h-4 text-foreground hover:text-primary transition-colors" />
                  )}
                </Button>
                <Badge variant="outline" className="text-lg font-mono bg-muted/50">
                  {entry.domain}
                </Badge>
              </div>
              {entry.details.transliteration && (
                <p className="text-lg text-muted-foreground font-mono">
                  {entry.details.transliteration}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* ✅ DYNAMIC GRID LAYOUT */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN - Main Content (8 columns on desktop) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Hero Image/Gallery - Full Width */}
            {hasGallery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden border border-border bg-background/50 shadow-lg"
              >
                <div className="relative aspect-[21/9] cursor-pointer group" onClick={() => openLightbox(currentGalleryIndex)}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentGalleryIndex}
                      src={currentGalleryImage.url || "/placeholder.svg"}
                      alt={currentGalleryImage.description}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-1">{currentGalleryImage.description || entry.term}</h2>
                    <p className="text-lg text-gray-200">{currentGalleryImage.caption}</p>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    {currentGalleryIndex + 1} / {galleryImages.length}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {galleryImages.length > 1 && (
                  <div className="p-4 bg-card/80 border-t border-border">
                    <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pb-2">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => goToImage(idx)}
                          className={`relative rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                            idx === currentGalleryIndex
                              ? "border-primary shadow-lg scale-105"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="w-20 h-14">
                            <img src={img.url || "/placeholder.svg"} alt={img.description} className="w-full h-full object-cover" />
                          </div>
                          {idx === currentGalleryIndex && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Definition Card - Prominent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Constructed Meaning</CardTitle>
                      <p className="text-lg text-muted-foreground">Primary meaning and context</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed text-foreground font-medium">
                    {translation || entry.details?.translation || "Loading translation..."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Two Column Grid - Reference & Variants */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cultural Reference */}
              {entry.details.culturalMeaning && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full bg-card/60 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                          <Quote className="w-5 h-5 text-emerald-600" />
                        </div>
                        <CardTitle className="text-base text-lg">Cultural Reference</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="relative pl-3 border-l-2 border-emerald-500/30">
                        <p className="text-lg leading-relaxed text-muted-foreground">
                          {entry.details.culturalMeaning}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Variants */}
              {entry.details.translationVariants && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full bg-card/60 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-amber-600" />
                        </div>
                        <CardTitle className="text-base text-lg">Variants</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {entry.details.translationVariants}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* 3D Models Section - Full Width */}
            {has3DModels && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Model3DSection
                  models={models3D}
                  title="3D Cultural Artifacts"
                  description={`Interactive 3D models related to "${entry.term}"`}
                  subcultureName={entry.subculture.name}
                  showControls={true}
                  autoRotate={true}
                  height="500px"
                />
              </motion.div>
            )}

            {/* YouTube Videos Section - Full Width */}
            {hasVideos && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <YouTubeSection
                  videos={youtubeVideos}
                  title="Video Documentation"
                  description={`Watch videos related to "${entry.term}"`}
                  subcultureName={entry.subculture.name}
                  autoPlay={false}
                  showThumbnails={true}
                  columns={2}
                />
              </motion.div>
            )}

          </div>

          {/* RIGHT SIDEBAR - Metadata & References (4 columns on desktop) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              {/* Metadata Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card ref={metadataRef} className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
                  <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-base text-lg">Metadata</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-lg text-muted-foreground">Subculture</span>
                      <Badge variant="secondary" className="text-lg">
                        {capitalize(entry.subculture.name)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-lg text-muted-foreground">Province</span>
                      <span className="text-lg font-medium">{capitalize(entry.subculture.province)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-lg text-muted-foreground">Domain</span>
                      <Badge variant="outline" className="text-lg">
                        {capitalize(entry.domain)}
                      </Badge>
                    </div>
                    {/* <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-xs text-muted-foreground">Contributor</span>
                      <span className="text-xs font-medium">{entry.contributor}</span>
                    </div> */}
                    {entry.details.ipa && (
                      <div className="flex justify-between items-center pb-2 border-b border-border/50">
                        <span className="text-lg text-muted-foreground">Transliteration</span>
                        <span className="text-lg font-mono">{entry.details.ipa}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-3 space-y-2">
                    {/* <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View in Context
                    </Button> */}
                  
                  </div>
                </CardContent>
                </Card>
              </motion.div>

              {/* Information Sources - Scrollable */}
              {entry.lexiconReferences && entry.lexiconReferences.length > 0 && (
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
                        <CardTitle className="text-base">Sources</CardTitle>
                        <p className="text-lg text-muted-foreground">{entry.lexiconReferences.length} references</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-2">
                      {entry.lexiconReferences.map((ref, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group text-base"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-base text-foreground line-clamp-2 flex-1">
                              {ref.reference.title}
                            </h4>
                            {ref.reference.url && (
                              <a
                                href={ref.reference.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {ref.reference.authors} • {ref.reference.publicationYear}
                          </p>
                          {ref.reference.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {ref.reference.description}
                            </p>
                          )}
                          <div className="flex gap-1 flex-wrap">
                            <Badge variant="outline" className="text-sm">
                              {ref.reference.referenceType}
                            </Badge>
                            {ref.reference.citationNote && (
                              <Badge variant="outline" className="text-sm">
                                {ref.reference.citationNote}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            </div>
          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentGalleryImage.url || "/placeholder.svg"}
                alt={`${entry.term} - Full size`}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-lg font-medium">{entry.term}</p>
                <p className="text-white/70 text-sm mt-1">
                  {currentGalleryIndex + 1} of {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavClick={handleNavClick} />
      <ScrollToTopButton smooth threshold={200} />
    </div>
  );
}