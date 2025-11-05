"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParallaxBackgroundProps {
  children?: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function ParallaxBackground({ children, className, speed = 0.5, direction = "up" }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const scrolled = window.pageYOffset
      const parallax = scrolled * speed
      const transform = direction === "up" ? `translateY(-${parallax}px)` : `translateY(${parallax}px)`

      ref.current.style.transform = transform
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, direction])

  return (
    <div ref={ref} className={cn("parallax-element", className)}>
      {children}
    </div>
  )
}
