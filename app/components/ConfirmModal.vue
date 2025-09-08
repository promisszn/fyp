<template>
  <div v-if="modelValue()" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="onClose"></div>

    <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 z-10 p-6 flex flex-col items-center text-center">
      <div class="flex justify-center items-center w-14 h-14 mb-4 bg-red-100 rounded-full">
        <RiDeleteBin6Fill class="text-2xl text-red-600" />
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ message }}</p>
      </div>

      <div class="flex justify-center gap-3 w-full">
        <button class="px-4 py-2 border rounded text-gray-800" @click="onClose">Cancel</button>
        <button class="px-4 py-2 bg-red-600 text-white rounded" @click="confirm" :disabled="submitting" :class="{ 'opacity-50 cursor-not-allowed': submitting }">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RiDeleteBin6Fill } from "@remixicon/vue";

const props = defineProps<{ modelValue: boolean; title?: string; message?: string }>();
const emit = defineEmits(["update:modelValue", "confirmed"]);

const modelValue = () => (props as any).modelValue;
const submitting = ref(false);

function onClose() {
  emit("update:modelValue", false);
}

function confirm() {
  submitting.value = true;
  // immediate emit; parent will handle deletion
  emit("confirmed");
  // close modal; parent may update state
  emit("update:modelValue", false);
  submitting.value = false;
}
</script>

<style scoped></style>
