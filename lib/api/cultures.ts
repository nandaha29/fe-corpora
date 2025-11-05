import { fetchAPI } from "./fetcher"

export async function getCulturalSubregions() {
  // Ambil data subculture (bisa kamu ubah jadi /cultures kalo mau per budaya)
  return fetchAPI("/subcultures")
}
