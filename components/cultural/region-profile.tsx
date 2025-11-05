"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RegionProfileProps = {
  name: string
  color?: string
  identity: string
  history: string
  significance: string
  facts?: Array<{ label: string; value: string }>
}

export function RegionProfile({
  name,
  color = "var(--primary)",
  identity,
  history,
  significance,
  facts = [],
}: RegionProfileProps) {
  return (
    <section aria-labelledby="region-profile-title" className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 id="region-profile-title" className="text-xl md:text-2xl font-bold text-foreground text-balance">
            Region Profile: {name}
          </h2>
          <div className="mt-2 h-1 w-20 rounded-full" style={{ backgroundColor: color }} />
        </div>
      </div>

      {facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {facts.map((f, i) => (
            <Card key={i} className="bg-card/60 border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{f.label}</p>
                <p className="text-base font-semibold text-foreground">{f.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-card/60 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Cultural Identity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{identity}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{history}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Significance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{significance}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
