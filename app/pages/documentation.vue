<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300"
  >
    <!-- Navigation Header -->
    <div
      class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <NuxtLink
              to="/"
              class="text-xl font-bold text-gray-900 dark:text-white"
            >
              AutoPlan
            </NuxtLink>
            <span class="ml-4 text-gray-500 dark:text-gray-400">|</span>
            <span class="ml-4 text-gray-700 dark:text-gray-300">
              Documentation
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/dashboard"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-12 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-3">
          <div class="sticky top-24">
            <div
              class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-6"
            >
              <h3
                class="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide"
              >
                Table of Contents
              </h3>
              <nav class="space-y-2">
                <a
                  v-for="section in sections"
                  :key="section.id"
                  :href="`#${section.id}`"
                  class="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                  @click.prevent="scrollToSection(section.id)"
                >
                  {{ section.title }}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-9">
          <div class="space-y-12">
            <!-- Introduction -->
            <section id="introduction" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h1
                  class="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  AutoPlan Documentation
                </h1>
                <p
                  class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                  AutoPlan is a comprehensive web-based geospatial platform
                  designed to streamline cadastral and engineering surveys. This
                  application automates complex surveying calculations, provides
                  coordinate system transformations, and generates
                  submission-ready plans and reports.
                </p>
                <div
                  class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
                >
                  <h3
                    class="font-semibold text-blue-900 dark:text-blue-200 mb-2"
                  >
                    Key Features
                  </h3>
                  <ul
                    class="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-300"
                  >
                    <li>Project and plan management</li>
                    <li>Coordinate import and processing</li>
                    <li>Automated area and bearing calculations</li>
                    <li>Traverse computations</li>
                    <li>Interactive map visualization</li>
                    <li>Plan generation and reporting</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Getting Started -->
            <section id="getting-started" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Getting Started
                </h2>

                <div class="space-y-6">
                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      1. User Registration & Authentication
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Begin by creating an account and logging into the system:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Navigate to the login page</li>
                      <li>Create a new account or sign in with existing credentials</li>
                      <li>Complete your profile setup if required</li>
                    </ul>
                  </div>

                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      2. Dashboard Overview
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      The dashboard is your central hub for managing all surveying projects:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>View all your projects in one place</li>
                      <li>Filter projects by status (Draft, In Progress, Completed, etc.)</li>
                      <li>Search projects by name</li>
                      <li>Quick access to create new projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- Project Management -->
            <section id="project-management" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Project Management
                </h2>

                <div class="space-y-6">
                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Creating Projects
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Projects serve as containers for all related surveying work:
                    </p>
                    <ol
                      class="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Click "Create Project" from the dashboard</li>
                      <li>Enter project details (name, description, location)</li>
                      <li>Set project status and priority</li>
                      <li>Save to create your new project workspace</li>
                    </ol>
                  </div>

                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Project Status Workflow
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4">
                      <div
                        class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4"
                      >
                        <h4
                          class="font-medium text-gray-800 dark:text-gray-200 mb-2"
                        >
                          Status Types:
                        </h4>
                        <ul
                          class="space-y-1 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <li><strong>Draft:</strong> Initial planning phase</li>
                          <li><strong>In Progress:</strong> Active work</li>
                          <li><strong>Field Work Complete:</strong> Data collection finished</li>
                          <li><strong>Computed:</strong> Calculations completed</li>
                          <li><strong>Plan Prepared:</strong> Documentation ready</li>
                          <li><strong>Completed:</strong> Project finalized</li>
                        </ul>
                      </div>
                      <div
                        class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4"
                      >
                        <h4
                          class="font-medium text-gray-800 dark:text-gray-200 mb-2"
                        >
                          Project Actions:
                        </h4>
                        <ul
                          class="space-y-1 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <li>Edit project details</li>
                          <li>Create new plans</li>
                          <li>View project plans</li>
                          <li>Download reports</li>
                          <li>Archive completed projects</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Plan Creation -->
            <section id="plan-creation" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Plan Creation Workflow
                </h2>

                <div class="space-y-6">
                  <div>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                      Plans are created through a step-by-step wizard that guides you through the entire surveying process:
                    </p>
                  </div>

                  <!-- Step 1 -->
                  <div class="border-l-4 border-blue-500 pl-6">
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Step 1: Basic Details
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Define the fundamental characteristics of your plan:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li><strong>Plan Name:</strong> Descriptive identifier</li>
                      <li><strong>Plan Type:</strong> Choose from Cadastral, Topographic, Layout, or Route</li>
                      <li><strong>Project Association:</strong> Link to parent project</li>
                    </ul>
                  </div>

                  <!-- Step 2 -->
                  <div class="border-l-4 border-green-500 pl-6">
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Step 2: Coordinate Input
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Import or manually enter coordinate data:
                    </p>
                    <div class="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Import Options:
                        </h4>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>CSV file upload</li>
                            <li>TXT file upload</li>
                            <li>XLSX spreadsheet upload (column-aware)</li>
                          <li>Download coordinate template</li>
                          <li>Manual data entry</li>
                        </ul>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Required Format:
                        </h4>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>GCP_Name (Point identifier)</li>
                          <li>Easting (mE)</li>
                          <li>Northing (mN)</li>
                          <li>Optional elevation data</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Step 3 -->
                  <div class="border-l-4 border-purple-500 pl-6">
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Step 3: Parcel Definition
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Define boundaries and parcels using imported coordinates:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Create multiple parcels per plan</li>
                      <li>Assign coordinates to parcel boundaries</li>
                      <li>Name and categorize parcels</li>
                      <li>Validate coordinate sequences</li>
                    </ul>
                  </div>

                  <!-- Step 4 -->
                  <div class="border-l-4 border-yellow-500 pl-6">
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Step 4: Automated Computations
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      The system automatically calculates essential surveying data:
                    </p>
                    <div class="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Traverse Calculations:
                        </h4>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>Distance calculations</li>
                          <li>Bearing computations</li>
                          <li>Latitude and departure</li>
                          <li>Total traverse distance</li>
                        </ul>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Area & Boundaries:
                        </h4>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>Parcel area calculation</li>
                          <li>Bounding box coordinates</li>
                          <li>Perimeter measurements</li>
                          <li>Closure verification</li>
                          <li>Export to DXF for CAD workflows</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Step 5 -->
                  <div class="border-l-4 border-red-500 pl-6">
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Step 5: Map Visualization
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Interactive map display using Leaflet integration:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Plot coordinates on interactive map</li>
                      <li>Visualize parcel boundaries</li>
                      <li>Layer management and styling</li>
                      <li>Export map images</li>
                    </ul>
                  </div>

                  <!-- Step 6 -->
                  <div class="border-l-4 border-indigo-500 pl-6">
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Step 6: Plan Enhancement
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Add professional finishing touches:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Title blocks and legends</li>
                      <li>Scale and north arrow</li>
                      <li>Professional annotations</li>
                      <li>Surveyor signature blocks</li>
                    </ul>
                  </div>

                  <!-- Step 7 -->
                  <div class="border-l-4 border-gray-500 pl-6">
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Step 7: Report Generation
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Generate comprehensive documentation:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Automated calculation reports</li>
                      <li>Coordinate tables</li>
                      <li>Area summaries</li>
                          <li>Export to PDF format</li>
                          <li>Export plan drawings to DXF for CAD (where applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- Advanced Features -->
            <section id="advanced-features" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Advanced Features
                </h2>

                <div class="space-y-6">
                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Traverse Computations
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Advanced computational capabilities for professional surveying:
                    </p>
                    <div class="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
                      <div class="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">
                            Forward Computation:
                          </h4>
                          <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            <li>Calculate coordinates from bearings and distances</li>
                            <li>Automatic coordinate generation</li>
                            <li>Precision error checking</li>
                            <li>Multiple coordinate system support</li>
                          </ul>
                        </div>
                        <div>
                          <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">
                            Back Computation:
                          </h4>
                          <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            <li>Derive bearings and distances from coordinates</li>
                            <li>Verification of field measurements</li>
                            <li>Closure analysis and adjustment</li>
                            <li>Error distribution calculations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Coordinate System Management
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Built-in coordinate transfer and transformation utilities:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Transfer coordinates between plan components</li>
                      <li>Maintain coordinate integrity across workflows</li>
                      <li>Support for elevation data handling</li>
                        <li>Automatic validation and error detection</li>
                        <li>Supports importing from CSV and XLSX; exports include PDF, DXF and coordinate tables</li>
                    </ul>
                  </div>

                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Interactive Visualization
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      Powered by Leaflet mapping technology:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Real-time coordinate plotting</li>
                      <li>Multi-layer map visualization</li>
                      <li>Custom symbology and styling</li>
                      <li>Interactive measurement tools</li>
                      <li>High-resolution map exports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- Technical Specifications -->
            <section id="technical-specs" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Technical Specifications
                </h2>

                <div class="space-y-6">
                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Technology Stack
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                      <div class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                        <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">
                          Frontend Technologies:
                        </h4>
                        <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li><strong>Framework:</strong> Nuxt.js 4.0 (Vue.js 3)</li>
                          <li><strong>UI Components:</strong> Nuxt UI 3.0</li>
                          <li><strong>Styling:</strong> Tailwind CSS</li>
                          <li><strong>Icons:</strong> Remix Icons</li>
                          <li><strong>Maps:</strong> Leaflet.js integration</li>
                          <li><strong>Editor:</strong> Quill rich text editor</li>
                        </ul>
                      </div>
                      <div class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                        <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">
                          Development Features:
                        </h4>
                        <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li><strong>Language:</strong> TypeScript</li>
                          <li><strong>HTTP Client:</strong> Axios</li>
                          <li><strong>Utilities:</strong> VueUse composables</li>
                          <li><strong>Image Processing:</strong> Nuxt Image</li>
                          <li><strong>State Management:</strong> Built-in reactivity</li>
                          <li><strong>Routing:</strong> Vue Router 4</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      File Format Support
                    </h3>
                    <div class="grid md:grid-cols-3 gap-4">
                      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">
                          Import Formats:
                        </h4>
                        <ul class="text-sm text-blue-700 dark:text-blue-300">
                          <li>CSV files</li>
                          <li>TXT files</li>
                          <li>XLSX spreadsheets (.xlsx)</li>
                          <li>Coordinate data</li>
                        </ul>
                      </div>
                      <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">
                          Export Formats:
                        </h4>
                        <ul class="text-sm text-green-700 dark:text-green-300">
                          <li>PDF reports</li>
                          <li>DXF drawings (for CAD)</li>
                          <li>Map images</li>
                          <li>Coordinate tables (CSV/XLSX)</li>
                        </ul>
                      </div>
                      <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                        <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">
                          Templates:
                        </h4>
                        <ul class="text-sm text-purple-700 dark:text-purple-300">
                          <li>CSV templates</li>
                          <li>Report templates</li>
                          <li>Plan layouts</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Browser Compatibility
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">
                      AutoPlan is designed as a modern web application with the following requirements:
                    </p>
                    <ul
                      class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4"
                    >
                      <li>Modern browsers with ES6+ support</li>
                      <li>JavaScript enabled</li>
                      <li>Minimum screen resolution: 1024x768</li>
                      <li>Recommended: Chrome, Firefox, Safari, Edge (latest versions)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- FAQ -->
            <section id="faq" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Frequently Asked Questions
                </h2>

                <div class="space-y-6">
                  <div class="border-b border-gray-200 dark:border-slate-600 pb-6">
                    <h3
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                    >
                      What coordinate systems does AutoPlan support?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      AutoPlan supports standard surveying coordinate formats including
                      Easting/Northing pairs with optional elevation data. The system
                      is designed to work with local coordinate systems commonly used
                      in cadastral and engineering surveys.
                    </p>
                  </div>

                  <div class="border-b border-gray-200 dark:border-slate-600 pb-6">
                    <h3
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                    >
                      How accurate are the calculations?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      AutoPlan performs calculations using double-precision floating
                      point arithmetic, suitable for professional surveying
                      applications. The system maintains precision to at least 0.01
                      meter accuracy for distance and area calculations.
                    </p>
                  </div>

                  <div class="border-b border-gray-200 dark:border-slate-600 pb-6">
                    <h3
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                    >
                      Can I import data from other surveying software?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      Yes, AutoPlan accepts coordinate data in CSV and TXT formats.
                      Most surveying software can export coordinate data in these
                      standard formats. We provide templates to ensure proper data
                      formatting.
                    </p>
                  </div>

                  <div class="border-b border-gray-200 dark:border-slate-600 pb-6">
                    <h3
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                    >
                      What plan types are supported?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      AutoPlan supports four main plan types: Cadastral (boundary
                      surveys), Topographic (elevation mapping), Layout (construction
                      layout), and Route (linear infrastructure). Each type is
                      optimized for specific surveying workflows.
                    </p>
                  </div>

                  <div class="border-b border-gray-200 dark:border-slate-600 pb-6">
                    <h3
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                    >
                      Is my data secure?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      AutoPlan implements user authentication and project-based access
                      control. Your survey data is private to your account and not
                      accessible to other users. We recommend regular backups of
                      critical project data.
                    </p>
                  </div>

                  <div>
                    <h3
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                    >
                      Can I collaborate with team members?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                      Currently, AutoPlan is designed for individual use with
                      project-based organization. Each user maintains their own
                      projects and plans. Team collaboration features may be added
                      in future versions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Support -->
            <section id="support" class="scroll-mt-24">
              <div
                class="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-8"
              >
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Support & Contact
                </h2>

                <div class="space-y-6">
                  <p class="text-gray-600 dark:text-gray-300">
                    Need help with AutoPlan? We're here to assist you with any
                    questions or issues you may encounter.
                  </p>

                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                      <h3
                        class="font-semibold text-blue-800 dark:text-blue-200 mb-3"
                      >
                        Getting Help
                      </h3>
                      <ul
                        class="space-y-2 text-blue-700 dark:text-blue-300"
                      >
                        <li>
                          <NuxtLink
                            to="/contact"
                            class="hover:underline"
                          >
                            Contact Support
                          </NuxtLink>
                        </li>
                        <li>Review this documentation</li>
                        <li>Check system status</li>
                        <li>Submit feature requests</li>
                      </ul>
                    </div>

                    <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                      <h3
                        class="font-semibold text-green-800 dark:text-green-200 mb-3"
                      >
                        Quick Resources
                      </h3>
                      <ul
                        class="space-y-2 text-green-700 dark:text-green-300"
                      >
                        <li>Download coordinate templates</li>
                        <li>View sample projects</li>
                        <li>Access user guides</li>
                        <li>Join user community</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    class="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 text-center"
                  >
                    <h3
                      class="font-semibold text-gray-800 dark:text-gray-200 mb-3"
                    >
                      Ready to Start?
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                      Begin your surveying project with AutoPlan today.
                    </p>
                    <NuxtLink
                      to="/dashboard"
                      class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Go to Dashboard
                      <Icon
                        name="heroicons:arrow-right-20-solid"
                        class="ml-2 w-4 h-4"
                      />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'project-management', title: 'Project Management' },
  { id: 'plan-creation', title: 'Plan Creation Workflow' },
  { id: 'advanced-features', title: 'Advanced Features' },
  { id: 'technical-specs', title: 'Technical Specifications' },
  { id: 'faq', title: 'FAQ' },
  { id: 'support', title: 'Support & Contact' },
];

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

useHead({
  title: 'AutoPlan Documentation - Complete User Guide',
  meta: [
    {
      name: 'description',
      content: 'Comprehensive documentation for AutoPlan - the web-based geospatial platform for cadastral and engineering surveys. Learn how to create projects, import coordinates, perform computations, and generate professional plans.',
    },
    {
      name: 'keywords',
      content: 'AutoPlan, surveying software, cadastral surveys, engineering surveys, coordinate calculations, traverse computation, plan generation, mapping, GIS',
    },
  ],
});
</script>
