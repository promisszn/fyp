<template>
  <UserHeader />

  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back -->
      <div class="mb-4">
        <button
          @click="navigateTo(`/project/${projectId}/plan/${planId}`)"
          class="inline-flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <RiArrowLeftLine class="w-4 h-4" />
          Back to Plan Details
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
        <!-- Topographic Plan Steps -->
        <template v-if="planData.basic.type === 'topographic'">
          <!-- Step 1: Topo Boundary Table -->
          <StepCoordinates
            v-if="currentStep === 1"
            :model-value="boundaryModel"
            :plan-type="planData.basic.type"
            :loading="submittingCoordinates"
            @update:modelValue="(v) => (planData.boundary = v.coordinates)"
            @complete="completeTopoBoundary"
          />
          <!-- Step 2: Topo Points (like coordinates, but elevation required) -->
          <StepTopoPoints
            v-else-if="currentStep === 2"
            :model-value="topoPointsModel"
            :loading="submittingCoordinates"
            @update:modelValue="(v) => (planData.topoPoints = v.coordinates)"
            @complete="onTopoPointsSaved"
          />
          <!-- Step 3: Topo Settings -->
          <StepTopoSettings
            v-else-if="currentStep === 3"
            :model-value="topoSettingsModel"
            :loading="submittingEmbellishment"
            @update:modelValue="(v) => (planData.topoSettings = v.settings)"
            @complete="onTopoSettingsSaved"
          />
          <!-- Step 4: Embellishment -->
          <StepEmbellishment
            v-else-if="currentStep === 4"
            :model-value="embellishmentModel"
            :loading="submittingEmbellishment"
            @update:model-value="onEmbellishmentUpdate"
            @complete="completeEmbellishment"
          />
          <!-- Step 5: Report -->
          <StepReport
            v-else-if="currentStep === 5"
            :model-value="reportModel"
            :basic="planData.basic"
            :coordinates-count="(planData.topoPoints || []).length"
            :parcels-count="0"
            :topo-settings="planData.topoSettings"
            :topo-boundary="planData.boundary"
            @update:model-value="onReportUpdate"
            @cancel="navigateTo(`/project/${projectId}`)"
            @finish="finishPlan"
          />
        </template>
        <!-- Route and Cadastral Plan Steps -->
        <template v-else>
          <!-- Route Survey: Elevation Step (First for route, coordinates for others) -->
          <template v-if="planData.basic.type === 'route'">
            <!-- Route Step 1: Elevation Data -->
            <StepElevation
              v-if="currentStep === 1"
              :model-value="elevationsModel"
              :coordinate-ids="
                planData.elevations.map((e) => e.point).filter(Boolean)
              "
              @update:model-value="onElevationUpdate"
              @complete="completeElevation"
            />
            <!-- Route Step 2: Longitudinal Profile -->
            <StepLongitudinal
              v-else-if="currentStep === 2"
              :model-value="longitudinalModel"
              @update:model-value="onLongitudinalUpdate"
              @complete="completeLongitudinal"
            />
            <!-- Route Step 3: Embellishment -->
            <StepEmbellishment
              v-else-if="currentStep === 3"
              :model-value="embellishmentModel"
              :loading="submittingEmbellishment"
              @update:model-value="onEmbellishmentUpdate"
              @complete="completeEmbellishment"
            />
            <!-- Route Step 4: Report -->
            <StepReport
              v-else-if="currentStep === 4"
              :model-value="reportModel"
              :basic="planData.basic"
              :coordinates-count="planData.elevations.length"
              :parcels-count="0"
              @update:model-value="onReportUpdate"
              @cancel="navigateTo(`/project/${projectId}`)"
              @finish="finishPlan"
            />
          </template>
          <!-- Cadastral and Layout Plans -->
          <template v-else>
            <!-- Step 1: Coordinates -->
            <StepCoordinates
              v-if="currentStep === 1"
              :model-value="coordinatesModel"
              :loading="submittingCoordinates"
              @update:model-value="onCoordinatesUpdate"
              @complete="completeCoordinates"
            />
            <!-- Step 2: Parcels -->
            <StepParcels
              v-else-if="currentStep === 2"
              :model-value="parcelsModel"
              :coordinate-ids="
                planData.coordinates.map((c) => c.point).filter(Boolean)
              "
              :loading="submittingParcels"
              @update:model-value="onParcelsUpdate"
              @complete="completeParcels"
            />
            <!-- Step 3: Computation -->
            <StepComputation
              v-else-if="currentStep === 3"
              :parcels="planData.parcels"
              :coordinates="planData.coordinates"
              :plan-type="planData.basic.type"
              @complete="onComputationComplete"
            />
            <!-- Step 4: Layout (layout type only) -->
            <StepLayout
              v-else-if="currentStep === 4 && planData.basic.type === 'layout'"
              :model-value="layoutModel"
              :loading="submittingEmbellishment"
              @update:model-value="onLayoutUpdate"
              @complete="completeLayout"
            />
            <!-- Step 4: Drawing (cadastral type) -->
            <StepDrawing
              v-else-if="currentStep === 4 && planData.basic.type !== 'layout'"
              :model-value="drawingModel"
              :coordinates="planData.coordinates"
              :parcel-name="
                planData.parcels[0]?.name || planData.basic.name
              "
              :parcels="planData.parcels"
              :plan-type="planData.basic.type"
              :legs="computationResult?.legs || []"
              @update:model-value="onDrawingUpdate"
              @complete="completeDrawing"
            />
            <!-- Step 5: Embellishment -->
            <StepEmbellishment
              v-else-if="currentStep === 5"
              :model-value="embellishmentModel"
              :loading="submittingEmbellishment"
              @update:model-value="onEmbellishmentUpdate"
              @complete="completeEmbellishment"
            />
            <!-- Step 6: Report -->
            <StepReport
              v-else-if="currentStep === 6"
              :model-value="reportModel"
              :basic="planData.basic"
              :coordinates-count="planData.coordinates.length"
              :parcels-count="planData.parcels.length"
              @update:model-value="onReportUpdate"
              @cancel="navigateTo(`/project/${projectId}`)"
              @finish="finishPlan"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RiArrowLeftLine } from "@remixicon/vue";
