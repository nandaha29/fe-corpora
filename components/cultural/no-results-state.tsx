"use client"

import { Button } from "@/components/ui/button"
import { Search, X, Globe } from "lucide-react"

interface NoResultsStateProps {
  searchQuery: string
  selectedCategory: string
  onClearSearch: () => void
  onClearCategory: () => void
  onSuggestionClick: (suggestion: string) => void
}

export function NoResultsState({
  searchQuery,
  selectedCategory,
  onClearSearch,
  onClearCategory,
  onSuggestionClick,
}: NoResultsStateProps) {
  const suggestions = ["reog", "batik", "rawon", "gamelan", "wayang"]

  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No matching results found</h3>
        <p className="text-muted-foreground mb-6">
          Try a different keyword or choose another category to find the cultural content you’re looking for.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <Button variant="outline" onClick={onClearSearch}>
          <X className="h-4 w-4 mr-2" />
          Clear Search
        </Button>
        <Button variant="outline" onClick={onClearCategory}>
          <Globe className="h-4 w-4 mr-2" />
          Show All Categories
        </Button>
      </div>

      {/* Suggested searches */}
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">Try searching:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="ghost"
              size="sm"
              onClick={() => onSuggestionClick(suggestion)}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
