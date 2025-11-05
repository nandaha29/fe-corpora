// components/layout/footer.tsx
"use client";

import type React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // ✅ Tambahkan usePathname
import { Facebook, Instagram, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FooterProps {
  onNavClick: (section: string) => void;
  onCategoryClick?: (category: string) => void;
}

export function Footer({ onNavClick, onCategoryClick }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Detect current page

  // ✅ Smart navigation handler
  const handleQuickLinkClick = (section: string) => {
    const isHomepage = pathname === "/";
    
    if (isHomepage) {
      // Jika di homepage, scroll ke section
      onNavClick(section);
    } else {
      // Jika di halaman lain, redirect ke homepage dengan hash
      router.push(`/#${section}`);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription");
  };

  const quickLinks = [
    { label: "Home", section: "beranda" },
    { label: "About", section: "tentang" },
    { label: "Exploration", section: "eksplorasi" },
    { label: "Contact", section: "kontak" },
  ];

  const culturalLinks = [
    { label: "Cultural Map", href: "/peta-budaya" },
    { label: "Sub-regions", href: "/budaya" },
    {
      label: "Cultural Glossary",
      href: "/budaya/daerah/-?from=/",
      prefetch: true,
    },
  ];

  const resources = [
    { 
      label: "Research Team", 
      type: "internal" as const,
      href: "/research"
    },
    { 
      label: "Gallery", 
      type: "internal" as const,
      href: "/gallery"
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-muted/50 via-background to-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="relative w-40 h-20 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
              <Image
                src="/Logo.png"
                alt="UB Corpora Logo"
                width={150}
                height={75}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-w-full max-h-full"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              A digital platform dedicated to preserving and introducing the
              cultural wealth of East Java to present and future generations.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
                asChild
              >
                <a
                  href="https://facebook.com/universitasbrawijaya"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
                asChild
              >
                <a
                  href="https://instagram.com/universitasbrawijaya"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
                asChild
              >
                <a
                  href="https://twitter.com/universitasub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links - ✅ PERBAIKAN */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => handleQuickLinkClick(link.section)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultural Content */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Cultural Content
            </h3>
            <ul className="space-y-2">
              {culturalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.label}>
                  {link.type === "internal" ? (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2025 UB Corpora. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current hidden md:inline" />
              <span className="hidden md:inline">by Universitas Brawijaya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}