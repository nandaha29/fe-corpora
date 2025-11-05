# Modular Architecture Overview

Recommended high-level structure:
- app/ … Next.js routes (Server Components by default)
- components/
  - ui/ … Reusable, design-system primitives (buttons, cards, inputs)
  - sections/ … Page sections (hero, about, showcase, galleries)
- modules/
  - glossary/ … Feature module for cultural glossary
    - components/ … Feature-specific UI
    - utils/ … Feature logic (mapping, transforms)
    - index.ts … Barrel exports
- lib/ … Cross-cutting utilities (slugify, formatting, constants)
- types/ … Shared TypeScript interfaces and types
- data/ … Static data and data loaders (re-export via data/index.ts)
- hooks/ … Reusable React hooks
- public/ … Assets
- docs/ … Documentation (this file, architecture notes)

Principles:
- UI primitives live in components/ui; feature-specific UI belongs in modules/<feature>/components.
- Put feature logic (mappers, selectors) in modules/<feature>/utils; cross-cutting helpers in lib/.
- Share contracts in types/ and import across app, modules, and components to keep type safety consistent.
- Use barrel files (index.ts) per folder for clean imports and to reduce import path churn.
- Keep pages thin: do data-loading and orchestration in the route, render with modular components from modules/ and components/sections/.
- Prefer semantic Tailwind tokens and shadcn patterns for consistent, accessible UI.
