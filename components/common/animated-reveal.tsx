"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedRevealProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up" | "bounce-in"
  delay?: number
  duration?: number
}

export function AnimatedReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 600,
}: AnimatedRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const animationClasses = {
    "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    "scale-up": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
    "bounce-in": isVisible ? "animate-bounce-in" : "opacity-0 scale-50",
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out", animationClasses[animation], className)}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}
