<template>
  <UserHeader />

  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back -->
      <div class="mb-4">
        <button
          @click="navigateTo(`/project/${projectId}/plan/${planId}/edit`)"
          class="inline-flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <RiArrowLeftLine class="w-4 h-4" />
          Back to Plan Edit
        </button>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Forward Computation
      </h1>

      <!-- Known Coordinates Table -->
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Known Coordinates
          </h2>
          <button
            @click="addCoordinate"
            :disabled="isLoading"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Add Point
          </button>
        </div>

        <div class="overflow-x-auto">
          <!-- Loading Skeleton -->
          <div v-if="isLoading" class="space-y-4">
            <div class="animate-pulse">
              <div class="h-4 bg-gray-200 dark:bg-slate-600 rounded mb-2"></div>
              <div class="space-y-2">
                <div class="h-12 bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div class="h-12 bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div class="h-12 bg-gray-200 dark:bg-slate-600 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Actual Table -->
          <table v-else class="w-full border-collapse">
            <thead>
              <tr class="border-b border-gray-200 dark:border-slate-700">
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Start
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Point ID
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Northing(mN)
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Easting(mE)
                </th>
                <th
                  class="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(coord, index) in coordinates"
                :key="index"
                class="border-b border-gray-100 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td class="py-3 px-4">
                  <input
                    type="radio"
                    name="startPoint"
                    v-model="selectedStartPoint"
                    :disabled="!coord.id"
                    :value="coord.id"
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model="coord.id"
                    type="text"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="A"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model.number="coord.northing"
                    type="number"
                    step="0.001"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="713275.432"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model.number="coord.easting"
                    type="number"
                    step="0.001"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="559945.971"
                  />
                </td>
                <td class="py-3 px-4 text-center">
                  <button
                    @click="removeCoordinate(index)"
                    class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <RiDeleteBinLine class="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr v-if="coordinates.length === 0">
                <td
                  colspan="5"
                  class="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No coordinates added yet. Click "Add Point" to start.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bearing and Distance Table -->
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Bearing and Distance
          </h2>
          <div class="flex items-center space-x-3">
            <button
              @click="addLeg"
              :disabled="isLoading"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Add Leg
            </button>
          </div>
        </div>

        <!-- File Upload Section -->
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md border border-green-200 dark:border-slate-700 bg-green-50/70 dark:bg-slate-800/50 mb-4"
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-green-600 dark:text-green-400"
            >
              <path
                d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 8.707 10.293L11 12.586V4a1 1 0 0 1 1-1z"
              />
              <path
                d="M4 15a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6v3h12v-3h-1a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4z"
              />
            </svg>
            <div>
              <div class="text-xs font-medium text-gray-800 dark:text-gray-200">
                Import bearing & distance data (CSV or TXT)
              </div>
              <div class="text-[11px] text-gray-600 dark:text-gray-400">
                Columns: From, To, Degrees, Minutes, Seconds, Distance(m)
              </div>
              <div class="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">
                Supports comma, tab, or space separated files with optional
                headers
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input
              ref="bearingFileInputRef"
              type="file"
              accept=".csv,.txt"
              @change="onBearingFile"
              class="hidden"
            />
            <button
              type="button"
              @click="triggerBearingFile"
              :disabled="isLoading"
              class="px-3 py-1.5 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Upload File
            </button>
            <button
              type="button"
              class="px-3 py-1.5 text-xs rounded border border-green-300 text-green-700 hover:bg-green-50 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700/60"
              @click="downloadBearingTemplate"
            >
              Download Template
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <!-- Loading Skeleton -->
          <div v-if="isLoading" class="space-y-4">
            <div class="animate-pulse">
              <div class="h-4 bg-gray-200 dark:bg-slate-600 rounded mb-2"></div>
              <div class="space-y-2">
                <div class="h-12 bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div class="h-12 bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div class="h-12 bg-gray-200 dark:bg-slate-600 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Actual Table -->
          <table v-else class="w-full border-collapse">
            <thead>
              <tr class="border-b border-gray-200 dark:border-slate-700">
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  From
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Bearing(°)
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Minutes(')
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Seconds(")
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Distance(m)
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  To
                </th>
                <th
                  class="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(leg, index) in legs"
                :key="index"
                class="border-b border-gray-100 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td class="py-3 px-4">
                  <input
                    v-model="leg.from.id"
                    type="text"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="A"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model.number="leg.bearing.degrees"
                    type="number"
                    min="0"
                    max="359"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="357"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model.number="leg.bearing.minutes"
                    type="number"
                    min="0"
                    max="59"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="41"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model.number="leg.bearing.seconds"
                    type="number"
                    min="0"
                    max="59"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model.number="leg.distance"
                    type="number"
                    step="0.01"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="17.18"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    v-model="leg.to.id"
                    type="text"
                    class="w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500"
                    placeholder="B"
                  />
                </td>
                <td class="py-3 px-4 text-center">
                  <button
                    @click="removeLeg(index)"
                    class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <RiDeleteBinLine class="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr v-if="legs.length === 0">
                <td
                  colspan="7"
                  class="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No legs added yet. Click "Add Leg" to start.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Options and Actions -->
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6"
      >
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <label class="flex items-center space-x-2">
              <input
                v-model="misclosureCorrection"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-gray-700 dark:text-gray-300"
                >Apply Misclosure Correction</span
              >
            </label>
          </div>

          <div class="flex space-x-3">
            <button
              @click="loadSampleData"
              :disabled="isLoading || isComputing"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Load Sample Data
            </button>
            <button
              @click="performComputation"
              :disabled="!canCompute || isComputing"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isComputing" class="flex items-center space-x-2">
                <svg
                  class="animate-spin h-4 w-4"
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
                <span>Computing...</span>
              </span>
              <span v-else>Compute</span>
            </button>
          </div>
        </div>

        <!-- Error Section -->
        <div
          v-if="computationError"
          class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <h3 class="font-semibold text-red-800 dark:text-red-300 mb-2">
            Error
          </h3>
          <p class="text-sm text-red-700 dark:text-red-300">
            {{ computationError }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Results Modal -->
  <ForwardComputationResultsModal
    :show="showResultsModal"
    :results="computationResults?.data || null"
    @close="closeModal"
    @save-coordinates="handleSaveCoordinates"
  />
</template>

<script lang="ts" setup>
import { RiArrowLeftLine, RiDeleteBinLine } from "@remixicon/vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#imports";
import { ref, computed, onMounted } from "vue";
import ForwardComputationResultsModal from "~/components/ForwardComputationResultsModal.vue";
import { useCoordinateTransfer } from "~/composables/useCoordinateTransfer";

definePageMeta({ middleware: ["auth"] });

const toast = useToast();
const route = useRoute();
const projectId = route.params.id as string;
const planId = route.params.plan as string;

// Reactive data
const coordinates = ref([
  {
    id: "",
    northing: 0,
    easting: 0,
  },
]);

const legs = ref([
  {
    from: { id: "" },
    to: { id: "" },
    bearing: {
      degrees: 0,
      minutes: 0,
      seconds: 0,
    },
    distance: 0,
  },
]);

const selectedStartPoint = ref<string | null>(null);
const misclosureCorrection = ref(true);
const computationResults = ref<any>(null);
const computationError = ref("");
const showResultsModal = ref(false);
const isLoading = ref(true);
const isComputing = ref(false);
const bearingFileInputRef = ref<HTMLInputElement | null>(null);

// Computed properties
const canCompute = computed(() => {
  const hasValidCoordinates =
    coordinates.value.length > 0 &&
    coordinates.value.some((coord) => coord.id && coord.id.trim() !== "");
  const hasValidLegs =
    legs.value.length > 0 &&
    legs.value.some((leg) => leg.from.id && leg.to.id && leg.distance > 0);
  const hasValidStartPoint =
    selectedStartPoint.value !== null &&
    selectedStartPoint.value !== "" &&
    coordinates.value.some((coord) => coord.id === selectedStartPoint.value);

  return hasValidCoordinates && hasValidLegs && hasValidStartPoint;
});

// Fetch plan data on component mount
const fetchPlanData = async () => {
  try {
    isLoading.value = true;
    const { $axios } = useNuxtApp();
    const response = await $axios.get(`/plan/fetch/${planId}`);

    if (response.data?.data?.forward_computation_data) {
      const forwardData = response.data.data.forward_computation_data;

      // Populate coordinates
      if (forwardData.coordinates && forwardData.coordinates.length > 0) {
        coordinates.value = forwardData.coordinates.map((coord: any) => ({
          id: coord.id,
          northing: coord.northing,
          easting: coord.easting,
        }));
      }

      // Populate legs
      if (forwardData.legs && forwardData.legs.length > 0) {
        legs.value = forwardData.legs.map((leg: any) => ({
          from: { id: leg.from.id },
          to: { id: leg.to.id },
          bearing: {
            degrees: leg.bearing.degrees,
            minutes: leg.bearing.minutes,
            seconds: leg.bearing.seconds,
          },
          distance: leg.distance,
        }));
      }

      // Set start point
      if (forwardData.start) {
        selectedStartPoint.value = forwardData.start.id;
      }

      // Set misclosure correction
      if (typeof forwardData.misclosure_correction === "boolean") {
        misclosureCorrection.value = forwardData.misclosure_correction;
      }
    }
  } catch (error) {
    console.error("Failed to fetch plan data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPlanData();
});

// Methods
const addCoordinate = () => {
  coordinates.value.push({
    id: "",
    northing: 0,
    easting: 0,
  });
  // Don't auto-select the new coordinate
};

const removeCoordinate = (index: number) => {
  if (coordinates.value.length > 1) {
    const removedCoord = coordinates.value[index];
    coordinates.value.splice(index, 1);

    // Reset selected start point if it was the removed coordinate
    if (removedCoord && selectedStartPoint.value === removedCoord.id) {
      selectedStartPoint.value = null;
    }
  } else if (coordinates.value.length === 1) {
    // If only one coordinate left, clear it but keep the array with one empty item
    coordinates.value[0] = { id: "", northing: 0, easting: 0 };
    selectedStartPoint.value = null;
  }
};

const addLeg = () => {
  const previousLeg = legs.value[legs.value.length - 1];
  const fromId = previousLeg && previousLeg.to.id ? previousLeg.to.id : "";

  legs.value.push({
    from: { id: fromId },
    to: { id: "" },
    bearing: {
      degrees: 0,
      minutes: 0,
      seconds: 0,
    },
    distance: 0,
  });
};

const removeLeg = (index: number) => {
  if (legs.value.length > 1) {
    legs.value.splice(index, 1);
  }
};

const loadSampleData = () => {
  coordinates.value = [
    {
      id: "A",
      northing: 713275.432,
      easting: 559945.971,
    },
  ];

  selectedStartPoint.value = "A";

  legs.value = [
    {
      from: { id: "A" },
      to: { id: "B" },
      bearing: {
        degrees: 357,
        minutes: 41,
        seconds: 0,
      },
      distance: 17.18,
    },
    {
      from: { id: "B" },
      to: { id: "C" },
      bearing: {
        degrees: 88,
        minutes: 30,
        seconds: 0,
      },
      distance: 39.51,
    },
    {
      from: { id: "C" },
      to: { id: "D" },
      bearing: {
        degrees: 179,
        minutes: 17,
        seconds: 0,
      },
      distance: 17.16,
    },
    {
      from: { id: "D" },
      to: { id: "A" },
      bearing: {
        degrees: 268,
        minutes: 28,
        seconds: 0,
      },
      distance: 39.03,
    },
  ];

  misclosureCorrection.value = true;
};

const closeModal = () => {
  showResultsModal.value = false;
};

const handleSaveCoordinates = async (
  coordinates: {
    point: string;
    easting: number;
    northing: number;
    elevation: number | null;
  }[]
) => {
  try {
    const { setTransferredCoordinates } = useCoordinateTransfer();

    // Store coordinates in the composable
    setTransferredCoordinates(coordinates);

    // Redirect to the edit page with coordinates step
    await navigateTo(
      `/project/${projectId}/plan/${planId}/edit?step=coordinates`
    );
  } catch (error: any) {
    console.error("Failed to prepare coordinate transfer:", error);
    toast.add({
      title: "Failed to prepare coordinate transfer. Please try again.",
      color: "error",
    });
  }
};

const performComputation = async () => {
  try {
    isComputing.value = true;
    computationError.value = "";
    computationResults.value = null;

    // Find the start coordinate
    const startCoord = coordinates.value.find(
      (coord) => coord.id === selectedStartPoint.value
    );
    if (!startCoord) {
      throw new Error("Selected start point not found in coordinates");
    }

    // Prepare the payload
    const payload = {
      coordinates: coordinates.value,
      start: {
        id: startCoord.id,
        northing: startCoord.northing,
        easting: startCoord.easting,
      },
      legs: legs.value,
      misclosure_correction: misclosureCorrection.value,
    };

    // Make API call to forward computation endpoint
    const { $axios } = useNuxtApp();
    const response = await $axios.post(
      "/traverse/forward-computation",
      payload
    );

    computationResults.value = response.data;

    // Save the forward computation data to the plan
    try {
      await $axios.put(`/plan/forward-data/edit/${planId}`, payload);
    } catch (saveError: any) {
      console.error("Failed to save forward computation data:", saveError);
      // Note: We don't show this error to the user as the computation was successful
      // The data is just not saved to the plan, but the results are still shown
    }

    showResultsModal.value = true; // Show the modal instead of just storing results
  } catch (error: any) {
    console.error("Forward computation error:", error);
    computationError.value =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during computation";
  } finally {
    isComputing.value = false;
  }
};

// File upload methods for bearing and distance data
const triggerBearingFile = () => {
  bearingFileInputRef.value?.click();
};

const parseBearingCSV = (text: string) => {
  // Handle both comma and whitespace separated values, including tabs
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !/^#/.test(l)); // Filter out comments starting with #

  if (!lines.length) return [];

  // Detect header - check if first line contains typical column names
  const header = (lines[0] ?? "").toLowerCase();
  const hasHeader = /from|to|deg|min|sec|dist|bear|point/i.test(header);
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const parsedLegs = [];
  for (const line of dataLines) {
    // Split by comma first, then by whitespace/tabs if no commas
    let cols;
    if (line.includes(",")) {
      cols = line.split(",").map((c) => c.trim());
    } else if (line.includes("\t")) {
      cols = line.split("\t").map((c) => c.trim());
    } else {
      cols = line.split(/\s+/).filter((c) => c.length > 0);
    }

    if (cols.length < 6) continue;

    const fromId = String(cols[0]).trim();
    const toId = String(cols[1]).trim();

    // Parse and validate degrees (0-359)
    const degrees = parseInt(String(cols[2]).trim()) || 0;
    const validDegrees = Math.max(0, Math.min(359, degrees));

    // Parse and validate minutes (0-59)
    const minutes = parseInt(String(cols[3]).trim()) || 0;
    const validMinutes = Math.max(0, Math.min(59, minutes));

    // Parse and validate seconds (0-59.999999)
    const seconds = parseFloat(String(cols[4]).trim()) || 0;
    const validSeconds = Math.max(0, Math.min(59.999999, seconds));

    // Parse distance (must be positive)
    const distance = parseFloat(String(cols[5]).trim()) || 0;
    const validDistance = Math.max(0, distance);

    // Only add if we have valid data
    if (fromId && toId && validDistance > 0) {
      parsedLegs.push({
        from: { id: fromId },
        to: { id: toId },
        bearing: {
          degrees: validDegrees,
          minutes: validMinutes,
          seconds: validSeconds,
        },
        distance: validDistance,
      });
    }
  }
  return parsedLegs;
};

const onBearingFile = (ev: Event) => {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  // Check file type
  const allowedTypes = [".csv", ".txt"];
  const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    toast.add({
      title: "Invalid file type. Please upload CSV, TXT",
      color: "error",
    });
    if (bearingFileInputRef.value) bearingFileInputRef.value.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const text = String(reader.result || "");
      const parsedLegs = parseBearingCSV(text);

      if (parsedLegs.length) {
        legs.value = parsedLegs;
        toast.add({
          title: `Successfully imported ${parsedLegs.length} bearing and distance entries`,
          color: "success",
        });
      } else {
        toast.add({
          title:
            "No valid data found in the file. Please check the format and try again.",
          color: "warning",
        });
      }
    } catch (error) {
      toast.add({
        title:
          "Error reading file. Please check the file format and try again.",
        color: "error",
      });
    }

    if (bearingFileInputRef.value) bearingFileInputRef.value.value = "";
  };

  reader.onerror = () => {
    toast.add({
      title: "Failed to read the file. Please try again.",
      color: "error",
    });
    if (bearingFileInputRef.value) bearingFileInputRef.value.value = "";
  };

  reader.readAsText(file);
};

const downloadBearingTemplate = () => {
  const csv = [
    "From,To,Degrees,Minutes,Seconds,Distance",
    "A,B,357,41,0,17.18",
    "B,C,88,30,0,39.51",
    "C,D,179,17,0,17.16",
    "D,A,268,28,0,39.03",
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bearing_distance_template.csv";
  a.click();
  URL.revokeObjectURL(url);
};
</script>
