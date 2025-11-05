// components/ui/pagination.tsx
'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
  startIndex?: number
  endIndex?: number
  totalItems?: number
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  startIndex = 0,
  endIndex = 0,
  totalItems = 0,
  className
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className={cn(
      'flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border',
      className
    )}>
      {/* Info */}
      {showInfo && totalItems > 0 && (
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          Menampilkan <span className="font-medium text-foreground">{startIndex + 1}</span>-
          <span className="font-medium text-foreground">{Math.min(endIndex, totalItems)}</span> dari{' '}
          <span className="font-medium text-foreground">{totalItems}</span> entri
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        {/* Previous Button */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className={cn(
            'cursor-pointer transition-all',
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Sebelumnya</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, idx) => {
            if (pageNum === '...') {
              return (
                <div
                  key={`ellipsis-${idx}`}
                  className="flex items-center justify-center w-10 h-10 text-muted-foreground"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              )
            }

            const page = pageNum as number
            return (
              <Button
                key={page}
                onClick={() => onPageChange(page)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={cn(
                  'min-w-[40px] h-10 cursor-pointer transition-all',
                  currentPage === page
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'hover:bg-primary/10 hover:border-primary/50'
                )}
              >
                {page}
              </Button>
            )
          })}
        </div>

        {/* Next Button */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className={cn(
            'cursor-pointer transition-all',
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="hidden sm:inline mr-1">Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile: Page Info */}
      <div className="sm:hidden text-sm text-muted-foreground order-3">
        Halaman {currentPage} dari {totalPages}
      </div>
    </div>
  )
}