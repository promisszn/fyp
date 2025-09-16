<template>
  <!-- Logo fixed top-left -->
  <div class="fixed top-4 left-4 z-50">
    <button
      @click="goHome"
      aria-label="Home"
      class="w-12 h-12 flex items-center justify-center rounded-xl bg-white/95 dark:bg-slate-800/95 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition"
    >
      <img src="/logo.svg" alt="Logo" class="w-7 h-7 object-contain" />
    </button>
  </div>

  <!-- User header fixed top-right; shown only when we have a name -->
  <div v-if="name" class="fixed top-4 right-4 z-50" ref="root">
    <div class="flex items-center gap-2">
      <!-- Theme toggle button -->
      <button
        @click="toggleTheme"
        :aria-pressed="isDark"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="w-10 h-10 rounded-xl flex items-center justify-center bg-white/95 dark:bg-slate-800/95 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition cursor-pointer"
      >
        <ClientOnly>
          <template #fallback>
            <div class="h-5 w-5" />
          </template>
          <RiSunFill v-if="!isDark" class="h-5 w-5 text-yellow-500" />
          <RiMoonFill v-else class="h-5 w-5 text-gray-200" />
        </ClientOnly>
      </button>

      <div class="relative">
        <button
          class="flex items-center gap-3 bg-white/95 dark:bg-slate-800/95 border border-gray-200 dark:border-slate-700 rounded-xl p-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          @click="toggleMenu"
          aria-label="User menu"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            :class="avatarBg"
          >
            {{ initials }}
          </div>
          <div class="hidden sm:flex flex-col items-start leading-tight">
            <span
              class="text-sm font-semibold text-gray-800 dark:text-gray-100"
              >{{ displayName }}</span
            >
            <span class="text-xs text-gray-500 dark:text-gray-300"
              >Account</span
            >
          </div>
        </button>

        <transition name="fade">
          <div
            v-if="menuOpen"
            class="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg py-1 z-50"
          >
            <button
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
              @click="onProfile"
            >
              Profile
            </button>
            <button
              class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700"
              @click="onLogout"
            >
              Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useCookie, navigateTo, useRuntimeConfig, useColorMode } from "#imports";
import axios from "axios";
import { RiSunFill, RiMoonFill } from "@remixicon/vue";

// Read the `user` cookie which this project stores as a JSON string.
const userCookie = useCookie("user");

const parsed = computed(() => {
  try {
    if (!userCookie.value) return null;
    return typeof userCookie.value === "string"
      ? JSON.parse(userCookie.value)
      : userCookie.value;
  } catch (e) {
    return null;
  }
});

// Derive display name and initials with safe fallbacks
const displayName = computed(() => {
  const u = parsed.value;
  if (!u) return "";
  if (u.first_name || u.last_name)
    return `${u.first_name || ""} ${u.last_name || ""}`.trim();
  return u.name || u.full_name || u.email || "";
});

const initials = computed(() => {
  const name = displayName.value || "";
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

// Choose a mild blue avatar background to match existing pages
const avatarBg = computed(() => "bg-blue-600");

const name = displayName;

function goHome() {
  navigateTo("/");
}

// Dropdown state and handlers
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function onProfile() {
  menuOpen.value = false;
    navigateTo("/set-profile");
}

async function onLogout() {
  // Try calling backend logout endpoint (will include headers via plugin), then clear cookies
  const config = useRuntimeConfig();
  try {
    const url = (config?.public?.BASE_URL || "") + "/auth/logout";
    await axios.get(url);
  } catch (e) {
    // ignore errors but continue to clear local auth state
  }

  useCookie("user").value = null;
  useCookie("token").value = null;
  useCookie("api_token").value = null;
  useCookie("refresh_token").value = null;
  menuOpen.value = false;
  navigateTo("/login");
}

// close the menu on escape or outside click
const root = ref<HTMLElement | null>(null);

// Theme state via @nuxtjs/color-mode
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}

function onDocClick(e: MouseEvent) {
  if (!menuOpen.value) return;
  if (!root.value) return;
  if (root.value.contains(e.target as Node)) return;
  menuOpen.value = false;
}

onMounted(() => {
  document.addEventListener("click", onDocClick);
});

onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<style scoped>
/* Small responsive tweaks */
@media (min-width: 640px) {
  .fixed.top-4.right-4 {
    right: 1rem;
  }
  .fixed.top-4.left-4 {
    left: 1rem;
  }
}
</style>
