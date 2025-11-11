"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface AboutHeroProps {
  data: {
    title: string
    subtitle: string
    description: string
    breadcrumb: {
      home: string
      current: string
    }
  }
}

export function AboutHero({ data }: AboutHeroProps) {
  // Hero image for about page
  const heroImageUrl = "/east-java-temple-sunset-landscape-with-traditional.jpg"

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="relative">
        <img
          src={heroImageUrl}
          alt="UB Corpora Cultural Heritage"
          className="h-[65vh] md:h-[80vh] w-full object-cover blur-sm"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-16 lg:px-24">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-200 mb-3"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:underline">
                  <div className="text-xl">
                    {data.breadcrumb.home}
                  </div>
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/peta-budaya" className="hover:underline">
                  <div className="text-xl">
                    {data.breadcrumb.current}
                  </div>
                </Link>
              </li>
            </ol>
          </motion.nav>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {data.title}
            <span className="block text-primary">{data.subtitle}</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-2xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}