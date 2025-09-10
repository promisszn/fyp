<template>
  <UserHeader />

  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back -->
      <div class="mb-4">
        <button
          @click="navigateTo(`/project/${projectId}`)"
          class="inline-flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <RiArrowLeftLine class="w-4 h-4" />
          Back to Project
        </button>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Create Plan
      </h1>

      <!-- Step Tabs -->
      <div class="mb-6 overflow-x-auto">
        <ol class="flex gap-2 min-w-max">
          <li v-for="(s, idx) in steps" :key="s.key" class="relative">
            <button
              @click="goToStep(idx + 1)"
              :disabled="!isStepUnlocked(idx + 1)"
              class="group px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 border transition-colors"
              :class="[
                currentStep === idx + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : isCompleted(idx + 1)
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                  : isStepUnlocked(idx + 1)
                  ? 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                  : 'bg-gray-100 dark:bg-slate-800/50 text-gray-400 border-gray-200 dark:border-slate-700 cursor-not-allowed',
              ]"
            >
              <span
                class="text-xs inline-flex items-center justify-center w-5 h-5 rounded-full border"
                :class="
                  currentStep === idx + 1
                    ? 'border-white bg-white/20'
                    : isCompleted(idx + 1)
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-400'
                "
              >
                <template v-if="isCompleted(idx + 1)">✓</template>
                <template v-else>{{ idx + 1 }}</template>
              </span>
              <span class="whitespace-nowrap">{{ s.title }}</span>
            </button>
          </li>
        </ol>
      </div>

      <!-- Step Content -->
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <!-- STEP 1: Basic Details -->
        <StepBasicDetails
          v-if="currentStep === 1"
          :model-value="{ basic: planData.basic }"
          :plan-types="PLAN_TYPES"
          @update:model-value="
            (val) => Object.assign(planData.basic, val.basic)
          "
          @complete="completeBasic"
          @cancel="cancel"
        >
          <template #left>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Project ID: <span class="font-mono">{{ projectId }}</span>
            </div>
          </template>
        </StepBasicDetails>

        <!-- STEP 2: Coordinate Table -->
        <div v-else-if="currentStep === 2" class="space-y-6">
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
                  <th class="px-3 py-2 text-left">Desc</th>
                  <th class="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, idx) in planData.coordinates"
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
                  <td class="px-3 py-1">
                    <input
                      v-model="row.description"
                      type="text"
                      class="w-40 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                    />
                  </td>
                  <td class="px-3 py-1 text-right">
                    <button
                      @click="removeCoordinate(idx)"
                      class="text-red-600 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
                <tr v-if="!planData.coordinates.length">
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
              @click="addCoordinate"
              type="button"
              class="px-3 py-1.5 text-xs rounded bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-200"
            >
              Add Row
            </button>
            <button
              @click="completeCoordinates"
              :disabled="!planData.coordinates.length"
              class="px-4 py-2 ml-auto rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Save & Continue
            </button>
          </div>
          <p class="text-[11px] text-gray-500 dark:text-gray-400">
            Add at least one coordinate to proceed.
          </p>
        </div>

        <!-- STEP 3: Parcel Table -->
        <div v-else-if="currentStep === 3" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Parcel Table
          </h2>
          <div class="overflow-x-auto">
            <table
              class="min-w-full text-sm border border-gray-200 dark:border-slate-600 rounded-md overflow-hidden"
            >
              <thead
                class="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
              >
                <tr>
                  <th class="px-3 py-2 text-left">Parcel ID</th>
                  <th class="px-3 py-2 text-left">Area (sqm)</th>
                  <th class="px-3 py-2 text-left">Purpose</th>
                  <th class="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(parcel, idx) in planData.parcels"
                  :key="parcel._key"
                  class="border-t border-gray-200 dark:border-slate-700"
                >
                  <td class="px-3 py-1">
                    <input
                      v-model="parcel.parcel_id"
                      type="text"
                      class="w-40 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                    />
                  </td>
                  <td class="px-3 py-1">
                    <input
                      v-model.number="parcel.area"
                      type="number"
                      step="0.01"
                      class="w-28 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                    />
                  </td>
                  <td class="px-3 py-1">
                    <input
                      v-model="parcel.purpose"
                      type="text"
                      class="w-48 px-2 py-1 text-xs rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none"
                    />
                  </td>
                  <td class="px-3 py-1 text-right">
                    <button
                      @click="removeParcel(idx)"
                      class="text-red-600 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
                <tr v-if="!planData.parcels.length">
                  <td
                    colspan="4"
                    class="px-3 py-4 text-center text-xs text-gray-500 dark:text-gray-400"
                  >
                    No parcels added yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex gap-3">
            <button
              @click="addParcel"
              type="button"
              class="px-3 py-1.5 text-xs rounded bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-200"
            >
              Add Parcel
            </button>
            <button
              @click="completeParcels"
              :disabled="!planData.parcels.length"
              class="px-4 py-2 ml-auto rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Save & Continue
            </button>
          </div>
          <p class="text-[11px] text-gray-500 dark:text-gray-400">
            Add at least one parcel to proceed.
          </p>
        </div>

        <!-- STEP 4: Drawing -->
        <div v-else-if="currentStep === 4" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Drawing
          </h2>
          <div
            class="p-4 border border-dashed border-gray-300 dark:border-slate-600 rounded-md text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p class="mb-2">Upload or generate drawing (placeholder).</p>
            <input
              type="file"
              @change="handleDrawingUpload"
              class="block mx-auto text-xs"
            />
            <p
              v-if="planData.drawing.fileName"
              class="mt-2 text-xs text-green-600"
            >
              Selected: {{ planData.drawing.fileName }}
            </p>
          </div>
          <div class="flex justify-end gap-3">
            <button
              @click="completeDrawing"
              :disabled="!planData.drawing.fileName"
              class="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Save & Continue
            </button>
          </div>
          <p class="text-[11px] text-gray-500 dark:text-gray-400">
            Select a drawing file to proceed.
          </p>
        </div>

        <!-- STEP 5: Plan Embellishment -->
        <div v-else-if="currentStep === 5" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Plan Embellishment
          </h2>
          <div class="space-y-4">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Notes / Annotations</label
              >
              <textarea
                v-model="planData.embellishment.notes"
                rows="4"
                class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter legend, scale, north arrow notes, disclaimers..."
              ></textarea>
            </div>
          </div>
          <div class="flex justify-end pt-2">
            <button
              @click="completeEmbellishment"
              type="button"
              class="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
            >
              Save & Continue
            </button>
          </div>
        </div>

        <!-- STEP 6: Report -->
        <div v-else-if="currentStep === 6" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Report
          </h2>
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <input
                id="includeReport"
                type="checkbox"
                v-model="planData.report.generate"
                class="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <label
                for="includeReport"
                class="text-sm text-gray-700 dark:text-gray-300"
                >Generate summary report</label
              >
            </div>
            <div
              v-if="planData.report.generate"
              class="border border-dashed border-gray-300 dark:border-slate-600 rounded-md p-4 text-xs text-gray-600 dark:text-gray-300 space-y-2"
            >
              <p class="font-semibold text-gray-700 dark:text-gray-200">
                Preview (placeholder)
              </p>
              <ul class="list-disc ml-5 space-y-1">
                <li><strong>Name:</strong> {{ planData.basic.name }}</li>
                <li><strong>Type:</strong> {{ planData.basic.type }}</li>
                <li>
                  <strong>Coordinates:</strong>
                  {{ planData.coordinates.length }}
                </li>
                <li><strong>Parcels:</strong> {{ planData.parcels.length }}</li>
                <li v-if="planData.embellishment.notes">
                  <strong>Notes:</strong>
                  {{ planData.embellishment.notes.slice(0, 120)
                  }}{{ planData.embellishment.notes.length > 120 ? "…" : "" }}
                </li>
              </ul>
              <p class="text-[10px] text-gray-500 dark:text-gray-400">
                Full report generation TBD.
              </p>
            </div>
          </div>
          <div class="flex justify-between pt-2">
            <button
              @click="navigateTo(`/project/${projectId}`)"
              type="button"
              class="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              @click="finishPlan"
              type="button"
              class="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
            >
              Finish & Save Plan
            </button>
          </div>
        </div>
      </div>

      <div v-if="debug" class="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <pre>{{ planData }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/vue";
