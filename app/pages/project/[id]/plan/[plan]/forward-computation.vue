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
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Point
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
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
                  Northing(nM)
                </th>
                <th
                  class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  Easting(eM)
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
          <button
            @click="addLeg"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Leg
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
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
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Load Sample Data
            </button>
            <button
              @click="performComputation"
              :disabled="!canCompute"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Compute
            </button>
          </div>
        </div>

        <!-- Results Section -->
        <div
          v-if="computationResults"
          class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <h3 class="font-semibold text-green-800 dark:text-green-300 mb-2">
            Computation Results
          </h3>
          <pre
            class="text-sm text-green-700 dark:text-green-300 overflow-x-auto"
            >{{ JSON.stringify(computationResults, null, 2) }}</pre
          >
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
</template>

<script lang="ts" setup>
import { RiArrowLeftLine, RiDeleteBinLine } from "@remixicon/vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#imports";
import { ref, computed } from "vue";

definePageMeta({ middleware: ["auth"] });

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
const computationResults = ref(null);
const computationError = ref("");

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
  legs.value.push({
    from: { id: "" },
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

const performComputation = async () => {
  try {
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
  } catch (error: any) {
    console.error("Forward computation error:", error);
    computationError.value =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during computation";
  }
};
</script>
