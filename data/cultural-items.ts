export interface CulturalItem {
  id: number;
  title: string;
  description: string;
  category: string;
  region: string;
  image?: string;
  popularity: number;
  tags?: string[];
  slug?: string;
}

export const culturalItems: CulturalItem[] = [];
export const searchCulturalItems = (query: string): CulturalItem[] => [];
export const getCulturalItemsByCategory = (category: string): CulturalItem[] => [];