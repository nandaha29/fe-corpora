import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LexiconTerm } from "@/types/lexicon"

type TermCardProps = {
  term: LexiconTerm
  href?: string // if not provided, will default to /budaya/daerah/-/[slug]
  className?: string
}

export function TermCard({ term, href, className }: TermCardProps) {
  const detailsHref = href ?? `/budaya/daerah/-/${term.slug}`

  return (
    <Card className={className}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-pretty">{term.term}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
          <img
            src={term.image || "/placeholder.svg?height=240&width=480&query=cultural%20term%20image"}
            alt={
              term.image ? `Ilustrasi untuk istilah ${term.term}` : `Placeholder ilustrasi untuk istilah ${term.term}`
            }
            className="h-full w-full object-cover"
          />
        </div>
        {term.description ? <p className="text-sm text-muted-foreground text-pretty">{term.description}</p> : null}
        {term.regionName ? (
          <p className="text-xs text-muted-foreground/80">
            Subkultur: <span className="font-medium text-foreground">{term.regionName}</span>
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Link href={detailsHref} aria-label={`Lihat rincian istilah ${term.term}`}>
          <Button size="sm" className="min-w-28">
            Rincian
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
