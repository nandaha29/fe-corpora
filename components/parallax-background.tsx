"use client"

import { useParallax } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ParallaxBackgroundProps {
  children?: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ParallaxBackground({ children, className, speed = 0.5, direction = "up" }: ParallaxBackgroundProps) {
  const { elementRef, offset } = useParallax(speed)

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${-offset}px)`
      case "down":
        return `translateY(${offset}px)`
      case "left":
        return `translateX(${-offset}px)`
      case "right":
        return `translateX(${offset}px)`
      default:
        return `translateY(${-offset}px)`
    }
  }

  return (
    <div ref={elementRef} className={cn("will-change-transform", className)} style={{ transform: getTransform() }}>
      {children}
    </div>
  )
}