import StepBasicDetails from "~/components/plan/steps/StepBasicDetails.vue";

definePageMeta({ middleware: ["auth"] });

import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#imports";
import { PLAN_TYPES } from "~/types/planTypes";

const route = useRoute();
const toast = useToast();

const projectId = route.params.id as string;

// Steps meta
const steps = [
  { key: "basic", title: "Basic Details" },
  { key: "coordinates", title: "Coordinate Table" },
  { key: "parcels", title: "Parcel Table" },
  { key: "drawing", title: "Drawing" },
  { key: "embellishment", title: "Plan Embellishment" },
  { key: "report", title: "Report" },
];

const currentStep = ref(1);
const completed = ref<Set<number>>(new Set());
const submitted = ref(false);
const debug = false;

// Aggregated plan data across steps
const planData = reactive({
  basic: { name: "", type: "" },
  coordinates: [] as any[],
  parcels: [] as any[],
  drawing: { file: null as File | null, fileName: "" },
  embellishment: { notes: "" },
  report: { generate: true },
});

// Helpers
function isCompleted(step: number) {
  return completed.value.has(step);
}
function highestCompleted() {
  return completed.value.size ? Math.max(...completed.value) : 0;
}
function isStepUnlocked(step: number) {
  return step === 1 || highestCompleted() + 1 >= step;
}
function goToStep(step: number) {
  if (isStepUnlocked(step)) currentStep.value = step;
}

