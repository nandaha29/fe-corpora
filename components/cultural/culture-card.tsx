"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { cn } from "@/lib/utils"

interface CultureCardProps {
  title: string
  description: string
  category: string
  image: string
  className?: string
  onLearnMore?: () => void
}

export function CultureCard({ title, description, category, image, className, onLearnMore }: CultureCardProps) {
  return (
    <AnimatedReveal animation="fade-up">
      <Card className={cn("group hover-lift cursor-pointer", className)}>
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl mb-2 group-hover:text-yellow-600 transition-colors">{title}</CardTitle>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <EnhancedButton effect="glow" className="w-full" onClick={onLearnMore}>
            Pelajari Lebih Lanjut
          </EnhancedButton>
        </CardFooter>
      </Card>
    </AnimatedReveal>
  )
}
