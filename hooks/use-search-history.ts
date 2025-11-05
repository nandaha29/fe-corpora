"use client"

import { useState, useEffect } from "react"

const MAX_HISTORY_ITEMS = 10

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Load search history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cultural-search-history")
    if (saved) {
      try {
        const history = JSON.parse(saved)
        setSearchHistory(history)
      } catch (error) {
        console.error("Failed to load search history:", error)
      }
    }
  }, [])

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cultural-search-history", JSON.stringify(searchHistory))
  }, [searchHistory])

  const addToHistory = (query: string) => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) return

    setSearchHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item !== trimmedQuery)
      // Add to beginning
      const newHistory = [trimmedQuery, ...filtered]
      // Limit to MAX_HISTORY_ITEMS
      return newHistory.slice(0, MAX_HISTORY_ITEMS)
    })
  }

  const removeFromHistory = (query: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== query))
  }

  const clearHistory = () => {
    setSearchHistory([])
  }

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
