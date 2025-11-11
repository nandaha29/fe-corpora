"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

interface AboutCTAProps {
  data: {
    title: string
    description: string
    primaryButton: {
      text: string
      url: string
      external: boolean
    }
    secondaryButton: {
      text: string
      url: string
      external: boolean
    }
  }
}

export function AboutCTA({ data }: AboutCTAProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-xl shadow-sm border border-border p-8 text-center scroll-mt-24"
    >
      <h2 className="text-3xl font-bold text-foreground mb-4">{data.title}</h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
        {data.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size="lg"
          className="group"
          onClick={() => {
            if (data.primaryButton.external) {
              window.open(data.primaryButton.url, '_blank')
            } else {
              window.location.href = data.primaryButton.url
            }
          }}
        >
          {data.primaryButton.text}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="group"
          onClick={() => {
            if (data.secondaryButton.external) {
              window.open(data.secondaryButton.url, '_blank')
            } else {
              window.location.href = data.secondaryButton.url
            }
          }}
        >
          {data.secondaryButton.text}
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.section>
  )
}