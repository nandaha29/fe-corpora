export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: Date
}

export class Analytics {
  private static instance: Analytics
  private events: AnalyticsEvent[] = []
  private isEnabled = true

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  track(name: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date(),
    }

    this.events.push(event)

    // In production, send to analytics service
    console.log("[Analytics]", event)
  }

  trackPageView(page: string): void {
    this.track("page_view", { page })
  }

  trackSearch(query: string, results: number): void {
    this.track("search", { query, results })
  }

  trackCulturalItemView(itemId: number, itemTitle: string): void {
    this.track("cultural_item_view", { itemId, itemTitle })
  }

  trackBookmark(itemId: number, action: "add" | "remove"): void {
    this.track("bookmark", { itemId, action })
  }

  trackCategoryFilter(category: string): void {
    this.track("category_filter", { category })
  }

  trackViewModeChange(mode: "grid" | "list"): void {
    this.track("view_mode_change", { mode })
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  clearEvents(): void {
    this.events = []
  }

  disable(): void {
    this.isEnabled = false
  }

  enable(): void {
    this.isEnabled = true
  }
}

export const analytics = Analytics.getInstance()
