"use client"

import { useEffect } from "react"

interface LCPOptimizerProps {
  /** LCP image URL to preload */
  lcpImageUrl?: string
}

/**
 * Component to optimize LCP (Largest Contentful Paint)
 * - Preloads LCP image with fetchpriority=high
 * - Ensures LCP image is discoverable early
 */
export function LCPOptimizer({ lcpImageUrl }: LCPOptimizerProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !lcpImageUrl) return

    try {
      // Normalize image URL (handle relative paths)
      const imageUrl = lcpImageUrl.startsWith("/")
        ? lcpImageUrl
        : `/${lcpImageUrl}`

      // Check if preload link already exists
      const existingLink = document.querySelector(
        `link[rel="preload"][as="image"][href="${imageUrl}"]`
      )
      if (existingLink) return

      // Preload LCP image with high priority
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = imageUrl
      link.setAttribute("fetchpriority", "high")
      link.setAttribute("crossorigin", "anonymous")
      
      // Insert at the beginning of head for early discovery
      const head = document.head
      if (head) {
        head.insertBefore(link, head.firstChild)
      }

      return () => {
        // Cleanup on unmount
        if (link && link.parentNode) {
          link.parentNode.removeChild(link)
        }
      }
    } catch (error) {
      // Silently fail if there's an error
      console.warn("LCPOptimizer: Failed to preload image", error)
    }
  }, [lcpImageUrl])

  return null
}

