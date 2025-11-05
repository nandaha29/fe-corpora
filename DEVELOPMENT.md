# Development Guide

This guide provides detailed information for developers working on the Warisan Budaya Jawa Timur project.

## 🛠️ Development Environment Setup

### Prerequisites
- **Node.js**: 18.17 or later
- **Package Manager**: npm, yarn, or pnpm
- **Editor**: VS Code (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

### Initial Setup
\`\`\`bash
# Clone the repository
git clone <repository-url>
cd warisan-budaya-jawa-timur

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
\`\`\`

## 🔁 Environment & Setup Updates

- React 19 compatibility: the `vaul` package has been removed; `components/ui/drawer.tsx` now leverages our Sheet primitives.
- Prefer Node 18.17+ LTS; if you hit peer-deps conflicts locally, ensure your lockfile is fresh after pulling.

## 📋 Development Workflow

### Branch Strategy
\`\`\`
main                    # Production-ready code
├── develop            # Integration branch
├── feature/navbar     # Feature branches
├── fix/mobile-nav     # Bug fix branches
└── docs/readme        # Documentation branches
\`\`\`

### Daily Workflow
1. **Pull latest changes**
   \`\`\`bash
   git checkout develop
   git pull origin develop
   \`\`\`

2. **Create feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

3. **Develop and test**
   \`\`\`bash
   npm run dev          # Start development
   npm run lint         # Check code quality
   npm run build        # Test production build
   \`\`\`

4. **Commit and push**
   \`\`\`bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   \`\`\`

5. **Create pull request**
   - Target: `develop` branch
   - Include description and screenshots
   - Request review from team members

## 🏗️ Component Development

### Component Structure
\`\`\`tsx
// components/example/example-component.tsx
"use client" // Only if client-side features needed

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ExampleComponentProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function ExampleComponent({
  title,
  description,
  className,
  children,
}: ExampleComponentProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={cn("base-styles", className)}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && (
        <p className="text-gray-600 mt-2">{description}</p>
      )}
      {children}
    </div>
  )
}
\`\`\`

### Component Guidelines

1. **TypeScript First**
   - Define proper interfaces for props
   - Use generic types when appropriate
   - Avoid `any` type usage

2. **Accessibility**
   - Include ARIA labels and roles
   - Support keyboard navigation
   - Maintain proper focus management
   - Test with screen readers

3. **Performance**
   - Use React.memo for expensive components
   - Implement proper dependency arrays in hooks
   - Avoid unnecessary re-renders

4. **Styling**
   - Use Tailwind utility classes
   - Follow mobile-first responsive design
   - Maintain consistent spacing scale

### Animation Components

\`\`\`tsx
// Example: Creating an animated component
import { AnimatedReveal } from "@/components/common/animated-reveal"

export function AnimatedSection() {
  return (
    <AnimatedReveal animation="fade-up" delay={200}>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h3>Animated Content</h3>
        <p>This content will fade up when scrolled into view</p>
      </div>
    </AnimatedReveal>
  )
}
\`\`\`

## 🧭 Local Navigation & Transitions

- Route transitions are handled by `components/ux/transition-provider.tsx`. If you add new layouts, ensure children are keyed by pathname.
- Smooth scrolling is globally enabled; use `components/ui/scroll-to.tsx` for button-triggered section scroll (supports optional offset and reduced-motion).

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices

1. **Utility-First Approach**
   \`\`\`tsx
   // Good
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
   
   // Avoid custom CSS when utilities exist
   <div className="custom-card-style">
   \`\`\`

2. **Responsive Design**
   \`\`\`tsx
   // Mobile-first responsive classes
   <div className="text-sm md:text-base lg:text-lg">
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   \`\`\`

3. **Color System**
   \`\`\`tsx
   // Use semantic color tokens
   <button className="bg-primary text-primary-foreground">
   <div className="bg-card text-card-foreground">
   \`\`\`

4. **Spacing Scale**
   \`\`\`tsx
   // Use consistent spacing
   <div className="p-4 m-2 gap-4">        // Good
   <div className="p-[16px] m-[8px]">     // Avoid arbitrary values
   \`\`\`

### Custom CSS Guidelines

\`\`\`css
/* globals.css - Only for complex animations or global styles */

/* Custom animations */
@keyframes custom-animation {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.custom-animation {
  animation: custom-animation 0.6s ease-out;
}

/* Component-specific styles only when Tailwind isn't sufficient */
.parallax-container {
  overflow: hidden;
  position: relative;
}
\`\`\`

## 🔧 State Management

### Local State (useState)
\`\`\`tsx
// For component-specific state
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({ name: '', email: '' })
\`\`\`

### Context API
\`\`\`tsx
// For shared state across components
const ThemeContext = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>()

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
\`\`\`

### URL State (Next.js Router)
\`\`\`tsx
// For navigation and deep linking
import { useRouter, useSearchParams } from 'next/navigation'

const router = useRouter()
const searchParams = useSearchParams()

// Navigate programmatically
router.push('/budaya/traditional-dance')

// Read URL parameters
const category = searchParams.get('category')
\`\`\`

## 🧪 Testing Strategy

### Manual Testing Checklist

#### Functionality Testing
- [ ] All navigation links work correctly
- [ ] Forms submit and validate properly
- [ ] Interactive elements respond to user input
- [ ] Animations trigger at appropriate times
- [ ] Mobile menu opens and closes correctly

#### Responsive Testing
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators are visible
- [ ] Alt text for images

#### Performance Testing
- [ ] Page load times under 3 seconds
- [ ] Animations run at 60fps
- [ ] No layout shifts during loading
- [ ] Images load progressively

### Testing Procedures (Added)

- Animations: verify 60fps on mid-tier hardware; test `prefers-reduced-motion`.
- Accessibility: keyboard focus order with transitions; hover-to-pause behavior for tickers.
- Navigation: fast route changes shouldn’t interrupt page state unexpectedly.

### Testing Tools

\`\`\`bash
# Lighthouse audit
npm run build
npm run start
# Open Chrome DevTools > Lighthouse

# Accessibility testing
# Install axe DevTools extension
# Run automated accessibility scan

# Performance monitoring
# Use Chrome DevTools Performance tab
# Monitor Core Web Vitals
\`\`\`

## 🚀 Build and Deployment

### Local Build Testing
\`\`\`bash
# Test production build locally
npm run build
npm run start

# Check for build errors
npm run lint
\`\`\`

### Environment Variables
\`\`\`bash
# .env.local (not committed to git)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
\`\`\`

### Deployment Checklist
- [ ] All tests pass
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] Performance metrics acceptable
- [ ] SEO meta tags updated
- [ ] Accessibility requirements met

## 🐛 Debugging

### Common Issues and Solutions

1. **Hydration Errors**
   \`\`\`tsx
   // Problem: Server/client mismatch
   // Solution: Use useEffect for client-only code
   useEffect(() => {
     // Client-only code here
   }, [])
   \`\`\`

2. **Animation Performance**
   \`\`\`css
   /* Problem: Janky animations */
   /* Solution: Use transform and opacity */
   .smooth-animation {
     will-change: transform, opacity;
     transform: translateZ(0); /* Force hardware acceleration */
   }
   \`\`\`

3. **Mobile Touch Issues**
   \`\`\`css
   /* Problem: Touch targets too small */
   /* Solution: Minimum 44px touch targets */
   .touch-target {
     min-height: 44px;
     min-width: 44px;
   }
   \`\`\`

4. **Troubleshooting (Peer Deps)**
   - If you encounter `ERESOLVE` with React version mismatches:
     - Ensure `vaul` is not in your lockfile.
     - Reinstall deps cleanly (delete lockfile and node_modules).
     - Avoid `--force` unless absolutely necessary; prefer aligning versions.

### Debug Tools
\`\`\`tsx
// Development debugging
console.log('[DEBUG] Component rendered:', { props, state })

// Performance debugging
console.time('expensive-operation')
// ... expensive code
console.timeEnd('expensive-operation')

// React DevTools
// Install React Developer Tools browser extension
\`\`\`

## 📊 Performance Optimization

### Image Optimization
\`\`\`tsx
import Image from 'next/image'

// Optimized image loading
<Image
  src="/images/cultural-item.jpg"
  alt="Traditional Javanese Art"
  width={400}
  height={300}
  priority={false} // Only true for above-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
\`\`\`

### Code Splitting
\`\`\`tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Client-side only if needed
})
\`\`\`

### Bundle Analysis
\`\`\`bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
\`\`\`

## 🔒 Security Best Practices

### Content Security
- Sanitize any user input (if added in future)
- Use HTTPS in production
- Validate all external links
- Implement proper error boundaries

### Performance Security
- Optimize images to prevent large downloads
- Implement rate limiting for API routes
- Use environment variables for sensitive data
- Regular dependency updates

## 📈 Monitoring and Analytics

### Performance Monitoring
\`\`\`tsx
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
\`\`\`

### Error Tracking
\`\`\`tsx
// Error boundary for production
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo)
  }
}
\`\`\`

## 🧩 Modular Development Tips

- Create new feature code under `modules/<feature>/{components,utils}`.
- Share types in `types/*` and cross-cutting helpers in `lib/*`.
- For UI, favor shadcn/ui components under `components/ui/*` and keep feature-specific UI inside its module.

---

This development guide provides the foundation for maintaining high code quality and consistent development practices across the project.
