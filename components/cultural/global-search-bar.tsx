// components/cultural/global-search-bar.tsx
"use client"

import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface GlobalSearchBarProps {
  value: string
  onChange: (value: string) => void
  isSearching?: boolean
  placeholder?: string
  className?: string
}

export function GlobalSearchBar({
  value,
  onChange,
  isSearching = false,
  placeholder = "Cari istilah budaya atau daerah...",
  className = "",
}: GlobalSearchBarProps) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`relative flex-1 ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none z-10" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 bg-background/50 border-border focus:ring-primary/20 h-10"
      />
      {value && !isSearching && (
        <Button
          onClick={handleClear}
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted/50 z-10"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}