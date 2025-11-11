"use client"

import { Card, CardContent } from "@/components/ui/card"

interface AboutProcessProps {
  data: {
    title: string
    description: string
    cards: Array<{
      icon: string
      title: string
      description: string
    }>
  }
}

export function AboutProcess({ data }: AboutProcessProps) {
  return (
    <section id="process" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24" style={{background: 'rgba(255, 255, 255, 0.02)'}}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cards.map((card, index) => (
          <Card key={index} className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}