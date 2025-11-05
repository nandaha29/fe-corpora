export interface Category {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export const categories: Category[] = [
  { value: "semua", label: "Semua Kategori", description: "Semua aspek budaya" },
  { value: "tari", label: "Tari", description: "Seni tari tradisional" },
  { value: "makanan", label: "Makanan", description: "Kuliner tradisional" },
  { value: "batik", label: "Batik", description: "Kain batik dan tenun" },
  { value: "musik", label: "Musik", description: "Musik dan alat musik" },
  { value: "wayang", label: "Wayang", description: "Seni wayang" },
  { value: "kerajinan", label: "Kerajinan", description: "Kerajinan tangan" },
  { value: "bahasa", label: "Bahasa", description: "Bahasa daerah" },
];