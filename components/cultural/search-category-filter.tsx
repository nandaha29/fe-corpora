// components/cultural/search-category-filter.tsx
"use client"

interface SearchCategoryFilterProps {
  selectedCategory: "subculture" | "lexicon" | "all"
  onCategoryChange: (category: "subculture" | "lexicon" | "all") => void
  resultsCount?: number
  onClear?: () => void
}

export function SearchCategoryFilter({
  selectedCategory,
  onCategoryChange,
  resultsCount = 0,
  onClear,
}: SearchCategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-4 items-center justify-between flex-wrap">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer text-sm ${
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All
        </button>
        <button
          onClick={() => onCategoryChange("subculture")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer text-sm ${
            selectedCategory === "subculture"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Subculture
        </button>
        <button
          onClick={() => onCategoryChange("lexicon")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer text-sm ${
            selectedCategory === "lexicon"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Lexicon
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-foreground bg-primary/10 px-3 py-1 rounded-full">
          {resultsCount} result{resultsCount !== 1 ? 's' : ''}
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        )}
      </div>
    </div>
  )
}