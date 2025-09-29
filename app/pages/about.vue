<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300"
  >
    <div class="relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/10 to-indigo-600/10 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-400/10 to-pink-600/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28"
      >
        <!-- Page Header / Hero -->
        <div class="text-center mb-12 md:mb-16">
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6"
          >
            🎓 B.Sc. Research Project - Surveying & Geoinformatics
          </div>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            <span
              class="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent"
              >AutoPlan — Cadastral & Engineering Automation</span
            >
          </h1>

          <p
            class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A modern web application for creating and managing cadastral and
            engineering surveys. AutoPlan helps surveyors and engineers handle
            coordinates, elevation data, and generate professional survey
            plans through an intuitive multi-step workflow.
          </p>
        </div>

        <!-- Project Overview Card -->
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-10 mb-12"
        >
          <div class="grid lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-7">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Project Overview
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                AutoPlan was developed as an academic research project to tackle
                the practical problems of modern cadastral and engineering
                surveys: fragmented records, manual workflows, costly desktop
                tools, and a shortage of automated validation. The platform
                centralises survey data, automates computations, and produces
                export-ready outputs to speed up planning and reduce human
                error.
              </p>

              <div class="grid sm:grid-cols-2 gap-3 mt-6">
                <div
                  class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                >
                  <h4 class="font-semibold text-gray-800 dark:text-gray-100">
                    Problem
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Manual, paper-based workflows and desktop-bound tools cause
                    delays, inconsistencies, and limited access to up-to-date
                    cadastral data.
                  </p>
                </div>

                <div
                  class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                >
                  <h4 class="font-semibold text-gray-800 dark:text-gray-100">
                    Aim
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Design and deliver a web-based geospatial application to
                    improve accuracy, efficiency, and accessibility for
                    cadastral and engineering surveys.
                  </p>
                </div>

                <div
                  class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                >
                  <h4 class="font-semibold text-gray-800 dark:text-gray-100">
                    Approach
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Acquire and validate legacy tabular data, implement
                    high-precision geospatial computations, and provide a guided
                    multi-step plan workflow.
                  </p>
                </div>

                <div
                  class="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                >
                  <h4 class="font-semibold text-gray-800 dark:text-gray-100">
                    Outcomes
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Faster plan turnaround, automated validation, interactive
                    map-based editing, and export-ready PDFs/DXF/DWG for
                    submission and CAD workflows.
                  </p>
                </div>
              </div>

              <div class="mt-6 text-sm text-gray-700 dark:text-gray-300">
                <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Supported survey types
                </h4>
                <p>
                  AutoPlan is configured for four common survey workflows:
                  <span class="font-medium">Perimeter</span> and
                  <span class="font-medium">Layout</span> (cadastral), and
                  <span class="font-medium">Topographic</span> and
                  <span class="font-medium">Route</span> (engineering).
                </p>
              </div>
            </div>

            <div class="lg:col-span-5">
              <div
                class="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg"
              >
                <h3 class="text-white font-semibold mb-2">Key Achievements</h3>
                <p class="text-sm opacity-90 mb-4">
                  Implemented core capabilities and tooling tailored for
                  cadastral and engineering workflows.
                </p>

                <div class="grid gap-3">
                  <div
                    class="flex items-start space-x-3 p-3 rounded-lg bg-white/10"
                  >
                    <Icon
                      name="heroicons:check-20-solid"
                      class="w-5 h-5 text-white mt-1"
                    />
                    <div class="text-left">
                      <div class="font-medium text-white">
                        Multi-step plan workflow
                      </div>
                      <div class="text-sm text-white/80">
                        Guided steps for details, coordinates, drawing,
                        elevation, computation, parcels, and report.
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-start space-x-3 p-3 rounded-lg bg-white/10"
                  >
                    <Icon
                      name="heroicons:check-20-solid"
                      class="w-5 h-5 text-white mt-1"
                    />
                    <div class="text-left">
                      <div class="font-medium text-white">
                        Robust coordinate handling
                      </div>
                      <div class="text-sm text-white/80">
                        Import/validate CSV & XLSX, support datum/projection
                        transforms, and programmatic coordinate transfer.
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-start space-x-3 p-3 rounded-lg bg-white/10"
                  >
                    <Icon
                      name="heroicons:check-20-solid"
                      class="w-5 h-5 text-white mt-1"
                    />
                    <div class="text-left">
                      <div class="font-medium text-white">
                        Interactive mapping & exports
                      </div>
                      <div class="text-sm text-white/80">
                        Leaflet-based plotting plus export to PDF, DXF, and
                        coordinate tables (CSV/XLSX).
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-start space-x-3 p-3 rounded-lg bg-white/10"
                  >
                    <Icon
                      name="heroicons:check-20-solid"
                      class="w-5 h-5 text-white mt-1"
                    />
                    <div class="text-left">
                      <div class="font-medium text-white">
                        Security & integrations
                      </div>
                      <div class="text-sm text-white/80">
                        Email/OTP and Google OAuth flows with Axios interceptors
                        for secure API access.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical Architecture -->
        <section class="max-w-7xl mx-auto mb-12">
          <div class="text-center mb-10">
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Technical Architecture & Surveying Computations
            </h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              AutoPlan combines a modern web stack with tested traverse
              routines so users get both a polished UI and rigorous numerical
              results.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div
                class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg"
              >
                <Icon name="heroicons:globe-alt-20-solid" class="w-5 h-5" />
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Traverse & Computation Engines
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Core traverse routines for bearing/distance computations,
                latitude/departure, closure checks and misclosure corrections.
                Batch processing and exportable results make verification and
                bookkeeping straightforward for cadastral traverse work.
              </p>
            </div>

            <div
              class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div
                class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg"
              >
                <Icon name="heroicons:map-pin-20-solid" class="w-5 h-5" />
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Route & Alignment Support
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Features for engineering route workflows: chainage and
                stationing computations, offset and stakeout helpers, and simple
                longitudinal profile checks to support preliminary corridor and
                road alignment tasks.
              </p>
            </div>

            <div
              class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div
                class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg"
              >
                <Icon name="heroicons:map-pin-20-solid" class="w-5 h-5" />
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Spatial Validation & Area Work
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Parcel area computations, perimeter, bounding box calculations,
                and automated consistency checks to detect coordinate anomalies
                and potential boundary issues.
              </p>
            </div>

            <div
              class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div
                class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg"
              >
                <Icon name="heroicons:chart-bar" class="w-5 h-5" />
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Topographic Survey Support
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Elevation handling, DEM/TIN generation, contouring, point cloud
                ingestion support, and basic leveling routines (area/volume,
                spot heights, stakeout), enabling topographic deliverables
                alongside cadastral plans.
              </p>
            </div>

            <div
              class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div
                class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg"
              >
                <Icon name="heroicons:server" class="w-5 h-5" />
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Web Stack & Integrations
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Nuxt 3 + TypeScript frontend, Tailwind UI, Leaflet maps, and
                Axios for API calls designed to integrate client-side validation
                with backend services when heavier computation or persistent
                storage is required.
              </p>
            </div>
          </div>
        </section>

        <!-- Project Team -->
        <section class="mb-12">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Project Team
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Academic research project for B.Sc. in Surveying & Geoinformatics
            </p>
          </div>

          <div
            class="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 text-center"
          >
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 mx-auto flex items-center justify-center text-white text-2xl font-semibold mb-4"
            >
              SA
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              Surv. Abiodun Olawale Alabi
            </h3>
            <div class="text-sm text-blue-500 mb-4">Academic Supervisor</div>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Department of Surveying & Geoinformatics, Faculty of Engineering,
              University of Lagos. Provided research topic and academic
              supervision for this B.Sc. project.
            </p>

            <div class="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:aoalabi@unilag.edu.ng"
                class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <Icon name="heroicons:envelope-20-solid" class="w-4 h-4 mr-2" />
                University Email
              </a>
              <a
                href="mailto:alabigeomatic@gmail.com"
                class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <Icon name="heroicons:envelope-20-solid" class="w-4 h-4 mr-2" />
                Gmail
              </a>
              <a
                href="tel:+2348030818099"
                class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <Icon name="heroicons:phone-20-solid" class="w-4 h-4 mr-2" />
                08030818099
              </a>
              <a
                href="https://wa.me/08090969171"
                class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <Icon
                  name="heroicons:chat-bubble-left-20-solid"
                  class="w-4 h-4 mr-2"
                />
                08090969171
              </a>
            </div>
          </div>

          <!-- Additional Team Members (stacked) -->
          <div class="max-w-3xl mx-auto mt-6 space-y-4">
            <div
              class="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 text-center"
            >
              <div
                class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 mx-auto flex items-center justify-center text-white text-2xl font-semibold mb-4"
              >
                OP
              </div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                Olayinka Promise
              </h3>
              <div class="text-sm text-blue-500 mb-4">Student Developer</div>
              <div class="mt-3 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:olayinkapromise80@gmail.com"
                  class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <Icon
                    name="heroicons:envelope-20-solid"
                    class="w-4 h-4 mr-2"
                  />
                  olayinkapromise80@gmail.com
                </a>
                <a
                  href="tel:+2348079529279"
                  class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <Icon name="heroicons:phone-20-solid" class="w-4 h-4 mr-2" />
                  08079529279
                </a>
                <a
                  href="https://github.com/promisszn"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <Icon
                    name="heroicons:globe-alt-20-solid"
                    class="w-4 h-4 mr-2"
                  />
                  github.com/promisszn
                </a>
              </div>
            </div>

            <div
              class="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 text-center"
            >
              <div
                class="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mx-auto flex items-center justify-center text-white text-2xl font-semibold mb-4"
              >
                RA
              </div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                Raji Al-Ameen
              </h3>
              <div class="text-sm text-blue-500 mb-4">Student Developer</div>
              <div class="mt-3 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:alameenraji31@gmail.com"
                  class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <Icon
                    name="heroicons:envelope-20-solid"
                    class="w-4 h-4 mr-2"
                  />
                  alameenraji31@gmail.com
                </a>
                <a
                  href="tel:+2348181093644"
                  class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <Icon name="heroicons:phone-20-solid" class="w-4 h-4 mr-2" />
                  08181093644
                </a>
                <a
                  href="https://github.com/rajman01"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <Icon
                    name="heroicons:globe-alt-20-solid"
                    class="w-4 h-4 mr-2"
                  />
                  github.com/rajman01
                </a>
              </div>
            </div>

            <div
              class="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 text-center"
            >
              <div
                class="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mx-auto flex items-center justify-center text-white text-2xl font-semibold mb-4"
              >
                RT
              </div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                Robert Tobechukwu
              </h3>
              <div class="text-sm text-blue-500 mb-4">
                Technical Contributor
              </div>
              <div class="mt-3 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:robertkyrie100@gmail.com"
                  class="inline-flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <Icon
                    name="heroicons:envelope-20-solid"
                    class="w-4 h-4 mr-2"
                  />
                  robertkyrie100@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Research Impact Banner -->
        <section class="mb-12">
          <div
            class="rounded-2xl p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl"
          >
            <div class="max-w-4xl mx-auto text-center">
              <div
                class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-sm mb-4"
              >
                Academic Excellence
              </div>
              <h3 class="text-2xl md:text-3xl font-bold mb-4">
                Research Impact
              </h3>
              <p class="opacity-90 mb-6">
                By combining modern geospatial algorithms, cloud-friendly data
                handling, and automated validation, AutoPlan reduces manual
                errors, accelerates survey workflows, and makes
                professional-grade tools more accessible for practitioners and
                agencies, particularly in regions with limited digitised
                cadastral records.
              </p>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <div class="text-center py-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Get Started?
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Experience professional-grade plan
            automation with AutoPlan.
          </p>

          <div class="flex items-center justify-center gap-4">
            <NuxtLink
              to="/dashboard"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >Create Free Account
              <Icon name="heroicons:arrow-right-20-solid" class="ml-2 w-4 h-4"
            /></NuxtLink>
            <NuxtLink
              to="/documentation"
              class="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
              >Try Demo</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "website",
});

useHead({
  title: "About AutoPlan",
  meta: [
    {
      name: "description",
      content:
        "About AutoPlan - a research project and web platform for cadastral and engineering plan automation.",
    },
    { property: "og:title", content: "About AutoPlan" },
    {
      property: "og:description",
      content:
        "Learn about the AutoPlan research project, technical architecture, and team behind the platform.",
    },
  ],
});
</script>

<style scoped>
/* Visual styles follow Tailwind utility classes in markup */
</style>
