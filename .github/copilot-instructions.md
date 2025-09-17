# Copilot Instructions

## Project Overview
This is a **surveying and planning application** built with Nuxt 3, designed for creating and managing cadastral and route surveys. The app handles coordinate systems, elevation data, and generates survey plans through a multi-step workflow.

## Key Architecture Patterns

### Authentication & API Setup
- **Cookie-based auth**: Uses `token`, `user`, and `api_token` cookies managed via `useCookie()`
- **Axios interceptors**: Auto-attach auth headers in `app/plugins/axios.ts`, handle 401s with toast notifications and redirects
- **Middleware**: `app/middleware/auth.ts` protects routes - add `definePageMeta({ middleware: ["auth"] })` to secured pages
- **API base URL**: Configure via `BASE_URL` environment variable in `nuxt.config.ts` runtime config
- **Google OAuth**: Integrated with Google Sign-In using `GoogleSignInButton.vue` component and `useGoogleAuth()` composable

### Plan Creation Workflow
The core business logic revolves around **multi-step plan creation**:
- Plans are categorized by type: `cadastral`, `route`, `topographic`, `layout` (see `app/types/planTypes.ts`)
- Step components in `app/components/plan/steps/` handle: BasicDetails → Coordinates → Drawing → Elevation → Computation → Parcels → Embellishment → Report
- Each step validates data before proceeding to next step
- Route structure: `/project/[id]/plan/create` and `/project/[id]/plan/[plan]/edit`

### State Management Patterns
- **Coordinate transfer**: Use `useCoordinateTransfer()` composable for passing survey coordinates between components
- **useState**: Persist data across navigation with `useState('key', () => defaultValue)`
- **Computed properties**: Reactive data like `hasTransferredCoordinates` for conditional UI

### UI Conventions
- **Dark mode**: Uses `@nuxtjs/color-mode` with system preference, stored as 'theme' key
- **Toasts**: Global toast system via Nuxt UI - use `useToast()` for notifications
- **Fixed headers**: `UserHeader` component uses fixed positioning with `pt-24` content padding
- **Loading states**: Consistent loading indicators with spinning animations and disabled buttons
- **Responsive**: Mobile-first with `sm:`, `lg:` breakpoints throughout

## Development Workflow

### Environment Setup
```bash
# Dev server runs on port 4000 (not default 3000)
npm run dev  # or pnpm/yarn/bun dev
```

### Key Dependencies
- **Leaflet maps**: `@nuxtjs/leaflet` for coordinate plotting and map interactions
- **Rich text**: `@vueup/vue-quill` with `QuillEditorClient.vue` wrapper component
- **Icons**: `@remixicon/vue` - import specific icons like `RiArrowLeftLine`
- **UI library**: `@nuxt/ui` for components, forms, and toast system

### File Organization
- **Types**: Define in `app/types/` and re-export through `app/types/index.ts`
- **Composables**: State management and reusable logic in `app/composables/`
- **Components**: Feature-specific components in subdirectories (e.g., `plan/steps/`)
- **Modals**: Modal components follow `*Modal.vue` naming convention

## Critical Implementation Details

### Form Validation Pattern
Components use local reactive state with validation on submit:
```vue
const submitted = ref(false);
const local = reactive({ basic: { name: '', type: '' } });

const onSubmit = () => {
  submitted.value = true;
  if (!local.basic.name) return; // Show validation errors
  // Process valid form
};
```

### Navigation Patterns
- Use `navigateTo()` for programmatic navigation
- Back buttons typically use `navigateTo()` with explicit paths rather than browser history
- Route params accessed via `useRoute().params`

### Component Communication
- Parent-child: Props down, events up with `@update:model-value` pattern
- Cross-component: Composables like `useCoordinateTransfer()`
- Global state: `useState()` for persistent data across navigation

## External Integrations
- **Maps**: Leaflet integration for coordinate visualization and plotting
- **API**: RESTful backend with Bearer token authentication
- **File uploads**: Likely handled through coordinate/elevation data imports

When working on this codebase, focus on the survey workflow, coordinate handling, and maintaining the established authentication patterns.