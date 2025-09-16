<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50" @click="$emit('close')"></div>
    
    <div class="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-[95vw] w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Traverse Computation Results
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Detailed traverse calculation results with coordinates and corrections
          </p>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-auto max-h-[calc(90vh-200px)]">
        <!-- Summary Info -->
        <div v-if="traverseInfo" class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Distance</div>
            <div class="text-lg font-semibold text-blue-900 dark:text-blue-100">
              {{ traverseInfo.totalDistance }} m
            </div>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div class="text-sm font-medium text-green-600 dark:text-green-400">Number of Stations</div>
            <div class="text-lg font-semibold text-green-900 dark:text-green-100">
              {{ traverseInfo.stations }}
            </div>
          </div>
          <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <div class="text-sm font-medium text-amber-600 dark:text-amber-400">Closure Error</div>
            <div class="text-lg font-semibold text-amber-900 dark:text-amber-100">
              {{ traverseInfo.closureError }} m
            </div>
          </div>
        </div>

        <!-- Main Results Table -->
        <div class="overflow-x-auto border border-gray-200 dark:border-slate-600 rounded-lg">
          <table class="w-full text-xs">
            <thead class="bg-gray-50 dark:bg-slate-700">
              <tr class="border-b border-gray-200 dark:border-slate-600">
                <th rowspan="2" class="px-2 py-3 text-left font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Stn
                </th>
                <th rowspan="2" class="px-2 py-3 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Observed<br>Angle
                </th>
                <th rowspan="2" class="px-2 py-3 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Corr. for<br>Bearing
                </th>
                <th rowspan="2" class="px-2 py-3 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Corrected<br>Bearing
                </th>
                <th rowspan="2" class="px-2 py-3 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Distance<br>(m)
                </th>
                <th colspan="4" class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Co-ordinates
                </th>
                <th colspan="2" class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Uncorrected Co-ordinates
                </th>
                <th colspan="2" class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Corrections
                </th>
                <th colspan="2" class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                  Final Co-ordinates
                </th>
              </tr>
              <tr class="border-b border-gray-200 dark:border-slate-600">
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  N
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  S
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  E
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  W
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Northing
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Easting
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  dN
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  dE
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-600">
                  Northing
                </th>
                <th class="px-2 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                  Easting
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(leg, index) in computationData"
                :key="index"
                class="border-b border-gray-100 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <!-- Station -->
                <td class="px-2 py-2 text-center font-medium border-r border-gray-200 dark:border-slate-600">
                  {{ leg.from.id }}
                </td>
                
                <!-- Observed Angle (Combined) -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.observed_angle ? `${leg.observed_angle.degrees}°${leg.observed_angle.minutes}'${leg.observed_angle.seconds}"` : '-' }}
                </td>
                
                <!-- Bearing Correction (Combined) -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.bearing_correction ? `${leg.bearing_correction.degrees}°${leg.bearing_correction.minutes}'${leg.bearing_correction.seconds}"` : '-' }}
                </td>
                
                <!-- Corrected Bearing (Combined) -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.forward_bearing ? `${leg.forward_bearing.degrees}°${leg.forward_bearing.minutes}'${leg.forward_bearing.seconds}"` : `${leg.bearing.degrees}°${leg.bearing.minutes}'${leg.bearing.seconds}"` }}
                </td>
                
                <!-- Distance -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.distance.toFixed(3) }}
                </td>
                
                <!-- Co-ordinates N -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.delta_northing > 0 ? leg.delta_northing.toFixed(3) : '' }}
                </td>
                
                <!-- Co-ordinates S -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.delta_northing < 0 ? Math.abs(leg.delta_northing).toFixed(3) : '' }}
                </td>
                
                <!-- Co-ordinates E -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.delta_easting > 0 ? leg.delta_easting.toFixed(3) : '' }}
                </td>
                
                <!-- Co-ordinates W -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.delta_easting < 0 ? Math.abs(leg.delta_easting).toFixed(3) : '' }}
                </td>
                
                <!-- Uncorrected Northing -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ (leg.from.northing + leg.delta_northing).toFixed(3) }}
                </td>
                
                <!-- Uncorrected Easting -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ (leg.from.easting + leg.delta_easting).toFixed(3) }}
                </td>
                
                <!-- Correction dN -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.northing_misclosure ? leg.northing_misclosure.toFixed(6) : '0.000000' }}
                </td>
                
                <!-- Correction dE -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.easting_misclosure ? leg.easting_misclosure.toFixed(6) : '0.000000' }}
                </td>
                
                <!-- Final Northing -->
                <td class="px-2 py-2 text-center border-r border-gray-200 dark:border-slate-600">
                  {{ leg.to.northing.toFixed(3) }}
                </td>
                
                <!-- Final Easting -->
                <td class="px-2 py-2 text-center">
                  {{ leg.to.easting.toFixed(3) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Closure Information -->
        <div v-if="closureInfo" class="mt-6 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 class="font-semibold text-amber-800 dark:text-amber-200 mb-3">
            Traverse Closure Analysis
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div class="flex justify-between">
                <span class="text-amber-700 dark:text-amber-300">Sum of Northings:</span>
                <span class="font-medium">{{ closureInfo.sumNorthings.toFixed(6) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-amber-700 dark:text-amber-300">Sum of Eastings:</span>
                <span class="font-medium">{{ closureInfo.sumEastings.toFixed(6) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-amber-700 dark:text-amber-300">Linear Closure Error:</span>
                <span class="font-medium">{{ closureInfo.linearError.toFixed(6) }} m</span>
              </div>
            </div>
            <div>
              <div class="flex justify-between">
                <span class="text-amber-700 dark:text-amber-300">Relative Precision:</span>
                <span class="font-medium">1:{{ closureInfo.relativePrecision }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-amber-700 dark:text-amber-300">Bearing of Error:</span>
                <span class="font-medium">{{ closureInfo.bearingOfError }}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-slate-600">
        <button
          @click="exportToCSV"
          class="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          Export CSV
        </button>
        <button
          @click="saveCoordinates"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save Coordinates
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface TraverseResults {
  traverse_legs: Array<{
    from: {
      id: string;
      northing: number;
      easting: number;
    };
    to: {
      id: string;
      northing: number;
      easting: number;
    };
    distance: number;
    bearing: {
      degrees: number;
      minutes: number;
      seconds: number;
      decimal: number;
    };
    delta_northing: number;
    delta_easting: number;
    arithmetic_sum_northing?: number;
    arithmetic_sum_easting?: number;
    northing_misclosure?: number;
    easting_misclosure?: number;
    observed_angle?: {
      degrees: number;
      minutes: number;
      seconds: number;
    };
    back_bearing?: {
      degrees: number;
      minutes: number;
      seconds: number;
      decimal: number;
    };
    forward_bearing?: {
      degrees: number;
      minutes: number;
      seconds: number;
      decimal: number;
    };
    bearing_correction?: {
      degrees: number;
      minutes: number;
      seconds: number;
      decimal: number;
    };
  }>;
}

const props = defineProps<{
  show: boolean;
  results: TraverseResults | null;
}>();

const emit = defineEmits<{
  close: [];
  'save-coordinates': [coordinates: Array<{
    point: string;
    easting: number;
    northing: number;
    elevation: number | null;
  }>];
}>();

const computationData = computed(() => {
  if (!props.results?.traverse_legs) return [];
  return props.results.traverse_legs;
});

const traverseInfo = computed(() => {
  if (!props.results?.traverse_legs) return null;
  
  const legs = props.results.traverse_legs;
  const totalDistance = legs.reduce((sum, leg) => sum + leg.distance, 0);
  const lastLeg = legs[legs.length - 1];
  const closureError = lastLeg ? Math.sqrt(
    Math.pow(lastLeg.northing_misclosure || 0, 2) + 
    Math.pow(lastLeg.easting_misclosure || 0, 2)
  ) : 0;
  
  return {
    totalDistance: totalDistance.toFixed(3),
    stations: legs.length,
    closureError: closureError.toFixed(6),
  };
});

const closureInfo = computed(() => {
  if (!props.results?.traverse_legs) return null;
  
  const legs = props.results.traverse_legs;
  const lastLeg = legs[legs.length - 1];
  
  if (!lastLeg || !lastLeg.northing_misclosure || !lastLeg.easting_misclosure) return null;
  
  const totalDistance = legs.reduce((sum, leg) => sum + leg.distance, 0);
  const linearError = Math.sqrt(
    Math.pow(lastLeg.northing_misclosure, 2) + 
    Math.pow(lastLeg.easting_misclosure, 2)
  );
  
  const relativePrecision = Math.round(totalDistance / linearError);
  const bearingOfError = Math.atan2(lastLeg.easting_misclosure, lastLeg.northing_misclosure) * (180 / Math.PI);
  
  return {
    sumNorthings: lastLeg.northing_misclosure,
    sumEastings: lastLeg.easting_misclosure,
    linearError: linearError,
    relativePrecision: relativePrecision.toString(),
    bearingOfError: bearingOfError.toFixed(2),
  };
});

function exportToCSV() {
  if (!props.results?.traverse_legs) return;

  const headers = [
    'From_Station',
    'To_Station',
    'Observed_Angle_Deg',
    'Observed_Angle_Min',
    'Observed_Angle_Sec',
    'Bearing_Correction_Deg',
    'Bearing_Correction_Min',
    'Bearing_Correction_Sec',
    'Forward_Bearing_Deg',
    'Forward_Bearing_Min',
    'Forward_Bearing_Sec',
    'Distance',
    'Delta_Northing',
    'Delta_Easting',
    'Uncorrected_Northing',
    'Uncorrected_Easting',
    'Northing_Misclosure',
    'Easting_Misclosure',
    'Final_Northing',
    'Final_Easting'
  ];

  const rows = props.results.traverse_legs.map((leg) => [
    leg.from.id,
    leg.to.id,
    leg.observed_angle?.degrees || '',
    leg.observed_angle?.minutes || '',
    leg.observed_angle?.seconds || '',
    leg.bearing_correction?.degrees || '',
    leg.bearing_correction?.minutes || '',
    leg.bearing_correction?.seconds || '',
    leg.forward_bearing?.degrees || leg.bearing.degrees,
    leg.forward_bearing?.minutes || leg.bearing.minutes,
    leg.forward_bearing?.seconds || leg.bearing.seconds,
    leg.distance.toFixed(3),
    leg.delta_northing.toFixed(3),
    leg.delta_easting.toFixed(3),
    (leg.from.northing + leg.delta_northing).toFixed(3),
    (leg.from.easting + leg.delta_easting).toFixed(3),
    leg.northing_misclosure?.toFixed(6) || '0.000000',
    leg.easting_misclosure?.toFixed(6) || '0.000000',
    leg.to.northing.toFixed(3),
    leg.to.easting.toFixed(3)
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'traverse_computation_results.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function saveCoordinates() {
  if (!props.results?.traverse_legs) return;

  const coordinates = props.results.traverse_legs.map((leg) => ({
    point: leg.to.id,
    easting: leg.to.easting,
    northing: leg.to.northing,
    elevation: null as number | null,
  }));

  emit('save-coordinates', coordinates);
}
</script>
