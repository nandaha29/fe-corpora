"use client"

import { Button } from "@/components/ui/button"

interface ViewModeToggleProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  className?: string
}

export function ViewModeToggle({ viewMode, onViewModeChange, className }: ViewModeToggleProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        aria-label="Grid view"
      >
        <div className="grid grid-cols-2 gap-1 h-4 w-4">
          <div className="bg-current rounded-sm"></div>
          <div className="bg-current rounded-sm"></div>
          <div className="bg-current rounded-sm"></div>
          <div className="bg-current rounded-sm"></div>
        </div>
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        aria-label="List view"
      >
        <div className="space-y-1 h-4 w-4">
          <div className="bg-current h-1 w-full rounded"></div>
          <div className="bg-current h-1 w-full rounded"></div>
          <div className="bg-current h-1 w-full rounded"></div>
        </div>
      </Button>
    </div>
  )
}
