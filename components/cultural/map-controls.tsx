"use client"

import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapControlsProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export function MapControls({ zoom, onZoomIn, onZoomOut, onReset }: MapControlsProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border shadow-sm p-1 bg-background">
      <Button variant="ghost" size="sm" onClick={onZoomIn} disabled={zoom >= 3} className="h-8 w-8 p-0">
        <ZoomIn className="w-4 h-4" />
      </Button>

      <div className="px-2 text-xs font-medium text-muted-foreground min-w-[3rem] text-center">
        {Math.round(zoom * 100)}%
      </div>

      <Button variant="ghost" size="sm" onClick={onZoomOut} disabled={zoom <= 0.5} className="h-8 w-8 p-0">
        <ZoomOut className="w-4 h-4" />
      </Button>

      <div className="w-px h-4 bg-border mx-1" />

      <Button variant="ghost" size="sm" onClick={onReset} className="h-8 w-8 p-0" title="Reset view">
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  )
}
