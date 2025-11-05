// components/ui/youtube-section.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface YouTubeVideo {
  videoId: string
  title: string
  description: string
  duration?: string
  thumbnail?: string
  tags?: string[]
}

interface YouTubeSectionProps {
  videos: YouTubeVideo[]
  title?: string
  description?: string
  subcultureName?: string
  className?: string
  autoPlay?: boolean
  showThumbnails?: boolean
  columns?: 2 | 3 | 4
}

export function YouTubeSection({
  videos,
  title = "Video Documentation",
  description,
  subcultureName,
  className,
  autoPlay = false,
  showThumbnails = true,
  columns = 3,
}: YouTubeSectionProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  if (!videos || videos.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No videos available</p>
      </div>
    )
  }

  const currentVideo = videos[currentVideoIndex]
  const hasMultipleVideos = videos.length > 1

  const getYouTubeEmbedUrl = (videoId: string, autoplay: boolean = false) => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`
  }

  const getYouTubeThumbnailUrl = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`
  }

  const goToPrevious = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const goToNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    setIsPlaying(false)
  }

  const gridColumns = {
    2: "grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          {hasMultipleVideos && (
            <div className="flex items-center gap-2">
              <Button
                onClick={goToPrevious}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Badge variant="secondary" className="px-3">
                {currentVideoIndex + 1} / {videos.length}
              </Badge>
              <Button
                onClick={goToNext}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Video Player */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideo.videoId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Video Embed */}
          <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-border">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={getYouTubeEmbedUrl(currentVideo.videoId, isPlaying)}
                title={currentVideo.title}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Video Info */}
          <Card className="bg-card/60 backdrop-blur-sm border-border">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {currentVideo.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentVideo.description}
                  </p>
                </div>
                
                {currentVideo.duration && (
                  <Badge variant="secondary" className="whitespace-nowrap">
                    {currentVideo.duration}
                  </Badge>
                )}
              </div>

              {/* Tags */}
              {currentVideo.tags && currentVideo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentVideo.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Watch on YouTube Link */}
              <div className="pt-4 border-t border-border">
                <a
                  href={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  Watch on YouTube
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Video Thumbnails Grid */}
      {showThumbnails && hasMultipleVideos && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            {subcultureName ? `More Videos from ${subcultureName}` : "More Videos"}
          </h4>

          <div className={cn("grid gap-4", gridColumns[columns])}>
            {videos.map((video, index) => (
              <motion.button
                key={video.videoId}
                onClick={() => {
                  setCurrentVideoIndex(index)
                  setIsPlaying(false)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl transition-all",
                  currentVideoIndex === index
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-lg"
                )}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={video.thumbnail || getYouTubeThumbnailUrl(video.videoId)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0">
                      {video.duration}
                    </Badge>
                  )}

                  {/* Current Video Indicator */}
                  {currentVideoIndex === index && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      Now Playing
                    </div>
                  )}
                </div>

                {/* Video Title */}
                <div className="p-3 bg-card/50 backdrop-blur-sm border-t border-border">
                  <p className="text-sm font-medium text-foreground text-left line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}