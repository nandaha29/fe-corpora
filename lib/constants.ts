export const APP_CONFIG = {
  name: "UB Corpora",
  description: "Platform digital untuk melestarikan dan memperkenalkan warisan budaya Jawa Timur kepada dunia.",
  version: "1.0.0",
  author: "Universitas Brawijaya",
  contact: {
    email: "info@ubcorpra.ac.id",
    phone: "+62 341 551611",
    address: "Universitas Brawijaya, Malang, Jawa Timur",
  },
  social: {
    website: "https://ub.ac.id",
    facebook: "https://facebook.com/universitasbrawijaya",
    instagram: "https://instagram.com/universitasbrawijaya",
    twitter: "https://twitter.com/universitasub",
  },
} as const

export const SEARCH_CONFIG = {
  maxHistoryItems: 10,
  debounceDelay: 300,
  minSearchLength: 2,
  maxSearchLength: 100,
  suggestedSearches: ["reog", "batik", "rawon", "gamelan", "wayang"],
} as const

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

export const CATEGORIES = {
  all: "semua",
  dance: "tari",
  food: "makanan",
  batik: "batik",
  music: "musik",
  wayang: "wayang",
  craft: "kerajinan",
  language: "bahasa",
} as const

export const DIFFICULTY_LEVELS = {
  easy: "Mudah",
  medium: "Menengah",
  hard: "Tinggi",
} as const

export const POPULARITY_THRESHOLDS = {
  veryPopular: 90,
  popular: 80,
  somewhatPopular: 70,
} as const
