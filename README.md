# Warisan Budaya Jawa Timur - Cultural Heritage of East Java

A modern, interactive web application showcasing the rich cultural heritage of East Java, Indonesia. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring smooth animations, parallax effects, and responsive design.

## 🌟 Features

- **Interactive Cultural Showcase**: Explore traditional arts, crafts, and cultural practices
- **Smooth Animations**: Scroll-triggered animations and parallax effects for engaging user experience
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Modern UI Components**: Built with shadcn/ui component library
- **Accessibility First**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading with Next.js 14 App Router and optimized images
- **Glossary Pages**: List at `/budaya/daerah/-` with clear per-card “Rincian” buttons, Detail at `/budaya/daerah/-/[term]` with profile-like layout (image, description, cultural info)
- **Cultural Map**: `/peta-budaya` now includes a prominent button to the glossary
- **Smooth UX**: Page transitions and button-triggered smooth scrolling with reduced-motion support
- **Tickers**: Continuous logo ticker (showcase) and a dedicated team ticker section with hover-to-pause

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd warisan-budaya-jawa-timur
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

\`\`\`
├── app/                          # Next.js 14 App Router
│   ├── budaya/                   # Cultural heritage detail pages
│   │   ├── [id]/                 # Dynamic routes for individual culture items
│   │   └── layout.tsx            # Layout for culture pages
│   ├── globals.css               # Global styles and custom animations
│   ├── layout.tsx                # Root layout with fonts and providers
│   ├── loading.tsx               # Loading UI component
│   └── page.tsx                  # Homepage with all sections
├── components/                   # Reusable UI components
│   ├── common/                   # Shared components across features
│   │   ├── animated-reveal.tsx   # Scroll-triggered animation component
│   │   └── parallax-background.tsx # Parallax scrolling effects
│   ├── cultural/                 # Culture-specific components
│   │   └── culture-card.tsx      # Cultural item display card
│   ├── interactive/              # Interactive UI components
│   │   └── enhanced-button.tsx   # Button with visual effects
│   ├── layout/                   # Layout-specific components
│   │   └── navigation/           # Navigation components
│   │       └── navbar.tsx        # Main navigation bar
│   ├── ui/                       # shadcn/ui base components
│   │   ├── button.tsx            # Base button component
│   │   ├── card.tsx              # Card component
│   │   ├── badge.tsx             # Badge component
│   │   └── ...                   # Other UI components
│   ├── theme-provider.tsx        # Theme context provider
│   ├── ux/                       # UX-specific components
│   │   └── transition-provider.tsx # Transition provider for smooth UX
│   └── index.ts                  # Barrel exports for easy imports
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx            # Mobile device detection
│   ├── use-scroll-animation.ts   # Scroll animation utilities
│   └── use-toast.ts              # Toast notification hook
├── lib/                          # Utility functions
│   ├── slugify.ts                # Slugify utility function
│   └── utils.ts                  # Common utilities (cn function, etc.)
├── modules/                      # Modular components
│   ├── glossary/                 # Glossary module components
│   │   ├── components/           # Glossary components
│   │   │   └── term-card.tsx     # Term card component
│   │   └── utils/                # Glossary module utils
│   │       └── map-lexicon.ts    # Map lexicon utility
│   └── ...                       # Other modules
├── public/                       # Static assets
│   └── images/                   # Image assets
└── styles/                       # Additional stylesheets
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Yellow-700 (`oklch(0.45 0.15 65)`) - Traditional Indonesian gold
- **Secondary**: Indigo (`oklch(0.55 0.2 270)`) - Deep blue for contrast
- **Accent**: Emerald (`oklch(0.6 0.15 160)`) - Natural green
- **Background**: White with subtle beige cards
- **Text**: Gray-800 for optimal readability

### Typography
- **Primary Font**: Geist Sans - Modern, clean sans-serif
- **Monospace**: Geist Mono - For code and technical content
- **Display Font**: Manrope - For headings and emphasis

### Animation System
- **Scroll Animations**: Fade-up, slide-in, scale-up effects
- **Parallax Effects**: Subtle background movement for depth
- **Interactive Feedback**: Hover effects, ripple animations, glow effects
- **Performance**: Hardware-accelerated transforms, optimized for 60fps

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Adding New Components

1. **Create component in appropriate directory**:
   \`\`\`tsx
   // components/cultural/new-component.tsx
   export function NewComponent() {
     return <div>New Component</div>
   }
   \`\`\`

2. **Add to barrel exports**:
   \`\`\`tsx
   // components/index.ts
   export { NewComponent } from "./cultural/new-component"
   \`\`\`

3. **Use in your pages**:
   \`\`\`tsx
   import { NewComponent } from "@/components"
   \`\`\`

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the established color system
- Implement responsive design with mobile-first approach
- Add hover states and transitions for interactive elements
- Ensure accessibility with proper contrast ratios

### Animation Best Practices

- Use `AnimatedReveal` for scroll-triggered animations
- Implement `ParallaxBackground` for depth effects
- Add `EnhancedButton` for interactive feedback
- Keep animations subtle and purposeful
- Test performance on lower-end devices

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. **Deploy** - Automatic deployments on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: CSS Grid, Flexbox, Intersection Observer API
- **Fallbacks**: Graceful degradation for older browsers

## 🤝 Contributing

We welcome contributions to improve the cultural heritage showcase!

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**:
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Make your changes** following our coding standards
4. **Test thoroughly** on different devices and browsers
5. **Commit your changes**:
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
6. **Push to your branch**:
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
7. **Open a Pull Request**

### Contribution Guidelines

- **Code Style**: Follow existing patterns and use Prettier/ESLint
- **Components**: Create reusable, well-documented components
- **Accessibility**: Ensure all new features are accessible
- **Performance**: Test impact on loading times and animations
- **Documentation**: Update README and add inline comments
- **Testing**: Test on multiple devices and browsers

### Areas for Contribution

- **Cultural Content**: Add more traditional arts and crafts
- **Animations**: Enhance existing animations or add new ones
- **Accessibility**: Improve screen reader support and keyboard navigation
- **Performance**: Optimize images, animations, and loading times
- **Mobile Experience**: Enhance touch interactions and responsive design
- **Internationalization**: Add support for multiple languages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cultural Heritage**: Traditional arts and crafts of East Java
- **Design Inspiration**: Indonesian cultural motifs and patterns
- **Technical Stack**: Next.js, React, Tailwind CSS, shadcn/ui
- **Community**: Open source contributors and cultural preservationists

## 📞 Support

For questions, suggestions, or support:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@warisanbudaya.com

---

**Built with ❤️ for preserving Indonesian cultural heritage**
