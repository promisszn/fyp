<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900"
  >
    <div
      class="bg-white dark:bg-slate-800 p-12 rounded-xl shadow-lg min-w-[400px] max-w-md w-full flex flex-col items-center"
    >
      <!-- Skeleton while fetching -->
      <div v-if="isFetching" class="w-full">
        <div
          class="h-6 w-1/2 bg-gray-200 dark:bg-slate-700 rounded mb-4 mx-auto animate-pulse"
        ></div>
        <div
          class="h-10 bg-gray-200 dark:bg-slate-700 rounded mb-3 animate-pulse"
        ></div>
        <div
          class="h-6 w-1/2 bg-gray-200 dark:bg-slate-700 rounded mb-4 mx-auto animate-pulse"
        ></div>
        <div
          class="h-10 bg-gray-200 dark:bg-slate-700 rounded mb-3 animate-pulse"
        ></div>
        <div
          class="h-10 bg-gray-200 dark:bg-slate-700 rounded mt-6 animate-pulse"
        ></div>
      </div>

      <!-- Actual form -->
      <div v-else class="w-full flex flex-col items-center">
        <div class="flex flex-col items-center text-center mb-6 w-full">
          <div
            class="flex justify-center items-center w-12 h-12 mx-auto mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full"
          >
            <RiUser3Fill class="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            Set Your Profile
          </h2>
          <p class="text-gray-700 dark:text-gray-300 text-sm">
            Complete your profile to get started.
          </p>
        </div>
        <form
          @submit.prevent="handleProfileSubmit"
          class="w-full flex flex-col gap-1"
        >
          <label class="font-semibold text-gray-800 dark:text-gray-200"
            >First Name<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            v-model="firstName"
            placeholder="Enter your first name"
            class="py-2 px-3 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label class="font-semibold text-gray-800 dark:text-gray-200 mt-4"
            >Last Name<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            v-model="lastName"
            placeholder="Enter your last name"
            class="py-2 px-3 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Transition name="slide-down">
            <p
              v-if="error"
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
            Save Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

import { RiUser3Fill } from "@remixicon/vue";
import { onMounted, ref } from "vue";
import axios from "axios";
const config = useRuntimeConfig();

const toast = useToast();
const firstName = ref("");
const lastName = ref("");
const loading = ref(false);
const error = ref("");
const isFetching = ref(true);
const user = useCookie("user");

// Fetch the user profile on mount and prefill if profile_set is true
onMounted(async () => {
  isFetching.value = true;
  try {
    const resp = await axios.get(
      `${config.public.BASE_URL}/user/profile/fetch`
    );
    const profile = resp?.data?.data;
    if (profile && profile.profile_set) {
      firstName.value = profile.first_name || "";
      lastName.value = profile.last_name || "";
    }
  } catch (err: any) {
    // non-blocking: show a small toast but leave the form usable
    toast.add({ title: "Could not fetch profile.", color: "warning" });
  } finally {
    isFetching.value = false;
  }
});

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
      }
    );
    toast.add({
      title: "Profile saved successfully.",
      color: "success",
    });

    user.value = JSON.stringify(response.data.data);
    navigateTo("/dashboard");
  } catch (e: any) {
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
