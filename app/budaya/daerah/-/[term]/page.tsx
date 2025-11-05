// app/budaya/daerah/-/[term]/page.tsx
"use client"

import { use, useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useNavigation } from "@/hooks/use-navigation";
import { motion, AnimatePresence } from "framer-motion";
import { YouTubeSection } from "@/components/sections/youtube-section";
import { Model3DSection } from "@/components/sections/model-3d-section";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/utils";

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

interface LexiconReference {
  leksikonId: number;
  referensiId: number;
  citationNote: string;
  createdAt: string;
  referensi: {
    referensiId: number;
    judul: string;
    tipeReferensi: string;
    penjelasan: string;
    url: string;
    penulis: string;
    tahunTerbit: string;
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
  leksikonAssets?: LexiconAsset[];
  leksikonReferensis?: LexiconReference[];
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

export default function CulturalWordDetailPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { handleNavClick } = useNavigation();
  const resolvedParams = use(params);
  const [entry, setEntry] = useState<LexiconEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://be-corpora.vercel.app/api/v1/public/lexicons"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch lexicons");
        }

        const result = await response.json();

        if (result.success) {
          let foundEntry = null;

          // Strategy 1: Exact slug match
          foundEntry = result.data.find(
            (item: any) => slugify(item.term) === resolvedParams.term
          );

          // Strategy 2: Case-insensitive match
          if (!foundEntry) {
            foundEntry = result.data.find(
              (item: any) =>
                item.term.toLowerCase() ===
                resolvedParams.term.replace(/-/g, " ").toLowerCase()
            );
          }

          // Strategy 3: Partial match
          if (!foundEntry) {
            foundEntry = result.data.find((item: any) => {
              const itemSlug = slugify(item.term);
              const searchTerm = resolvedParams.term.toLowerCase();
              return (
                itemSlug.includes(searchTerm) || searchTerm.includes(itemSlug)
              );
            });
          }

          if (foundEntry) {
            console.log("📦 Raw Entry Data:", foundEntry);
            console.log("🖼️ Gallery Images Field:", foundEntry.galleryImages);
            console.log("📁 Lexikon Assets:", foundEntry.leksikonAssets);

            setEntry(foundEntry);

            // 🎨 Process Gallery Images
            const processedImages: GalleryImage[] = [];

            // 1. Extract dari galleryImages field (prioritas pertama)
            if (foundEntry.galleryImages && Array.isArray(foundEntry.galleryImages)) {
              const directImages: GalleryImage[] = foundEntry.galleryImages.map((img: any, idx: number) => ({
                url: img.url || img,
                description: img.description || `${foundEntry.term} - Image ${idx + 1}`,
                caption: img.caption || `Cultural heritage of ${foundEntry.term}`,
              }));
              console.log("📸 Direct Gallery Images:", directImages);
              processedImages.push(...directImages);
            }

            // 2. Extract dari leksikonAssets
            if (
              foundEntry.leksikonAssets &&
              Array.isArray(foundEntry.leksikonAssets)
            ) {
              console.log("🔍 Processing leksikonAssets:", foundEntry.leksikonAssets);

              // Extract audio (PRONUNCIATION)
              const audioAsset = foundEntry.leksikonAssets.find(
                (asset: LexiconAsset) =>
                  asset.assetRole === "PRONUNCIATION" &&
                  asset.asset.tipe === "AUDIO"
              );

              if (audioAsset && audioAsset.asset.url) {
                setHasAudioFile(true);
                setAudioUrl(audioAsset.asset.url);
                console.log("🔊 Audio found:", audioAsset.asset.url);
              }

              // 🎨 Extract images (FOTO atau IMAGE atau GALLERY role) - PERBAIKAN
              const imageAssets = foundEntry.leksikonAssets.filter(
                (asset: LexiconAsset) => {
                  // Check if it's an image type
                  const isImageType = 
                    asset.asset.tipe === "FOTO" || 
                    asset.asset.tipe === "IMAGE" ||
                    asset.asset.tipe === "GAMBAR" ||
                    asset.asset.tipe === "PHOTO";
                  
                  // Check if it has gallery role
                  const isGalleryRole = 
                    asset.assetRole === "GALLERY" || 
                    asset.assetRole === "FOTO" ||
                    asset.assetRole === "IMAGE" ||
                    asset.assetRole === "PHOTO";
                  
                  // Debug log untuk setiap asset
                  console.log(`🔍 Asset ${asset.asset.assetId}:`, {
                    name: asset.asset.namaFile,
                    tipe: asset.asset.tipe,
                    role: asset.assetRole,
                    isImageType,
                    isGalleryRole,
                    willInclude: isImageType || isGalleryRole,
                    url: asset.asset.url
                  });
                  
                  // Return true if either condition is met
                  return isImageType || isGalleryRole;
                }
              );

              console.log("🎨 Found Image Assets:", imageAssets);

              const assetImages: GalleryImage[] = imageAssets.map((asset: LexiconAsset) => ({
                url: asset.asset.url,
                description: asset.asset.namaFile || foundEntry.term,
                caption: asset.asset.penjelasan || `Cultural heritage of ${foundEntry.term}`,
                assetId: asset.asset.assetId,
              }));

              console.log("🖼️ Processed Asset Images:", assetImages);
              processedImages.push(...assetImages);

              // Extract videos
              const videoAssets = foundEntry.leksikonAssets.filter(
                (asset: LexiconAsset) => asset.asset.tipe === "VIDEO"
              );

              const videos: YouTubeVideo[] = videoAssets
                .map((asset: LexiconAsset): YouTubeVideo | null => {
                  const videoId = extractYouTubeId(asset.asset.url);
                  if (videoId) {
                    return {
                      videoId: videoId,
                      title: asset.asset.namaFile || "Video",
                      description: asset.asset.penjelasan || "",
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
              console.log("🎬 YouTube Videos:", videos);

              // Extract 3D models
              const modelAssets = foundEntry.leksikonAssets.filter(
                (asset: LexiconAsset) => asset.asset.tipe === "MODEL_3D"
              );

              const models: Model3D[] = modelAssets.map(
                (asset: LexiconAsset) => {
                  const urlMatch = asset.asset.url.match(
                    /\/3d-models\/[^/]+-([a-f0-9]+)/
                  );
                  const sketchfabId = urlMatch ? urlMatch[1] : "";

                  return {
                    id: sketchfabId || asset.asset.assetId.toString(),
                    title: asset.asset.namaFile || "3D Model",
                    description: asset.asset.penjelasan || "",
                    artifactType: "Cultural Artifact",
                    tags: [],
                  };
                }
              );

              setModels3D(models);
              console.log("🎭 3D Models:", models);
            }

            // Remove duplicates based on URL
            const uniqueImages = processedImages.filter((img, index, self) =>
              index === self.findIndex((t) => t.url === img.url)
            );

            console.log("✅ Final Gallery Images:", uniqueImages);
            console.log("📊 Total unique images:", uniqueImages.length);

            setGalleryImages(uniqueImages);

            // Fallback: Jika tidak ada gambar sama sekali
            if (uniqueImages.length === 0) {
              console.log("⚠️ No gallery images found, using placeholder");
              setGalleryImages([
                {
                  url: "/placeholder.svg",
                  description: foundEntry.term,
                  caption: `Cultural heritage of ${foundEntry.term}`,
                }
              ]);
            }
          } else {
            console.error("Entry not found for term:", resolvedParams.term);
            notFound();
          }
        } else {
          throw new Error(result.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [resolvedParams.term]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.src = "";
        audioInstance.load();
      }
    };
  }, [audioInstance]);

  // Audio handler
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

  // Gallery auto-play logic
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

  // Reset gallery index if out of bounds
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

  // Lightbox functions
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
          <p className="text-muted-foreground">Memuat detail istilah...</p>
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

  console.log("🎬 Render - Gallery Images Count:", galleryImages.length);
  console.log("🎬 Render - Current Image:", currentGalleryImage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4 relative">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href={`/budaya/daerah/${regionId}`}
              aria-label={`Back to ${regionId} glossary`}
            >
              <Button
                variant="ghost"
                className="px-2 py-1 gap-2 inline-flex items-center"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back to {regionId}</span>
              </Button>
            </Link>

            <Link href="/budaya/daerah/-" aria-label="View all glossaries">
              <Button
                variant="outline"
                className="px-3 py-2 gap-2 inline-flex items-center hover:bg-primary/10"
              >
                <span className="text-sm hidden sm:inline">
                  Lexicons Glossarium
                </span>
                <span className="text-sm sm:hidden">All</span>
              </Button>
            </Link>
          </div>

          {/* Header content */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground text-balance">
                    {entry.term}
                  </h1>

                  {/* Audio Button */}
                  <div className="relative">
                    <Button
                      onClick={handlePlayAudio}
                      disabled={audioLoading || !hasAudioFile}
                      variant="ghost"
                      size="sm"
                      className={`h-9 w-9 p-0 transition-all ${
                        hasAudioFile
                          ? "hover:bg-primary/10 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      title={
                        !hasAudioFile
                          ? "Audio not available"
                          : isPlaying
                          ? "Stop pronunciation"
                          : "Play pronunciation"
                      }
                    >
                      {audioLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      ) : !hasAudioFile ? (
                        <VolumeX className="w-5 h-5 text-muted-foreground" />
                      ) : isPlaying ? (
                        <div className="relative">
                          <Volume2 className="w-5 h-5 text-primary" />
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                        </div>
                      ) : (
                        <Volume2 className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                      )}
                    </Button>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="text-xs font-mono bg-muted/50 text-muted-foreground border-border/50"
                >
                  {entry.domain}
                </Badge>
              </div>

              {entry.details.transliteration && (
                <p className="text-sm text-muted-foreground font-mono">
                  Transliteration:{" "}
                  <span className="text-foreground">
                    {entry.details.transliteration}
                  </span>
                </p>
              )}

              {audioError && (
                <div className="mt-2 flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-xs text-destructive">{audioError}</p>
                </div>
              )}

              {isPlaying && !audioError && (
                <div className="mt-2 flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-md px-3 py-2">
                  <div className="flex gap-1">
                    <div
                      className="w-1 h-3 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1 h-3 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1 h-3 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <p className="text-xs text-primary font-medium">
                    Playing pronunciation...
                  </p>
                </div>
              )}

              <p className="text-sm text-muted-foreground mt-1">
                Subculture: {entry.subculture.name} ({entry.subculture.province})
              </p>
              <p className="text-sm text-muted-foreground">
                Contributor: {entry.contributor}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8 scroll-smooth">
        {/* Definition */}
        <section className="grid grid-cols-1 gap-4">
          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Definition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {entry.definition}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 🎨 Photo Gallery Section */}
        {galleryImages.length > 0 && (
          <section id="photo-gallery" aria-label="Visual Gallery" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Visual Gallery
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Explore visual representations and contexts
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {galleryImages.length} Images
              </Badge>
            </div>

            {/* Main Carousel Display */}
            <div className="relative rounded-xl overflow-hidden border border-border bg-background/50 mb-4 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGalleryIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video cursor-pointer"
                  onClick={() => openLightbox(currentGalleryIndex)}
                >
                  <img
                    src={currentGalleryImage.url || "/placeholder.svg"}
                    alt={currentGalleryImage.description || `${entry.term} - Image ${currentGalleryIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold mb-2"
                    >
                      {currentGalleryImage.description || entry.term}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm text-gray-200"
                    >
                      {currentGalleryImage.caption || `Cultural heritage of ${entry.subculture.name}`}
                    </motion.p>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {currentGalleryIndex + 1} / {galleryImages.length}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPreviousImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAutoPlay();
                    }}
                    className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-black/70 transition-colors"
                  >
                    {isGalleryAutoPlaying ? "⏸ Pause" : "▶ Play"}
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
                        alt={img.description || `${entry.term} - Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
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
        )}

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
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
                aria-label="Next image"
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
                  <p className="text-white text-lg font-medium">
                    {entry.term}
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    {currentGalleryIndex + 1} of {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Models Section */}
        {models3D.length > 0 && (
          <section id="viewer-3d" className="scroll-mt-24">
            <Model3DSection
              models={models3D}
              title="3D Cultural Artifacts & Environments"
              description={`Jelajahi model 3D interaktif terkait "${entry.term}"`}
              subcultureName={entry.subculture.name}
              showControls={true}
              autoRotate={true}
              height="600px"
            />
          </section>
        )}

        {/* YouTube Videos Section */}
        {youtubeVideos.length > 0 && (
          <section id="youtube-videos" className="scroll-mt-24">
            <YouTubeSection
              videos={youtubeVideos}
              title="Video Dokumentasi Budaya"
              description={`Tonton video dokumentasi terkait "${entry.term}"`}
              subcultureName={entry.subculture.name}
              autoPlay={false}
              showThumbnails={true}
              columns={3}
            />
          </section>
        )}

        {/* Reference Section (Cultural Meaning) */}
        {entry.details.culturalMeaning && (
          <section aria-label="Reference" className="grid grid-cols-1 gap-4">
            <Card className="bg-card/60 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />
                  Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4 border-l-2 border-primary/30">
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {entry.details.culturalMeaning}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Variants Section (Translation Variants) */}
        {entry.details.translationVariants && (
          <section aria-label="Variants" className="grid grid-cols-1 gap-4">
            <Card className="bg-card/60 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {entry.details.translationVariants}
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Information Availability Section (leksikonReferensis) */}
        {entry.leksikonReferensis && entry.leksikonReferensis.length > 0 && (
          <section aria-label="Information Availability" className="grid grid-cols-1 gap-4">
            <Card className="bg-card/60 border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Information Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entry.leksikonReferensis.map((ref, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {ref.referensi.judul}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {ref.referensi.penulis} ({ref.referensi.tahunTerbit})
                          </p>
                          {ref.referensi.penjelasan && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {ref.referensi.penjelasan}
                            </p>
                          )}
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {ref.referensi.tipeReferensi}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {ref.citationNote}
                            </Badge>
                          </div>
                        </div>
                        {ref.referensi.url && (
                          <a
                            href={ref.referensi.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                          >
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  );
}