import StepCoordinates from "~/components/plan/steps/StepCoordinates.vue";
import StepTopoPoints from "~/components/plan/steps/StepTopoPoints.vue";
import StepTopoSettings from "~/components/plan/steps/StepTopoSettings.vue";
import StepParcels from "~/components/plan/steps/StepParcels.vue";
import StepElevation from "~/components/plan/steps/StepElevation.vue";
import StepLongitudinal from "~/components/plan/steps/StepLongitudinal.vue";
import StepComputation from "~/components/plan/steps/StepComputation.vue";
import StepDrawing from "~/components/plan/steps/StepDrawing.vue";
import StepLayout from "~/components/plan/steps/StepLayout.vue";
import StepEmbellishment from "~/components/plan/steps/StepEmbellishment.vue";
import StepReport from "~/components/plan/steps/StepReport.vue";

definePageMeta({ middleware: ["auth"] });

import { ref, reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#imports";
import axios from "axios";

const route = useRoute();
const toast = useToast();

const projectId = route.params.id as string;
const planId = route.params.plan as string;
const submittingCoordinates = ref(false);
const submittingParcels = ref(false);
const submittingElevation = ref(false);
const submittingEmbellishment = ref(false);
const initialLoading = ref(true);

// Dynamic steps based on plan type
const steps = computed(() => {
  if (planData.basic.type === "topographic") {
    return [
      { key: "topo-boundary", title: "Topo Boundary" },
      { key: "topo-points", title: "Topo Points" },
      { key: "topo-settings", title: "Topo Settings" },
      { key: "embellishment", title: "Plan Embellishment" },
      { key: "report", title: "Report" },
    ];
  } else if (planData.basic.type === "route") {
    return [
      { key: "elevation", title: "Elevation Data" },
      { key: "longitudinal", title: "Longitudinal Profile" },
      { key: "embellishment", title: "Plan Embellishment" },
      { key: "report", title: "Report" },
    ];
  } else if (planData.basic.type === "layout") {
    return [
      { key: "coordinates", title: "Coordinate Table" },
      { key: "parcels", title: "Parcel Table" },
      { key: "computation", title: "Computations" },
      { key: "layout", title: "Layout Parameters" },
      { key: "embellishment", title: "Plan Embellishment" },
      { key: "report", title: "Report" },
    ];
  } else {
    return [
      { key: "coordinates", title: "Coordinate Table" },
      { key: "parcels", title: "Parcel Table" },
      { key: "computation", title: "Computations" },
      { key: "drawing", title: "Drawing" },
      { key: "embellishment", title: "Plan Embellishment" },
      { key: "report", title: "Report" },
    ];
  }
});

const currentStep = ref(1);
const completed = ref<Set<number>>(new Set());

// Aggregated plan data across steps
const planData = reactive({
  basic: { name: "", type: "" },
  coordinates: [] as any[],
  parcels: [] as any[],
  elevations: [] as any[],
  longitudinal: {
    horizontal_scale: 1.0,
    vertical_scale: 10,
    profile_origin: [0.0, 0.0] as [number, number],
    station_interval: 10,
    elevation_interval: 1,
    starting_chainage: 0.0,
  },
  drawing: { file: null as File | null, fileName: "" },
  layout: {
    main_road_width: 15.0,
    secondary_road_width: 12.0,
    access_road_width: 9.0,
    min_parcel_area: 450.0,
    max_parcel_area: 1000.0,
    min_parcel_width: 15.0,
    min_parcel_depth: 25.0,
    target_parcel_ratio: 1.5,
    subdivision_type: "grid",
    road_hierarchy: true,
    include_cul_de_sacs: true,
    include_green_spaces: true,
    green_space_percentage: 10.0,
    front_setback: 6.0,
    side_setback: 3.0,
    rear_setback: 3.0,
    corner_radius: 5.0,
    max_block_length: 200.0,
    max_block_width: 100.0,
  },
  embellishment: {
    name: "",
    font: "Arial",
    font_size: 2,
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
    beacon_size: 1,
    label_size: 1,
    page_size: "A4",
    page_orientation: "portrait",
    dxf_version: "R2018",
    footers: [],
    footer_size: 0.5,
  },
  report: { generate: true },
  // Topographic plan fields
  boundary: [] as any[],
  topoPoints: [] as any[],
  topoSettings: {} as any,
});

// Computation payload captured from StepComputation
const computationResult = ref<{ legs?: any[]; traverse?: any } | null>(null);

// Stable model-value wrappers to avoid recreating inline objects each render
const boundaryModel = computed(() => ({ coordinates: planData.boundary }));
const topoPointsModel = computed(() => ({ coordinates: planData.topoPoints }));
const topoSettingsModel = computed(() => ({ settings: planData.topoSettings }));
const embellishmentModel = computed(() => ({
  embellishment: planData.embellishment,
}));
const reportModel = computed(() => ({
  report: planData.report,
  embellishment: planData.embellishment,
}));

const coordinatesModel = computed(() => ({
  coordinates: planData.coordinates,
}));
const elevationsModel = computed(() => ({ elevations: planData.elevations }));
const longitudinalModel = computed(() => ({ params: planData.longitudinal }));
const parcelsModel = computed(() => ({ parcels: planData.parcels }));
const drawingModel = computed(() => ({ drawing: planData.drawing }));
const layoutModel = computed(() => ({ layout: planData.layout }));

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

      // Elevations: map API -> component shape
      if (Array.isArray(data.elevations)) {
        planData.elevations = data.elevations.map((e: any) => ({
          _key: crypto.randomUUID(),
          point: e.id ?? "",
          elevation: e.elevation ?? null,
          chainage: e.chainage ?? "",
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

      // Layout parameters: map API -> component shape
      if (data.layout_params) {
        planData.layout = {
          ...planData.layout,
          ...data.layout_params,
        };
      }

      // Longitudinal profile parameters: map API -> component shape
      if (data.longitudinal_profile_parameters) {
        const lpp = data.longitudinal_profile_parameters;
        planData.longitudinal = {
          horizontal_scale: lpp.horizontal_scale ?? 1.0,
          vertical_scale: lpp.vertical_scale ?? 10,
          profile_origin: Array.isArray(lpp.profile_origin)
            ? [lpp.profile_origin[0] ?? 0, lpp.profile_origin[1] ?? 0]
            : [0, 0],
          station_interval: lpp.station_interval ?? 10,
          elevation_interval: lpp.elevation_interval ?? 1,
          starting_chainage: lpp.starting_chainage ?? 0.0,
        };
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
          beacon_size: emb.beacon_size ?? planData.embellishment.beacon_size,
          label_size: emb.label_size ?? planData.embellishment.label_size,
          personel_name:
            emb.personel_name ?? planData.embellishment.personel_name,
          surveyor_name:
            emb.surveyor_name ?? planData.embellishment.surveyor_name,
          page_size: emb.page_size ?? planData.embellishment.page_size,
          page_orientation:
            emb.page_orientation ?? planData.embellishment.page_orientation,
          dxf_version: emb.dxf_version ?? planData.embellishment.dxf_version,
          footers: Array.isArray(emb.footers)
            ? emb.footers
            : planData.embellishment.footers,
          footer_size: emb.footer_size ?? planData.embellishment.footer_size,
        };
      }

      // If this is a topographic plan, map topographic-specific data
      if (planData.basic.type === "topographic") {
        // boundary comes from topographic_boundary.coordinates
        if (
          data.topographic_boundary &&
          Array.isArray(data.topographic_boundary.coordinates)
        ) {
          planData.boundary = data.topographic_boundary.coordinates.map(
            (c: any) => ({
              _key: crypto.randomUUID(),
              point: c.id ?? "",
              northing: c.northing ?? null,
              easting: c.easting ?? null,
              elevation: c.elevation ?? null,
            })
          );
        }

        // topo points come from the main coordinates array
        if (Array.isArray(data.coordinates)) {
          planData.topoPoints = data.coordinates.map((c: any) => ({
            _key: crypto.randomUUID(),
            point: c.id ?? "",
            northing: c.northing ?? null,
            easting: c.easting ?? null,
            elevation: c.elevation ?? null,
          }));
        }

        // settings
        if (data.topographic_setting) {
          planData.topoSettings = { ...data.topographic_setting };
        }

        // Auto-progress for topographic flow: boundary is always completed (optional)
        // Only check for topo points and settings to determine current step
        const hasBoundary = planData.boundary.length > 0;
        const hasTopoPoints = planData.topoPoints.length > 0;
        const hasTopoSettings = Object.keys(planData.topoSettings).length > 0;

        // Boundary step is always considered completed since it's optional
        completed.value.add(1);

        if (hasTopoPoints) completed.value.add(2);
        if (hasTopoSettings) completed.value.add(3);

        if (!hasTopoPoints) {
          currentStep.value = 2;
          return;
        }

        // Determine current step based on what's been completed
        if (hasTopoSettings) {
          currentStep.value = 4; // embellishment
        } else if (hasTopoPoints) {
          currentStep.value = 3; // topo settings
        } else {
          currentStep.value = 2; // topo points (since boundary is optional)
        }

        // Skip the rest of auto-progress logic for other plan types
      } else {
        // Auto-progress steps if data exists (non-topographic)
        const hasCoords = planData.coordinates.length > 0;
        const hasParcels = planData.parcels.length > 0;
        const hasElevations = planData.elevations.length > 0;

        if (planData.basic.type === "route") {
          // Route survey flow: elevation -> longitudinal -> embellishment -> report
          const hasLongitudinal = Object.keys(data.longitudinal_profile_parameters || {}).length > 0;
          
          if (hasElevations) {
            completed.value.add(1); // elevation is step 1
          }
          if (hasLongitudinal) {
            completed.value.add(2); // longitudinal is step 2
          }
          
          if (hasLongitudinal) {
            currentStep.value = 3; // embellishment
          } else if (hasElevations) {
            currentStep.value = 2; // longitudinal
          } else {
            currentStep.value = 1; // start at elevation
          }
        } else if (planData.basic.type === "layout") {
          // Layout survey flow: coordinates -> parcels -> computation -> layout
          if (hasCoords) {
            completed.value.add(1);
          }
          // Layout survey flow: coordinates -> parcels -> computation -> layout
          const hasLayout = Object.keys(data.layout_params || {}).length > 0;
          
          if (hasParcels) {
            completed.value.add(2);
          }
          if (hasLayout) {
            completed.value.add(4);
          }
          
          if (hasLayout) {
            currentStep.value = 5; // embellishment
          } else if (hasCoords && hasParcels) {
            currentStep.value = 3; // computation
          } else if (hasCoords) {
            currentStep.value = 2; // parcels
          } else {
            currentStep.value = 1; // coordinates
          }
        } else {
          // Cadastral survey flow: coordinates -> parcels -> computation -> drawing
          if (hasCoords) {
            completed.value.add(1);
          }
          if (hasParcels) {
            completed.value.add(2);
          }
          if (hasCoords && hasParcels) {
            currentStep.value = 3; // computation
          } else if (hasCoords) {
            currentStep.value = 2; // parcels
          } else {
            currentStep.value = 1; // coordinates
          }
        }
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

// Elevation handling (for route surveys)
async function completeElevation() {
  // For route plans, elevation is step 1
  markCompleted(1);
  currentStep.value = 2; // move to longitudinal profile
}

// Longitudinal profile handling (for route surveys)
async function completeLongitudinal() {
  // For route plans, longitudinal is step 2
  markCompleted(2);
  currentStep.value = 3; // move to embellishment
}

// Topo Boundary handling (for topographic plans)
async function completeTopoBoundary() {
  if (submittingCoordinates.value) return;
  try {
    submittingCoordinates.value = true;
    const payload = {
      coordinates: planData.boundary.map((r: any) => ({
        id: r.point,
        northing: r.northing != null ? Number(r.northing) : 0,
        easting: r.easting != null ? Number(r.easting) : 0,
        elevation: r.elevation != null ? Number(r.elevation) : 0,
      })),
    };
    await axios.put(`/plan/topo/boundary/edit/${planId}`, payload);
    markCompleted(1);
    currentStep.value = 2;
    toast.add({ title: "Topo boundary saved", color: "success" });
  } catch (error) {
    toast.add({ title: "Failed to save topo boundary", color: "error" });
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
  // drawing is step 4 for cadastral/other plans (route no longer has drawing step)
  const drawingStep = 4;
  const nextStep = 5;
  markCompleted(drawingStep);
  currentStep.value = nextStep;
}

// Layout: save parameters and proceed
async function completeLayout() {
  if (submittingEmbellishment.value) return;
  try {
    submittingEmbellishment.value = true;
    const payload = {
      layout_params: { ...planData.layout },
    };
    await axios.put(`/plan/layout/edit/${planId}`, payload);
    markCompleted(4);
    currentStep.value = 5;
    toast.add({ title: "Layout parameters saved", color: "success" });
  } catch (error) {
    toast.add({ title: "Failed to save layout parameters", color: "error" });
  } finally {
    submittingEmbellishment.value = false;
  }
}

// Computation step complete: mark and proceed to next step
function completeComputation() {
  // computation step index is 3 for cadastral/layout plans (route no longer has computation)
  const computationStep = 3;
  const nextStep = 4;
  markCompleted(computationStep);
  currentStep.value = nextStep;
}

function onComputationComplete(
  payload: { legs?: any[]; traverse?: any } | null
) {
  computationResult.value = payload || null;
  // mark and move to drawing
  completeComputation();
}

// Called when Topo Points step completes (saved)
function onTopoPointsSaved() {
  // mark topo points completed (step 2)
  markCompleted(2);
  // move to topo settings (step 3)
  currentStep.value = 3;
}

// Called when Topo Settings step completes (saved)
function onTopoSettingsSaved() {
  // mark topo settings completed (step 3)
  markCompleted(3);
  // move to embellishment (step 4)
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
      font_size: Number(e.font_size ?? 1),
      title: e.title,
      address: e.address,
      local_govt: e.local_govt,
      state: e.state,
      plan_number: e.plan_number,
      origin: e.origin,
      scale: Number(e.scale ?? 1),
      beacon_type: e.beacon_type,
      beacon_size: Number(e.beacon_size ?? 0.75),
      label_size: Number(e.label_size ?? 0.25),
      personel_name: e.personel_name,
      surveyor_name: e.surveyor_name,
      page_size: e.page_size ?? "A4",
      page_orientation: e.page_orientation ?? "portrait",
      dxf_version: e.dxf_version ?? "R2018",
      footers: Array.isArray(e.footers) ? e.footers : [],
      footer_size: Number(e.footer_size ?? 1),
    };
    await axios.put(`/plan/edit/${planId}`, payload);
    // embellishment step index: topographic=4, route=3, layout/cadastral=5
    const embellishmentStep = 
      planData.basic.type === "topographic" ? 4 : 
      planData.basic.type === "route" ? 3 : 5;
    const nextStep = 
      planData.basic.type === "topographic" ? 5 : 
      planData.basic.type === "route" ? 4 : 6;
    markCompleted(embellishmentStep);
    currentStep.value = nextStep;
    toast.add({ title: "Embellishment saved", color: "success" });
  } catch (error) {
    toast.add({ title: "Failed to save embellishment", color: "error" });
  } finally {
    submittingEmbellishment.value = false;
  }
}

// Final Step
function finishPlan() {
  // final step index: topographic=5, route=4, others=6
  const finalStep = 
    planData.basic.type === "topographic" ? 5 : 
    planData.basic.type === "route" ? 4 : 6;
  markCompleted(finalStep);
  navigateTo(`/project/${projectId}/plan/${planId}`);
}

// Update handlers to avoid implicit any in template
type CoordinatesUpdate = { coordinates: any[] };
type ParcelsUpdate = { parcels: any[] };
type ElevationUpdate = { elevations: any[] };
type LongitudinalUpdate = {
  params: {
    horizontal_scale: number;
    vertical_scale: number;
    profile_origin: [number, number];
    station_interval: number;
    elevation_interval: number;
    starting_chainage: number;
  };
};
type DrawingUpdate = { drawing: Record<string, any> };
type LayoutUpdate = {
  layout: {
    main_road_width: number;
    secondary_road_width: number;
    access_road_width: number;
    min_parcel_area: number;
    max_parcel_area: number;
    min_parcel_width: number;
    min_parcel_depth: number;
    target_parcel_ratio: number;
    subdivision_type: string;
    road_hierarchy: boolean;
    include_cul_de_sacs: boolean;
    include_green_spaces: boolean;
    green_space_percentage: number;
    front_setback: number;
    side_setback: number;
    rear_setback: number;
    corner_radius: number;
    max_block_length: number;
    max_block_width: number;
  };
};
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
    dxf_version: string;
    footers: string[];
    footer_size: number;
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
    dxf_version: string;
    footers: string[];
    footer_size: number;
  };
};

function onCoordinatesUpdate(v: CoordinatesUpdate) {
  planData.coordinates = v.coordinates;
}
function onParcelsUpdate(v: ParcelsUpdate) {
  planData.parcels = v.parcels;
}
function onElevationUpdate(v: ElevationUpdate) {
  planData.elevations = v.elevations;
}
function onLongitudinalUpdate(v: LongitudinalUpdate) {
  Object.assign(planData.longitudinal, v.params);
}
function onDrawingUpdate(v: DrawingUpdate) {
  Object.assign(planData.drawing, v.drawing);
}
function onLayoutUpdate(v: LayoutUpdate) {
  Object.assign(planData.layout, v.layout);
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
