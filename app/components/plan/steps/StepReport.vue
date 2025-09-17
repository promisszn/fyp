<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Report
    </h2>
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <input
          id="includeReport"
          type="checkbox"
          v-model="local.report.generate"
          @change="emitUpdate"
          class="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
        />
        <label
          for="includeReport"
          class="text-sm text-gray-700 dark:text-gray-300"
          >Generate summary report</label
        >
      </div>

      <!-- Plan Summary Section -->
      <div
        class="border border-gray-200 dark:border-slate-700 rounded-md p-4 bg-white dark:bg-slate-800"
      >
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Plan Summary
        </h3>

        <!-- Basic Details -->
        <div class="mb-4">
          <h4
            class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2"
          >
            Basic Details
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span class="text-gray-500 dark:text-gray-400">Name:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                basic.name || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Type:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                basic.type || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Coordinates:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                coordinatesCount
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Parcels:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                parcelsCount
              }}</span>
            </div>
          </div>
        </div>

        <!-- Embellishment Details -->
        <div class="mb-4">
          <h4
            class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2"
          >
            Plan Embellishment
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span class="text-gray-500 dark:text-gray-400">Plan Name:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                modelValue.embellishment?.name || "—"
              }}</span>
            </div>
            <div class="flex">
              <span class="text-gray-500 dark:text-gray-400">Title:</span>
              <span
                class="ml-2 text-gray-800 dark:text-gray-100"
                v-html="modelValue.embellishment?.title || '—'"
              ></span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Address:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                modelValue.embellishment?.address || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Local Govt:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                modelValue.embellishment?.local_govt || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">State:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                modelValue.embellishment?.state || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Plan Number:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                modelValue.embellishment?.plan_number || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Origin:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                formatOrigin(modelValue.embellishment?.origin)
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Scale:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                formatScale(modelValue.embellishment?.scale)
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Beacon Type:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                formatBeaconType(modelValue.embellishment?.beacon_type)
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Font:</span>
              <span class="ml-2 text-gray-800 dark:text-gray-100"
                >{{ modelValue.embellishment?.font || "—" }} ({{
                  modelValue.embellishment?.font_size || "—"
                }}pt)</span
              >
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400"
                >Personnel Name:</span
              >
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                modelValue.embellishment?.personel_name || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400"
                >Surveyor Name:</span
              >
              <span class="ml-2 text-gray-800 dark:text-gray-100">{{
                modelValue.embellishment?.surveyor_name || "—"
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Plan Generation Section -->
      <div
        class="border border-gray-300 dark:border-slate-600 rounded-md p-4 bg-gray-50 dark:bg-slate-700/50"
      >
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Generate Plan
        </h3>
        <p class="text-xs text-gray-600 dark:text-gray-300 mb-4">
          Generate a complete survey plan with all the data you've entered.
        </p>

        <div v-if="generationState.url" class="mb-4">
          <div
            class="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mb-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Plan generated successfully!
          </div>
          <a
            :href="generationState.url"
            download
            class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Plan
          </a>
        </div>

        <div v-else>
          <button
            @click="generatePlan"
            :disabled="generationState.loading"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              v-if="generationState.loading"
              class="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {{ generationState.loading ? "Generating..." : "Generate Plan" }}
          </button>
        </div>

        <div
          v-if="generationState.error"
          class="mt-3 text-sm text-red-600 dark:text-red-400"
        >
          {{ generationState.error }}
        </div>
      </div>
    </div>
    <div class="flex justify-between pt-2">
      <button
        @click="$emit('cancel')"
        type="button"
        class="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
      >
        Cancel
      </button>
      <button
        @click="$emit('finish')"
        type="button"
        class="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
      >
        Finish
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Basic {
  name: string;
  type: string;
}
interface Embellishment {
  notes?: string;
  [key: string]: any;
}
interface Report {
  generate: boolean;
}

const props = defineProps<{
  modelValue: { report: Report; embellishment: Embellishment };
  basic: Basic;
  coordinatesCount: number;
  parcelsCount: number;
}>();
const emit = defineEmits(["update:modelValue", "cancel", "finish"]);

const route = useRoute();
const toast = useToast();
const planId = route.params.plan as string;

const local = reactive({
  report: { generate: true },
  embellishment: { notes: "" },
});

// Plan generation state
const generationState = reactive({
  loading: false,
  url: null as string | null,
  error: null as string | null,
});

// Sync from parent once on mount and whenever the reference changes (avoid deep echo loops)
watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      local.report = { ...v.report };
      local.embellishment = {
        ...(v.embellishment || {}),
        notes: v.embellishment?.notes ?? "",
      };
    }
  },
  { immediate: true }
);

function emitUpdate() {
  emit("update:modelValue", {
    report: { ...local.report },
    embellishment: { notes: local.embellishment.notes },
  });
}

async function generatePlan() {
  if (generationState.loading) return;

  try {
    generationState.loading = true;
    generationState.error = null;
    generationState.url = null;

    const response = await axios.get(`/plan/generate/${planId}`);

    if (response.data?.error === false && response.data?.data?.url) {
      generationState.url = response.data.data.url;
      toast?.add?.({
        title: "Plan generated successfully!",
        description: "Your plan is ready for download.",
        color: "success",
      });
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: any) {
    console.error("Plan generation error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to generate plan";
    generationState.error = errorMessage;
    toast?.add?.({
      title: "Generation failed",
      description: errorMessage,
      color: "error",
    });
  } finally {
    generationState.loading = false;
  }
}

// Formatting helper functions
function formatOrigin(origin: string | null | undefined) {
  if (!origin) return "—";
  return origin.replace(/_/g, " ").toUpperCase();
}

function formatScale(scale: number | null | undefined) {
  if (!scale || scale === 0) return "—";
  return `1:${scale}`;
}

function formatBeaconType(beaconType: string | null | undefined) {
  if (!beaconType || beaconType === "none") return "—";
  return beaconType.replace(/_/g, " ").toUpperCase();
}
</script>
