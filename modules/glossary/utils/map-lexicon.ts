import { slugify } from "@/lib/slugify"
import type { LexiconTerm } from "@/types/lexicon"

type AnyRecord = Record<string, any>

export function mapToLexiconTerms(raw: AnyRecord[] = []): LexiconTerm[] {
  return raw
    .map((item) => {
      const term: string = item.term ?? item.name ?? item.isitlah ?? item.title ?? ""

      if (!term) return null

      const description: string = item.description ?? item.deskripsi ?? item.summary ?? item.ringkasan ?? ""

      const image: string | undefined = item.image ?? item.gambar ?? item.hero ?? item.thumbnail ?? undefined

      const regionId: string | undefined = item.regionId ?? item.region_id ?? item.region ?? item.daerah ?? undefined

      const regionName: string | undefined =
        item.regionName ?? item.region_name ?? item.daerah_nama ?? item.subculture ?? undefined

      const slug = item.slug ? String(item.slug) : slugify(term)

      const lex: LexiconTerm = {
        id: item.id ? String(item.id) : undefined,
        term: String(term),
        slug,
        description,
        summary: item.summary ?? undefined,
        image,
        regionId: regionId ? String(regionId) : undefined,
        regionName: regionName ? String(regionName) : undefined,
        metadata: item,
      }
      return lex
    })
    .filter(Boolean) as LexiconTerm[]
}
