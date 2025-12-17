/**
 * Performance hints component
 * Adds resource hints to improve loading performance
 */
export function PerformanceHints() {
  return (
    <>
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://be-corpora.vercel.app" />
      <link rel="dns-prefetch" href="https://lvto72edhymjnfcu.public.blob.vercel-storage.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://static.sketchfab.com" />
      
      {/* Preconnect to API domain for faster API calls */}
      <link rel="preconnect" href="https://be-corpora.vercel.app" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://lvto72edhymjnfcu.public.blob.vercel-storage.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://static.sketchfab.com" crossOrigin="anonymous" />
    </>
  )
}