function markCompleted(step: number) {
  completed.value.add(step);
}

function cancel() {
  navigateTo(`/project/${projectId}`);
}

// Step 1 completion
function completeBasic() {
  submitted.value = true;
  if (!planData.basic.name || !planData.basic.type) return;
  markCompleted(1);
  currentStep.value = 2;
  toast.add({ title: "Basic details saved", color: "success" });
}

// Coordinate handling
function addCoordinate() {
  planData.coordinates.push({
    _key: crypto.randomUUID(),
    point: "",
    northing: null,
    easting: null,
    elevation: null,
    description: "",
  });
}
function removeCoordinate(idx: number) {
  planData.coordinates.splice(idx, 1);
}
function completeCoordinates() {
  if (!planData.coordinates.length) return;
  markCompleted(2);
  currentStep.value = 3;
  toast.add({ title: "Coordinates saved", color: "success" });
}

// Parcels
function addParcel() {
  planData.parcels.push({
    _key: crypto.randomUUID(),
    parcel_id: "",
    area: null,
    purpose: "",
  });
}
function removeParcel(idx: number) {
  planData.parcels.splice(idx, 1);
}
function completeParcels() {
  if (!planData.parcels.length) return;
  markCompleted(3);
  currentStep.value = 4;
  toast.add({ title: "Parcels saved", color: "success" });
}

// Drawing
function handleDrawingUpload(evt: Event) {
  const input = evt.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const f = input.files[0];
    planData.drawing.file = f;
    planData.drawing.fileName = f.name;
  }
}
function completeDrawing() {
  if (!planData.drawing.fileName) return;
  markCompleted(4);
  currentStep.value = 5;
  toast.add({ title: "Drawing saved", color: "success" });
}

// Embellishment
function completeEmbellishment() {
  markCompleted(5);
  currentStep.value = 6;
  toast.add({ title: "Embellishment saved", color: "success" });
}

// Final Step
function finishPlan() {
  markCompleted(6);
  toast.add({ title: "Plan data ready (not yet submitted)", color: "success" });
  // TODO: Submit aggregated planData to API.
  // After success: navigateTo(`/project/${projectId}`)
}
</script>

<style scoped></style>
