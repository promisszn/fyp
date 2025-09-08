<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div
      class="bg-white p-8 rounded-xl shadow-lg min-w-[400px] max-w-md w-full flex flex-col items-center"
    >
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Set Your Profile</h2>
      <form
        @submit.prevent="handleProfileSubmit"
        class="w-full flex flex-col gap-4"
      >
        <label class="font-semibold text-gray-800"
          >First Name<span class="text-red-600">*</span></label
        >
        <input
          type="text"
          v-model="firstName"
          placeholder="Enter your first name"
          class="py-2 px-3 border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label class="font-semibold text-gray-800"
          >Last Name<span class="text-red-600">*</span></label
        >
        <input
          type="text"
          v-model="lastName"
          placeholder="Enter your last name"
          class="py-2 px-3 border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white rounded-md p-3 font-semibold mt-2 disabled:bg-blue-300"
        >
          Save Profile
        </button>
      </form>
      <Transition name="slide-down">
        <p
          v-if="error"
          class="text-red-600 font-semibold text-sm mt-0 w-full text-left"
        >
          {{ error }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

import { ref } from "vue";
import axios from "axios";
const config = useRuntimeConfig();

const toast = useToast();
const firstName = ref("");
const lastName = ref("");
const loading = ref(false);
const error = ref("");
const user = useCookie("user");

const handleProfileSubmit = async () => {
  error.value = "";
  if (!firstName.value) {
    error.value = "First Name is required.";
    return;
  }
  if (!lastName.value) {
    error.value = "Last Name is required.";
    return;
  }

  loading.value = true;
  try {
    const response = await axios.post(
      `${config.public.BASE_URL}/user/profile/set`,
      {
        first_name: firstName.value,
        last_name: lastName.value,
      },
      {
        headers: {
          token: useCookie("token").value,
        },
      }
    );
    toast.add({
      title: "Profile saved successfully.",
      color: "success",
    });

    console.log("Profile Response:", response.data.data);
    user.value = JSON.stringify(response.data.data);
    navigateTo("/dashboard");
  } catch (e: any) {
    console.log("Profile Error:", e);
    error.value = e?.response?.data?.message || "Failed to save profile.";
    toast.add({
      title: "Failed to save profile.",
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
