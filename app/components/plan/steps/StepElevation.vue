<template>
  <div>
    <!-- Leveling method chooser -->
    <div
      class="p-6 rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm mb-6"
    >
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Choose leveling method
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Select how you'd like to compute elevation data for your route survey.
      </p>
      <div class="flex items-center gap-3">
        <button
          @click="goToDifferentialLeveling"
          class="px-4 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          Differential Leveling
        </button>
      </div>
    </div>

    <div class="flex items-center justify-center my-4">
      <span
        class="flex-grow border-t border-gray-300 dark:border-slate-600"
      ></span>
      <span class="mx-3 text-black dark:text-white"
        >or enter elevation data manually</span
      >
      <span
        class="flex-grow border-t border-gray-300 dark:border-slate-600"
      ></span>
    </div>

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
                <input
                  type="text"
                  v-model="row.point"
                  class="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                  placeholder="Select point"
                />
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
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#imports";
import { useElevationTransfer } from "~/composables/useElevationTransfer";

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
}>();

const emit = defineEmits<{
  "update:model-value": [value: ElevationData];
  complete: [];
}>();

const route = useRoute();
const fileInputRef = ref<HTMLInputElement>();
const loading = ref(false);

const local = reactive<ElevationData>({
  elevations: [...props.modelValue.elevations],
});

function goToDifferentialLeveling() {
  const projectId = route.params.id as string;
  const planId = route.params.plan as string;
  navigateTo(`/project/${projectId}/plan/${planId}/differential-leveling`);
}

// Check for transferred elevation data on mount
onMounted(async () => {
  const {
    getTransferredElevations,
    clearTransferredElevations,
    hasTransferredElevations,
  } = useElevationTransfer();

  // Priority 1: Check for transferred elevation data (from differential leveling)
  if (hasTransferredElevations.value) {
    const transferred = getTransferredElevations();

    // Convert transferred elevations to elevation rows
    const newElevations = transferred.map((el) => ({
      _key: crypto.randomUUID(),
      point: el.point,
      elevation: el.elevation,
      chainage: el.chainage,
    }));

    if (newElevations.length > 0) {
      local.elevations = newElevations;

      // Clear the transferred data after using it
      clearTransferredElevations();
      return; // Don't fetch from API if we have transferred data
    }
  }

  // Priority 2: Fetch existing elevation data from API (if editing existing plan)
  try {
    const planId = route.params.plan as string;
    if (planId) {
      const { $axios } = useNuxtApp();
      const response = await $axios.get(`/plan/fetch/${planId}`);

      if (
        response.data?.data?.elevations &&
        response.data.data.elevations.length > 0
      ) {
        const apiElevations = response.data.data.elevations.map((el: any) => ({
          _key: crypto.randomUUID(),
          point: el.id || "",
          elevation: el.elevation || null,
          chainage: el.chainage || "",
        }));

        // Only update if we don't already have data in local.elevations
        if (
          local.elevations.length === 1 &&
          local.elevations[0] &&
          !local.elevations[0].point
        ) {
          local.elevations = apiElevations;
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch elevation data:", error);
    // Don't show error toast here as this is optional background loading
  }
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

const toast = useToast();

async function saveAndContinue() {
  if (!hasValidElevations.value || loading.value) return;

  try {
    loading.value = true;
    const planId = route.params.plan as string;
    const { $axios } = useNuxtApp();

    // Prepare elevation data for API
    const elevations = local.elevations
      .filter(
        (row) => row.point && row.point.trim() !== "" && row.elevation !== null
      )
      .map((row) => ({
        id: row.point,
        elevation: row.elevation!,
        chainage: row.chainage || "",
      }));

    if (elevations.length === 0) {
      toast.add({
        title: "Please add at least one elevation point",
        color: "warning",
      });
      return;
    }

    // Save elevation data to API
    await $axios.put(`/plan/elevations/edit/${planId}`, {
      elevations,
    });

    emit("complete");
  } catch (error: any) {
    console.error("Failed to save elevation data:", error);
    toast.add({
      title: "Failed to save elevation data",
      description:
        error.response?.data?.message || error.message || "Please try again",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
}
</script>
