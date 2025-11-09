// components/rich-text/read-more-viewer.tsx
"use client"

import { useState } from 'react'
import { RichTextViewer } from './rich-text-viewer'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ReadMoreViewerProps {
  content: string
  maxHeight?: number
  className?: string
}

export function ReadMoreViewer({ 
  content, 
  maxHeight = 400,
  className 
}: ReadMoreViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={className}>
      <div 
        className="relative"
        style={{
          maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out'
        }}
      >
        <RichTextViewer content={content} />
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
        )}
      </div>

      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 w-full cursor-pointer"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-2" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-2" />
            Read More
          </>
        )}
      </Button>
    </div>
  )
}