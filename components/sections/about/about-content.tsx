"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Library } from "lucide-react"
import { motion } from "framer-motion"

interface AboutSectionProps {
  data: {
    title: string
    description: string
    introduction: {
      title: string
      content: string
    }
    references: Array<{
      judul: string
      penulis: string
      tahunTerbit: string
      penjelasan: string
      tipeReferensi: string
      citationNote: string
    }>
  }
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
      <h2 className="text-2xl font-bold text-foreground mb-6">{data.title}</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl text-muted-foreground leading-relaxed">
            {data.description}
          </h3>
          <div className=" text-xl text-muted-foreground leading-relaxed">
            <h1>{data.introduction.title}</h1>
            <h3 className="  text-muted-foreground leading-relaxed">
              {data.introduction.content}
            </h3>
          </div>
          {/* Sources Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/60">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Library className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-xl font-semibold">Key References</CardTitle>
                    <h3 className="text-xl text-muted-foreground">{data.references.length} academic sources</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-2">
                  {data.references.map((ref, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-xl text-foreground line-clamp-2 flex-1">
                          {ref.judul}
                        </h4>
                      </div>
                      <h3 className="text-xl text-muted-foreground mb-2">
                        {ref.penulis} • {ref.tahunTerbit}
                      </h3>
                      {ref.penjelasan && (
                        <h3 className="text-xl text-muted-foreground mb-2 line-clamp-2">
                          {ref.penjelasan}
                        </h3>
                      )}
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="text-xl">
                          {ref.tipeReferensi}
                        </Badge>
                        <Badge variant="outline" className="text-xl">
                          {ref.citationNote}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}