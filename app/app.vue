<script setup lang="ts">
const colorMode = useColorMode();
const toaster = { position: "top-right" };

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white"
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <UApp :toaster="toaster">
    <NuxtLoadingIndicator />
    <!-- Wrap content with unified background so all pages share theme surface -->
    <div class="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
