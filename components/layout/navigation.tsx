// components/layout/navigation.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface NavigationProps {
  onNavClick: (section: string) => void;
  className?: string;
}

export function Navigation({ onNavClick, className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Detect page type
  const isHomepage = pathname === "/";
  const isPetaBudaya = pathname === "/peta-budaya";
  const isSubculture = pathname.startsWith("/budaya/daerah/") && pathname !== "/budaya/daerah/-";
  const isResearch = pathname === "/research";
  const isGallery = pathname === "/gallery";
  const isTentang = pathname === "/tentang";
  const isBudaya = pathname === "/budaya";
  
  // Group simple navigation pages
  const isSimpleNav = isResearch || isGallery || isTentang || isBudaya;

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isPetaBudaya) setActiveNav("peta-budaya");
    else if (isSubculture) setActiveNav("subculture");
    else if (isResearch) setActiveNav("research");
    else if (isGallery) setActiveNav("gallery");
    else if (isTentang) setActiveNav("tentang");
    else if (isBudaya) setActiveNav("budaya");
  }, [pathname, isPetaBudaya, isSubculture, isResearch, isGallery, isTentang, isBudaya]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (section: string) => {
    setActiveNav(section);
    if (section === "peta-budaya") {
      router.push("/peta-budaya");
    } else if (section === "lexicons") {
      const currentPath = window.location.pathname;
      router.push(`/budaya/daerah/-?from=${encodeURIComponent(currentPath)}`);
    } else if (section === "beranda" && !isHomepage) {
      router.push("/");
    } else {
      onNavClick(section);
    }
    setIsMenuOpen(false);
  };

  // Normal nav items untuk homepage
  const normalNavItems = [
    { id: "beranda", label: "Home" },
    { id: "eksplorasi", label: "Explore" },
    { id: "tentang", label: "About" },
    { id: "kontak", label: "Contact" },
  ];

  // Simple nav untuk Research/Gallery/Tentang/Budaya
  const simpleNavItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "culture", label: "Culture", path: "/budaya" },
    { id: "map", label: "Map", path: "/peta-budaya" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 shadow-md",
        isScrolled
          ? "bg-[rgba(31,31,31,0.4)] backdrop-blur-2xl backdrop-saturate-150"
          : "bg-[rgba(31,31,31,0.2)] backdrop-blur-xl backdrop-saturate-150",
        "supports-[backdrop-filter]:backdrop-blur-2xl",
        "hover:shadow-lg hover:shadow-gray-500/10",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className={cn(
                "relative w-32 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 rounded-xl border shadow-md hover:shadow-lg cursor-pointer",
                "bg-white/10 backdrop-blur-sm border-white/20"
              )}>
                <Image
                  src="/Logo.png"
                  alt="UB Corpora Logo"
                  width={120}
                  height={60}
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* CONDITIONAL NAVIGATION */}
          {isSimpleNav ? (
            // Simple Navigation untuk Research/Gallery/Tentang/Budaya
            <>
              {/* Desktop - Simple Nav */}
              <div className="hidden md:flex items-center space-x-2">
                {simpleNavItems.map((item) => (
                  <Link key={item.id} href={item.path}>
                    <button
                      className={cn(
                        "relative px-5 py-2 font-medium text-gray-200 transition-colors duration-300",
                        "hover:text-white",
                        "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-1/2",
                        pathname === item.path && "text-white after:w-1/2"
                      )}
                    >
                      {item.label}
                    </button>
                  </Link>
                ))}
              </div>

              {/* Mobile - Simple Nav */}
              <div className="md:hidden flex items-center gap-2">
                <Link href="/budaya">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-gray-200 hover:bg-white/10 transition-colors",
                      pathname === "/budaya" && "bg-white/10 text-white"
                    )}
                  >
                    Culture
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-200 hover:bg-white/10"
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : isSubculture ? (
            // Navbar untuk Subculture
            <>
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/">
                  <button className={cn(
                    "relative px-5 py-2 font-medium text-gray-200 transition-colors duration-300",
                    "hover:text-white",
                    "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-1/2"
                  )}>
                    Home
                  </button>
                </Link>
                <Link href="/peta-budaya">
                  <button className={cn(
                    "relative px-5 py-2 font-medium text-gray-200 transition-colors duration-300",
                    "hover:text-white",
                    "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-1/2"
                  )}>
                    Subculture Map
                  </button>
                </Link>
              </div>

              <div className="md:hidden flex items-center gap-2">
                <Link href="/peta-budaya">
                  <Button variant="ghost" size="sm" className="text-gray-200 hover:bg-white/10">
                    Map
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-gray-200 hover:bg-white/10">
                    Home
                  </Button>
                </Link>
              </div>
            </>
          ) : isPetaBudaya ? (
            // Navbar untuk Peta Budaya
            <>
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/">
                  <button className={cn(
                    "relative px-5 py-2 font-medium text-gray-200 transition-colors duration-300",
                    "hover:text-white",
                    "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-1/2"
                  )}>
                    Home
                  </button>
                </Link>
              </div>
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/")}
                  className="text-gray-200 hover:bg-white/10"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </Button>
              </div>
            </>
          ) : (
            // Full Navigation untuk Homepage
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {normalNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "relative px-5 py-2 font-medium text-gray-200 transition-colors duration-300",
                      "hover:text-white",
                      "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-1/2",
                      activeNav === item.id && "text-white after:w-1/2"
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
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Only for Homepage */}
      {!isPetaBudaya && !isSubculture && !isSimpleNav && isMenuOpen && (
        <div className="md:hidden bg-[rgba(31,31,31,0.95)] backdrop-blur-sm border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {normalNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "block w-full text-left px-3 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200",
                  activeNav === item.id && "bg-white/10 text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}