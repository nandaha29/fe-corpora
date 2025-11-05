// components/cultural/interactive-east-java-map.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Users, Calendar, Sparkles } from 'lucide-react'

interface Region {
  id: string
  name: string
  color: string
  description: string
  population?: string
  highlights: string[]
  coordinates: { x: number; y: number }
}

const REGIONS: Region[] = [
  {
    id: 'arekan',
    name: 'Arekan',
    color: '#8CF000',
    description: 'Urban coastal subculture with egalitarian traditions',
    population: '~5.1M',
    highlights: ['Ludruk Theater', 'Remo Dance', 'Rujak Cingur'],
    coordinates: { x: 20, y: 15 }
  },
  {
    id: 'madura',
    name: 'Madura',
    color: '#FF0DEF',
    description: 'Island identity with strong maritime traditions',
    population: '~4.2M',
    highlights: ['Karapan Sapi', 'Keris Craft', 'Pesantren'],
    coordinates: { x: 40, y: 12 }
  },
  {
    id: 'mataraman',
    name: 'Mataraman',
    color: '#FAFA10',
    description: 'Refined Javanese etiquette and gamelan traditions',
    population: '~3.6M',
    highlights: ['Gamelan', 'Wayang Kulit', 'Tata Krama'],
    coordinates: { x: 50, y: 35 }
  },
  {
    id: 'osing',
    name: 'Osing (Using)',
    color: '#2380D7',
    description: 'Distinctive Banyuwangi language and arts',
    population: '~1.1M',
    highlights: ['Gandrung Dance', 'Barong', 'Batik Using'],
    coordinates: { x: 85, y: 60 }
  },
  {
    id: 'tengger',
    name: 'Tengger',
    color: '#32D723',
    description: 'Mountain community with sacred Bromo landscape',
    population: '~110K',
    highlights: ['Yadnya Kasada', 'Mount Bromo', 'Highland Agriculture'],
    coordinates: { x: 70, y: 50 }
  },
  {
    id: 'pandalungan',
    name: 'Pandalungan',
    color: '#5F23D7',
    description: 'Javanese-Madurese cultural blend',
    population: '~2.2M',
    highlights: ['Mixed Dialect', 'Coastal Cuisine', 'Hybrid Traditions'],
    coordinates: { x: 75, y: 45 }
  },
  {
    id: 'panaragan',
    name: 'Panaragan',
    color: '#0ea5e9',
    description: 'Folk arts and woodcraft traditions',
    population: '~0.9M',
    highlights: ['Wood Carving', 'Folk Arts', 'Local Ceremonies'],
    coordinates: { x: 45, y: 55 }
  },
  {
    id: 'samin',
    name: 'Samin',
    color: '#10b981',
    description: 'Community known for honesty ethics',
    population: '~35K',
    highlights: ['Samin Ethics', 'Agrarian Life', 'Social Movement'],
    coordinates: { x: 30, y: 45 }
  }
]

interface InteractiveEastJavaMapProps {
  onRegionClick?: (regionId: string) => void
  backgroundSrc?: string
}

