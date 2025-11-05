"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface EnhancedButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  effect?: "ripple" | "glow" | "lift" | "pulse" | "shine"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  "aria-label"?: string
}

export function EnhancedButton({
  children,
  className,
  variant = "default",
  size = "default",
  effect = "ripple",
  onClick,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
}: EnhancedButtonProps) {
  const getEffectClasses = () => {
    switch (effect) {
      case "ripple":
        return "relative overflow-hidden group before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full before:transition-transform before:duration-500 hover:before:scale-150 active:before:scale-100 active:before:duration-200"
      case "glow":
        return "relative group hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
      case "lift":
        return "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
      case "pulse":
        return "hover:animate-pulse transition-all duration-300"
      case "shine":
        return "relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full"
      default:
        return "relative overflow-hidden group before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full before:transition-transform before:duration-500 hover:before:scale-150"
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(getEffectClasses(), className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
