"use client"

import { useState, useEffect } from "react"

export function useBookmarks() {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(new Set())

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cultural-bookmarks")
    if (saved) {
      try {
        const bookmarkArray = JSON.parse(saved)
        setBookmarkedItems(new Set(bookmarkArray))
      } catch (error) {
        console.error("Failed to load bookmarks:", error)
      }
    }
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    const bookmarkArray = Array.from(bookmarkedItems)
    localStorage.setItem("cultural-bookmarks", JSON.stringify(bookmarkArray))
  }, [bookmarkedItems])

  const toggleBookmark = (itemId: number) => {
    setBookmarkedItems((prev) => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(itemId)) {
        newBookmarks.delete(itemId)
      } else {
        newBookmarks.add(itemId)
      }
      return newBookmarks
    })
  }

  const isBookmarked = (itemId: number) => {
    return bookmarkedItems.has(itemId)
  }

  const clearAllBookmarks = () => {
    setBookmarkedItems(new Set())
  }

  const getBookmarkedItems = () => {
    return Array.from(bookmarkedItems)
  }

  return {
    bookmarkedItems,
    toggleBookmark,
    isBookmarked,
    clearAllBookmarks,
    getBookmarkedItems,
    bookmarkCount: bookmarkedItems.size,
  }
}
