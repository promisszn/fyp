<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <div
      class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700"
      >
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
          Forward Computation Results
        </h2>
        <div class="flex items-center space-x-3">
          <button
            @click="downloadResults"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Download CSV
          </button>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Content -->
      <div class="p-6 overflow-auto max-h-[calc(90vh-120px)]">
        <div class="overflow-x-auto">
          <table
            class="w-full border-collapse border border-gray-300 dark:border-slate-600"
          >
            <thead>
              <tr class="bg-gray-100 dark:bg-slate-700">
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  From Station
                </th>
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  Bearing
                </th>
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  Distance(m)
                </th>
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  ΔN(m)
                </th>
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  ΔE(m)
                </th>
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  Northing(m)
                </th>
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  Easting(m)
                </th>
                <th
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
                >
                  To Station
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Start Station Row -->
              <tr
                v-if="startInfo"
                class="bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
              >
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  <!-- Empty -->
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  <!-- Empty -->
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  <!-- Empty -->
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  <!-- Empty -->
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  <!-- Empty -->
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ startInfo.northing }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ startInfo.easting }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ startInfo.id }}
                </td>
              </tr>

              <!-- Computation Results -->
              <tr
                v-for="(result, index) in formattedResults"
                :key="index"
                class="hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.fromStation }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.bearing }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.distance }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.deltaN }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.deltaE }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.northing }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.easting }}
                </td>
                <td
                  class="border border-gray-300 dark:border-slate-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                >
                  {{ result.toStation }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary Information -->
        <div
          v-if="traverseInfo"
          class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <h3 class="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Traverse Summary
          </h3>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm"
          >
            <div>
              <span class="font-medium">Total Distance:</span>
              <span class="ml-2">{{ traverseInfo.totalDistance }} m</span>
            </div>
            <div>
              <span class="font-medium">Min Northing:</span>
              <span class="ml-2">{{ traverseInfo.minNorthing }} m</span>
            </div>
            <div>
              <span class="font-medium">Max Northing:</span>
              <span class="ml-2">{{ traverseInfo.maxNorthing }} m</span>
            </div>
            <div>
              <span class="font-medium">Min Easting:</span>
              <span class="ml-2">{{ traverseInfo.minEasting }} m</span>
            </div>
            <div>
              <span class="font-medium">Max Easting:</span>
              <span class="ml-2">{{ traverseInfo.maxEasting }} m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface BearingData {
  degrees: number;
  minutes: number;
  seconds: number;
}

interface Point {
  id: string;
  northing: number;
  easting: number;
}

interface ComputedLeg {
  from: Point;
  to: Point;
  distance: number;
  bearing: BearingData;
  delta_northing: number;
  delta_easting: number;
  arithmetic_sum_northing: number;
  arithmetic_sum_easting: number;
}

interface TraverseData {
  total_distance: number;
  bounding_box: {
    min_northing: number;
    max_northing: number;
    min_easting: number;
    max_easting: number;
  };
}

interface ResultsData {
  start: Point;
  computed_legs: ComputedLeg[];
  traverse: TraverseData;
}

interface Props {
  show: boolean;
  results: ResultsData | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

// Computed properties
const formattedResults = computed(() => {
  if (!props.results?.computed_legs) {
    return [];
  }

  return props.results.computed_legs.map((leg: ComputedLeg) => ({
    fromStation: leg.from.id,
    bearing: formatBearing(leg.bearing),
    distance: leg.distance.toFixed(3),
    deltaN: leg.delta_northing.toFixed(3),
    deltaE: leg.delta_easting.toFixed(3),
    northing: leg.to.northing.toFixed(3),
    easting: leg.to.easting.toFixed(3),
    toStation: leg.to.id,
  }));
});

const traverseInfo = computed(() => {
  if (!props.results?.traverse) {
    return null;
  }

  const traverse = props.results.traverse;
  return {
    totalDistance: traverse.total_distance.toFixed(3),
    minNorthing: traverse.bounding_box.min_northing.toFixed(3),
    maxNorthing: traverse.bounding_box.max_northing.toFixed(3),
    minEasting: traverse.bounding_box.min_easting.toFixed(3),
    maxEasting: traverse.bounding_box.max_easting.toFixed(3),
  };
});

const startInfo = computed(() => {
  if (!props.results?.start) {
    return null;
  }

  return {
    id: props.results.start.id,
    northing: props.results.start.northing.toFixed(3),
    easting: props.results.start.easting.toFixed(3),
  };
});

// Methods
const formatBearing = (bearing: BearingData): string => {
  if (!bearing) return "N/A";

  const deg = bearing.degrees || 0;
  const min = bearing.minutes || 0;
  const sec = bearing.seconds || 0;
  return `${deg}° ${min}' ${sec}"`;
};

const closeModal = () => {
  emit("close");
};

const downloadResults = () => {
  if (!formattedResults.value.length && !startInfo.value) return;

  // Create CSV content
  const headers = [
    "From Station",
    "Degrees",
    "Minutes(')",
    'Seconds(")',
    "Distance (m)",
    "Latitude (m)",
    "Departure (m)",
    "Northing (m)",
    "Easting (m)",
    "To Station",
  ];

  const csvRows = [headers.join(",")];

  // Add start station row if available
  if (startInfo.value) {
    csvRows.push(
      [
        "", // From Station - empty
        "", // Bearing Degrees - empty
        "", // Bearing Minutes - empty
        "", // Bearing Seconds - empty
        "", // Distance - empty
        "", // ΔN - empty
        "", // ΔE - empty
        startInfo.value.northing, // Northing
        startInfo.value.easting, // Easting
        startInfo.value.id, // To Station
      ].join(",")
    );
  }

  // Add computation results
  csvRows.push(
    ...(props.results?.computed_legs.map((leg: ComputedLeg) =>
      [
        leg.from.id, // From Station
        leg.bearing.degrees || 0, // Bearing Degrees
        leg.bearing.minutes || 0, // Bearing Minutes
        leg.bearing.seconds || 0, // Bearing Seconds
        leg.distance, // Distance
        leg.delta_northing, // ΔN
        leg.delta_easting, // ΔE
        leg.to.northing, // Northing
        leg.to.easting, // Easting
        leg.to.id, // To Station
      ].join(",")
    ) || [])
  );

  // Add traverse summary
  if (traverseInfo.value && startInfo.value) {
    csvRows.push("");
    csvRows.push("Traverse Summary");
    csvRows.push(`Total Distance (m),${traverseInfo.value.totalDistance}`);
    csvRows.push(`Min Northing (m),${traverseInfo.value.minNorthing}`);
    csvRows.push(`Max Northing (m),${traverseInfo.value.maxNorthing}`);
    csvRows.push(`Min Easting (m),${traverseInfo.value.minEasting}`);
    csvRows.push(`Max Easting (m),${traverseInfo.value.maxEasting}`);
  }

  const csvContent = csvRows.join("\n");

  // Download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `forward_computation_results_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>
