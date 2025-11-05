"use client"

import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { useNavigation } from "@/hooks/use-navigation"
import dynamic from "next/dynamic"
import { useState } from "react"

// Dynamically import the globe component to avoid SSR issues
const InteractiveGlobe = dynamic(
  () => import("../three/interactive-globe").then((mod) => ({ default: mod.InteractiveGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 lg:h-[600px] w-full relative flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-base text-muted-foreground font-medium">Loading 3D Globe...</p>
        </div>
      </div>
    ),
  }
)

export function GlobeSection() {
  const { handleGlobeNavigation } = useNavigation()
  const [showPopup, setShowPopup] = useState(false)

  return (
    <section id="eksplorasi" className="py-24 bg-muted/30 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedReveal animation="fade-up">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm border-border text-base px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Interactive Cultural Map
            </Badge>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
              Explore East Java Through <span className="text-primary">3D Globe</span>
            </h2>

            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
              Navigate our interactive 3D globe to discover cultural regions of East Java. 
              Click on the highlighted cities to explore their unique heritage, language, and traditions.
            </p>
          </div>
        </AnimatedReveal>

        {/* Globe with hover popup */}
        <AnimatedReveal animation="scale-up" delay={200}>
          <div
            className="relative w-full h-[600px] flex items-center justify-center"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <InteractiveGlobe onGlobeClick={handleGlobeNavigation} />

            {/* Popup on hover */}
            {showPopup && (
              <div className="absolute top-10 bg-card/80 backdrop-blur-md border border-border shadow-xl rounded-xl px-5 py-3 text-primary font-semibold text-lg animate-bounce">
                🌍 Click Me!
              </div>
            )}
          </div>
        </AnimatedReveal>

        {/* Info Section (styled like Vision & Mission) */}
        <AnimatedReveal animation="fade-up" delay={400}>
          <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedReveal animation="slide-right" delay={500}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Cultural Highlights</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">11 Sub-Cultures:</strong> Explore the cultural diversity across 11 unique sub-cultures in East Java, each with distinct heritage and artistry.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Rich Cultural Data:</strong> Discover traditional arts, cuisine, music, crafts, and languages that define the cultural essence of East Java.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Interactive Experience:</strong> Rotate, zoom, and click on the globe to seamlessly explore East Java's living cultural landscape in real time.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedReveal>

            <AnimatedReveal animation="slide-left" delay={600}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-card/40 backdrop-blur-sm p-8">
                <h4 className="text-xl font-semibold text-center mb-6">Why Explore the Globe?</h4>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Our interactive globe isn’t just a visualization — it’s a bridge connecting you to East Java’s vibrant
                  heritage. Dive in, explore, and witness how each culture tells its own story through geography, art, and people.
                </p>
              </div>
            </AnimatedReveal>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
