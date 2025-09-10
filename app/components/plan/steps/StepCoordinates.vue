<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Coordinate Table
    </h2>
    <div
      class="flex items-center justify-between gap-3 p-3 rounded-md border border-blue-200 dark:border-slate-700 bg-blue-50/70 dark:bg-slate-800/50"
    >
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-blue-600 dark:text-blue-400">
          <path d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 8.707 10.293L11 12.586V4a1 1 0 0 1 1-1z"/>
          <path d="M4 15a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6v3h12v-3h-1a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4z"/>
        </svg>
        <div>
          <div class="text-xs font-medium text-gray-800 dark:text-gray-200">Import coordinates (CSV or TXT)</div>
          <div class="text-[11px] text-gray-600 dark:text-gray-400">Columns: point, northing, easting[, elevation]</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <input ref="fileInputRef" type="file" accept=".csv,.txt" @change="onFile" class="hidden" />
        <button
          type="button"
          @click="triggerFile"
          class="px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Upload CSV/TXT
        </button>
        <button
          type="button"
          class="px-3 py-1.5 text-xs rounded border border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700/60"
          @click="downloadTemplate"
        >
          Download Template
        </button>
      </div>
    </div>
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
import { reactive, watch, ref } from "vue";

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
const fileInputRef = ref<HTMLInputElement | null>(null);
function triggerFile() {
  fileInputRef.value?.click();
}

watch(
  () => props.modelValue.coordinates,
  (arr) => {
    if (Array.isArray(arr)) {
      local.coordinates = arr.map((r) => ({ ...r }));
    } else {
      local.coordinates = [];
    }
  },
  { immediate: true }
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

function parseCSV(text: string): CoordRow[] {
  // try to handle both comma and whitespace separated
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !/^#/.test(l));
  if (!lines.length) return [];

  // detect header
  const header = (lines[0] ?? "").toLowerCase();
  const hasHeader = /point|pt|north|east|easting|northing/.test(header);
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const rows: CoordRow[] = [];
  for (const line of dataLines) {
    const cols = line.includes(",") ? line.split(",") : line.split(/[\s;\t]+/);
    if (cols.length < 3) continue;
    const point = String(cols[0]).trim();
    const nRaw = String(cols[1]).trim();
    const eRaw = String(cols[2]).trim();
    const elevRaw = cols[3] != null ? String(cols[3]).trim() : "";

    const northing = nRaw ? Number(nRaw) : null;
    const easting = eRaw ? Number(eRaw) : null;
    const elevation = elevRaw ? Number(elevRaw) : null;

    rows.push({
      _key: crypto.randomUUID(),
      point,
      northing,
      easting,
      elevation,
    });
  }
  return rows;
}

function onFile(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || "");
    const rows = parseCSV(text);
    if (rows.length) {
      local.coordinates = rows;
    }
    if (fileInputRef.value) fileInputRef.value.value = "";
  };
  reader.readAsText(file);
}

function downloadTemplate() {
  const csv = [
    "point,northing,easting,elevation",
    "P1,37.779,-122.423,",
    "P2,37.779,-122.414,",
    "P3,37.772,-122.414,",
    "P4,37.772,-122.423,",
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "coordinates_template.csv";
  a.click();
  URL.revokeObjectURL(url);
}
</script>
