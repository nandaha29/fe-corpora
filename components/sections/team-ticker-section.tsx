// components/sections/team-ticker-section.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Users } from "lucide-react"

type Member = {
  name: string
  role: string
}

interface TeamTickerSectionProps {
  team?: Array<{
    namaContributor: string
    expertiseArea: string
  }>
}

const DEFAULT_MEMBERS: Member[] = [
  { name: "Ayu Prameswari", role: "Research Lead" },
  { name: "Bagus Santosa", role: "Data Engineer" },
  { name: "Citra Wulandari", role: "UX Researcher" },
  { name: "Dimas Pratama", role: "Frontend Engineer" },
  { name: "Eko Wirawan", role: "Backend Engineer" },
  { name: "Fajar Setiawan", role: "Designer" },
  { name: "Gita Larasati", role: "PM" },
  { name: "Hadi Kurnia", role: "GIS Specialist" },
]

export default function TeamTickerSection({ team }: TeamTickerSectionProps) {
  const members = team
    ? team.map((t) => ({
        name: t.namaContributor,
        role: t.expertiseArea,
      }))
    : DEFAULT_MEMBERS

  // 🔧 Duplikasi array minimal 8 kali untuk memastikan marquee penuh
  const minRepetitions = Math.max(8, Math.ceil(40 / members.length))
  const repeatedMembers = Array(minRepetitions).fill(members).flat()

  return (
    <section
      aria-labelledby="team-ticker-heading"
      className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h2
            id="team-ticker-heading"
            className="text-3xl md:text-4xl font-bold text-balance"
          >
            Meet the Team
            <span className="block text-primary">
              The People Behind the Project
            </span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A diverse team of passionate individuals working together to
            preserve and promote East Java's cultural heritage.
          </p>
        </div>
      </div>

      {/* Marquee Members */}
      <div className="group relative mt-12 w-screen -ml-[calc((100vw-100%)/2)] overflow-hidden">
        {/* Gradient overlays untuk smooth fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div
          className="marquee relative overflow-hidden w-full border-y border-border/60 bg-muted/20"
          aria-label="Scrolling team members"
        >
          <div className="marquee-track flex items-center gap-8 md:gap-12 py-10">
            {repeatedMembers.map((member, i) => (
              <div
                key={`member-${i}`}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center rounded-xl border border-border/40",
                  "bg-gradient-to-br from-muted/60 to-muted/20 shadow-sm px-6 py-3",
                  "hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                )}
              >
                <p className="text-sm font-semibold text-foreground whitespace-nowrap text-center">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground whitespace-nowrap text-center mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <p className="text-center text-sm text-muted-foreground">
          Hover over the ticker to pause • Total {members.length} team member
          {members.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${100 / minRepetitions}%);
          }
        }

        .marquee-track {
          animation: marquee-scroll 60s linear infinite;
          display: flex;
          width: fit-content;
        }

        .group:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>
    </section>
  )
}
