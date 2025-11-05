export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ""))
}

export function isValidSearchQuery(query: string): boolean {
  return query.trim().length >= 2 && query.trim().length <= 100
}

export function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/[^\w\s-]/g, "") // Keep only alphanumeric, spaces, and hyphens
    .slice(0, 100) // Limit length
}

export function validateCulturalItem(item: any): boolean {
  const requiredFields = ["id", "title", "description", "category", "region"]
  return requiredFields.every((field) => item[field] && typeof item[field] === "string")
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
}
