"use client"

interface AboutStepsProps {
  data: {
    title: string
    description: string
    items: Array<{
      number: number
      title: string
      content: string
      list?: string[]
    }>
  }
}

export function AboutSteps({ data }: AboutStepsProps) {
  return (
    <section id="steps" className="scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto pl-24">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500"></div>

        <div className="space-y-12">
          {data.items.map((item, index) => (
            <div key={index} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/8 hover:border-white/20 hover:translate-x-2">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  {item.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <div className="text-lg text-muted-foreground leading-relaxed">
                    {item.content}
                    {item.list && (
                      <ul className="mt-3 space-y-2 ml-6">
                        {item.list.map((listItem, listIndex) => (
                          <li key={listIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}