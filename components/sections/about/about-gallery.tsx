"use client"

interface AboutGalleryProps {
  data: {
    title: string
    description: string
    emptyMessage: string
  }
  galleryImages: Array<{
    url: string
    alt: string
    description: string
    contributor: string
    institution: string
  }>
}

export function AboutGallery({ data, galleryImages }: AboutGalleryProps) {
  return (
    <section id="gallery" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
      <h2 className="text-2xl font-bold text-foreground mb-6">{data.title}</h2>
      <h3 className="text-muted-foreground mb-8 text-xl">
        {data.description}
      </h3>

      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border border-border bg-background/50 hover:scale-[1.02] transition-transform shadow-sm group"
            >
              <div className="aspect-video relative">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {image.description && (
                <div className="p-4">
                  <p className="text-lg text-foreground font-medium mb-1">{image.description}</p>
                  {image.contributor && (
                    <h3 className="text-lg text-muted-foreground">
                      By {image.contributor} {image.institution && `• ${image.institution}`}
                    </h3>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-4xl">📸</div>
          </div>
          <h3 className="text-muted-foreground text-xl">{data.emptyMessage}</h3>
        </div>
      )}
    </section>
  )
}