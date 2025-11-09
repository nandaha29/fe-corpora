"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, Globe, Award, Sparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { EnhancedButton } from "@/components/interactive/enhanced-button";
import TeamTickerSection from "@/components/sections/team-ticker-section";
import Link from "next/link"

interface AboutSectionProps {
  onNavClick: (section: string) => void;
  stats?: {
    publishedCultures: number;
    publishedSubcultures: number;
    publishedLeksikons: number;
    totalContributors: number;
    totalAssets: number;
  };
  team?: Array<{
    namaContributor: string;
    expertiseArea: string;
  }>;
}

export function AboutSection({ onNavClick, stats, team }: AboutSectionProps) {
  const defaultMembers = [
    { name: "Rizky Pratama", role: "Research Coordinator" },
    { name: "Sari Wulandari", role: "Content Curator" },
    { name: "Bima Nugraha", role: "Frontend Developer" },
    { name: "Dewi Anindya", role: "UI/UX Designer" },
    { name: "Haryo Putra", role: "Backend Developer" },
    { name: "Nadia Safitri", role: "Documentation & Archives" },
    { name: "Galih Mahendra", role: "Data Analyst" },
    { name: "Putri Larasati", role: "Community Relations" },
  ];

  const displayTeam = team
    ? team.map((t) => ({
        name: t.namaContributor,
        role: t.expertiseArea,
      }))
    : defaultMembers;
  return (
    <section
      id="tentang"
      className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.03] rotate-12">
          <div className="w-full h-full text-primary animate-float">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="currentColor"
            >
              <path d="M50 10 C60 15 65 25 60 35 L65 50 C70 60 65 70 55 75 L50 90 L45 75 C35 70 30 60 35 50 L40 35 C35 25 40 15 50 10 Z" />
              <circle cx="45" cy="30" r="3" fill="white" />
              <circle cx="55" cy="30" r="3" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedReveal animation="fade-up" delay={200}>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Heart className="h-3 w-3 mr-1" />
              About the Platform
            </Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={400}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Preserving Cultural Heritage
              <span className="text-primary block">East Java</span>
            </h2>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={600}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              A digital platform dedicated to preserving, documenting, and
              introducing the cultural wealth of East Java to present and future
              generations.
            </p>
          </AnimatedReveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 auto-rows-fr">
          <AnimatedReveal animation="fade-up" delay={800}>
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-rose-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Complete Documentation
                </h3>
                <p className="text-muted-foreground text-pretty">
                  Collecting and documenting various aspects of East Java's
                  culture, from art and cuisine to local traditions.
                </p>
              </CardContent>
            </Card>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={1000}>
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Community Collaboration
                </h3>
                <p className="text-muted-foreground text-pretty">
                  Involving the community, cultural practitioners, and academics
                  in sustainable cultural preservation efforts
                </p>
              </CardContent>
            </Card>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={1200}>
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Access</h3>
                <p className="text-muted-foreground text-pretty">
                  Introducing East Java's culture to the world through an easily
                  accessible digital platform.
                </p>
              </CardContent>
            </Card>
          </AnimatedReveal>
        </div>

        {/* Stats Cards */}
        <AnimatedReveal animation="fade-up" delay={1400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-rose-700" />
                </div>
                <div className="text-2xl font-bold text-rose-700">
                  {stats?.publishedCultures || 500}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Documented Cultures
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-emerald-700">
                  {stats?.publishedSubcultures || 38}
                </div>
                <div className="text-sm text-muted-foreground">Subcultures</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-amber-700">
                  {stats?.publishedLeksikons || 12}
                </div>
                <div className="text-sm text-muted-foreground">Leksikons</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-700">
                  {stats?.totalContributors || 100}+
                </div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </CardContent>
            </Card>
          </div>
        </AnimatedReveal>

        <AnimatedReveal animation="fade-up" delay={1800}>
          <div className="text-center mt-16">
            <Link href="/tentang">
              <EnhancedButton
                size="lg"
                effect="glow"
                className="text-lg px-8 cursor-pointer"
              >
                <Globe className="h-5 w-5 mr-2" />
                Learn More About Us
              </EnhancedButton>
            </Link>
          </div>
        </AnimatedReveal>
      </div>
      <div className="mt-16 lg:mt-20">
        <AnimatedReveal animation="fade-up" delay={2000}>
          <TeamTickerSection team={team} />
        </AnimatedReveal>
      </div>
    </section>
  );
}
