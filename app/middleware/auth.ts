import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/login") {
    return;
  }

  const user = useCookie("user").value;
  const token = useCookie("token").value;
  const apiToken = useCookie("api_token").value;

  if (!user || !token || !apiToken) {
    return navigateTo("/login");
  }
});