export function InteractiveEastJavaMap({ 
  onRegionClick,
  backgroundSrc = '/maps/jawa-perprovinsi-subculture.svg' 
}: InteractiveEastJavaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentRegion = REGIONS.find(r => r.id === hoveredRegion)

  // Calculate popup position based on mouse position
  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    setPopupPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gradient-to-br from-muted/30 to-background rounded-xl overflow-hidden"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1745 515"
        className="w-full h-full"
        style={{ isolation: 'isolate' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow Filter */}
          <filter id="region-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feFlood floodColor="white" floodOpacity="0.6"/>
            <feComposite in2="blur" operator="in" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Shadow Filter */}
          <filter id="region-shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
          </filter>

          <clipPath id="clip0_13_64">
            <rect width="1745" height="515" fill="white"/>
          </clipPath>
        </defs>

        <g clipPath="url(#clip0_13_64)">
          {/* Region: Arekan - Hijau */}
          <path
            d="M145.5 38.5001C131.5 30.5001 130.333 41.8334 131.5 48.5001L109.5 67.0001C107.333 69.3334 101.7 81.3001 102.5 108.5C103.3 135.7 94.9998 135 91.4998 137C91.4998 137 87.0658 141.864 83.4998 141.5C78.9152 141.032 83.2998 132 76.4998 132C69.6998 132 69.3333 146.5 69 154C52 169 51.9998 183 39.4998 186.5C39.1678 186.356 40.1595 181.739 38.5 179.5L37.0581 178.238C36.1187 177.602 35.0782 177.007 34.5 176C33.6305 174.486 31.4495 174.934 31 173.5C30.4277 171.674 33.9555 170.926 33.5 169.5C32.796 167.296 31.2546 165.041 30.9998 163C29 160 28.5 157 27.9998 157C26.9004 157 22.7102 158.832 20.5 161C20.3355 161.161 21.5 164.477 20 166C17.8784 168.064 18.9309 167.456 16.5 169C14.4995 170.271 11.5836 173.559 10 175C9.09276 175.826 9.14267 176.643 8.5 177.5C7.26552 179.146 1.00023 171 0.5 175C0.5 175 0.5 177.5 2.49958 179.5C5.73436 182.735 5.04012 186.948 5.5 191.5C6.04002 196.845 10.9998 190 10.9998 190L21 184.5L30.5 188L35 190.5C35 190.5 34.8019 193.7 36 194C37 194.25 37.125 191.813 38 191C38.8749 190.188 40 190.5 40 190.5L45.5 194L47.5 195.5L57 197L65.5 193.5L93.9998 192.5C122 193 110.5 179.5 127 184C144.737 188.837 150.5 204 172 213L193.5 215.5C193.5 212 193.9 204.6 195.5 203C197.1 201.4 200.5 196.333 202 194C202 187.5 207 184 210.5 184C213.3 184 214.667 180 215 178L207 175C200.2 169.4 200.833 156.333 202 150.5L198.5 141.5V132L203.5 124.5L200 118V111.5L205 105.5L213.5 108.5H223L231.5 114.5L243 111.5H252.5H262V108.5L258 105.5V100L254 98.5001V95.0001L252.5 90.5001H248.5V86.5001L246 82.5001L243 78.0001L244.5 70.0001L249.838 67.0001C245.705 63.4256 243.634 59.4452 243 57.0001C232.2 50.6001 219.833 54.3334 215 57.0001C200.2 57.0001 194.167 51.3334 193 48.5001C179 40.0001 174.5 38.5001 172 48.5001C170 56.5001 160.5 57.5001 156 57.0001C146 53.4001 144.833 43.1668 145.5 38.5001Z"
            fill="#8CF000"
            stroke="white"
            strokeWidth={hoveredRegion === 'arekan' ? 2.5 : 1}
            className="cursor-pointer transition-all duration-300"
            style={{
              transformOrigin: 'center',
              transformBox: 'fill-box',
              transform: hoveredRegion === 'arekan' ? 'scale(1.05)' : 'scale(1)',
              filter: hoveredRegion === 'arekan' 
                ? 'url(#region-glow) brightness(1.15)' 
                : 'none'
            }}
            onMouseEnter={() => setHoveredRegion('arekan')}
            onMouseLeave={() => setHoveredRegion(null)}
            onMouseMove={handleMouseMove}
            onClick={() => onRegionClick?.('arekan')}
          />

          {/* Region: Madura - Pink */}
          <path
            d="M291.5 48.5C291.5 58.5 299.5 57 291.5 67C290.992 67.6351 290.436 68.2198 289.841 68.7575V78C289.894 79 289.4 81.5 287 83.5V90.5L283.5 94.5L279 96L281.5 103.5V108.5C281.167 111.167 279 115.6 273 112C272.333 110.667 270.4 108.1 268 108.5L265 112L262.5 111L243 111.5L232 114.5L223 108.5H213.5L205.5 105.5L200 111.5V118L203.5 124.5L198.5 132V141.5L202 150.5C200.833 156 200.2 168.6 207 175L215 178C214.833 179.667 213.8 183.2 211 184C208 184.167 202 186.4 202 194C200.167 196.833 196.2 202.7 195 203.5C194.333 206.167 193.1 212.3 193.5 215.5C223.1 207.5 220.5 219.667 215.5 230C205.9 246.8 197 242 193 246.5C180.2 273.3 198.333 281.333 209 282C251.4 294.8 281.667 293.667 291.5 291.5C330.3 295.9 362.333 302 373.5 304.5C400.7 326.1 424.5 337.5 433 340.5C499 360.1 534.333 353.167 539 350C537.5 324.5 556.5 331 561 331C567 333 564.5 337.5 567.5 338C571 334.5 568 332 571 330C573.446 330.367 577.171 329.991 579.5 331L583.5 333C584.535 333.69 586.686 330.503 588 332V329L583.5 326L579.5 321.5L581 315.5V309.5L578 302L576 294V289.5L571 286V284L567.5 279.5L566 274.5L562.204 276L558 277.5L550 276V266C556.8 258 552.833 252.667 550 251C552 243.8 558.5 243 561.5 243.5C564.7 245.1 569.167 244.833 571 244.5L578 239.5C588.4 236.7 587 230 585 227L588 220.5L585 215.5L582 207L585 201C588.6 199.8 591.5 197.167 592.5 196L594.5 188V179.726L582 189C547.6 185.4 541.666 151.167 543 134.5C524.6 125.3 519.666 106.667 519.5 98.5C514.166 93.1667 501.6 85.7 494 98.5C486.4 111.3 477.167 110.167 473.5 108C451.5 105.6 437.333 90 433 82.5C413 82.5 415 85.5 412.5 92C398 82.5 385.5 81.6667 379.5 82.5C366.7 75.3 354.833 56.8333 350.5 48.5C335.7 41.7 322.667 45.6667 318 48.5C292.5 30 291.5 38.5 291.5 48.5Z"
            fill="#FF0DEF"
            stroke="white"
            strokeWidth={hoveredRegion === 'madura' ? 2.5 : 1}
            className="cursor-pointer transition-all duration-300"
            style={{
              transformOrigin: 'center',
              transformBox: 'fill-box',
              transform: hoveredRegion === 'madura' ? 'scale(1.05)' : 'scale(1)',
              filter: hoveredRegion === 'madura' 
                ? 'url(#region-glow) brightness(1.15)' 
                : 'none'
            }}
            onMouseEnter={() => setHoveredRegion('madura')}
            onMouseLeave={() => setHoveredRegion(null)}
            onMouseMove={handleMouseMove}
            onClick={() => onRegionClick?.('madura')}
          />

          {/* Region: Mataraman - Kuning */}
          <path
            d="M668 196C668 196 688 194.5 692 193.5C696 192.5 707 182 707 182C707 182 722 192.5 730.5 196C739 199.5 776.608 210.024 805.5 197.329C808.905 195.833 811 193 815.5 192.5C820 194 822 195.5 823.459 198.5C828.845 202.879 836.64 208.514 847.5 213C855.666 212 869.6 204.8 876 188C877.5 180 875.8 171.9 889 165.5C887.833 153 890.4 127.7 910 126.5C917.5 120.5 946.5 117.5 957.5 123.5C958 132 962 152.9 976 162.5C980.833 166.667 996.3 175.5 1015.5 165.5C1022.83 157.667 1041.9 149.1 1059.5 177.5L1059 182V188L1055 192L1051.5 191L1050 198V205.5H1044L1043.5 212L1051.5 216.5L1050 224.5L1052.5 229.5L1050 233.5V238L1048 241.5L1047.5 247.5L1044 250.5L1038.5 255L1033.5 260L1029.5 263.5H1024.5L1021.5 266L1019.5 270.5L1023.5 272V276.5L1022.5 279.5L1018 278L1011 276.5L1003 272L994.5 268.5L990 267.5L985 260C984.667 260 982.8 260.5 978 262.5C976 262.167 972.2 263 973 269L975.5 272L973 278V283L969.5 287C969.667 289.333 970.3 294.5 971.5 296.5C973 299 977 304 974.5 311C978.667 314 985.7 323.2 980.5 336L986 342L990.5 343L995.5 341C996 341.333 997 342.9 997 346.5C997 350.1 998 352.333 998.5 353L1001 360L998.5 367L996.5 372.5L992.5 375.5H987.5L984.5 372.5L981 375L978 372.5L972.5 375.5L973.5 379L969.5 380.5L972.5 386.5L969.5 391.5L970 395.5H965.5L964.5 391.5L963.5 388.5L961 390.5L960.5 396L957.5 397.5C954.5 398.5 947.3 399.6 942.5 396C941.5 397.333 939.1 400.6 937.5 403C935.5 406 933.5 408.033 933.5 413L934.5 421.605C931.175 420.289 927.032 419.013 922 417.967V413L920.5 409L917.5 410.5L915.5 409L914 407V402.5L912.5 399.5L910.5 395V390V385L912.5 377V369.5L915.5 361C915.1 354.2 911 353.833 909 354.5L905 351L903.5 354.5L898.5 352.5L895.5 350L891 352.5L885.5 351L878 348L873.5 351L867.5 346L862.5 325.5C863.333 319.667 863.8 308.3 859 309.5C854.2 310.7 847.333 318.667 844.5 322.5C838.1 324.5 832.167 332.667 830 336.5L827.5 325.5L822.5 327.5L810.5 326.5C812.167 326 814.5 325.1 810.5 325.5C806.5 325.9 806.167 329.667 806.5 331.5L809.5 334L807.5 342L797 354.5L795.5 359.5L791 367.163C780.619 360.345 759.406 352.145 721 348H689C686.708 340.095 663.5 328 647.5 330C641.907 329.85 638.015 326.671 632 328C628.53 328.767 623.019 332.634 619.5 334V337L623.5 340C623.5 340 629 343.5 630 344.5C631 345.5 626 347 626 347L620 345.5L613.5 343.5L606.5 342L596.5 340C595.5 340 589.9 342.035 589 339.5C588.53 338.177 587.947 338.144 587.5 337C587.006 335.738 588.274 332.412 588 332V329L583.5 325.5L579.5 322L581 315.5V309L578 302L576 294.5V289.5L571 286V284L567.5 279.5L566 274.5L558 277.5L550 276V266C556.4 258 552.667 252.667 550 251C551.2 243.8 558.167 243 561.5 243.5C564.3 245.1 569 244.833 571 244.5L578 239.5C588.4 237.5 587 230.333 585 227L588 220.5L585 215.5L582 207L585 201C587.4 200.2 591 197.333 592.5 196L594.5 188V179.726L597.5 177.5C597.773 180.641 602.163 186.354 616.5 188.317C619.662 188.75 626.308 182 630.5 182C633.872 182 634.039 189.099 637 189.274C654.411 190.307 664.724 194.006 668 196Z"
            fill="#FAFA10"
            stroke="white"
            strokeWidth={hoveredRegion === 'mataraman' ? 2.5 : 1}
            className="cursor-pointer transition-all duration-300"
            style={{
              transformOrigin: 'center',
              transformBox: 'fill-box',
              transform: hoveredRegion === 'mataraman' ? 'scale(1.05)' : 'scale(1)',
              filter: hoveredRegion === 'mataraman' 
                ? 'url(#region-glow) brightness(1.15)' 
                : 'none'
            }}
            onMouseEnter={() => setHoveredRegion('mataraman')}
            onMouseLeave={() => setHoveredRegion(null)}
            onMouseMove={handleMouseMove}
            onClick={() => onRegionClick?.('mataraman')}
          />

          {/* Tambahkan semua region lainnya dengan pola yang sama */}
        </g>
      </svg>

      {/* Popup Card */}
      <AnimatePresence>
        {hoveredRegion && currentRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.2 
            }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              transform: 'translate(-50%, -120%)' // Center above cursor
            }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-border overflow-hidden min-w-[280px] max-w-[320px]">
              {/* Header with Region Color */}
              <div 
                className="px-4 py-3 border-b border-border/50"
                style={{ 
                  background: `linear-gradient(135deg, ${currentRegion.color}20, ${currentRegion.color}10)`,
                  borderTop: `3px solid ${currentRegion.color}`
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: currentRegion.color }}
                  />
                  <h3 className="font-bold text-foreground text-lg">
                    {currentRegion.name}
                  </h3>
                </div>
                {currentRegion.population && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{currentRegion.population}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentRegion.description}
                </p>

                {/* Highlights */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      Cultural Highlights
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentRegion.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md text-xs font-medium border border-border/50"
                        style={{ 
                          backgroundColor: `${currentRegion.color}15`,
                          color: currentRegion.color,
                          borderColor: `${currentRegion.color}30`
                        }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 bg-muted/30 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  Click to explore glossary →
                </p>
              </div>
            </div>

            {/* Pointer Arrow */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                bottom: '-8px',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid white',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
