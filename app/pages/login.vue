<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div
      class="bg-white p-12 rounded-xl shadow-lg min-w-[400px] max-w-md w-full flex flex-col items-center"
    >
      <div class="flex flex-col items-center text-center mb-6 w-full">
        <div
          class="flex justify-center items-center w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full"
        >
          <RiLock2Fill class="text-2xl text-blue-600" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
        <p class="text-gray-700 text-sm">
          Sign in securely with your email and token.
        </p>
      </div>
      <form
        @submit.prevent="handleEmailSubmit"
        v-if="step === 'email'"
        class="w-full flex flex-col gap-4"
      >
        <label class="font-semibold text-gray-800">Email *</label>
        <input
          type="email"
          v-model="email"
          required
          placeholder="Enter your email"
          class="py-2 px-3 border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white rounded-md p-3 font-semibold mt-2 disabled:bg-blue-300"
        >
          Send Token
        </button>
      </form>
      <form
        @submit.prevent="handleTokenSubmit"
        v-if="step === 'token'"
        class="w-full flex flex-col gap-4"
      >
        <label class="font-semibold text-gray-800">Token *</label>
        <input
          type="text"
          v-model="token"
          required
          placeholder="Enter token"
          class="py-2 px-3 border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white rounded-md p-3 font-semibold mt-2 disabled:bg-blue-300"
        >
          Continue
        </button>
        <p
          class="text-blue-600 hover:underline text-right text-sm font-semibold cursor-pointer mt-1"
          @click="step = 'email'"
        >
          Back
        </p>
      </form>
      <p v-if="error" class="text-red-600 font-semibold mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-600 font-semibold mt-4">
        {{ success }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RiLock2Fill } from "@remixicon/vue";
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const token = ref("");
const step = ref<"email" | "token">("email");
const loading = ref(false);
const error = ref("");
const success = ref("");

const handleEmailSubmit = async () => {
  error.value = "";
  loading.value = true;
  try {
    // Replace with your backend endpoint
    await axios.post("/api/send-token", { email: email.value });
    step.value = "token";
    success.value = "Token sent to your email.";
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Failed to send token.";
  } finally {
    loading.value = false;
  }
};

const handleTokenSubmit = async () => {
  error.value = "";
  loading.value = true;
  try {
    // Replace with your backend endpoint
    await axios.post("/api/login", { email: email.value, token: token.value });
    success.value = "Logged in successfully!";
    // Redirect or further logic here
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Login failed.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
