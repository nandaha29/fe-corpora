import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDuration(duration: string): string {
  // Convert duration strings to more readable format
  const durationMap: Record<string, string> = {
    "30 menit": "30 menit",
    "45 menit": "45 menit",
    "1 jam": "1 jam",
    "1-2 jam": "1-2 jam",
    "2 jam": "2 jam",
    "2-3 hari": "2-3 hari",
    "6-8 jam": "6-8 jam",
    Berkelanjutan: "Berkelanjutan",
  }

  return durationMap[duration] || duration
}

export function getDifficultyColor(difficulty: string): string {
  const colorMap: Record<string, string> = {
    Mudah: "text-green-600 bg-green-50 border-green-200",
    Menengah: "text-yellow-600 bg-yellow-50 border-yellow-200",
    Tinggi: "text-red-600 bg-red-50 border-red-200",
  }

  return colorMap[difficulty] || "text-gray-600 bg-gray-50 border-gray-200"
}

export function getPopularityLevel(popularity: number): string {
  if (popularity >= 90) return "Sangat Populer"
  if (popularity >= 80) return "Populer"
  if (popularity >= 70) return "Cukup Populer"
  return "Kurang Populer"
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function generateSearchKeywords(item: any): string[] {
  const keywords = new Set<string>()

  // Add title words
  item.title?.split(" ").forEach((word: string) => {
    if (word.length > 2) keywords.add(word.toLowerCase())
  })

  // Add description words
  item.description?.split(" ").forEach((word: string) => {
    if (word.length > 3) keywords.add(word.toLowerCase())
  })

  // Add tags
  item.tags?.forEach((tag: string) => keywords.add(tag.toLowerCase()))

  // Add region
  if (item.region) keywords.add(item.region.toLowerCase())

  // Add category
  if (item.category) keywords.add(item.category.toLowerCase())

  return Array.from(keywords)
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null
  
  // Handle berbagai format URL YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/, // https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtu\.be\/)([^&\n?#]+)/, // https://youtu.be/VIDEO_ID
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/, // https://www.youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/v\/)([^&\n?#]+)/, // https://www.youtube.com/v/VIDEO_ID
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  console.warn('Could not extract YouTube ID from URL:', url)
  return null
}

/**
 * Get YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`
}

/**
 * Validate YouTube video ID format
 */
export function isValidYouTubeId(videoId: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId)
}