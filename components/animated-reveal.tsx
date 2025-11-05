"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedRevealProps {
  children: ReactNode
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
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getAnimationClasses = () => {
    const baseClasses = "transition-all ease-out"
    const durationClass = `duration-[${duration}ms]`
    const delayClass = delay > 0 ? `delay-[${delay}ms]` : ""

    switch (animation) {
      case "fade-up":
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )
      case "fade-in":
        return cn(baseClasses, durationClass, delayClass, isVisible ? "opacity-100" : "opacity-0")
      case "slide-left":
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
        )
      case "slide-right":
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
        )
      case "scale-up":
        return cn(baseClasses, durationClass, delayClass, isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95")
      case "bounce-in":
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
          isVisible && "animate-bounce-in",
        )
      default:
        return cn(
          baseClasses,
          durationClass,
          delayClass,
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )
    }
  }

  return (
    <div ref={elementRef} className={cn(getAnimationClasses(), className)}>
      {children}
    </div>
  )
}
