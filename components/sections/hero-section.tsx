"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowRight, Landmark, Mountain, Waves, Sparkles } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"

interface HeroSectionProps {
  onNavClick: (section: string) => void
  cultureName?: string
  assets?: string[]
}

export function HeroSection({ onNavClick, cultureName = "East Java", assets }: HeroSectionProps) {
  return (
    <section
      id="beranda"
      className="pt-24 pb-20 relative overflow-hidden min-h-screen text-white"
      role="banner"
    >
      {/* Background image tetap asset asli */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('/east-java-temple-sunset-landscape-with-traditional.jpg')`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
          {/* === LEFT SIDE === */}
          <div className="space-y-8">
            <AnimatedReveal animation="fade-up" delay={200}>
              <Badge className="bg-blue-900/40 text-blue-300 border border-blue-500/30 px-4 py-1 rounded-full text-sm tracking-wide">
                {/* EXPLORE INDONESIA */}
                <Sparkles className="h-3 w-3 mr-1" />
                Nusantara Cultural Heritage
              </Badge>
            </AnimatedReveal>

            <AnimatedReveal animation="fade-up" delay={400}>
              <h1 className="text-6xl font-bold text-white drop-shadow-md">Discover the Spirit of {cultureName}</h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg mt-4">
                Experience the harmony of nature and heritage — from sacred temples to volcanic
                horizons. {cultureName} invites you to a journey filled with beauty, tradition, and adventure.</p>
            </AnimatedReveal>

            <AnimatedReveal animation="fade-up" delay={600}>
              <EnhancedButton
                size="lg"
                effect="glow"
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center gap-2 w-fit"
                onClick={() => onNavClick("eksplorasi")}
              >
                Start Explore <ArrowRight className="h-4 w-4" />
              </EnhancedButton>

            </AnimatedReveal>
          </div>

          {/* === RIGHT SIDE (cards pakai asset asli) === */}
          <AnimatedReveal animation="scale-up" delay={600}>
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              {/* Card besar atas */}
              <div className="col-span-2 h-48 relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src="/mount-bromo-sunrise-volcanic-landscape-east-java.jpg"
                  alt="Bromo Tengger Semeru"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-indigo-500/40 mix-blend-multiply" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-lg font-semibold">
                  <Mountain className="h-5 w-5" />
                  Mount Bromo & Tengger Semeru
                </div>
              </div>

              {/* Card kiri bawah */}
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src="/malang-traditional-architecture-and-cultural-herit.jpg"
                  alt="Heritage"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-purple-500/40 mix-blend-multiply" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-base font-semibold">
                  <Landmark className="h-5 w-5" />
                  Malang Heritage
                </div>
              </div>

              {/* Card kanan bawah */}
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src="/surabaya-modern-city-with-traditional-cultural-ele.jpg"
                  alt="Beaches"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-500/40 mix-blend-multiply" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-base font-semibold">
                  <Waves className="h-5 w-5" />
                  Surabaya Coastline
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}