/**
 * Performance hints component
 * Adds resource hints to improve loading performance
 */
export function PerformanceHints() {
  return (
    <>
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://be-corpora.vercel.app" />
      
      {/* Preconnect to API domain for faster API calls */}
      <link rel="preconnect" href="https://be-corpora.vercel.app" crossOrigin="anonymous" />
    </>
  )
}

