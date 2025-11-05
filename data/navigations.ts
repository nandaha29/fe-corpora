// data/navigation.ts
import { Home, Camera, Globe, Mail } from "lucide-react"

export interface NavItem {
  id: string
  label: string
  icon: any
  href?: string
  section?: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: "beranda", label: "Home", icon: Home, section: "beranda" },
  { id: "eksplorasi", label: "Exploration", icon: Camera, section: "eksplorasi" },
  { id: "peta-budaya", label: "Cultural Map", icon: Globe, href: "/peta-budaya" },
  { id: "tentang", label: "About", icon: Globe, section: "tentang" },
  { id: "kontak", label: "Contact", icon: Mail, section: "kontak" },
]

export function getNavItems(): NavItem[] {
  return NAV_ITEMS
}
