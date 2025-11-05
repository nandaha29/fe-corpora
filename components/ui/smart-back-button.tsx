// components/ui/smart-back-button.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SmartBackButtonProps {
  fallbackUrl?: string
  className?: string
  showHomeButton?: boolean
}

export function SmartBackButton({ 
  fallbackUrl = '/', 
  className,
  showHomeButton = true 
}: SmartBackButtonProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const referrer = searchParams.get('from')

  const handleBack = () => {
    if (referrer) {
      router.push(referrer)
    } else if (window.history.length > 2) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }

  const getBackButtonText = () => {
    if (!referrer) return 'Kembali'
    
    if (referrer === '/') return 'Kembali ke Beranda'
    if (referrer === '/peta-budaya') return 'Kembali ke Peta Budaya'
    if (referrer.startsWith('/budaya/daerah/') && referrer !== '/budaya/daerah/-') {
      return 'Kembali ke Glosarium'
    }
    if (referrer === '/budaya') return 'Kembali ke Budaya'
    
    return 'Kembali'
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{getBackButtonText()}</span>
      </button>

      {showHomeButton && !referrer && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/')}
          className="cursor-pointer"
        >
          <Home className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Beranda</span>
        </Button>
      )}
    </div>
  )
}