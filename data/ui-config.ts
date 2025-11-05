export const UI_CONFIG = {
  animationDuration: 300,
  scrollOffset: 80,
  itemsPerPage: 12,
  maxTagsDisplay: 3,
  cardImageAspectRatio: "16/9",
} as const

export const STORAGE_KEYS = {
  bookmarks: "cultural-bookmarks",
  searchHistory: "cultural-search-history",
  viewMode: "cultural-view-mode",
  theme: "cultural-theme",
  language: "cultural-language",
} as const
