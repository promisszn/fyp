<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Plan Embellishment</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes / Annotations</label>
        <textarea v-model="local.embellishment.notes" rows="4" class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter legend, scale, north arrow notes, disclaimers..."></textarea>
      </div>
    </div>
    <div class="flex justify-end pt-2">
      <button @click="onComplete" type="button" class="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Save & Continue</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

interface EmbellishmentState {
  notes: string;
}

const props = defineProps<{ modelValue: { embellishment: EmbellishmentState } }>();
const emit = defineEmits(["update:modelValue", "complete"]);

const local = reactive<{ embellishment: EmbellishmentState }>({ embellishment: { notes: "" } });

watch(
  () => props.modelValue,
  (v) => {
    if (v) local.embellishment = { ...v.embellishment };
  },
  { immediate: true, deep: true }
);

function onComplete() {
  emit("update:modelValue", { embellishment: { ...local.embellishment } });
  emit("complete");
}
</script>
