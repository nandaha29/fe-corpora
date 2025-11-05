"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  effect?: "ripple" | "glow" | "lift" | "pulse" | "shine"
  children: React.ReactNode
}

export function EnhancedButton({ effect = "ripple", className, children, onClick, ...props }: EnhancedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (effect === "ripple") {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { x, y, id: Date.now() }

      setRipples((prev) => [...prev, newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)
    }

    onClick?.(e)
  }

  const effectClasses = {
    ripple: "relative overflow-hidden",
    glow: "hover-glow",
    lift: "hover-lift",
    pulse: "hover:animate-pulse",
    shine: "relative overflow-hidden hover:animate-shimmer",
  }

  return (
    <Button className={cn(effectClasses[effect], className)} onClick={handleClick} {...props}>
      {children}
      {effect === "ripple" &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}
    </Button>
  )
}
