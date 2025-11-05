export function slugify(input: string): string {
  if (!input) return ""
  // Normalize diacritics, remove combining marks, lowercase, trim, and hyphenate
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
