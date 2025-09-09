// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/color-mode"],
  css: ["~/assets/css/main.css"],
  colorMode: {
    classSuffix: "", // so we use just 'dark' on <html>
    preference: "system",
    fallback: "light",
    storageKey: "theme" // aligns with previous localStorage key used
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
});
