<template>
  <div class="flex justify-center items-center min-h-screen">
    <div
      class="bg-white dark:bg-slate-800 p-12 rounded-xl shadow-lg min-w-[400px] max-w-md w-full flex flex-col items-center"
    >
      <div class="flex flex-col items-center text-center mb-6 w-full">
        <!-- App Logo and Name - clickable to go to homepage -->
        <button
          @click="goToHomepage"
          class="flex items-center gap-3 px-4 py-3 mb-4 bg-white dark:bg-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500"
          aria-label="Go to homepage"
        >
          <div
            class="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
          >
            <img
              src="/logo.svg"
              alt="App Logo"
              class="w-6 h-6 object-contain"
            />
          </div>
          <h1
            class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
          >
            AutoPlan
          </h1>
        </button>

        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
          Welcome back
        </h2>
        <p class="text-gray-700 dark:text-gray-300 text-sm">
          Sign in securely with your email and otp.
        </p>
      </div>
      <form
        @submit.prevent="handleEmailSubmit"
        v-if="step === 'email'"
        class="w-full flex flex-col gap-1"
      >
        <!-- Google Sign-In Button -->
        <div class="mb-4">
          <GoogleSignInButton
            @success="handleGoogleSuccess"
            @error="handleGoogleError"
          />
        </div>

        <!-- Divider -->
        <div class="relative my-1">
          <div class="absolute inset-0 flex items-center">
            <div
              class="w-full border-t border-gray-300 dark:border-slate-600"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400"
              >or continue with email</span
            >
          </div>
        </div>

        <label class="font-semibold text-gray-800 dark:text-gray-200"
          >Email<span class="text-red-600">*</span></label
        >
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          class="py-2 px-3 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Transition name="slide-down">
          <p
            v-if="error && step === 'email'"
            class="text-red-600 font-semibold text-sm -mt-1 w-full text-left"
          >
            {{ error }}
          </p>
        </Transition>
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white rounded-md p-3 font-semibold mt-8 disabled:bg-blue-300"
          :aria-busy="loading"
        >
          <template v-if="loading">
            <span class="flex items-center justify-center gap-2">
              <svg
                class="w-4 h-4 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Sending...</span>
            </span>
          </template>
          <template v-else>Send OTP</template>
        </button>
      </form>
      <form
        @submit.prevent="handleOtpSubmit"
        v-if="step === 'otp'"
        class="w-full flex flex-col gap-1"
      >
        <label class="font-semibold text-gray-800 dark:text-gray-200"
          >OTP<span class="text-red-600">*</span></label
        >
        <input
          type="text"
          v-model="otp"
          placeholder="Enter OTP"
          class="py-2 px-3 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Transition name="slide-down">
          <p
            v-if="error && step === 'otp'"
            class="text-red-600 font-semibold text-sm -mt-1 w-full text-left"
          >
            {{ error }}
          </p>
        </Transition>
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white rounded-md p-3 font-semibold mt-8 disabled:bg-blue-300"
          :aria-busy="loading"
        >
          <template v-if="loading">
            <span class="flex items-center justify-center gap-2">
              <svg
                class="w-4 h-4 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Continuing...</span>
            </span>
          </template>
          <template v-else>Continue</template>
        </button>
        <div class="flex justify-between items-center mt-1">
          <p
            class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold cursor-pointer"
            @click="step = 'email'"
          >
            Back
          </p>
          <p
            class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold cursor-pointer"
            :class="{
              'opacity-50 cursor-not-allowed':
                resendLoading || resendCooldown > 0,
            }"
            @click="handleResendOtp"
          >
            {{
              resendLoading
                ? "Sending..."
                : resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"
            }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

import { ref, onMounted } from "vue";
import axios from "axios";
import { navigateTo } from "nuxt/app";
import GoogleSignInButton from "~/components/GoogleSignInButton.vue";

const config = useRuntimeConfig();

const toast = useToast();
const email = ref("");
const otp = ref("");
const step = ref<"email" | "otp">("email");
const loading = ref(false);
const resendLoading = ref(false);
const resendCooldown = ref(0);
const error = ref("");
const apiToken = useCookie("api_token");
const refreshToken = useCookie("refresh_token");
const token = useCookie("token");
const user = useCookie("user");

// Check if user is already logged in and redirect to dashboard
onMounted(() => {
  if (apiToken.value && user.value) {
    try {
      const userObj = user.value as any;
      if (userObj && userObj.profile_set === false) {
        navigateTo("/set-profile");
      } else {
        navigateTo("/dashboard");
      }
    } catch (e) {
      apiToken.value = null;
      refreshToken.value = null;
      token.value = null;
      user.value = null;
    }
  }
});

const goToHomepage = () => {
  navigateTo("/");
};

const handleGoogleSuccess = async (credential: string) => {
  loading.value = true;
  error.value = "";

  try {
    const response = await axios.post(
      `${config.public.BASE_URL}/auth/login/google`,
      {
        token: credential,
      }
    );

    apiToken.value = response.data.data.api_token;
    refreshToken.value = response.data.data.refresh_token;
    token.value = response.data.data.token;
    user.value = JSON.stringify(response.data.data.user);

    const userObj = response.data.data.user;
    if (userObj && userObj.profile_set === false) {
      navigateTo("/set-profile");
    } else {
      navigateTo("/dashboard");
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Google sign-in failed.";
    toast.add({
      title: "Google sign-in failed.",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

const handleGoogleError = (errorMessage: string) => {
  error.value = errorMessage;
  toast.add({
    title: "Google sign-in error",
    description: errorMessage,
    color: "error",
  });
};

const startResendCooldown = () => {
  resendCooldown.value = 60;
  const timer = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const handleEmailSubmit = async () => {
  error.value = "";
  if (!email.value) {
    error.value = "Email is required.";
    return;
  }
  loading.value = true;
  try {
    await axios.post(`${config.public.BASE_URL}/auth/login/otp`, {
      email: email.value,
    });
    step.value = "otp";
    startResendCooldown();
    toast.add({
      title: "OTP sent to your email.",
      color: "success",
    });
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Failed to send OTP.";
    toast.add({
      title: "Failed to send OTP.",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

const handleOtpSubmit = async () => {
  error.value = "";
  if (!otp.value) {
    error.value = "OTP is required.";
    return;
  }
  loading.value = true;
  try {
    const response = await axios.post(`${config.public.BASE_URL}/auth/login`, {
      email: email.value,
      token: otp.value,
    });

    apiToken.value = response.data.data.api_token;
    refreshToken.value = response.data.data.refresh_token;
    token.value = response.data.data.token;
    user.value = JSON.stringify(response.data.data.user);

    const userObj = response.data.data.user;
    if (userObj && userObj.profile_set === false) {
      navigateTo("/set-profile");
    } else {
      navigateTo("/dashboard");
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Login failed.";
    toast.add({
      title: "Login failed.",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

const handleResendOtp = async () => {
  if (resendLoading.value || resendCooldown.value > 0) return;

  error.value = "";
  resendLoading.value = true;
  try {
    await axios.post(`${config.public.BASE_URL}/auth/login/otp`, {
      email: email.value,
    });
    startResendCooldown();
    toast.add({
      title: "OTP resent to your email.",
      color: "success",
    });
    // Clear the current OTP input
    otp.value = "";
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Failed to resend OTP.";
    toast.add({
      title: "Failed to resend OTP.",
      color: "error",
    });
  } finally {
    resendLoading.value = false;
  }
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
