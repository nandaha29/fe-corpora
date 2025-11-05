import type React from "react"
import { Badge } from "@/components/ui/badge"
import { AnimatedReveal } from "@/components/common/animated-reveal"

interface SectionHeaderProps {
  badge?: {
    text: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: "default" | "secondary" | "outline"
  }
  secondaryBadge?: {
    text: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: "default" | "secondary" | "outline"
    className?: string
  }
  title: string
  subtitle?: string
  description: string
  className?: string
}

export function SectionHeader({
  badge,
  secondaryBadge,
  title,
  subtitle,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <AnimatedReveal animation="fade-up">
      <div className={`text-center space-y-4 mb-16 ${className}`}>
        {(badge || secondaryBadge) && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            {badge && (
              <Badge
                variant={badge.variant || "outline"}
                className="bg-primary/10 text-primary border-primary/20 hover-glow"
              >
                {badge.icon && <badge.icon className="h-3 w-3 mr-1" />}
                {badge.text}
              </Badge>
            )}
            {secondaryBadge && (
              <Badge
                variant={secondaryBadge.variant || "outline"}
                className={`hover-lift ${secondaryBadge.className || ""}`}
              >
                {secondaryBadge.icon && <secondaryBadge.icon className="h-3 w-3 mr-1" />}
                {secondaryBadge.text}
              </Badge>
            )}
          </div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
          {title}
          {subtitle && <span className="text-primary block">{subtitle}</span>}
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">{description}</p>
      </div>
    </AnimatedReveal>
  )
}
