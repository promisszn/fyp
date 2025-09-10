<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Drawing
    </h2>

    <!-- Parcel label selector (only shown when multiple options exist) -->
    <div v-if="parcelOptions.length > 1" class="flex items-center justify-end">
      <div class="mb-1">
        <label class="mr-2 text-xs text-gray-600 dark:text-gray-300">Parcel label</label>
        <select
          v-model="selectedParcelName"
          class="text-sm border rounded px-2 py-1 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
        >
          <option v-for="name in parcelOptions" :key="name" :value="name">{{ name }}</option>
        </select>
      </div>
    </div>

    <!-- Leaflet map (CRS.Simple) via @nuxtjs/leaflet -->
    <div class="rounded-md overflow-hidden border border-gray-200 dark:border-slate-600">
      <ClientOnly>
        <div class="relative w-full h-72">
          <div ref="mapEl" class="w-full h-full" />
          <div v-if="!latLngs.length" class="absolute inset-0 grid place-items-center text-sm text-gray-400">
            No coordinates to plot yet. Add coordinates in Step 1.
          </div>
        </div>
      </ClientOnly>
    </div>

    <div class="flex justify-end gap-3">
      <button
        @click="onComplete"
        class="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, shallowRef, nextTick } from "vue";

type CoordInput = {
  point: string;
  northing: number | null;
  easting: number | null;
  elevation?: number | null;
};

// Keep modelValue in props to avoid extraneous-attrs warnings from parent, but unused here.
const props = defineProps<{
  modelValue?: any;
  coordinates?: CoordInput[];
  parcelName?: string;
  parcels?: Array<{ name?: string; ids?: string[] }>; // optional list of parcels (used to filter coordinates by ids)
}>();
const emit = defineEmits(["complete"]);

// Prepare raw points (no scaling). We'll render with Leaflet using CRS.Simple.
const selectedParcel = computed(() => {
  const name = selectedParcelName.value?.trim();
  if (!name || !Array.isArray(props.parcels)) return null;
  return (
    props.parcels.find((p) => (p?.name || "").trim() === name) || null
  );
});

const filteredCoordinates = computed<CoordInput[]>(() => {
  const coords = props.coordinates || [];
  const ids = selectedParcel.value?.ids?.filter(Boolean) || [];
  if (!ids.length) return coords;
  const set = new Set(ids);
  const filtered = coords.filter((r) => r.point && set.has(r.point));
  // Fallback to all coords if filter yields none
  return filtered.length ? filtered : coords;
});

const rawPoints = computed(() => {
  const src = filteredCoordinates.value
    .filter((r) => r.northing != null && r.easting != null)
    .map((r) => ({
      key: r.point || `${r.easting},${r.northing}`,
      label: r.point || "",
      x: Number(r.easting),
      y: Number(r.northing),
    }));
  return src as Array<{ key: string; label: string; x: number; y: number }>;
});

// Leaflet map state (client-only)
const LRef = shallowRef<any>(null);
const mapEl = ref<HTMLElement | null>(null);
const mapRef = shallowRef<any>(null);
let polygonLayer: any | null = null;
let pointLayers: any[] = [];
let centroidMarker: any | null = null;

// Array of [lat, lng] pairs for polygon
const latLngs = computed<[number, number][]>(() => {
  return rawPoints.value.map((p) => [p.y, p.x]);
});

// Map bounds with a small padding percentage
const bounds = computed(() => {
  const pts = rawPoints.value;
  if (!pts.length) return undefined as unknown as [[number, number], [number, number]];
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const w = Math.max(1, maxX - minX);
  const h = Math.max(1, maxY - minY);
  const pad = 0.08 * Math.max(w, h);
  return [
    [minY - pad, minX - pad],
    [maxY + pad, maxX + pad],
  ] as [[number, number], [number, number]];
});

// center derived from bounds when fitting; no explicit center needed

// Parcel label options and selection
const selectedParcelName = ref<string>("");
const parcelOptions = computed<string[]>(() => {
  const opts: string[] = [];
  const initial = (props.parcelName || "").trim();
  if (initial) opts.push(initial);
  if (Array.isArray(props.parcels)) {
    for (const p of props.parcels) {
      const n = (p?.name || "").trim();
      if (n) opts.push(n);
    }
  }
  // unique, keep order
  return Array.from(new Set(opts));
});

