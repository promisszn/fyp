# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Installation and Setup
```bash
# Install dependencies (uses npm by default)
npm install

# For other package managers
pnpm install
yarn install
bun install
```

### Development Server
```bash
# Start development server on port 5000 (configured in package.json)
npm run dev

# Alternative package managers
pnpm dev
yarn dev
bun run dev
```

### Build and Production
```bash
# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build locally
npm run preview

# Prepare Nuxt (runs automatically after install)
npm run postinstall
```

### Running Single Tests
The project uses Nuxt's built-in development and build tooling. For component-specific testing:
- Use browser dev tools to inspect individual components
- Test specific pages by navigating directly to routes like `/dashboard`, `/login`, `/project/[id]`
- Use Nuxt DevTools (enabled in config) for debugging

## Project Architecture

### Technology Stack
- **Framework**: Nuxt 4 (Vue.js 3 with TypeScript)
- **UI Library**: Nuxt UI 3 with Tailwind CSS
- **Key Dependencies**:
  - `@nuxtjs/leaflet` for geospatial mapping
  - `@vueuse/nuxt` for composable utilities
  - `axios` for API communication
  - `@remixicon/vue` for icons

### Application Structure

**AutoPlan** is a web-based geospatial platform for cadastral and topographic plan automation. The application follows Nuxt's file-based routing and component architecture.

#### Core Application Flow
1. **Authentication**: Cookie-based auth with middleware protection (`app/middleware/auth.ts`)
2. **Project Management**: Users create projects and manage surveying plans
3. **Plan Workflow**: Multi-step plan creation with computation capabilities
4. **Coordinate Processing**: Handles coordinate transformations and geospatial calculations

#### Key Architectural Patterns

**Route Structure**:
- `/` - Landing page with product information
- `/login` - Authentication page
- `/dashboard` - Project listing and management
- `/project/[id]` - Individual project view
- `/project/[id]/plan/[plan]` - Plan editing and workflow steps
- `/set-profile` - User profile configuration

**Component Organization**:
- `components/plan/steps/` - Multi-step plan creation workflow components
- `components/svgs/` - Custom SVG components for drawing tools
- Modal components for project creation and editing

**State Management**:
- `composables/useCoordinateTransfer.ts` - Global state for coordinate data transfer between views
- Cookie-based user session and API token storage
- `useState` for cross-navigation persistence

**Plan Workflow Steps** (components/plan/steps/):
1. `StepBasicDetails` - Project metadata
2. `StepCoordinates` - Coordinate input and management
3. `StepParcels` - Parcel definition
4. `StepDrawing` - Interactive drawing tools
5. `StepComputation` - Automated calculations
6. `StepEmbellishment` - Plan annotations
7. `StepReport` - Final report generation

#### Configuration Notes
- Development server runs on port 5000 (configured in package.json)
- Nuxt DevTools enabled for debugging
- Color mode support with system preference detection
- Image optimization with `@nuxt/image`
- Leaflet integration for geospatial functionality

#### Type Definitions
- `app/types/planTypes.ts` - Plan-related type definitions including PLAN_TYPES constants
- Plan types supported: Cadastral, Topographical, Layout, Route

#### Authentication & Middleware
- Global auth middleware checks for user, token, and api_token cookies
- Redirects unauthenticated users to `/login`
- Skip auth check only for login page

#### Styling & Theme
- Tailwind CSS with dark mode support
- Custom CSS in `app/assets/css/main.css`
- Dynamic theme color meta tag based on color mode
- Responsive design with mobile-first approach
