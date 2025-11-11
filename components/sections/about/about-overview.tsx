"use client"

import { Badge } from "@/components/ui/badge"
import { Award, Users, BookOpen, Sparkles } from "lucide-react"

interface AboutOverviewProps {
  data: {
    badge: string
    title: string
    subtitle: string
    description: string
    features: string[]
  }
  stats?: {
    publishedCultures: number
    publishedSubcultures: number
    publishedLeksikons: number
    totalContributors: number
    totalAssets: number
  }
}

export function AboutOverview({ data, stats }: AboutOverviewProps) {
  return (
    <section id="overview" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="text-xl">
              {data.badge}
            </Badge>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">
            {data.title}
            <span className="text-primary block">{data.subtitle}</span>
          </h2>

          <h3 className="text-muted-foreground leading-relaxed text-xl">
            {data.description}
          </h3>
          <div className="flex flex-wrap gap-4 pt-4">
            {data.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-xl font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg border border-rose-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
            <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-rose-700">
              {stats?.publishedCultures || 500}+
            </div>
            <div className="text-xl text-rose-600/80">
              Documented Cultures
            </div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg border border-teal-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
            <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-teal-700">
              {stats?.publishedSubcultures || 38}
            </div>
            <div className="text-xl text-teal-600/80">Subcultures</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg border border-orange-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
            <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">
              {stats?.publishedLeksikons || 12}
            </div>
            <div className="text-xl text-orange-600/80">Leksikons</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg border border-purple-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
            <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">
              {stats?.totalContributors || 100}+
            </div>
            <div className="text-xl text-purple-600/80">Contributors</div>
          </div>
        </div>
      </div>
    </section>
  )
}