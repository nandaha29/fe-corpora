# Project Architecture

This document outlines the technical architecture and design decisions for the Warisan Budaya Jawa Timur (Cultural Heritage of East Java) project.

## 🏗️ System Overview

The application is built as a modern, performant web application using Next.js 14 with the App Router, focusing on showcasing Indonesian cultural heritage through interactive and engaging user experiences.

### Core Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion + Custom CSS
- **Deployment**: Vercel (recommended)

## 📁 Directory Structure

\`\`\`
warisan-budaya-jawa-timur/
├── app/                          # Next.js App Router
│   ├── budaya/                   # Cultural heritage routes
│   │   ├── [id]/                 # Dynamic culture detail pages
│   │   │   └── page.tsx          # Individual culture page
│   │   └── layout.tsx            # Culture section layout
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout with providers
│   ├── loading.tsx               # Global loading component
│   └── page.tsx                  # Homepage
├── components/                   # Component library
│   ├── common/                   # Shared utility components
│   │   ├── animated-reveal.tsx   # Scroll animation wrapper
│   │   └── parallax-background.tsx # Parallax effect component
│   ├── cultural/                 # Domain-specific components
│   │   └── culture-card.tsx      # Cultural item display
│   ├── interactive/              # Enhanced UI components
│   │   └── enhanced-button.tsx   # Button with effects
│   ├── layout/                   # Layout components
│   │   └── navigation/           # Navigation components
│   │       └── navbar.tsx        # Main navigation
│   ├── ui/                       # Base UI components (shadcn/ui)
│   │   └── scroll-to.tsx         # Smooth scroll utility
│   ├── ux/                       # UX layer components
│   │   └── transition-provider.tsx # Route transitions
│   ├── theme-provider.tsx        # Theme context
│   └── index.ts                  # Barrel exports
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx            # Mobile detection
│   ├── use-scroll-animation.ts   # Scroll utilities
│   └── use-toast.ts              # Toast notifications
├── lib/                          # Utility functions
│   ├── utils.ts                  # Common utilities
│   └── slugify.ts                # Robust slugify function
├── modules/                      # Feature modules
│   └── glossary/                 # Glossary module
│       ├── components/
│       │   └── term-card.tsx     # Glossary term card component
│       ├── utils/
│       │   └── map-lexicon.ts    # Glossary lexicon mapping utility
│       └── index.ts              # Glossary module barrel export
├── types/                        # Shared types
│   └── lexicon.ts                # Glossary lexicon type
└── public/                       # Static assets
    └── images/                   # Image assets
\`\`\`

## 🎨 Design System Architecture

### Component Hierarchy

\`\`\`
App Layout (Root)
├── Theme Provider
├── Navigation Bar
├── Page Content
│   ├── Hero Section
│   ├── About Section
│   ├── Cultural Showcase
│   │   └── Culture Cards
│   ├── Exploration Section
│   └── Contact Section
└── Footer
\`\`\`

### Component Categories

1. **Layout Components** (`components/layout/`)
   - Handle page structure and navigation
   - Responsive design and mobile optimization
   - Consistent spacing and typography

2. **Common Components** (`components/common/`)
   - Reusable across different features
   - Animation and effect wrappers
   - Utility components

3. **Cultural Components** (`components/cultural/`)
   - Domain-specific to cultural heritage
   - Cultural item displays and interactions
   - Heritage-focused functionality

4. **Interactive Components** (`components/interactive/`)
   - Enhanced user interactions
   - Visual feedback and animations
   - Accessibility-focused interactions

5. **UI Components** (`components/ui/`)
   - Base design system components
   - shadcn/ui component library
   - Consistent styling and behavior

6. **UX Components** (`components/ux/`)
   - Route transitions and smooth scroll utilities
   - Enhanced user experience elements

## 🔄 Data Flow Architecture

### Static Data Pattern
\`\`\`
Cultural Data (Static) → Components → UI Rendering
\`\`\`

The application currently uses static data for cultural heritage information, making it fast and SEO-friendly while maintaining the flexibility to integrate with a CMS or API in the future.

### State Management
- **Local State**: React useState for component-specific state
- **Global State**: React Context for theme and navigation
- **URL State**: Next.js router for navigation and deep linking

### Animation System
\`\`\`
Scroll Events → Intersection Observer → Animation Triggers → CSS Transitions
\`\`\`

## 🎭 Animation Architecture

### Scroll-Based Animations
\`\`\`tsx
// Animation flow
useEffect → IntersectionObserver → State Update → CSS Class Toggle → Animation
\`\`\`

### Performance Considerations
- Hardware-accelerated transforms (`transform`, `opacity`)
- Intersection Observer for efficient scroll detection
- CSS-based animations over JavaScript animations
- Reduced motion support for accessibility

## 📱 Responsive Design Strategy

### Breakpoint System
\`\`\`css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
\`\`\`

### Layout Strategy
1. **Mobile First**: Design for mobile, enhance for larger screens
2. **Flexbox Primary**: Use flexbox for most layouts
3. **Grid Secondary**: CSS Grid for complex 2D layouts
4. **Container Queries**: Future-ready responsive design

## 🚀 Performance Architecture

### Optimization Strategies

1. **Next.js Optimizations**
   - App Router for improved performance
   - Automatic code splitting
   - Image optimization with next/image
   - Font optimization with next/font

2. **CSS Optimizations**
   - Tailwind CSS purging
   - Critical CSS inlining
   - Minimal custom CSS

3. **JavaScript Optimizations**
   - Tree shaking with ES modules
   - Dynamic imports for heavy components
   - Efficient event listeners

4. **Animation Performance**
   - CSS transforms over layout changes
   - `will-change` property for animated elements
   - Intersection Observer for scroll events

### Loading Strategy
\`\`\`
Initial Load → Critical CSS → JavaScript → Progressive Enhancement
\`\`\`

## 🔒 Security Considerations

### Content Security
- Static content reduces attack surface
- No user-generated content currently
- Sanitized external links

### Performance Security
- Rate limiting through Vercel
- CDN protection
- Optimized bundle sizes

## 🌐 SEO Architecture

### Meta Data Strategy
\`\`\`tsx
// Each page defines its metadata
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
  openGraph: { /* OG tags */ },
  twitter: { /* Twitter cards */ }
}
\`\`\`

### Structured Data
- JSON-LD for cultural heritage items
- Schema.org markup for better search visibility
- Semantic HTML structure

## 🧪 Testing Strategy

### Testing Pyramid
\`\`\`
E2E Tests (Few)
    ↑
Integration Tests (Some)
    ↑
Unit Tests (Many)
    ↑
Static Analysis (TypeScript, ESLint)
\`\`\`

### Accessibility Testing
- Automated testing with axe-core
- Manual testing with screen readers
- Keyboard navigation testing
- Color contrast validation

## 🔄 Deployment Architecture

### Build Process
\`\`\`
Source Code → TypeScript Compilation → Next.js Build → Static Generation → Deployment
\`\`\`

### Vercel Integration
- Automatic deployments on git push
- Preview deployments for pull requests
- Edge network distribution
- Analytics and performance monitoring

## 🔮 Future Architecture Considerations

### Scalability Preparations
1. **Content Management**
   - Headless CMS integration ready
   - API route structure prepared
   - Dynamic content loading patterns

2. **Internationalization**
   - i18n structure planned
   - Content separation strategy
   - RTL language support consideration

3. **Advanced Features**
   - Search functionality architecture
   - User authentication patterns
   - Content personalization system

### Technology Evolution
- React Server Components adoption
- Streaming and Suspense optimization
- Progressive Web App features
- Advanced animation libraries integration

## ✅ Recent Architecture Updates

The system has been modularized to improve clarity and scalability:
- Feature modules introduced (e.g., `modules/glossary`) with dedicated components and utilities.
- Shared types placed under `types/` and common helpers under `lib/` (e.g., robust `lib/slugify.ts`).
- UX layer consolidated: route transitions via `components/ux/transition-provider.tsx` and smooth scroll utilities via `components/ui/scroll-to.tsx`.
- Drawer refactored to use our Radix/shadcn-based Sheet components (no `vaul` peer dependency).

### Feature Module Structure

\`\`\`
modules/
└── glossary/
    ├── components/
    │   └── term-card.tsx
    ├── utils/
    │   └── map-lexicon.ts
    └── index.ts
types/
└── lexicon.ts
lib/
└── slugify.ts
\`\`\`

### Routing Overview

- Glossary list: `/budaya/daerah/-` (cards per term with clear “Rincian” button)
- Term detail: `/budaya/daerah/-/[term]` (profile-like layout: image, description, cultural info)
- Cultural map: `/peta-budaya` with a prominent button linking to the glossary

### Animation & UX Layer

- Page transitions: lightweight fade/slide on route change (RSC-friendly, reduced-motion aware)
- Smooth scrolling: global smooth behavior + `ScrollToButton` utility for section navigation
- Tickers: logo ticker (showcase) and team ticker (dedicated section), both with hover-to-pause and seamless looping

### Design Consistency

- 3–5 color tokens, two font families, flex-first responsive layout, shadcn/ui components
- Accessibility: proper aria/roles, focus states, and prefers-reduced-motion honored
\`\`\`

---

This architecture provides a solid foundation for the cultural heritage showcase while maintaining flexibility for future enhancements and scalability requirements.
