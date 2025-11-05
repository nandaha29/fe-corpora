// lib/navigation-helpers.ts
export type PageRoute = 
  | '/'
  | '/peta-budaya'
  | '/budaya'
  | '/budaya/daerah/-'
  | `/budaya/daerah/${string}`
  | '/tentang'

export function createLexiconUrl(referrer: PageRoute): string {
  return `/budaya/daerah/-?from=${encodeURIComponent(referrer)}`
}

export function getBackButtonLabel(referrer: string | null): string {
  if (!referrer) return 'Kembali'
  
  const labelMap: Record<string, string> = {
    '/': 'Kembali ke Beranda',
    '/peta-budaya': 'Kembali ke Peta Budaya',
    '/budaya': 'Kembali ke Budaya',
    '/tentang': 'Kembali ke Tentang',
  }

  if (referrer.startsWith('/budaya/daerah/') && referrer !== '/budaya/daerah/-') {
    return 'Kembali ke Glosarium'
  }

  return labelMap[referrer] || 'Kembali'
}
