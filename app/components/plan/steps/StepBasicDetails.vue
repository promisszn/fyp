<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div class="space-y-1">
      <label
        for="planName"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Plan Name <span class="text-red-500">*</span></label
      >
      <input
        id="planName"
        v-model.trim="local.basic.name"
        type="text"
        placeholder="e.g. Cadastral Survey"
        class="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{
          'border-red-500 focus:ring-red-500': submitted && !local.basic.name,
        }"
      />
      <p
        v-if="submitted && !local.basic.name"
        class="text-xs text-red-500 mt-1"
      >
        Name is required.
      </p>
    </div>
    <div class="space-y-1">
      <label
        for="planType"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Plan Type <span class="text-red-500">*</span></label
      >
      <select
        id="planType"
        v-model="local.basic.type"
        class="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{
          'border-red-500 focus:ring-red-500': submitted && !local.basic.type,
        }"
      >
        <option disabled value="">Select a type</option>
        <option v-for="opt in planTypes" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <p
        v-if="submitted && !local.basic.type"
        class="text-xs text-red-500 mt-1"
      >
        Type is required.
      </p>
    </div>
    <div class="flex items-center justify-between pt-2">
      <slot name="left" />
      <div class="flex gap-3">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="!local.basic.name || !local.basic.type || props.loading"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save & Continue
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";

interface BasicData {
  name: string;
  type: string;
}
interface PlanType {
  value: string;
  label: string;
}
const props = withDefaults(
  defineProps<{
    modelValue: { basic: BasicData };
    planTypes: PlanType[];
    loading?: boolean;
  }>(),
  { loading: false }
);
const emit = defineEmits(["update:modelValue", "complete", "cancel"]);

const submitted = ref(false);
const local = reactive({ basic: { name: "", type: "" } });

const planTypes = props.planTypes;

watch(
  () => props.modelValue,
  (v) => {
    if (v) Object.assign(local.basic, v.basic);
  },
  { immediate: true, deep: true }
);

function onSubmit() {
  submitted.value = true;
  if (!local.basic.name || !local.basic.type) return;
  emit("update:modelValue", { basic: { ...local.basic } });
  emit("complete");
}
</script>
