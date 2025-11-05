// data/region-images.ts
export interface RegionImage {
  src: string
  alt: string
  caption?: string
}

export const REGION_IMAGES: Record<string, RegionImage[]> = {
  surabaya: [
    {
      src: "/surabaya-modern-city-with-traditional-cultural-ele.jpg",
      alt: "Surabaya cityscape with cultural elements",
      caption: "Modern Surabaya blending tradition and progress"
    },
    {
      src: "/rujak-cingur-surabaya-lengkap.jpg",
      alt: "Rujak Cingur, Surabaya's iconic dish",
      caption: "Iconic Rujak Cingur"
    },
  ],
  // ... untuk region lainnya
}

export function getRegionImages(regionId: string): RegionImage[] {
  return REGION_IMAGES[regionId] || []
}

export function getRegionHeroImage(regionId: string): string {
  const images = REGION_IMAGES[regionId]
  return images?.[0]?.src || `/placeholder.svg?query=${encodeURIComponent(`${regionId} cultural landscape`)}`
}
