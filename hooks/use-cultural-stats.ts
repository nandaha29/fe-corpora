"use client"

import { useMemo } from "react"
import { culturalItems } from "@/data/cultural-items"
import { categories } from "@/data/categories"
import { regions } from "@/data/regions"

export function useCulturalStats() {
  const stats = useMemo(() => {
    const totalItems = culturalItems.length
    const totalCategories = categories.length - 1 // Exclude "semua"
    const totalRegions = regions.length

    // Calculate category distribution
    const categoryStats = categories
      .filter((cat) => cat.value !== "semua")
      .map((category) => ({
        category: category.label,
        count: culturalItems.filter((item) => item.category === category.value).length,
        percentage: Math.round(
          (culturalItems.filter((item) => item.category === category.value).length / totalItems) * 100,
        ),
      }))

    // Calculate region distribution
    const regionStats = regions.map((region) => ({
      region: region.name,
      count: culturalItems.filter((item) => item.region === region.name).length,
      percentage: Math.round((culturalItems.filter((item) => item.region === region.name).length / totalItems) * 100),
    }))

    // Calculate popularity stats
    const avgPopularity = Math.round(culturalItems.reduce((sum, item) => sum + item.popularity, 0) / totalItems)

    const mostPopular = culturalItems.reduce((prev, current) => (prev.popularity > current.popularity ? prev : current))

    const leastPopular = culturalItems.reduce((prev, current) =>
      prev.popularity < current.popularity ? prev : current,
    )

    return {
      totalItems,
      totalCategories,
      totalRegions,
      categoryStats,
      regionStats,
      avgPopularity,
      mostPopular,
      leastPopular,
    }
  }, [])

  return stats
}