watch(
  () => parcelOptions.value,
  (opts) => {
    if (!selectedParcelName.value || !opts.includes(selectedParcelName.value)) {
      selectedParcelName.value = opts[0] || "";
    }
  },
  { immediate: true }
);

const parcelLabel = computed(() => selectedParcelName.value);

// centroid of polygon (raw coords). If degenerate, fallback to average of points
const centroid = computed(() => {
  const pts = rawPoints.value;
  const n = pts.length;
  if (!n) return { x: 50, y: 50 };
  if (n < 3) {
    const sx = pts.reduce((s, p) => s + p.x, 0);
    const sy = pts.reduce((s, p) => s + p.y, 0);
    return { x: sx / n, y: sy / n };
  }
  let area2 = 0; // 2 * area (signed)
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < n; i++) {
    const p0 = pts[i]!;
    const p1 = pts[(i + 1) % n]!;
    const f = p0.x * p1.y - p1.x * p0.y;
    area2 += f;
    cx += (p0.x + p1.x) * f;
    cy += (p0.y + p1.y) * f;
  }
  if (area2 === 0) {
    const sx = pts.reduce((s, p) => s + p.x, 0);
    const sy = pts.reduce((s, p) => s + p.y, 0);
    return { x: sx / n, y: sy / n };
  }
  return { x: cx / (3 * area2), y: cy / (3 * area2) };
});

const centroidLatLng = computed<[number, number]>(() => [centroid.value.y, centroid.value.x]);

function renderLayers() {
  const L = LRef.value;
  const map = mapRef.value;
  if (!L || !map) return;

  // Clear existing layers
  if (polygonLayer) {
    map.removeLayer(polygonLayer);
    polygonLayer = null;
  }
  for (const l of pointLayers) map.removeLayer(l);
  pointLayers = [];
  if (centroidMarker) {
    map.removeLayer(centroidMarker);
    centroidMarker = null;
  }

  if (!latLngs.value.length) return;

  // Fit bounds
  const b = bounds.value as unknown as [[number, number], [number, number]];
  if (b) map.fitBounds(L.latLngBounds(b), { padding: [10, 10] });

  // Polygon
  polygonLayer = L.polygon(latLngs.value, { color: "#ffffff", weight: 1, fill: false }).addTo(map);

  // Points + labels
  for (const p of rawPoints.value) {
    const cm = L.circleMarker([p.y, p.x], { radius: 2, color: "#ffffff", weight: 1, fill: false })
      .addTo(map)
      .bindTooltip(p.label, { permanent: true, direction: "top", className: "leaflet-tooltip point-label", offset: [6, -6] });
    pointLayers.push(cm);
  }

  // Parcel label at centroid
  if (parcelLabel.value) {
    centroidMarker = L.marker(centroidLatLng.value, {
      icon: L.divIcon({ className: "empty-icon", html: "", iconSize: [0, 0] }),
    })
      .addTo(map)
      .bindTooltip(parcelLabel.value, { permanent: true, direction: "center", className: "leaflet-tooltip parcel-label" });
  }
}

onMounted(async () => {
  const L = await import("leaflet");
  LRef.value = L;
  if (!mapEl.value) return;
  mapRef.value = L.map(mapEl.value, {
    crs: L.CRS.Simple,
    attributionControl: false,
    zoomControl: true,
    minZoom: -5,
  });
  await nextTick();
  mapRef.value.invalidateSize();
  renderLayers();
});

onBeforeUnmount(() => {
  const map = mapRef.value;
  if (map) map.remove();
  mapRef.value = null;
  LRef.value = null;
  polygonLayer = null;
  pointLayers = [];
  centroidMarker = null;
});

watch([latLngs, parcelLabel], () => {
  renderLayers();
});

function onComplete() {
  emit("complete");
}
</script>

<style scoped>
/* Make Leaflet tooltips match the dark map */
:deep(.leaflet-container) {
  background: #000;
}
:deep(.leaflet-tooltip.point-label) {
  background: transparent;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 0;
  font-size: 11px;
}
:deep(.leaflet-tooltip.parcel-label) {
  background: transparent;
  border: none;
  box-shadow: none;
  color: #f8fafc;
  font-weight: 700;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
</style>
