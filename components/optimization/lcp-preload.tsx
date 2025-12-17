/**
 * LCP (Largest Contentful Paint) Preload Component
 * 
 * This component preloads the LCP image to reduce resource load delay
 * According to Lighthouse: Resource load delay is 3,880ms
 * 
 * Strategy:
 * 1. Preload LCP image in <head> before it's discovered by the browser
 * 2. Use fetchpriority="high" to prioritize the LCP image
 * 3. Provide responsive image srcset for optimal loading
 * 4. Use imagesrcset and imagesizes for responsive preloading
 */

export function LCPPreload() {
  return (
    <>
      {/* Preload LCP image - DSC08518.JPG */}
      {/* This eliminates the resource load delay by making the image discoverable immediately */}
      <link
        rel="preload"
        as="image"
        href="/DSC08518.JPG"
        // Use Next.js image optimization URLs for preloading
        imageSrcSet="/_next/image?url=%2FDSC08518.JPG&w=384&q=85 384w, /_next/image?url=%2FDSC08518.JPG&w=640&q=85 640w, /_next/image?url=%2FDSC08518.JPG&w=750&q=85 750w, /_next/image?url=%2FDSC08518.JPG&w=828&q=85 828w, /_next/image?url=%2FDSC08518.JPG&w=1080&q=85 1080w"
        imageSizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 548px"
        // @ts-ignore - fetchPriority is valid but TS doesn't know about it yet
        fetchPriority="high"
      />
      
      {/* Preload the optimized WebP version if available */}
      <link
        rel="preload"
        as="image"
        href="/DSC08518.webp"
        type="image/webp"
        imageSrcSet="/_next/image?url=%2FDSC08518.webp&w=384&q=85 384w, /_next/image?url=%2FDSC08518.webp&w=640&q=85 640w, /_next/image?url=%2FDSC08518.webp&w=750&q=85 750w"
        imageSizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 548px"
        // @ts-ignore
        fetchPriority="high"
      />
    </>
  )
}


