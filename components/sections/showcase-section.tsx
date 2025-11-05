"use client"

import { Badge } from "@/components/ui/badge"
import { AnimatedReveal } from "@/components/common/animated-reveal"

interface ShowcaseSectionProps {
  collaborationAssets?: Array<{
    contributorId: number
    assetId: number
    assetNote: string
    createdAt: string
    asset: {
      assetId: number
      namaFile: string
      tipe: string
      penjelasan: string
      url: string
      fileSize: string
      hashChecksum: string
      metadataJson: string
      status: string
      createdAt: string
      updatedAt: string
    }
    contributor: {
      contributorId: number
      namaContributor: string
      institusi: string
      email: string
      expertiseArea: string
      contactInfo: string
      registeredAt: string
    }
  }>
}

export function ShowcaseSection({ collaborationAssets }: ShowcaseSectionProps) {
  const defaultLogos = [
    { src: "/partner-logo-1.png", alt: "Cultural Heritage Foundation" },
    { src: "/partner-logo-2.png", alt: "East Java Arts Council" },
    { src: "/partner-logo-abstract-geometric.png", alt: "Indonesia Culture Hub" },
    { src: "/partner-logo-abstract-geometric.png", alt: "Batik Heritage Studio" },
    { src: "/partner-logo-abstract-5.png", alt: "Java Traditions Archive" },
    { src: "/partner-logo-6.png", alt: "National Museum of Culture" },
  ]

  const displayAssets = collaborationAssets ? collaborationAssets.map(ca => ({
    src: ca.asset.url,
    alt: ca.asset.namaFile,
    contributor: ca.contributor.namaContributor,
    description: ca.asset.penjelasan
  })) : defaultLogos

  // Duplikasi logo sebanyak 4 kali untuk memastikan tidak ada gap
  const repeatedLogos = Array(4).fill(displayAssets).flat()

  return (
    <section
      aria-labelledby="showcase-heading"
      className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Subtle animated background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <AnimatedReveal animation="fade-up" delay={150}>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Discover • Explore • Connect
            </Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={300}>
            <h2 id="showcase-heading" className="text-3xl md:text-4xl font-bold text-balance">
              A Gateway to Cultural Discovery
              <span className="block text-primary">
                Stories, Places, and Living Heritage
              </span>
            </h2>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={450}>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Navigate a world of traditions, artifacts, and events from every region.
              Enjoy a sleek, modern experience with beautiful visuals and intuitive
              navigation across devices.
            </p>
          </AnimatedReveal>
        </div>
      </div>

      {/* Scrolling Logos */}
      <div className="group relative mt-12 w-screen -ml-[calc((100vw-100%)/2)] overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div
          className="marquee relative overflow-hidden w-full border-y border-border/60 bg-muted/20"
          aria-label="Scrolling partner logos"
        >
          <div className="marquee-track flex items-center gap-14 md:gap-20 py-10 will-change-transform">
            {repeatedLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 flex flex-col items-center opacity-85 hover:opacity-100 transition-opacity duration-200"
              >
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  height={64}
                  width={160}
                  className="h-16 w-[160px] object-contain"
                />
                <p className="mt-2 text-sm text-muted-foreground font-medium text-center max-w-[160px]">
                  {logo.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee animation */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        
        .group:hover .marquee-track {
          animation-play-state: paused;
        }

        /* Ensure smooth looping */
        .marquee-track {
          display: flex;
          width: fit-content;
        }
      `}</style>
    </section>
  )
}