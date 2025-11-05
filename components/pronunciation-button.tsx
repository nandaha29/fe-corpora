"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"

interface PronunciationButtonProps {
  audioFile?: string
  term: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function PronunciationButton({ audioFile, term, size = "md", variant = "outline" }: PronunciationButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!audioFile) {
    return null
  }

  const handlePlayAudio = async () => {
    try {
      setError(null)
      setIsPlaying(true)

      const audio = new Audio(audioFile)

      audio.onended = () => {
        setIsPlaying(false)
      }

      audio.onerror = () => {
        setError("Failed to load audio")
        setIsPlaying(false)
      }

      await audio.play()
    } catch (err) {
      setError("Failed to play audio")
      setIsPlaying(false)
    }
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handlePlayAudio}
        disabled={isPlaying}
        variant={variant}
        size="icon"
        className={sizeClasses[size]}
        title={`Listen to pronunciation of ${term}`}
        aria-label={`Play pronunciation for ${term}`}
      >
        <Volume2 size={iconSizes[size]} />
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  )
}
