"use client"

import { useEffect } from "react"

/**
 * Component to preload CSS to reduce render blocking
 * This helps improve LCP (Largest Contentful Paint) and FCP (First Contentful Paint)
 */
export function CSSPreload() {
  useEffect(() => {
    // Find all CSS links in the document
    const cssLinks = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="stylesheet"][data-next-css]'
    )

    cssLinks.forEach((link) => {
      // Convert stylesheet to preload to reduce render blocking
      if (link.rel === "stylesheet" && !link.hasAttribute("data-preloaded")) {
        const preloadLink = document.createElement("link")
        preloadLink.rel = "preload"
        preloadLink.as = "style"
        preloadLink.href = link.href
        preloadLink.setAttribute("data-preloaded", "true")
        
        // Insert preload before the stylesheet
        link.parentNode?.insertBefore(preloadLink, link)
      }
    })
  }, [])

  return null
}



