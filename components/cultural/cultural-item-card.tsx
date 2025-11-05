"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Clock, Star, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CulturalItem } from "@/data/cultural-items"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { useNavigation } from "@/hooks/use-navigation"

interface CulturalItemCardProps {
  item: CulturalItem
  viewMode?: "grid" | "list"
  isBookmarked?: boolean
  onBookmarkToggle?: (id: number) => void
  onLearnMore?: (id: number) => void
  animationDelay?: number
  className?: string
}

export function CulturalItemCard({
  item,
  viewMode = "grid",
  isBookmarked = false,
  onBookmarkToggle,
  onLearnMore,
  animationDelay = 0,
  className,
}: CulturalItemCardProps) {
  const { handleLearnMore: navigateToDetail } = useNavigation()

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onBookmarkToggle?.(item.id)
  }

  const handleLearnMoreClick = () => {
    navigateToDetail(item.id)
    onLearnMore?.(item.id)
  }

  return (
    <AnimatedReveal animation="fade-up" delay={animationDelay} className="group">
      <Card
        className={cn(
          "h-full hover-lift hover-glow transition-all duration-300 cursor-pointer border-2 hover:border-primary/20",
          className,
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              {item.badge}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkClick}
              className="h-8 w-8 p-0 hover:bg-primary/10 group-hover:scale-110 transition-all duration-200"
              aria-label={isBookmarked ? "Hapus dari bookmark" : "Tambah ke bookmark"}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isBookmarked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500",
                )}
              />
            </Button>
          </div>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {item.title}
          </CardTitle>
          <CardDescription className="text-sm font-medium text-primary/80">{item.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>

          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs hover-lift">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{item.region}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{item.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{(item.popularity / 20).toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({item.popularity}% populer)</span>
            </div>
            <EnhancedButton
              variant="ghost"
              size="sm"
              effect="shine"
              className="text-xs hover:bg-primary/10"
              onClick={handleLearnMoreClick}
            >
              Pelajari
              <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </EnhancedButton>
          </div>
        </CardContent>
      </Card>
    </AnimatedReveal>
  )
}
