"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, MessageCircle, Users } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <section
      id="kontak"
      className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 opacity-[0.03] -rotate-12">
          <div className="w-full h-full text-primary animate-float" style={{ animationDelay: "1s" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 20 Q60 30 50 40 Q40 30 50 20 Z" />
              <path d="M50 60 Q60 70 50 80 Q40 70 50 60 Z" />
              <path d="M20 50 Q30 40 40 50 Q30 60 20 50 Z" />
              <path d="M80 50 Q70 40 60 50 Q70 60 80 50 Z" />
              <circle cx="50" cy="50" r="8" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedReveal animation="fade-up" delay={200}>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <MessageCircle className="h-3 w-3 mr-1" />
              Contact Us
            </Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={400}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Let's Collaborate

              <span className="text-primary block">Preserving Culture</span>
            </h2>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={600}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              We welcome collaboration, suggestions, and contributions from all parties who care about the preservation of East Java's culture.
            </p>
          </AnimatedReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <AnimatedReveal animation="slide-right" delay={800}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>

                <div className="space-y-6">
                  {/* <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                         <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-muted-foreground">+62 31 1234 5678</p>
                    </div>
                  </div> */}

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">bcp@ub.ac.id</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-muted-foreground">
                         Fakultas Ilmu Budaya, Universitas Brawijaya
                        <br />
                        Jalan Veteran, Malang. Jawa Timur 65145  
                        <br />
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedReveal>

          {/* Contact Form */}
          <AnimatedReveal animation="slide-left" delay={1000}>
                       <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold">Join the Community</h4>
                  </div>
                  <p className="text-muted-foreground mb-4 text-pretty">
                    Follow us on social media for the latest updates on East Java's culture and community activities.
                  </p>
                    <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                      Instagram
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                        X (Twitter)
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
