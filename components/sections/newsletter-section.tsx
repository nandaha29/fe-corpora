"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AnimatedReveal } from "@/components/common/animated-reveal"

export function NewsletterSection() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription")
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-muted/50 via-background to-muted/30 border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedReveal animation="fade-up" delay={200}>
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates on East Java's cultural heritage.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" required />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
