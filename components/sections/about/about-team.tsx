"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

interface AboutTeamProps {
  data: {
    title: string
    description: string
  }
  team?: Array<{
    namaContributor: string
    expertiseArea: string
    institusi?: string
    email?: string
  }>
  loading: boolean
}

export function AboutTeam({ data, team, loading }: AboutTeamProps) {
  return (
    <section id="team" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
      <h2 className="text-2xl font-bold text-foreground mb-6">{data.title}</h2>
      <h3 className="text-muted-foreground mb-8 text-xl">
        {data.description}
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-0 shadow-lg animate-pulse">
              <CardContent className="p-6">
                <div className="w-16h-16 bg-muted rounded-full mx-auto mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
              </CardContent>
            </Card>
          ))
        ) : (
          team?.map((member, index) => (
            <Card key={index} className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>

                <h3 className="font-semibold text-xl mb-1 text-xl">{member.namaContributor}</h3>
                <h3 className="text-xl text-primary mb-2">{member.expertiseArea}</h3>

                {member.institusi && (
                  <h3 className="text-xl text-muted-foreground">{member.institusi}</h3>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  )
}