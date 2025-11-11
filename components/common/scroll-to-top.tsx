"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  /** If true, scrolls smoothly. Default: false (instant) */
  smooth?: boolean;
  /** Show button after scrolling this many pixels */
  threshold?: number;
}

export default function ScrollToTopButton({
  smooth = false,
  threshold = 200,
}: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleClick = () => {
    if (smooth) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <button
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={handleClick}
      className={`fixed z-50 right-6 bottom-6 md:right-8 md:bottom-8 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 pointer-events-none translate-y-4"
      } bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20 cursor-pointer whitespace-nowrap text-xl`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
