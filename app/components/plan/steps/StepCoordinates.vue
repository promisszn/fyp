<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Coordinate Table
    </h2>
    <div class="overflow-x-auto">
      <table
        class="min-w-full text-sm border border-gray-200 dark:border-slate-600 rounded-md overflow-hidden"
      >
        <thead
          class="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
        >
          <tr>
            <th class="px-3 py-2 text-left">Pt #</th>
            <th class="px-3 py-2 text-left">Northing</th>
            <th class="px-3 py-2 text-left">Easting</th>
            <th class="px-3 py-2 text-left">Elevation</th>
            <th class="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in local.coordinates"
            :key="row._key"
            class="border-t border-gray-200 dark:border-slate-700"
          >
            <td class="px-3 py-1">
              <input
                v-model="row.point"
                type="text"
                class="w-16 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
              />
            </td>
            <td class="px-3 py-1">
              <input
                v-model.number="row.northing"
                type="number"
                step="0.01"
                class="w-28 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
              />
            </td>
            <td class="px-3 py-1">
              <input
                v-model.number="row.easting"
                type="number"
                step="0.01"
                class="w-28 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
              />
            </td>
            <td class="px-3 py-1">
              <input
                v-model.number="row.elevation"
                type="number"
                step="0.01"
                class="w-24 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
              />
            </td>

            <td class="px-3 py-1 text-right">
              <button
                @click="removeRow(idx)"
                class="text-red-600 hover:text-red-700 text-xs"
              >
                Remove
              </button>
            </td>
          </tr>
          <tr v-if="!local.coordinates.length">
            <td
              colspan="6"
              class="px-3 py-4 text-center text-xs text-gray-500 dark:text-gray-400"
            >
              No coordinates added yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-3">
      <button
        @click="addRow"
        type="button"
        class="px-3 py-1.5 text-xs rounded bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-200"
      >
        Add Row
      </button>
      <button
        @click="onComplete"
        :disabled="!local.coordinates.length || loading"
        class="px-4 py-2 ml-auto rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        Save & Continue
      </button>
    </div>
    <p class="text-[11px] text-gray-500 dark:text-gray-400">
      Add at least one coordinate to proceed.
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

interface CoordRow {
  _key: string;
  point: string;
  northing: number | null;
  easting: number | null;
  elevation: number | null;
}

const props = withDefaults(
  defineProps<{ modelValue: { coordinates: CoordRow[] }; loading?: boolean }>(),
  { loading: false }
);
const emit = defineEmits(["update:modelValue", "complete"]);

const local = reactive<{ coordinates: CoordRow[] }>({ coordinates: [] });

watch(
  () => props.modelValue,
  (v) => {
    if (v) local.coordinates = [...v.coordinates];
  },
  { immediate: true, deep: true }
);

function addRow() {
  local.coordinates.push({
    _key: crypto.randomUUID(),
    point: "",
    northing: null,
    easting: null,
    elevation: null,
  });
}
function removeRow(idx: number) {
  local.coordinates.splice(idx, 1);
}
function onComplete() {
  if (!local.coordinates.length) return;
  emit("update:modelValue", { coordinates: [...local.coordinates] });
  emit("complete");
}
</script>
