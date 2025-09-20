# AutoPlan - Surveying & Planning Application

A modern web application built with Nuxt 3 for creating and managing cadastral and route surveys. AutoPlan provides a comprehensive platform for surveyors to handle coordinate systems, elevation data, and generate professional survey plans through an intuitive multi-step workflow.

![AutoPlan Logo](/public/logo.svg)

## 🚀 Features

### Core Functionality
- **Multi-step Plan Creation**: Comprehensive workflow covering BasicDetails → Coordinates → Drawing → Elevation → Computation → Parcels → Embellishment → Report
- **Plan Types**: Support for Cadastral, Route, Topographic, and Layout surveys
- **Coordinate Management**: Advanced coordinate transfer system between components
- **Interactive Maps**: Leaflet integration for coordinate visualization and plotting
- **Elevation Data**: Handle and process elevation information for surveys
- **Spreadsheet Support**: Import coordinates from CSV and XLSX files
- **CAD Export**: Export drawings to DXF for use in CAD software

### Authentication & User Management
- **Dual Authentication**: Email/OTP and Google OAuth integration
- **Profile Management**: User profile setup and management
- **Session Management**: Secure token-based authentication with automatic session handling

### User Experience
- **Dark/Light Theme**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint support
- **Rich Text Editing**: Integrated Quill editor for detailed survey reports
- **Toast Notifications**: Real-time feedback system for user actions

## 🛠️ Technology Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Styling**: Tailwind CSS, Nuxt UI
- **Maps**: Leaflet via @nuxtjs/leaflet
- **Authentication**: Custom implementation with Google OAuth
- **Icons**: Remix Icon (@remixicon/vue)
- **Rich Text**: Vue Quill (@vueup/vue-quill)
- **HTTP Client**: Axios with custom interceptors

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, pnpm, yarn, or bun
- Backend API server (running on port 8000 by default)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd fyp
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
# or 
yarn install
# or
bun install
```

3. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
BASE_URL=http://localhost:8000
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

4. **Start Development Server**
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun run dev
```

The application will be available at `http://localhost:4000` (note: not the default 3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BASE_URL` | Backend API base URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Optional* |

*Required for Google authentication feature

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google Identity Services
4. Create OAuth 2.0 credentials
5. Add authorized origins: `http://localhost:4000` (dev) and your production domain
6. Copy Client ID to your `.env` file

For detailed setup instructions, see [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)

## 📁 File Format Support

Supported import formats:

- CSV files
- XLSX spreadsheet files
- TXT coordinate exports

Supported export formats:

- PDF reports
- DXF drawings (for CAD workflows)
- Map images (PNG/JPEG)
- Coordinate tables (CSV/XLSX)

## 🏗️ Project Structure

```
app/
├── components/           # Vue components
│   ├── plan/steps/      # Survey plan step components
│   └── GoogleSignInButton.vue
├── composables/         # Vue composables
│   ├── useCoordinateTransfer.ts
│   └── useGoogleAuth.ts
├── layouts/            # Nuxt layouts
├── middleware/         # Route middleware
│   └── auth.ts
├── pages/              # Application pages
│   ├── project/[id]/   # Project-specific pages
│   └── login.vue
├── plugins/            # Nuxt plugins
│   ├── axios.ts        # API interceptors
│   └── google-auth.client.ts
└── types/              # TypeScript definitions
    └── planTypes.ts
```

## 🔐 Authentication Flow

### Email/OTP Authentication
1. User enters email
2. OTP sent to email
3. User enters OTP
4. Tokens stored in cookies
5. Redirect to dashboard/profile setup

### Google OAuth
1. User clicks "Continue with Google"
2. Google OAuth popup
3. JWT token sent to backend
4. Backend verifies token and returns app tokens
5. Same cookie storage and redirect flow

## 🗺️ Survey Workflow

The application follows a structured survey creation process:

1. **BasicDetails**: Plan name, type, and basic information
2. **Coordinates**: Import and manage survey coordinates
3. **Drawing**: Visual representation and plotting
4. **Elevation**: Elevation data input and processing
5. **Computation**: Mathematical calculations and processing
6. **Parcels**: Parcel definition and management
7. **Embellishment**: Final touches and annotations
8. **Report**: Generate final survey reports

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and documentation:
- Check the [Google Auth Setup Guide](./GOOGLE_AUTH_SETUP.md)
- Review [Copilot Instructions](./.github/copilot-instructions.md) for development patterns
- Open an issue for bug reports or feature requests

---

Built with ❤️ using Nuxt 3 and modern web technologies.
