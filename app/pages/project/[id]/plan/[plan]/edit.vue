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
        Edit Plan<span
          v-if="planData.basic.name"
          class="ml-2 text-2xl font-semibold text-gray-600 dark:text-gray-300"
        >
          — {{ planData.basic.name }}</span
        >
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
      <div
        v-if="initialLoading"
        class="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
      >
        <div class="animate-pulse space-y-4">
          <div class="h-5 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
          <div class="h-40 bg-gray-100 dark:bg-slate-700/60 rounded"></div>
          <div class="flex gap-3">
            <div class="h-8 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
            <div
              class="h-8 bg-gray-200 dark:bg-slate-700 rounded w-40 ml-auto"
            ></div>
          </div>
        </div>
      </div>
      <div v-else class="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
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
          :coordinate-ids="
            planData.coordinates.map((c) => c.point).filter(Boolean)
          "
          :loading="submittingParcels"
          @update:model-value="onParcelsUpdate"
          @complete="completeParcels"
        />

        <StepDrawing
          v-else-if="currentStep === 3"
          :model-value="{ drawing: planData.drawing }"
          :coordinates="planData.coordinates"
          :parcel-name="planData.parcels[0]?.name || planData.basic.name"
          :parcels="planData.parcels"
          @update:model-value="onDrawingUpdate"
          @complete="completeDrawing"
        />

        <StepEmbellishment
          v-else-if="currentStep === 4"
          :model-value="{ embellishment: planData.embellishment }"
          :loading="submittingEmbellishment"
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

import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#imports";
import axios from "axios";

const route = useRoute();
const toast = useToast();

const projectId = route.params.id as string;
const planId = route.params.plan as string;
const submittingCoordinates = ref(false);
const submittingParcels = ref(false);
const submittingEmbellishment = ref(false);
const initialLoading = ref(true);

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
  embellishment: {
    name: "",
    font: "Arial",
    font_size: 12,
    title: "",
    address: "",
    local_govt: "",
    state: "",
    plan_number: "",
    origin: "utm_zone_31",
    scale: 1,
    beacon_type: "none",
    personel_name: "",
    surveyor_name: "",
  },
  report: { generate: true },
});

onMounted(async () => {
  try {
    const res = await axios.get(`/plan/fetch/${planId}`);
    const data = res?.data?.data;
    if (data) {
      // Basic
      planData.basic.name = data.name || "";
      planData.basic.type = data.type || "";

      // Coordinates: map API -> component shape
      if (Array.isArray(data.coordinates)) {
        planData.coordinates = data.coordinates.map((c: any) => ({
          _key: crypto.randomUUID(),
          point: c.id ?? "",
          northing: c.northing ?? null,
          easting: c.easting ?? null,
          elevation: c.elevation ?? null,
        }));
      }

      // Parcels: API uses name + ids[]; map to component shape
      if (Array.isArray(data.parcels)) {
        planData.parcels = data.parcels.map((p: any) => ({
          _key: crypto.randomUUID(),
          name: p.name ?? "",
          ids: Array.isArray(p.ids) ? [...p.ids] : [],
        }));
      }

      // Embellishment prefill: API returns these fields flattened in the plan object
      const emb: any = data;
      if (emb) {
        planData.embellishment = {
          ...planData.embellishment,
          name: emb.name ?? planData.embellishment.name,
          font: emb.font ?? planData.embellishment.font,
          font_size: emb.font_size ?? planData.embellishment.font_size,
          title: emb.title ?? planData.embellishment.title,
          address: emb.address ?? planData.embellishment.address,
          local_govt: emb.local_govt ?? planData.embellishment.local_govt,
          state: emb.state ?? planData.embellishment.state,
          plan_number: emb.plan_number ?? planData.embellishment.plan_number,
          origin: emb.origin ?? planData.embellishment.origin,
          scale: emb.scale ?? planData.embellishment.scale,
          beacon_type: emb.beacon_type ?? planData.embellishment.beacon_type,
          personel_name:
            emb.personel_name ?? planData.embellishment.personel_name,
          surveyor_name:
            emb.surveyor_name ?? planData.embellishment.surveyor_name,
        };
      }

      // Auto-progress steps if data exists
      const hasCoords = planData.coordinates.length > 0;
      const hasParcels = planData.parcels.length > 0;
      if (hasCoords) {
        completed.value.add(1);
      }
      if (hasParcels) {
        completed.value.add(2);
      }
      if (hasCoords && hasParcels) {
        currentStep.value = 3;
      } else if (hasCoords) {
        currentStep.value = 2;
      } else {
        currentStep.value = 1;
      }
    }
  } catch (error) {
    toast.add({ title: "Failed to load plan", color: "error" });
  } finally {
    initialLoading.value = false;
  }
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
async function completeParcels() {
  if (submittingParcels.value) return;
  if (!planData.parcels.length) return;
  try {
    submittingParcels.value = true;
    const payload = {
      parcels: planData.parcels.map((p: any) => ({
        name: p.name,
        ids: Array.isArray(p.ids) ? p.ids.filter((id: string) => !!id) : [],
      })),
    };
    await axios.put(`/plan/parcels/edit/${planId}`, payload);
    markCompleted(2);
    currentStep.value = 3;
    toast.add({ title: "Parcels saved", color: "success" });
  } catch (error) {
    toast.add({ title: "Failed to save parcels", color: "error" });
  } finally {
    submittingParcels.value = false;
  }
}

// Drawing: display-only, allow proceeding
function completeDrawing() {
  markCompleted(3);
  currentStep.value = 4;
}

// Embellishment
async function completeEmbellishment() {
  if (submittingEmbellishment.value) return;
  try {
    submittingEmbellishment.value = true;
    const e = planData.embellishment;
    const payload = {
      name: e.name,
      font: e.font,
      font_size: Number(e.font_size ?? 12),
      title: e.title,
      address: e.address,
      local_govt: e.local_govt,
      state: e.state,
      plan_number: e.plan_number,
      origin: e.origin,
      scale: Number(e.scale ?? 1),
      beacon_type: e.beacon_type,
      personel_name: e.personel_name,
      surveyor_name: e.surveyor_name,
    };
    await axios.put(`/plan/edit/${planId}`, payload);
    markCompleted(4);
    currentStep.value = 5;
    toast.add({ title: "Embellishment saved", color: "success" });
  } catch (error) {
    toast.add({ title: "Failed to save embellishment", color: "error" });
  } finally {
    submittingEmbellishment.value = false;
  }
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
type DrawingUpdate = { drawing: Record<string, any> };
type EmbellishmentUpdate = {
  embellishment: {
    name: string;
    font: string;
    font_size: number;
    title: string;
    address: string;
    local_govt: string;
    state: string;
    plan_number: string;
    origin: string;
    scale: number;
    beacon_type: string;
    personel_name: string;
    surveyor_name: string;
  };
};
type ReportUpdate = {
  report: { generate: boolean };
  embellishment: {
    name: string;
    font: string;
    font_size: number;
    title: string;
    address: string;
    local_govt: string;
    state: string;
    plan_number: string;
    origin: string;
    scale: number;
    beacon_type: string;
    personel_name: string;
    surveyor_name: string;
  };
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
  Object.assign(planData.embellishment, v.embellishment);
}
</script>

<style scoped></style>
