"use client"

import { useState, useEffect } from "react"

type ViewMode = "grid" | "list"

export function useViewMode(defaultMode: ViewMode = "grid") {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode)

  // Load view mode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cultural-view-mode")
    if (saved && (saved === "grid" || saved === "list")) {
      setViewMode(saved as ViewMode)
    }
  }, [])

  // Save view mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cultural-view-mode", viewMode)
  }, [viewMode])

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
  }

  const setGridMode = () => setViewMode("grid")
  const setListMode = () => setViewMode("list")

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
    setGridMode,
    setListMode,
    isGridMode: viewMode === "grid",
    isListMode: viewMode === "list",
  }
}
