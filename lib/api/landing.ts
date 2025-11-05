// lib/api/landing.ts
import { fetchAPI } from "./fetcher";

// Contoh: Hero section
export async function getHeroSection() {
  return fetchAPI("/landing/hero");
}

// Contoh: Subculture highlight
export async function getHighlightCultures() {
  return fetchAPI("/landing/cultures");
}

// Contoh: Contributor section
export async function getContributors() {
  return fetchAPI("/landing/contributors");
}

// Contoh: Reference count atau statistik
export async function getLandingStats() {
  return fetchAPI("/landing/stats");
}
