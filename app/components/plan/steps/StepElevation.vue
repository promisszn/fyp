<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Elevation Data
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Add elevation and chainage information for route survey points
        </p>
      </div>
      <div class="flex gap-2">
        <button
          @click="downloadTemplate"
          class="px-3 py-1.5 text-xs border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          Download Template
        </button>
        <label class="cursor-pointer">
          <input
            ref="fileInputRef"
            type="file"
            accept=".csv,.txt,.xls,.xlsx"
            @change="onFile"
            class="hidden"
          />
          <span
            class="inline-block px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Import CSV/TXT
          </span>
        </label>
      </div>
    </div>

    <!-- Elevation Table -->
    <div
      class="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden mb-4"
    >
      <div class="overflow-x-auto max-h-96">
        <table class="w-full text-sm">
          <thead
            class="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700"
          >
            <tr>
              <th class="px-3 py-2 text-left">Point</th>
              <th class="px-3 py-2 text-left">Elevation (m)</th>
              <th class="px-3 py-2 text-left">Chainage</th>
              <th class="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, idx) in local.elevations"
              :key="row._key"
              class="border-t border-gray-200 dark:border-slate-700"
            >
              <td class="px-3 py-1">
                <select
                  v-model="row.point"
                  class="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                >
                  <option value="">Select Point</option>
                  <option
                    v-for="pointId in availablePoints"
                    :key="pointId"
                    :value="pointId"
                  >
                    {{ pointId }}
                  </option>
                </select>
              </td>
              <td class="px-3 py-1">
                <input
                  v-model.number="row.elevation"
                  type="number"
                  step="0.001"
                  class="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                  placeholder="0.000"
                />
              </td>
              <td class="px-3 py-1">
                <input
                  v-model="row.chainage"
                  type="text"
                  class="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                  placeholder="0+000"
                />
              </td>
              <td class="px-3 py-1">
                <button
                  @click="removeRow(idx)"
                  class="text-red-500 hover:text-red-700 text-xs p-1"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Row Button -->
    <div class="flex justify-between items-center mb-6">
      <button
        @click="addRow"
        class="px-3 py-1.5 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600"
      >
        + Add Elevation Point
      </button>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        {{ local.elevations.length }} elevation points
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3">
      <button
        @click="saveAndContinue"
        :disabled="loading || !hasValidElevations"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? "Saving..." : "Save & Continue" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";

interface ElevationRow {
  _key: string;
  point: string;
  elevation: number | null;
  chainage: string;
}

interface ElevationData {
  elevations: ElevationRow[];
}

const props = defineProps<{
  modelValue: ElevationData;
  coordinateIds: string[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  "update:model-value": [value: ElevationData];
  complete: [];
}>();

const fileInputRef = ref<HTMLInputElement>();

const local = reactive<ElevationData>({
  elevations: [...props.modelValue.elevations],
});

// Available coordinate points that don't have elevation data yet
const availablePoints = computed(() => {
  const usedPoints = new Set(
    local.elevations.map((e) => e.point).filter(Boolean)
  );
  return props.coordinateIds.filter(
    (id) => !usedPoints.has(id) || local.elevations.some((e) => e.point === id)
  );
});

// Check if we have valid elevation data
const hasValidElevations = computed(() => {
  return local.elevations.some((e) => e.point && e.elevation != null);
});

// Watch for changes and emit updates
watch(
  () => local,
  () => {
    emit("update:model-value", { elevations: [...local.elevations] });
  },
  { deep: true }
);

// Initialize with one empty row if none exist
if (local.elevations.length === 0) {
  addRow();
}

function addRow() {
  local.elevations.push({
    _key: crypto.randomUUID(),
    point: "",
    elevation: null,
    chainage: "",
  });
}

function removeRow(index: number) {
  if (local.elevations.length > 1) {
    local.elevations.splice(index, 1);
  }
}

import { parseTable } from "~/composables/useSheetParser";

async function onFile(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const ext = "." + (file.name.split(".").pop() || "").toLowerCase();

  try {
    if (ext === ".xls" || ext === ".xlsx") {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        let rows = await parseTable(arrayBuffer);

        // Remove header row if detected
        if (Array.isArray(rows[0])) {
          const joined = String(rows[0].join(" ")).toLowerCase();
          if (/point|elevation|chainage|elev/.test(joined)) {
            rows = rows.slice(1);
          }
        }

        const parsed = rows
          .map((cols) => ({
            _key: crypto.randomUUID(),
            point: String(cols[0] ?? "").trim(),
            elevation: cols[1] ? Number(cols[1]) : null,
            chainage: String(cols[2] ?? ""),
          }))
          .filter((r) => r.point);
        if (parsed.length) local.elevations = parsed;
        if (fileInputRef.value) fileInputRef.value.value = "";
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const text = String(reader.result || "");
        let rows = await parseTable(text);

        // Remove header row if detected
        if (Array.isArray(rows[0])) {
          const joined = String(rows[0].join(" ")).toLowerCase();
          if (/point|elevation|chainage|elev/.test(joined)) {
            rows = rows.slice(1);
          }
        }

        const parsed = rows
          .map((cols) => ({
            _key: crypto.randomUUID(),
            point: String(cols[0] ?? "").trim(),
            elevation: cols[1] ? Number(cols[1]) : null,
            chainage: String(cols[2] ?? ""),
          }))
          .filter((r) => r.point);
        if (parsed.length) local.elevations = parsed;
        if (fileInputRef.value) fileInputRef.value.value = "";
      };
      reader.readAsText(file);
    }
  } catch (err) {
    console.error("File import error:", err);
    if (fileInputRef.value) fileInputRef.value.value = "";
  }
}

function downloadTemplate() {
  const csv = [
    "Point,Elevation,Chainage",
    "CP1,87.550,0+000",
    "CP2,85.487,0+025",
    "CP3,86.895,0+050",
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "elevation_template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

async function saveAndContinue() {
  if (!hasValidElevations.value) return;
  emit("complete");
}
</script>
