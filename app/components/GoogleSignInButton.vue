<template>
  <div ref="googleSignInButton"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits<{
  success: [credential: string];
  error: [error: string];
}>();

const googleSignInButton = ref<HTMLButtonElement>();
const loading = ref(false);
const config = useRuntimeConfig();

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
          cancel: () => void;
        };
      };
    };
  }
}

const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window object not available"));
      return;
    }

    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Sign-In script"));

    document.head.appendChild(script);
  });
};

const initializeGoogleSignIn = async () => {
  try {
    await loadGoogleScript();

    if (!window.google?.accounts?.id) {
      throw new Error("Google Sign-In not available");
    }

    window.google.accounts.id.initialize({
      client_id: config.public.GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: false,
      ux_mode: "popup",
      itp_support: true,
    });

    if (googleSignInButton.value) {
      window.google.accounts.id.renderButton(googleSignInButton.value, {
        theme: "outline",
        size: "large",
        width: googleSignInButton.value.offsetWidth,
        text: "continue_with",
        shape: "rectangular",
        click_listener: () => {
          loading.value = true;
        },
      });
    }
  } catch (error) {
    console.error("Failed to initialize Google Sign-In:", error);
    emit("error", "Failed to initialize Google Sign-In");
  }
};

const handleCredentialResponse = (response: { credential: string }) => {
  loading.value = false;

  if (response.credential) {
    emit("success", response.credential);
  } else {
    emit("error", "No credential received from Google");
  }
};

onMounted(() => {
  initializeGoogleSignIn();
});

onUnmounted(() => {
  if (window.google?.accounts?.id) {
    window.google.accounts.id.cancel();
  }
});
</script>
