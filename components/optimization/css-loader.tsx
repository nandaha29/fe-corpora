"use client"

import { useEffect } from "react"

/**
 * Component to optimize CSS loading and reduce render blocking
 * 
 * Strategy:
 * 1. Use media queries to defer non-critical CSS (load with media="print" first)
 * 2. Switch to media="all" after page load to apply styles
 * 3. This prevents CSS from blocking initial render
 */
export function CSSLoader() {
  useEffect(() => {
    // Find all CSS links that are blocking render
    const cssLinks = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="stylesheet"]'
    )

    cssLinks.forEach((link) => {
      // Skip if already processed
      if (link.hasAttribute("data-deferred")) return
      
      const href = link.href || link.getAttribute("href")
      if (!href) return

      // Strategy: Defer non-critical CSS using media queries
      // Load CSS with media="print" first (non-blocking), then switch to "all"
      // This allows the browser to download CSS without blocking render
      if (link.media === "" || link.media === "all") {
        // Mark as deferred
        link.setAttribute("data-deferred", "true")
        
        // Set media to "print" to make it non-blocking
        link.media = "print"
        
        // Create onload handler to switch back to "all" after load
        const onLoad = () => {
          link.media = "all"
          link.removeEventListener("load", onLoad)
        }
        
        // If CSS is already loaded, switch immediately
        if (link.sheet) {
          link.media = "all"
        } else {
          link.addEventListener("load", onLoad)
        }
      }
    })

    // Fallback: Switch all deferred CSS after page load
    const switchDeferredCSS = () => {
      const deferredLinks = document.querySelectorAll<HTMLLinkElement>(
        'link[rel="stylesheet"][data-deferred][media="print"]'
      )
      deferredLinks.forEach((link) => {
        link.media = "all"
      })
    }

    if (document.readyState === "complete") {
      switchDeferredCSS()
    } else {
      window.addEventListener("load", switchDeferredCSS, { once: true })
    }
  }, [])

  return null
}

