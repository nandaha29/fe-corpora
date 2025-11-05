"use client"
import { TextureLoader } from "three"
import { useEffect, useState } from "react"

interface TextureFallbackProps {
  src: string
  fallbackColor?: string
}

export function useTextureWithFallback(src: string, fallbackColor = "#4a90e2") {
  const [texture, setTexture] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loader = new TextureLoader()

    loader.load(
      src,
      (loadedTexture) => {
        setTexture(loadedTexture)
        setError(false)
      },
      undefined,
      (err) => {
        console.warn(`Failed to load texture: ${src}`, err)
        setError(true)
        setTexture(null)
      },
    )
  }, [src])

  return { texture, error, fallbackColor }
}
