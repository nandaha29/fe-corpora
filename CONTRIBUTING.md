// ... existing code ...
// <CHANGE> appended contribution scope updates and compatibility notes

## 🤝 Contribution Scope Updates

- Glossary Feature: Improve list/detail pages, enrich term data, accessibility checks
- Cultural Map: Enhance navigation to glossary and map interactions
- UX & Transitions: Refine route transitions, smooth scrolling, and tickers (logo/team)
- Modularization: Migrate ad-hoc code into `modules/*`, `types/*`, and `lib/*`

## 🔧 Compatibility Notes

- We removed `vaul` to avoid React 19 peer-dependency conflicts. Use our Sheet-based drawer in `components/ui/sheet.tsx`.
- Prefer incremental refactors: introduce new components under `modules/*` and gradually migrate pages.

## 🧪 PR Expectations (Additions)

- Include before/after screenshots for UI changes (especially animations/tickers).
- Confirm reduced-motion behavior for any new animation.
- Note any design tokens you add and ensure consistency across docs/components.

## 📦 Commit Examples (Expanded)

\`\`\`
feat(glossary): add TermCard variants and empty state
feat(ux): add TransitionProvider for route change animations
refactor(drawer): replace vaul with sheet-based drawer components
docs(architecture): document feature module structure
