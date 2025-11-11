"use client"

interface AboutVideoProps {
  data: {
    title: string
    description: string
    emptyMessage: string
  }
  videos: Array<{
    url: string
    title: string
    description: string
    thumbnail: string
    duration: string
    contributor: string
    institution: string
  }>
}

export function AboutVideo({ data, videos }: AboutVideoProps) {
  return (
    <section id="video" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
      <h2 className="text-2xl font-bold text-foreground mb-6">{data.title}</h2>
      <h3 className="text-muted-foreground mb-8 text-xl">
        {data.description}
      </h3>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border border-border bg-background/50 hover:scale-[1.02] transition-transform shadow-sm group cursor-pointer"
              onClick={() => window.open(video.url, '_blank')}
            >
              <div className="aspect-video relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <div className="text-2xl text-black">▶</div>
                  </div>
                </div>
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg text-foreground font-medium mb-2">{video.title}</h3>
                {video.description && (
                  <p className="text-muted-foreground text-sm mb-2">{video.description}</p>
                )}
                {video.contributor && (
                  <p className="text-muted-foreground text-sm">
                    By {video.contributor} {video.institution && `• ${video.institution}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-4xl">🎥</div>
          </div>
          <h3 className="text-muted-foreground text-xl">{data.emptyMessage}</h3>
        </div>
      )}
    </section>
  )
}