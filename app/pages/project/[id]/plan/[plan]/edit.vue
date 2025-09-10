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
        Edit Plan
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
        <StepCoordinates
          v-if="currentStep === 1"
          :model-value="{ coordinates: planData.coordinates }"
          :loading="submittingCoordinates"
          @update:model-value="onCoordinatesUpdate"
          @complete="completeCoordinates"
        />

        <StepParcels
          v-else-if="currentStep === 2"
          :model-value="{ parcels: planData.parcels }"
          @update:model-value="onParcelsUpdate"
          @complete="completeParcels"
        />

        <StepDrawing
          v-else-if="currentStep === 3"
          :model-value="{ drawing: planData.drawing }"
          @update:model-value="onDrawingUpdate"
          @complete="completeDrawing"
        />

        <StepEmbellishment
          v-else-if="currentStep === 4"
          :model-value="{ embellishment: planData.embellishment }"
          @update:model-value="onEmbellishmentUpdate"
          @complete="completeEmbellishment"
        />

        <StepReport
          v-else-if="currentStep === 5"
          :model-value="{
            report: planData.report,
            embellishment: planData.embellishment,
          }"
          :basic="planData.basic"
          :coordinates-count="planData.coordinates.length"
          :parcels-count="planData.parcels.length"
          @update:model-value="onReportUpdate"
          @cancel="navigateTo(`/project/${projectId}`)"
          @finish="finishPlan"
        />
      </div>

      <div v-if="debug" class="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <pre>{{ planData }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RiArrowLeftLine } from "@remixicon/vue";
import StepCoordinates from "~/components/plan/steps/StepCoordinates.vue";
import StepParcels from "~/components/plan/steps/StepParcels.vue";
import StepDrawing from "~/components/plan/steps/StepDrawing.vue";
import StepEmbellishment from "~/components/plan/steps/StepEmbellishment.vue";
import StepReport from "~/components/plan/steps/StepReport.vue";

definePageMeta({ middleware: ["auth"] });

import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#imports";
import axios from "axios";

const route = useRoute();
const toast = useToast();

const projectId = route.params.id as string;
const planId = route.params.plan as string;
const submittingCoordinates = ref(false);

const steps = [
  { key: "coordinates", title: "Coordinate Table" },
  { key: "parcels", title: "Parcel Table" },
  { key: "drawing", title: "Drawing" },
  { key: "embellishment", title: "Plan Embellishment" },
  { key: "report", title: "Report" },
];

const currentStep = ref(1);
const completed = ref<Set<number>>(new Set());
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

// Coordinate handling
async function completeCoordinates() {
  if (submittingCoordinates.value) return;
  if (!planData.coordinates.length) return;
  try {
    submittingCoordinates.value = true;
    const payload = {
      coordinates: planData.coordinates.map((r: any) => ({
        id: r.point,
        northing: r.northing != null ? Number(r.northing) : 0,
        easting: r.easting != null ? Number(r.easting) : 0,
        elevation: r.elevation != null ? Number(r.elevation) : 0,
      })),
    };
    await axios.put(`/plan/coordinates/edit/${planId}`, payload);
    markCompleted(1);
    currentStep.value = 2;
    toast.add({ title: "Coordinates saved", color: "success" });
  } catch (error) {
    toast.add({ title: "Failed to save coordinates", color: "error" });
  } finally {
    submittingCoordinates.value = false;
  }
}

// Parcels
function completeParcels() {
  if (!planData.parcels.length) return;
  markCompleted(2);
  currentStep.value = 3;
  toast.add({ title: "Parcels saved", color: "success" });
}

// Drawing
function completeDrawing() {
  if (!planData.drawing.fileName) return;
  markCompleted(3);
  currentStep.value = 4;
  toast.add({ title: "Drawing saved", color: "success" });
}

// Embellishment
function completeEmbellishment() {
  markCompleted(4);
  currentStep.value = 5;
  toast.add({ title: "Embellishment saved", color: "success" });
}

// Final Step
function finishPlan() {
  markCompleted(5);
  toast.add({ title: "Plan data ready (not yet submitted)", color: "success" });
  // TODO: Submit aggregated planData to API.
  // After success: navigateTo(`/project/${projectId}`)
}

// Update handlers to avoid implicit any in template
type CoordinatesUpdate = { coordinates: any[] };
type ParcelsUpdate = { parcels: any[] };
type DrawingUpdate = { drawing: { file: File | null; fileName: string } };
type EmbellishmentUpdate = { embellishment: { notes: string } };
type ReportUpdate = {
  report: { generate: boolean };
  embellishment: { notes: string };
};

function onCoordinatesUpdate(v: CoordinatesUpdate) {
  planData.coordinates = v.coordinates;
}
function onParcelsUpdate(v: ParcelsUpdate) {
  planData.parcels = v.parcels;
}
function onDrawingUpdate(v: DrawingUpdate) {
  Object.assign(planData.drawing, v.drawing);
}
function onEmbellishmentUpdate(v: EmbellishmentUpdate) {
  Object.assign(planData.embellishment, v.embellishment);
}
function onReportUpdate(v: ReportUpdate) {
  planData.report = v.report;
  planData.embellishment = v.embellishment;
}
</script>

<style scoped></style>
