"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type FeaturedCarouselProps = {
  title?: string
  images: { src: string; alt: string; caption?: string }[]
  className?: string
}

export function FeaturedCarousel({ title = "Featured Gallery", images, className }: FeaturedCarouselProps) {
  // Normalize images to ensure valid sources and accessible alts
  const normalized = (images?.length ? images : [{ src: "", alt: "Featured cultural highlight" }]).map((img, i) => ({
    ...img,
    src:
      img.src && img.src.startsWith("/")
        ? img.src
        : `/placeholder.svg?height=600&width=1067&query=Featured cultural highlight ${i + 1}`,
    alt: img.alt || "Cultural highlight",
  }))

  return (
    <section aria-labelledby="featured-gallery-title" className={cn("space-y-3", className)}>
      <h3 id="featured-gallery-title" className="text-lg font-semibold text-foreground">
        {title}
      </h3>
      <div className="relative group">
        <Carousel opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {normalized.map((img, idx) => (
              <CarouselItem key={idx}>
                <Card className="overflow-hidden bg-card/60 border-border">
                  <div className="aspect-video relative">
                    {/* Subtle image motion */}
                    <img
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      crossOrigin="anonymous"
                    />
                    {/* Soft gradient overlay for legibility */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/10" />
                    {img.caption ? (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm p-2">
                        {img.caption}
                      </div>
                    ) : null}
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 md:-left-6 bg-card/90 hover:bg-card transition-colors" />
          <CarouselNext className="-right-3 md:-right-6 bg-card/90 hover:bg-card transition-colors" />
        </Carousel>
      </div>
    </section>
  )
}
