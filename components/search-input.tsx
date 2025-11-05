"use client"

import type * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchInputProps extends React.ComponentProps<"input"> {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  resultCount?: number
  isLoading?: boolean
  showResultCount?: boolean
}

export function SearchInput({
  value,
  onChange,
  onClear,
  resultCount,
  isLoading = false,
  showResultCount = true,
  className,
  ...props
}: SearchInputProps) {
  const handleClear = () => {
    onChange("")
    onClear?.()
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn("pl-10 pr-10 bg-background/50 border-border focus:ring-primary/20", className)}
          {...props}
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-accent/20"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {showResultCount && (value || isLoading) && (
        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
          {isLoading ? (
            <>
              <div className="w-3 h-3 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              {resultCount !== undefined && (
                <span>
                  Found <strong className="text-foreground">{resultCount}</strong> result{resultCount !== 1 ? "s" : ""}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
