"use client"

interface AboutRoadmapProps {
  data: {
    title: string
    description: string
    phases: Array<{
      year: string
      phase: string
      active: boolean
      milestones: string[]
    }>
  }
}

export function AboutRoadmap({ data }: AboutRoadmapProps) {
  return (
    <section id="roadmap" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {data.phases.map((phase, index) => (
            <div key={index} className={`text-center p-6 rounded-lg border border-border ${phase.active ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20' : 'bg-gradient-to-br from-background to-muted/50'}`}>
              <div className={`text-3xl font-bold mb-2 ${phase.active ? 'text-primary' : 'text-muted-foreground'}`}>
                {phase.year}
              </div>
              <div className="text-xl font-semibold mb-4">{phase.phase}</div>
              <div className="text-left">
                <ul className="space-y-2 text-lg text-muted-foreground">
                  {phase.milestones.map((milestone, milestoneIndex) => (
                    <li key={milestoneIndex} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${phase.active ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}