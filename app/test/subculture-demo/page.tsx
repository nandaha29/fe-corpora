// app/test/subculture-demo/page.tsx
"use client";

import { useState } from "react";
import { Model3DSection } from "@/components/sections/model-3d-section";
import { YouTubeSection } from "@/components/sections/youtube-section";
import { DUMMY_SUBCULTURE_DATA } from "@/data/dummy-subculture";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { useNavigation } from "@/hooks/use-navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SubcultureDemoPage() {
  const { handleNavClick } = useNavigation();
  const subcultureData = DUMMY_SUBCULTURE_DATA;

  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryAutoPlaying, setIsGalleryAutoPlaying] = useState(false);

  // Transform data for components
  const models3D = subcultureData.model3dArray.map((model) => ({
    id: model.sketchfabId,
    title: model.title,
    description: model.description,
    artifactType: model.artifactType,
    tags: model.tags,
  }));

  const youtubeVideos = subcultureData.youtubeVideos.map((video) => ({
    videoId: video.videoId,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    duration: video.duration,
  }));

  const galleryImages = subcultureData.galleryImages;

  const goToPreviousImage = () => {
    setCurrentGalleryIndex((prev) => 
      prev === 0 ? (galleryImages.length - 1) : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentGalleryIndex((prev) => 
      (prev + 1) % galleryImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentGalleryIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎭 Demo Page - Dummy Data
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {subcultureData.profile.displayName}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subcultureData.profile.history}
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {subcultureData.profile.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-card/60 border border-border rounded-full text-sm"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Gallery Section */}
        <section id="photo-gallery" className="bg-card/60 rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Galeri Foto
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
                  src={galleryImages[currentGalleryIndex].url || "/placeholder.svg"}
                  alt={galleryImages[currentGalleryIndex].description}
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
                    {galleryImages[currentGalleryIndex].description}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-gray-200"
                  >
                    {galleryImages[currentGalleryIndex].caption}
                  </motion.p>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {currentGalleryIndex + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
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
          </div>

          {/* Thumbnail Navigation */}
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
                    alt={img.description}
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
                    {img.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3D Models Section */}
        <section id="viewer-3d">
          <Model3DSection
            models={models3D}
            title="3D Cultural Artifacts & Environments"
            description={`Jelajahi model 3D interaktif dari artefak budaya dan lingkungan suku ${subcultureData.profile.displayName}.`}
            subcultureName={subcultureData.profile.displayName}
            showControls={true}
            autoRotate={true}
            height="600px"
          />
        </section>

        {/* YouTube Videos Section */}
        <section id="youtube-videos">
          <YouTubeSection
            videos={youtubeVideos}
            title="Video Dokumentasi Budaya"
            description={`Tonton video dokumentasi budaya dan kehidupan sehari-hari suku ${subcultureData.profile.displayName}.`}
            subcultureName={subcultureData.profile.displayName}
            autoPlay={false}
            showThumbnails={true}
            columns={3}
          />
        </section>

        {/* Info Box */}
        <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">ℹ️</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Demo Page - Using Dummy Data
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                This is a demonstration page using dummy data for testing the 3D Model Section 
                and YouTube Section components. The data includes 5 3D models, 9 YouTube videos, 
                and 6 gallery images showcasing Mataraman culture.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full">
                  📦 {models3D.length} 3D Models
                </span>
                <span className="text-xs bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full">
                  🎬 {youtubeVideos.length} Videos
                </span>
                <span className="text-xs bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full">
                  🖼️ {galleryImages.length} Gallery Images
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  );
}