<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Back Computation</h2>
      <div>
        <label class="text-sm mr-2">Parcel:</label>
        <select v-model="selectedIndex" class="border rounded px-2 py-1">
          <option
            v-for="(p, idx) in parcelsWithIndex"
            :key="p._key"
            :value="idx"
          >
            {{ p.name || `Parcel ${idx + 1}` }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="loadingLocal" class="animate-pulse space-y-3">
      <div class="h-4 bg-gray-200 rounded w-1/3"></div>
      <div class="h-8 bg-gray-200 rounded w-full"></div>
      <div class="h-8 bg-gray-200 rounded w-full"></div>
    </div>

    <div v-else>
      <div v-if="error" class="text-red-600">Failed to load computations.</div>

      <div v-if="traverse">
        <div class="overflow-x-auto">
          <table class="w-full table-auto border-collapse">
            <thead>
              <tr class="text-left">
                <th class="px-2 py-1">From</th>
                <th class="px-2 py-1">Δ Northing</th>
                <th class="px-2 py-1">Δ Easting</th>
                <th class="px-2 py-1">Distance (m)</th>
                <th class="px-2 py-1">Bearing (°)</th>
                <th class="px-2 py-1">To</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(leg, i) in legs" :key="i" class="border-t">
                <td class="px-2 py-1">{{ leg.from.id }}</td>
                <td class="px-2 py-1">{{ leg.delta_northing }}</td>
                <td class="px-2 py-1">{{ leg.delta_easting }}</td>
                <td class="px-2 py-1">{{ leg.distance }}</td>
                <td class="px-2 py-1">{{ leg.bearing?.decimal ?? "" }}</td>
                <td class="px-2 py-1">{{ leg.to.id }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3">
          <div>
            <strong>Total distance:</strong> {{ traverse.total_distance }} m
          </div>
          <div class="mt-1">
            <span class="mr-4"
              ><strong>Min Northing:</strong>
              {{ traverse.bounding_box?.min_northing }}</span
            >
            <span class="mr-4"
              ><strong>Max Northing:</strong>
              {{ traverse.bounding_box?.max_northing }}</span
            >
            <br />
            <span class="mr-4"
              ><strong>Min Easting:</strong>
              {{ traverse.bounding_box?.min_easting }}</span
            >
            <span
              ><strong>Max Easting:</strong>
              {{ traverse.bounding_box?.max_easting }}</span
            >
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded"
          @click="$emit('complete')"
        >
          Continue to Drawing
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  parcels: { type: Array as () => any[], required: true },
  coordinates: { type: Array as () => any[], required: true },
});

const selectedIndex = ref(0);
const loadingLocal = ref(false);
const error = ref(false);
const legs = ref<any[]>([]);
const traverse = ref<any | null>(null);

const parcelsWithIndex = computed(() => props.parcels || []);

function buildPayloadForParcel(parcel: any) {
  // Find points by ids in parcel.ids and map to {id, northing, easting}
  const ids = Array.isArray(parcel.ids) ? parcel.ids.filter(Boolean) : [];
  const points = ids
    .map((pid: string) => {
      const c = props.coordinates.find((cc: any) => cc.point === pid);
      if (c)
        return {
          id: pid,
          northing: Number(c.northing),
          easting: Number(c.easting),
        };
      return null;
    })
    .filter(Boolean);

  // If parcel has no ids, try to use all coordinates
  if (!points.length) {
    return {
      points: props.coordinates.map((c: any) => ({
        id: c.point,
        northing: Number(c.northing),
        easting: Number(c.easting),
      })),
    };
  }

  // Ensure closed polygon: repeat first point at end
  if (points.length && points[0].id !== points[points.length - 1].id) {
    points.push({ ...points[0] });
  }

  return { points };
}

async function fetchComputation() {
  error.value = false;
  legs.value = [];
  traverse.value = null;
  const parcel = parcelsWithIndex.value[selectedIndex.value] || { ids: [] };
  const payload = buildPayloadForParcel(parcel);
  if (!payload.points || !payload.points.length) {
    error.value = true;
    return;
  }

  try {
    loadingLocal.value = true;
    const res = await axios.post("/traverse/back-computation", payload);
    const data = res?.data?.data;
    legs.value = data?.traverse_legs || [];
    traverse.value = data?.traverse || null;
  } catch (e) {
    error.value = true;
  } finally {
    loadingLocal.value = false;
  }
}

watch(selectedIndex, () => {
  fetchComputation();
});

onMounted(() => {
  // auto-select first parcel and fetch
  if (parcelsWithIndex.value.length) {
    selectedIndex.value = 0;
    fetchComputation();
  }
});
</script>

<style scoped></style>
