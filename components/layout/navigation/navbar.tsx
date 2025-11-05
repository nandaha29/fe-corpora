// components/layout/navigation/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Cek apakah sedang di halaman subculture detail
  const isSubculture = pathname.startsWith("/budaya/daerah/") && pathname !== "/budaya/daerah/-";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    // Jika bukan di homepage, redirect ke homepage dulu
    if (pathname !== "/") {
      window.location.href = `/#${elementId}`;
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "beranda", label: "Home" },
    { id: "tentang", label: "About" },
    { id: "budaya", label: "Culture" },
    { id: "eksplorasi", label: "Explore" },
    { id: "kontak", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 shadow-md",
        isScrolled
          ? "bg-[rgba(31,31,31,0.4)] backdrop-blur-2xl backdrop-saturate-150"
          : "bg-transparent",
        "hover:shadow-lg hover:shadow-gray-500/10",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div
                className={cn(
                  "relative w-40 h-20 flex items-center justify-center hover:scale-105 transition-transform duration-200 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer",
                  "bg-white/10 backdrop-blur-sm border border-white/20"
                )}
              >
                <Image
                  src="/Logo.png"
                  alt="UB Corpora Logo"
                  width={150}
                  height={75}
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Conditional Navigation */}
          {isSubculture ? (
            // Navbar untuk Subculture
            <>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/">
                  <button
                    className={cn(
                      "relative px-4 py-2 font-medium transition-colors duration-300 text-white",
                      "hover:text-gray-300",
                      "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    )}
                  >
                    Home
                  </button>
                </Link>
                <Link href="/peta-budaya">
                  <button
                    className={cn(
                      "relative px-4 py-2 font-medium transition-colors duration-300 text-white",
                      "hover:text-gray-300",
                      "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    )}
                  >
                    Subculture Map
                  </button>
                </Link>
              </div>

              {/* Mobile - Subculture */}
              <div className="md:hidden flex items-center gap-2">
                <Link href="/peta-budaya">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    Map
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    Home
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            // Navbar lengkap untuk halaman lain
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => smoothScrollTo(item.id)}
                    className={cn(
                      "relative font-medium transition-colors duration-300 text-white",
                      "hover:text-cyan-300",
                      "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-cyan-300 after:transition-all after:duration-300 hover:after:w-full"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {!isSubculture && isOpen && (
          <div className="md:hidden bg-[rgba(26,77,92,0.98)] backdrop-blur-sm border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => smoothScrollTo(item.id)}
                  className="block w-full text-left px-3 py-2 text-white hover:text-cyan-300 hover:bg-white/10 rounded-md transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}