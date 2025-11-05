// data/partners.ts
export interface Partner {
  name: string
  logo: string
  website?: string
  description?: string
}

export const PARTNERS: Partner[] = [
  {
    name: "Partner 1",
    logo: "/partner-logo-1.png",
    website: "https://partner1.com",
    description: "Cultural preservation partner"
  },
  // ... lengkapi
]

export function getPartners(): Partner[] {
  return PARTNERS
}
