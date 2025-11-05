export interface LexiconTerm {
  id?: string
  term: string
  slug: string
  description?: string
  summary?: string
  image?: string
  regionId?: string
  regionName?: string
  metadata?: Record<string, unknown>
}

export interface RegionInfo {
  id: string
  name: string
  slug?: string
  description?: string
  image?: string
  metadata?: Record<string, unknown>
}
