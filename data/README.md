# Data Organization Structure

This folder contains all data files, configurations, and constants for the UB Corpora project.

## File Organization

### Content Data
- **categories.ts** - Cultural categories with icons and metadata
- **cultural-items.ts** - Main cultural items/artifacts database
- **regions.ts** - East Java regions with coordinates and specialties
- **regions-complete.ts** - Extended region information
- **lexicon.ts** - Glossary and terminology data
- **team.ts** - Team member information
- **partners.ts** - Partner organizations data
- **region-images.ts** - Region-specific image mappings
- **navigations.ts** - Navigation structure and menu items

### Configuration Data
- **config.ts** - Application configuration (name, version, contact info, social links)
- **search-config.ts** - Search functionality settings (debounce, history limits, suggestions)
- **ui-config.ts** - UI/UX settings (animation duration, pagination, storage keys)
- **routes.ts** - Application route definitions
- **enums.ts** - Enumerated constants (categories, difficulty levels, popularity thresholds)

### Central Export
- **index.ts** - Centralized export point for all data and configuration

## Usage

Import data and configuration from the data folder:

\`\`\`typescript
// Import specific data
import { categories } from "@/data/categories"
import { ROUTES } from "@/data/routes"
import { APP_CONFIG } from "@/data/config"

// Or import from the index
import { categories, ROUTES, APP_CONFIG } from "@/data"
\`\`\`

## Benefits

- **Separation of Concerns**: Data is clearly separated from business logic
- **Maintainability**: Easy to locate and update data files
- **Scalability**: Simple to add new data sources
- **Type Safety**: All data is properly typed with TypeScript interfaces
- **Centralized Management**: Single source of truth for all application data
