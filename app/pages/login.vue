<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900">
    <div
      class="bg-white dark:bg-slate-800 p-12 rounded-xl shadow-lg min-w-[400px] max-w-md w-full flex flex-col items-center"
    >
      <div class="flex flex-col items-center text-center mb-6 w-full">
        <div
          class="flex justify-center items-center w-12 h-12 mx-auto mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full"
        >
          <RiLock2Fill class="text-2xl text-blue-600 dark:text-blue-400" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Welcome back</h2>
        <p class="text-gray-700 dark:text-gray-300 text-sm">
          Sign in securely with your email and otp.
        </p>
      </div>
      <form
        @submit.prevent="handleEmailSubmit"
        v-if="step === 'email'"
        class="w-full flex flex-col gap-1"
      >
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
        >
          Send OTP
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
        >
          Continue
        </button>
        <p
          class="text-blue-600 dark:text-blue-400 hover:underline text-right text-sm font-semibold cursor-pointer mt-1"
          @click="step = 'email'"
        >
          Back
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
import { RiLock2Fill } from "@remixicon/vue";
import { ref } from "vue";
import axios from "axios";
import { navigateTo } from "nuxt/app";
const config = useRuntimeConfig();

const toast = useToast();
const email = ref("");
const otp = ref("");
const step = ref<"email" | "otp">("email");
const loading = ref(false);
const error = ref("");
const apiToken = useCookie("api_token");
const refreshToken = useCookie("refresh_token");
const token = useCookie("token");
const user = useCookie("user");

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
