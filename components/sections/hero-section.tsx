"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Landmark, Mountain, Waves, Sparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { EnhancedButton } from "@/components/interactive/enhanced-button";

interface HeroSectionProps {
  onNavClick: (section: string) => void;
  cultureName?: string;
  assets?: string[];
  highlightAssets?: Array<{
    assetId: number;
    assetRole: string;
    asset: {
      assetId: number;
      namaFile: string;
      tipe: string;
      penjelasan: string;
      url: string;
      fileSize: string;
      hashChecksum: string;
      metadataJson: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  }>;
}

export function HeroSection({
  onNavClick,
  cultureName = "East Java",
  assets,
  highlightAssets,
}: HeroSectionProps) {
  // Get banner asset for hero background
  const getBannerAsset = () => {
    if (highlightAssets) {
      const bannerAsset = highlightAssets.find(
        (asset) => asset.assetRole === "BANNER"
      );
      return bannerAsset?.asset?.url;
    }
    return null;
  };

  // Get highlight assets for cards
  const getHighlightAssets = () => {
    if (highlightAssets) {
      return highlightAssets.filter((asset) => asset.assetRole === "HIGHLIGHT");
    }
    return [];
  };

  const bannerAssetUrl = getBannerAsset();
  const highlightAssetsList = getHighlightAssets();

  // Get unique highlight assets for cards (ensure different images)
  const getUniqueHighlightAssets = () => {
    const uniqueAssets = [];
    const usedUrls = new Set();

    for (const asset of highlightAssetsList) {
      if (!usedUrls.has(asset.asset.url)) {
        uniqueAssets.push(asset);
        usedUrls.add(asset.asset.url);
        if (uniqueAssets.length >= 2) break; // Only need 2 unique assets for cards
      }
    }

    return uniqueAssets;
  };

  const uniqueHighlightAssets = getUniqueHighlightAssets();

  return (
    <section
      id="beranda"
      className="pt-24 pb-20 relative overflow-hidden min-h-screen text-white"
      role="banner"
    >
      {/* Background image tetap asset asli */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('${
              bannerAssetUrl ||
              (assets && assets.length > 0
                ? assets[0]
                : "/east-java-temple-sunset-landscape-with-traditional.jpg")
            }')`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
          {/* === LEFT SIDE === */}
          <div className="space-y-8">
            <AnimatedReveal animation="fade-up" delay={200}>
              <Badge className="bg-blue-900/40 text-blue-300 border border-blue-500/30 px-4 py-1 rounded-full text-sm tracking-wide">
                {/* EXPLORE INDONESIA */}
                <Sparkles className="h-3 w-3 mr-1" />
                <div className="text-xl">Nusantara Cultural Heritage</div>
              </Badge>
            </AnimatedReveal>

            <AnimatedReveal animation="fade-up" delay={400}>
              <h1 className="text-6xl font-bold text-white drop-shadow-md">
                Mrih Kretarta Pakartining Ngelmu Luhung Kang Tumrap Neng Tanah
                Djawa
              </h1>
              <p className="text-gray-300 text-2xl leading-relaxed max-w-lg mt-4">
                “To bring about the unfolding of practise noble sciences, which
                pertains in the land of Java”
              </p>
            </AnimatedReveal>

            <AnimatedReveal animation="fade-up" delay={600}>
              <EnhancedButton
                size="lg"
                effect="glow"
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center gap-2 w-fit"
                onClick={() => onNavClick("eksplorasi")}
              >
                <div className="text-xl">Start Explore</div>
                <ArrowRight className="h-4 w-4" />
              </EnhancedButton>
            </AnimatedReveal>
          </div>

          {/* === RIGHT SIDE (cards pakai asset asli) === */}
          <AnimatedReveal animation="scale-up" delay={600}>
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              {/* Card besar atas */}
              <div className="col-span-2 h-48 relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src={
                    uniqueHighlightAssets.length > 0
                      ? uniqueHighlightAssets[0].asset.url
                      : assets && assets.length > 1
                      ? assets[1]
                      : "/WhatsApp_Image_2025-11-08_at_10.20.48_PM.jpeg"
                  }
                  alt="Brawijaya University"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-indigo-500/40 mix-blend-multiply" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xl font-semibold">
                  <Landmark className="h-5 w-5" />
                  
                  UB Corpora Activity
                </div>
              </div>

              {/* Card kiri bawah */}
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src="/mount-bromo-sunrise-volcanic-landscape-east-java.jpg"
                  alt="Bromo Tengger Semeru"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-purple-500/40 mix-blend-multiply" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xl font-semibold">
                  <Mountain className="h-5 w-5" />
                  Mount Bromo Tengger
                </div>
              </div>

              {/* Card kanan bawah */}
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src={
                    uniqueHighlightAssets.length > 1
                      ? uniqueHighlightAssets[1].asset.url
                      : assets && assets.length > 2
                      ? assets[2]
                      : "/C0024.00_09_13_44.Still035.png"
                  }
                  alt="Bromo Tengger Semeru"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-500/40 mix-blend-multiply" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xl font-semibold">
                  <Waves className="h-5 w-5" />
                  Panaragan Culture
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
