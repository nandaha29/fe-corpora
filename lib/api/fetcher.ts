// lib/api/fetcher.ts
import { API_BASE_URL } from "@/lib/config";

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    next: { revalidate: 60 }, // caching 60 detik (SSR-friendly)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}
