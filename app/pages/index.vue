<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300"
  >
    <!-- Header -->
    <header
      class="relative z-10 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Brand -->
          <div class="flex items-center space-x-3">
            <div class="relative">
              <img
                src="/logo.svg"
                alt="AutoPlan logo"
                class="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 hover:scale-110"
              />
              <div
                class="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            <h1
              class="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            >
              AutoPlan
            </h1>
          </div>

          <!-- Navigation -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle -->
            <ClientOnly>
              <button
                @click="toggleColorMode"
                class="flex p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:scale-105"
                :title="
                  colorMode.value === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                "
              >
                <RiSunFill v-if="colorMode.value === 'dark'" class="w-5 h-5 text-gray-200" />
                <RiMoonFill v-else class="w-5 h-5 text-yellow-500" />
              </button>
              <template #fallback>
                <div
                  class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 w-9 h-9"
                ></div>
              </template>
            </ClientOnly>

            <NuxtLink
              to="/login"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign in
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="relative overflow-hidden">
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
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32"
      >
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left Column -->
          <div class="space-y-8 text-center lg:text-left">
            <div class="space-y-6">
              <div
                class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium"
              >
                ✨ Modern surveying platform
              </div>

              <h1
                class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span
                  class="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent"
                >
                  AutoPlan
                </span>
                <br />
                <span
                  class="text-gray-700 dark:text-gray-300 text-3xl md:text-4xl lg:text-5xl"
                >
                  Cadastral & topographic automation
                </span>
              </h1>

              <p
                class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                A web-based geospatial platform built to speed up cadastral and
                engineering surveys. Import coordinates or files and
                automatically compute areas and bearings, transform coordinate
                systems, and export submission-ready plans and reports.
              </p>
            </div>

            <div
              class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <NuxtLink
                to="/dashboard"
                class="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                Try AutoPlan for free
                <Icon
                  name="heroicons:arrow-right-20-solid"
                  class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                />
              </NuxtLink>

              <button
                class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              >
                <Icon name="heroicons:play-20-solid" class="mr-2 w-5 h-5" />
                Watch demo
              </button>
            </div>
          </div>

          <!-- Right Column -->
          <div class="relative">
            <div
              class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-3xl transition-all duration-500"
            >
              <!-- Mock browser header -->
              <div
                class="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-600"
              >
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div class="flex-1 mx-4">
                  <div
                    class="bg-white dark:bg-slate-600 rounded px-3 py-1 text-xs text-gray-500 dark:text-gray-400"
                  >
                    autoplan.app/dashboard
                  </div>
                </div>
              </div>

              <!-- Screenshot -->
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="@/assets/img/screenshot.jpeg"
                  alt="AutoPlan dashboard screenshot"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <!-- Floating elements -->
              <div
                class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"
              ></div>
              <div
                class="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full opacity-15 blur-xl group-hover:opacity-25 transition-opacity duration-500"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Features Section -->
    <section
      class="py-16 md:py-24 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8 md:gap-12">
          <div
            class="group text-center p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2"
          >
            <div
              class="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform duration-300"
            >
              <Icon name="heroicons:bolt" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Reduce manual work
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Fewer drafting errors, faster delivery
            </p>
          </div>

          <div
            class="group text-center p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2"
          >
            <div
              class="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg group-hover:scale-110 transition-transform duration-300"
            >
              <Icon
                name="heroicons:globe-alt-20-solid"
                class="w-6 h-6 text-white"
              />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Supports Geo
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              GeoJSON · Shp · DXF · CAD
            </p>
          </div>

          <div
            class="group text-center p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2"
          >
            <div
              class="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300"
            >
              <Icon
                name="heroicons:shield-check-20-solid"
                class="w-6 h-6 text-white"
              />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Secure
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Encrypted storage & role access
            </p>
          </div>
        </div>

        <!-- Feature list -->
        <div class="mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
          <div class="flex items-start space-x-3">
            <div
              class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1"
            >
              <Icon
                name="heroicons:check-20-solid"
                class="w-4 h-4 text-white"
              />
            </div>
            <p class="text-gray-700 dark:text-gray-300">
              Automated boundary detection & area computation
            </p>
          </div>

          <div class="flex items-start space-x-3">
            <div
              class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1"
            >
              <Icon
                name="heroicons:check-20-solid"
                class="w-4 h-4 text-white"
              />
            </div>
            <p class="text-gray-700 dark:text-gray-300">
              Coordinate transforms and projection support
            </p>
          </div>

          <div class="flex items-start space-x-3">
            <div
              class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1"
            >
              <Icon
                name="heroicons:check-20-solid"
                class="w-4 h-4 text-white"
              />
            </div>
            <p class="text-gray-700 dark:text-gray-300">
              Export-ready PDF, DXF and printable reports
            </p>
          </div>

          <div class="flex items-start space-x-3">
            <div
              class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1"
            >
              <Icon
                name="heroicons:check-20-solid"
                class="w-4 h-4 text-white"
              />
            </div>
            <p class="text-gray-700 dark:text-gray-300">
              Designed for cadastral workflows in contexts like Nigeria
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 md:py-24 bg-gray-50 dark:bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How it works
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started with AutoPlan in three simple steps
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 md:gap-12">
          <div class="group relative text-center">
            <!-- Step connector line -->
            <div
              class="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform translate-x-1/2 -translate-y-1/2 opacity-30"
            ></div>

            <div
              class="relative bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                1
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Add coordinates
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Paste or enter parcel coordinates to begin your survey project.
              </p>
            </div>
          </div>

          <div class="group relative text-center">
            <!-- Step connector line -->
            <div
              class="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform translate-x-1/2 -translate-y-1/2 opacity-30"
            ></div>

            <div
              class="relative bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl font-bold rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                2
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Draw & edit
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Use powerful drawing tools to annotate and refine parcel
                boundaries.
              </p>
            </div>
          </div>

          <div class="group relative text-center">
            <div
              class="relative bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl font-bold rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                3
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Compute & export
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Run automated checks, generate reports, and export
                submission-ready files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Trusted by practitioners
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            See what professionals are saying about AutoPlan
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 md:gap-12">
          <div
            class="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 md:p-8 border border-blue-200 dark:border-slate-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-start space-x-1 mb-4">
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
            </div>
            <blockquote
              class="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
            >
              "AutoPlan cut our drafting time in half and the exports are
              submission-ready. The automated calculations give us confidence in
              our work."
            </blockquote>
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
              >
                <span class="text-white font-semibold">N</span>
              </div>
              <div>
                <cite
                  class="text-gray-900 dark:text-gray-100 font-semibold not-italic"
                  >N. Engineer</cite
                >
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Civil Engineer
                </p>
              </div>
            </div>
          </div>

          <div
            class="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 md:p-8 border border-purple-200 dark:border-slate-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-start space-x-1 mb-4">
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
              <Icon
                name="heroicons:star-20-solid"
                class="w-5 h-5 text-yellow-400"
              />
            </div>
            <blockquote
              class="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
            >
              "The computation accuracy gives us confidence when submitting
              plans. It's become an essential tool in our workflow."
            </blockquote>
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center"
              >
                <span class="text-white font-semibold">L</span>
              </div>
              <div>
                <cite
                  class="text-gray-900 dark:text-gray-100 font-semibold not-italic"
                  >L. Surveyor</cite
                >
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Licensed Surveyor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="lg:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <img src="/logo.svg" alt="AutoPlan logo" class="w-8 h-8" />
              <h3
                class="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
              >
                AutoPlan
              </h3>
            </div>
            <p class="text-gray-400 mb-6 max-w-md">
              Fast parcel planning for surveyors and engineers. Modern cadastral
              & topographic plan automation platform.
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Icon name="heroicons:envelope-20-solid" class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span class="sr-only">Twitter</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Icon name="heroicons:globe-alt-20-solid" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-semibold mb-4">Product</h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/dashboard"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Dashboard</NuxtLink
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Features</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Pricing</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Documentation</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Account</h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/login"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Sign in</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/set-profile"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Set up profile</NuxtLink
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Support</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-300"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-12 pt-8 text-center">
          <p class="text-gray-400">
            © <span id="year"></span> AutoPlan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { RiSunFill, RiMoonFill } from "@remixicon/vue";

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

onMounted(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear().toString();
});
</script>

<style scoped>
/* All styles are now handled by Tailwind CSS classes */
</style>
