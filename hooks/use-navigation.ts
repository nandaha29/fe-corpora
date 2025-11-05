"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

export function useNavigation() {
  const router = useRouter()

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  const handleNavClick = useCallback(
    (section: string) => {
      scrollToSection(section)
    },
    [scrollToSection],
  )

  const handleLearnMore = useCallback(
    (itemId: number) => {
      router.push(`/budaya/${itemId}`)
    },
    [router],
  )

  const handleGlobeNavigation = useCallback(() => {
    // Add loading state and faster navigation
    document.body.style.cursor = "wait"

    // Use replace for faster navigation without adding to history stack
    router.replace("/peta-budaya")

    // Reset cursor after navigation
    setTimeout(() => {
      document.body.style.cursor = "auto"
    }, 100)
  }, [router])

  const handleCategoryNavigation = useCallback(
    (category: string) => {
      router.push(`/budaya?kategori=${encodeURIComponent(category)}`)
    },
    [router],
  )

  return {
    handleNavClick,
    handleLearnMore,
    handleGlobeNavigation,
    handleCategoryNavigation,
    scrollToSection,
  }
}
