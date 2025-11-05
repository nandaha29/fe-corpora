export const ROUTES = {
  home: "/",
  budaya: "/budaya",
  budayaDetail: (id: string | number) => `/budaya/${id}`,
  budayaDaerah: "/budaya/daerah",
  budayaDaerahDetail: (id: string | number) => `/budaya/daerah/${id}`,
  petaBudaya: "/peta-budaya",
  tentang: "/tentang",
  kontak: "/kontak",
} as const
