<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Parcel Table
    </h2>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm border border-gray-200 dark:border-slate-600 rounded-md overflow-hidden">
        <thead class="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
          <tr>
            <th class="px-3 py-2 text-left">Parcel ID</th>
            <th class="px-3 py-2 text-left">Area (sqm)</th>
            <th class="px-3 py-2 text-left">Purpose</th>
            <th class="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(parcel, idx) in local.parcels" :key="parcel._key" class="border-t border-gray-200 dark:border-slate-700">
            <td class="px-3 py-1">
              <input v-model="parcel.parcel_id" type="text" class="w-40 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none" />
            </td>
            <td class="px-3 py-1">
              <input v-model.number="parcel.area" type="number" step="0.01" class="w-28 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none" />
            </td>
            <td class="px-3 py-1">
              <input v-model="parcel.purpose" type="text" class="w-48 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none" />
            </td>
            <td class="px-3 py-1 text-right">
              <button @click="removeRow(idx)" class="text-red-600 hover:text-red-700 text-xs">Remove</button>
            </td>
          </tr>
          <tr v-if="!local.parcels.length">
            <td colspan="4" class="px-3 py-4 text-center text-xs text-gray-500 dark:text-gray-400">No parcels added yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-3">
      <button @click="addRow" type="button" class="px-3 py-1.5 text-xs rounded bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-200">Add Parcel</button>
      <button @click="onComplete" :disabled="!local.parcels.length" class="px-4 py-2 ml-auto rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Save & Continue</button>
    </div>
    <p class="text-[11px] text-gray-500 dark:text-gray-400">Add at least one parcel to proceed.</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

interface ParcelRow {
  _key: string;
  parcel_id: string;
  area: number | null;
  purpose: string;
}

const props = defineProps<{ modelValue: { parcels: ParcelRow[] } }>();
const emit = defineEmits(["update:modelValue", "complete"]);

const local = reactive<{ parcels: ParcelRow[] }>({ parcels: [] });

watch(
  () => props.modelValue,
  (v) => {
    if (v) local.parcels = [...v.parcels];
  },
  { immediate: true, deep: true }
);

function addRow() {
  local.parcels.push({ _key: crypto.randomUUID(), parcel_id: "", area: null, purpose: "" });
}
function removeRow(idx: number) {
  local.parcels.splice(idx, 1);
}
function onComplete() {
  if (!local.parcels.length) return;
  emit("update:modelValue", { parcels: [...local.parcels] });
  emit("complete");
}
</script>
