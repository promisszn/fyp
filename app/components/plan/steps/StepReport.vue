<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Report</h2>
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <input id="includeReport" type="checkbox" v-model="local.report.generate" class="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
        <label for="includeReport" class="text-sm text-gray-700 dark:text-gray-300">Generate summary report</label>
      </div>
      <div v-if="local.report.generate" class="border border-dashed border-gray-300 dark:border-slate-600 rounded-md p-4 text-xs text-gray-600 dark:text-gray-300 space-y-2">
        <p class="font-semibold text-gray-700 dark:text-gray-200">Preview (placeholder)</p>
        <ul class="list-disc ml-5 space-y-1">
          <li><strong>Name:</strong> {{ basic.name }}</li>
          <li><strong>Type:</strong> {{ basic.type }}</li>
          <li><strong>Coordinates:</strong> {{ coordinatesCount }}</li>
          <li><strong>Parcels:</strong> {{ parcelsCount }}</li>
          <li v-if="local.embellishment.notes"><strong>Notes:</strong> {{ local.embellishment.notes.slice(0, 120) }}{{ local.embellishment.notes.length > 120 ? "…" : "" }}</li>
        </ul>
        <p class="text-[10px] text-gray-500 dark:text-gray-400">Full report generation TBD.</p>
      </div>
    </div>
    <div class="flex justify-between pt-2">
      <button @click="$emit('cancel')" type="button" class="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Cancel</button>
      <button @click="$emit('finish')" type="button" class="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium">Finish & Save Plan</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";

interface Basic { name: string; type: string }
interface Embellishment { notes: string }
interface Report { generate: boolean }

const props = defineProps<{
  modelValue: { report: Report; embellishment: Embellishment };
  basic: Basic;
  coordinatesCount: number;
  parcelsCount: number;
}>();
const emit = defineEmits(["update:modelValue", "cancel", "finish"]);

const local = reactive({ report: { generate: true }, embellishment: { notes: "" } });

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      local.report = { ...v.report };
      local.embellishment = { ...v.embellishment };
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => local.report,
  (v) => emit("update:modelValue", { report: { ...v }, embellishment: { ...local.embellishment } }),
  { deep: true }
);
</script>
