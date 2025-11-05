"use client"

import { motion } from "framer-motion"
import { MapPin, Eye, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface SearchResult {
  id: string
  name: string
  description: string
  culturalElements: string[]
  color: string
  rating?: number
  visitors?: string
  highlights?: string[]
}

interface SearchResultsProps {
  results: SearchResult[]
  onResultClick: (regionId: string) => void
}

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Tidak ada hasil ditemukan</p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div>
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" />
          Hasil Pencarian ({results.length})
        </h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-border rounded-lg p-3 hover:bg-accent/5 transition-all duration-200 cursor-pointer hover:shadow-md"
              onClick={() => onResultClick(result.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: result.color }} />
                  <h5 className="font-medium text-foreground">{result.name}</h5>
                  {result.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">{result.rating}</span>
                    </div>
                  )}
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-primary/10">
                      Lihat
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Klik untuk melihat detail</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{result.description}</p>

              {result.visitors && (
                <div className="flex items-center gap-1 mb-2">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{result.visitors}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {result.culturalElements.slice(0, 2).map((element, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs border-primary/30">
                    {element}
                  </Badge>
                ))}
                {result.culturalElements.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{result.culturalElements.length - 2}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
