<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
// This layout provides a consistent header and footer across pages
// Pages can opt into this layout by not defining their own layout structure
</script>

<style scoped>
/* All styles handled by Tailwind CSS classes */
</style>
