"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, TrendingUp } from "lucide-react"

interface InteractiveGlobeProps {
  onGlobeClick: () => void
}

// Data untuk menandai Indonesia dan East Java
const indonesiaData = [
  {
    lat: -7.2575,
    lng: 112.7521,
    name: "Surabaya",
    population: 2900000,
    color: "#6366f1"
  },
  {
    lat: -7.9666,
    lng: 112.6326,
    name: "Malang",
    population: 895000,
    color: "#8b5cf6"
  },
  {
    lat: -8.2192,
    lng: 114.3691,
    name: "Banyuwangi",
    population: 1600000,
    color: "#a855f7"
  },
  {
    lat: -7.8744,
    lng: 111.4625,
    name: "Ponorogo",
    population: 855000,
    color: "#c084fc"
  },
  {
    lat: -7.1167,
    lng: 112.4167,
    name: "Lamongan",
    population: 1200000,
    color: "#ddd6fe"
  }
]

export function InteractiveGlobe({ onGlobeClick }: InteractiveGlobeProps) {
  const globeRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const globeInstanceRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    const initGlobe = async () => {
      if (!globeRef.current) return

      try {
        // Dynamic import globe.gl
        const GlobeGL = await import('globe.gl')
        const GlobeConstructor = GlobeGL.default

        if (!mounted) return

        // Clear previous content
        globeRef.current.innerHTML = ''

        // Create globe instance with 'new' keyword
        const globe = new GlobeConstructor()
        globeInstanceRef.current = globe

        // Mount and configure globe
        globe(globeRef.current)
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundColor('rgba(0,0,0,0)')
          .width(globeRef.current.clientWidth)
          .height(globeRef.current.clientHeight)
          .pointsData(indonesiaData)
          .pointAltitude(0.01)
          .pointRadius(0.6)
          .pointColor((d: any) => d.color)
          .pointLabel((d: any) => `
            <div style="
              background: rgba(0,0,0,0.8);
              padding: 8px 12px;
              border-radius: 6px;
              color: white;
              font-size: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">
              <strong>${d.name}</strong><br/>
              Population: ${d.population.toLocaleString()}
            </div>
          `)
          .pointsTransitionDuration(1000)
          .onPointClick((point: any) => {
            console.log('Clicked on:', point.name)
            onGlobeClick()
          })
          .onGlobeClick(() => {
            onGlobeClick()
          })

        // Set controls
        const controls = globe.controls()
        if (controls) {
          controls.autoRotate = true
          controls.autoRotateSpeed = 0.5
          controls.enableZoom = true
          controls.enablePan = false
        }

        if (mounted) {
          setIsLoaded(true)
          setError(null)
        }

        // Focus on Indonesia after mount
        setTimeout(() => {
          if (mounted && globe.pointOfView) {
            globe.pointOfView({ lat: -2, lng: 118, altitude: 2.5 }, 2000)
          }
        }, 1000)

      } catch (err) {
        console.error('Error loading globe:', err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load globe')
          setIsLoaded(false)
        }
      }
    }

    initGlobe()

    // Cleanup
    return () => {
      mounted = false
      if (globeInstanceRef.current) {
        try {
          // Clean up Three.js resources
          const globe = globeInstanceRef.current
          if (typeof globe._destructor === 'function') {
            globe._destructor()
          }
        } catch (e) {
          console.warn('Globe cleanup warning:', e)
        }
      }
    }
  }, [onGlobeClick])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (globeInstanceRef.current && globeRef.current) {
        globeInstanceRef.current
          .width(globeRef.current.clientWidth)
          .height(globeRef.current.clientHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-96 lg:h-[600px] w-full relative">
      <div 
        ref={globeRef} 
        className="w-full h-full cursor-pointer"
        style={{ minHeight: '400px' }}
      />
      
      {/* Loading indicator */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading 3D Globe...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="text-center space-y-4 p-6">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <Globe className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Failed to load 3D Globe</p>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="text-xs text-primary hover:underline"
            >
              Try reloading the page
            </button>
          </div>
        </div>
      )}

      {/* Floating UI Cards */}
      {isLoaded && !error && (
        <>
          <div className="absolute top-1/4 right-1/4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 w-32 hover-lift animate-float">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">7k+ Users</span>
            </div>
            <div className="text-xs text-muted-foreground">Active Community</div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 w-32 hover-lift animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">42k+ Words</span>
            </div>
            <div className="text-xs text-muted-foreground">Cultural Terms</div>
          </div>
        </>
      )}

      {/* Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm border-border hover-lift">
          <Globe className="h-3 w-3 mr-1" />
          Interactive 3D Globe
        </Badge>
      </div>

      {/* Instructions */}
      {isLoaded && !error && (
        <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>🖱️ Drag to rotate</div>
            <div>🔍 Scroll to zoom</div>
            <div>📍 Click points to explore</div>
          </div>
        </div>
      )}
    </div>
  )
}
