<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Drawing
    </h2>

    <!-- Parcel label selector (only shown when multiple options exist) -->
    <div v-if="parcelOptions.length > 1" class="flex items-center justify-end">
      <div class="mb-1">
        <label class="mr-2 text-xs text-gray-600 dark:text-gray-300"
          >Parcel label</label
        >
        <select
          v-model="selectedParcelName"
          class="text-sm border rounded px-2 py-1 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
        >
          <option v-for="name in parcelOptions" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Leaflet map with base-layer switch (auto: WebMercator tiles if geographic, else CRS.Simple) -->
    <div
      class="rounded-md overflow-hidden border border-gray-200 dark:border-slate-600"
    >
      <ClientOnly>
        <div
          class="relative w-full h-96"
          :class="{ 'simple-crs': crsMode === 'simple' }"
        >
          <div ref="mapEl" class="w-full h-full" />
          <!-- Base layer toggle (shown for geographic coords) -->
          <div
            v-if="crsMode === 'geo' && latLngs.length"
            class="absolute top-2 right-2 z-[1000]"
          >
            <div
              class="inline-flex rounded-md overflow-hidden shadow border border-gray-200 dark:border-slate-700 backdrop-blur bg-white/90 dark:bg-slate-800/90"
              role="group"
              aria-label="Base layer toggle"
            >
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium focus:outline-none transition-colors"
                :class="[
                  activeBaseKey === 'OpenStreetMap'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-slate-700/60',
                ]"
                @click="activeBaseKey = 'OpenStreetMap'"
                :aria-pressed="activeBaseKey === 'OpenStreetMap'"
              >
                Street
              </button>
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium focus:outline-none transition-colors border-l border-gray-200 dark:border-slate-700"
                :class="[
                  activeBaseKey === 'Satellite'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-slate-700/60',
                ]"
                @click="activeBaseKey = 'Satellite'"
                :aria-pressed="activeBaseKey === 'Satellite'"
              >
                Satellite
              </button>
            </div>
          </div>
          <div
            v-if="!latLngs.length"
            class="absolute inset-0 grid place-items-center text-sm text-gray-400"
          >
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
import {
  computed,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  shallowRef,
  nextTick,
} from "vue";

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
  parcels?: Array<{ name?: string; ids?: string[] }>;
  legs?: Array<{
    from: { id: string; northing: number; easting: number };
    to: { id: string; northing: number; easting: number };
    distance: number;
    bearing?: {
      decimal?: number;
      degrees?: number;
      minutes?: number;
      seconds?: number;
    };
  }>;
}>();
const emit = defineEmits(["complete"]);

// Prepare raw points (no scaling). We'll render with Leaflet using CRS.Simple.
const selectedParcel = computed(() => {
  const name = selectedParcelName.value?.trim();
  if (!name || !Array.isArray(props.parcels)) return null;
  return props.parcels.find((p) => (p?.name || "").trim() === name) || null;
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
let dimensionLayers: any[] = [];
const baseLayers = shallowRef<Record<string, any>>({});
const activeBaseKey = ref<string>("OpenStreetMap");
const crsMode = ref<"geo" | "simple" | null>(null);

// Determine geographic orientation (supports lon/lat or lat/lon). "none" means non-geographic.
const geoOrientation = computed<"lonlat" | "latlon" | "none">(() => {
  const pts = rawPoints.value;
  if (!pts.length) return "lonlat"; // default to lon/lat when empty
  let lonlat = 0;
  let latlon = 0;
  for (const p of pts) {
    const x = p.x;
    const y = p.y;
    if (x >= -180 && x <= 180 && y >= -90 && y <= 90) lonlat++;
    if (x >= -90 && x <= 90 && y >= -180 && y <= 180) latlon++;
  }
  if (lonlat === 0 && latlon === 0) return "none";
  return lonlat >= latlon ? "lonlat" : "latlon";
});

// Array of [lat, lng] pairs for polygon
const latLngs = computed<[number, number][]>(() => {
  const orient = geoOrientation.value;
  if (orient === "latlon") return rawPoints.value.map((p) => [p.x, p.y]); // x=lat, y=lng
  return rawPoints.value.map((p) => [p.y, p.x]); // y=lat, x=lng (default)
});

// Points mapped to lat/lng for markers with labels
const pointsLatLng = computed(() =>
  rawPoints.value.map((p) => {
    const orient = geoOrientation.value;
    return orient === "latlon"
      ? { key: p.key, label: p.label, lat: p.x, lng: p.y }
      : { key: p.key, label: p.label, lat: p.y, lng: p.x };
  })
);

// Map bounds computed from lat/lng pairs with padding
const bounds = computed(() => {
  const pts = latLngs.value;
  if (!pts.length)
    return undefined as unknown as [[number, number], [number, number]];
  let minLat = Infinity,
    minLng = Infinity,
    maxLat = -Infinity,
    maxLng = -Infinity;
  for (const [lat, lng] of pts) {
    if (lat < minLat) minLat = lat;
    if (lng < minLng) minLng = lng;
    if (lat > maxLat) maxLat = lat;
    if (lng > maxLng) maxLng = lng;
  }
  const w = Math.max(1, maxLng - minLng);
  const h = Math.max(1, maxLat - minLat);
  const pad = 0.08 * Math.max(w, h);
  return [
    [minLat - pad, minLng - pad],
    [maxLat + pad, maxLng + pad],
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

const centroidLatLng = computed<[number, number]>(() => {
  const pts = latLngs.value;
  const n = pts.length;
  if (!n) return [0, 0];
  if (n < 3) {
    const s = pts.reduce(
      (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng] as [number, number],
      [0, 0]
    );
    return [s[0] / n, s[1] / n];
  }
  let area2 = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = [pts[i]![1], pts[i]![0]]; // treat lng=x, lat=y for centroid calc
    const [x1, y1] = [pts[(i + 1) % n]![1], pts[(i + 1) % n]![0]];
    const f = x0 * y1 - x1 * y0;
    area2 += f;
    cx += (x0 + x1) * f;
    cy += (y0 + y1) * f;
  }
  if (area2 === 0) {
    const s = pts.reduce(
      (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng] as [number, number],
      [0, 0]
    );
    return [s[0] / n, s[1] / n];
  }
  return [cy / (3 * area2), cx / (3 * area2)];
});

// Heuristic: detect if coords look geographic in either orientation
const isGeographic = computed<boolean>(() => geoOrientation.value !== "none");

function teardownBaseLayers() {
  const map = mapRef.value;
  if (!map) return;
  for (const key of Object.keys(baseLayers.value)) {
    const layer = baseLayers.value[key];
    if (map.hasLayer(layer)) map.removeLayer(layer);
  }
  baseLayers.value = {};
}

function setupBaseLayers() {
  const L = LRef.value;
  const map = mapRef.value;
  if (!L || !map) return;
  teardownBaseLayers();
  if (crsMode.value !== "geo") return; // no tile layers for Simple CRS

  const osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }
  );
  const esri = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      attribution:
        "Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  );

  baseLayers.value = {
    OpenStreetMap: osm,
    Satellite: esri,
  };
  applyActiveBase();
}

function applyActiveBase() {
  const map = mapRef.value;
  if (!map || crsMode.value !== "geo") return;
  for (const [key, layer] of Object.entries(baseLayers.value)) {
    if (key === activeBaseKey.value) {
      if (!map.hasLayer(layer)) layer.addTo(map);
    } else if (map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  }
}

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
  polygonLayer = L.polygon(latLngs.value, {
    color: "#000000",
    weight: 2,
    fill: false,
  }).addTo(map);

  // Points + labels (respect orientation)
  for (const p of pointsLatLng.value) {
    const cm = L.circleMarker([p.lat, p.lng], {
      radius: 4,
      color: "#000000",
      weight: 2,
      fill: false,
    })
      .addTo(map)
      .bindTooltip(p.label, {
        permanent: true,
        direction: "top",
        className: "leaflet-tooltip point-label",
        offset: [10, -6],
      });
    pointLayers.push(cm);
  }

  // Dimension labels from legs (distance + bearing)
  // Remove old dimension layers
  for (const dl of dimensionLayers) map.removeLayer(dl);
  dimensionLayers = [];
  if (Array.isArray(props.legs) && props.legs.length) {
    for (const leg of props.legs) {
      // find latlng for from and to by matching point ids with pointsLatLng labels
      const from = pointsLatLng.value.find(
        (pp) => pp.label === leg.from.id || pp.key === leg.from.id
      );
      const to = pointsLatLng.value.find(
        (pp) => pp.label === leg.to.id || pp.key === leg.to.id
      );
      if (!from || !to) continue;
      const midLat = (from.lat + to.lat) / 2;
      const midLng = (from.lng + to.lng) / 2;
      // compute bearing label (degrees + minutes) and distance label separately
      const distTxt = `${Number(leg.distance).toFixed(3)} m`;
      // format bearing as degrees and minutes with unit
      const bd = leg.bearing;
      let bearingTxt = "";
      if (bd && typeof bd.decimal === "number") {
        const deg = Math.floor(bd.decimal);
        const minutes = Math.floor((bd.decimal - deg) * 60);
        bearingTxt = `${deg}° ${minutes}'`;
      } else if (bd && typeof bd.degrees === "number") {
        const deg = bd.degrees;
        const minutes = bd.minutes ?? 0;
        bearingTxt = `${deg}° ${minutes}'`;
      }

      // compute a small pixel offset so labels don't sit directly on the line
      const midPoint = L.latLng(midLat, midLng);
      // offset direction perpendicular to the segment in pixel space
      const fromPt = map.latLngToLayerPoint(L.latLng(from.lat, from.lng));
      const toPt = map.latLngToLayerPoint(L.latLng(to.lat, to.lng));
      const dx = toPt.x - fromPt.x;
      const dy = toPt.y - fromPt.y;
      const layerPoint = map.latLngToLayerPoint(midPoint);
      // dynamic offset based on segment pixel length so short segments get smaller offsets
      const segPixelLen = Math.sqrt(dx * dx + dy * dy);
      // offset scales with segment length but clamped to reasonable bounds
      const offsetPx = Math.min(
        48,
        Math.max(8, Math.floor(segPixelLen * 0.14))
      );
      // perpendicular (normalized)
      const len = Math.max(1, segPixelLen);
      const px = -dy / len;
      const py = dx / len;

      // compute angle of the segment in screen (layer) coordinates
      const angleRad = Math.atan2(dy, dx);
      let angleDeg = (angleRad * 180) / Math.PI;
      // keep text upright: rotate into range [-90,90]
      if (angleDeg > 90) angleDeg -= 180;
      if (angleDeg < -90) angleDeg += 180;

      // decide which side is inside (towards centroid) vs outside
      let bearingSign = 1;
      try {
        const centroidLL = L.latLng(
          centroidLatLng.value[0],
          centroidLatLng.value[1]
        );
        const centroidLayer = map.latLngToLayerPoint(centroidLL);
        const cx = centroidLayer.x - layerPoint.x;
        const cy = centroidLayer.y - layerPoint.y;
        const dot = cx * px + cy * py; // if positive, positive perp points toward centroid (inside)
        // we want bearing outside (away from centroid)
        bearingSign = dot > 0 ? -1 : 1;
      } catch (e) {
        bearingSign = 1;
      }

      // make bearing offset proportional but clamped so it never goes absurdly far
      const bearingOffset = Math.max(
        8,
        Math.min(Math.floor(segPixelLen * 0.7), offsetPx + 10)
      );
      // distance offset should be smaller and proportional to segment length
      const distOffset = Math.max(
        4,
        Math.min(Math.floor(segPixelLen * 0.33), Math.floor(offsetPx / 2))
      );

      // bearing label (outside)
      const bearingPt = L.point(
        layerPoint.x + px * bearingOffset * bearingSign,
        layerPoint.y + py * bearingOffset * bearingSign
      );
      const bearingLatLng = map.layerPointToLatLng(bearingPt);
      // center rotated label so vertical/higher-angle labels align around marker point
      const bearingHtml = `<div class="dim-box" style="transform: translate(-50%,-50%) rotate(${angleDeg}deg); transform-origin: center;">${bearingTxt}</div>`;
      const bearingIcon = L.divIcon({
        className: "dimension-label bearing-label",
        html: bearingHtml,
        iconAnchor: [0, 0],
      });
      const bearingMarker = L.marker(bearingLatLng, {
        icon: bearingIcon,
        interactive: false,
      }).addTo(map);

      // distance label (inside)
      const distPt = L.point(
        layerPoint.x - px * distOffset * bearingSign,
        layerPoint.y - py * distOffset * bearingSign
      );
      const distLatLng = map.layerPointToLatLng(distPt);
      const distHtml = `<div class="dim-box" style="transform: translate(-50%,-50%) rotate(${angleDeg}deg); transform-origin: center;">${distTxt}</div>`;
      const distIcon = L.divIcon({
        className: "dimension-label distance-label",
        html: distHtml,
        iconAnchor: [0, 0],
      });
      const distMarker = L.marker(distLatLng, {
        icon: distIcon,
        interactive: false,
      }).addTo(map);

      // ensure distance label is closer to midpoint than bearing label; if not, pull it in
      try {
        const midLP = layerPoint;
        const bLP = map.latLngToLayerPoint(bearingLatLng);
        const dLP = map.latLngToLayerPoint(distLatLng);
        const db = Math.hypot(bLP.x - midLP.x, bLP.y - midLP.y);
        const dd = Math.hypot(dLP.x - midLP.x, dLP.y - midLP.y);
        if (dd > db) {
          // move distance to halfway between midpoint and bearing (but on inside side)
          const halfOffset = Math.max(4, Math.floor(bearingOffset / 2));
          const newDistPt = L.point(
            layerPoint.x - px * halfOffset * bearingSign,
            layerPoint.y - py * halfOffset * bearingSign
          );
          const newDistLatLng = map.layerPointToLatLng(newDistPt);
          // update marker (no leader lines)
          map.removeLayer(distMarker);
          const newDistMarker = L.marker(newDistLatLng, {
            icon: distIcon,
            interactive: false,
          }).addTo(map);
          dimensionLayers.push(bearingMarker, newDistMarker);
        } else {
          dimensionLayers.push(bearingMarker, distMarker);
        }
      } catch (e) {
        dimensionLayers.push(bearingMarker, distMarker);
      }
    }
  }

  // Parcel label at centroid
  if (parcelLabel.value) {
    centroidMarker = L.marker(centroidLatLng.value, {
      icon: L.divIcon({ className: "empty-icon", html: "", iconSize: [0, 0] }),
    })
      .addTo(map)
      .bindTooltip(parcelLabel.value, {
        permanent: true,
        direction: "center",
        className: "leaflet-tooltip parcel-label",
      });
  }
}

onMounted(async () => {
  const L = await import("leaflet");
  LRef.value = L;
  if (!mapEl.value) return;
  // Decide CRS mode based on data
  crsMode.value = isGeographic.value ? "geo" : "simple";
  mapRef.value = L.map(mapEl.value, {
    crs: crsMode.value === "geo" ? L.CRS.EPSG3857 : L.CRS.Simple,
    attributionControl: true,
    zoomControl: true,
    minZoom: crsMode.value === "geo" ? 1 : -5,
    worldCopyJump: crsMode.value === "geo",
  });
  await nextTick();
  mapRef.value.invalidateSize();
  setupBaseLayers();
  renderLayers();
});

onBeforeUnmount(() => {
  const map = mapRef.value;
  teardownBaseLayers();
  if (map) map.remove();
  mapRef.value = null;
  LRef.value = null;
  polygonLayer = null;
  pointLayers = [];
  centroidMarker = null;
  dimensionLayers = [];
});

watch([latLngs, parcelLabel], () => {
  renderLayers();
});

// Switch base layer when toggled
watch(activeBaseKey, () => applyActiveBase());

// If CRS mode changes (e.g., user switches parcels with different coord systems), recreate the map
watch(isGeographic, async (geo) => {
  const L = LRef.value;
  const el = mapEl.value;
  if (!L || !el) return;
  const newMode: "geo" | "simple" = geo ? "geo" : "simple";
  if (newMode === crsMode.value && mapRef.value) return;
  // Teardown current
  if (mapRef.value) {
    teardownBaseLayers();
    mapRef.value.remove();
  }
  // Recreate map
  crsMode.value = newMode;
  mapRef.value = L.map(el, {
    crs: crsMode.value === "geo" ? L.CRS.EPSG3857 : L.CRS.Simple,
    attributionControl: true,
    zoomControl: true,
    minZoom: crsMode.value === "geo" ? 1 : -5,
    worldCopyJump: crsMode.value === "geo",
  });
  await nextTick();
  mapRef.value.invalidateSize();
  setupBaseLayers();
  renderLayers();
});

function onComplete() {
  emit("complete");
}
</script>

<style scoped>
:deep(.leaflet-tooltip.point-label) {
  background: transparent;
  border: none;
  box-shadow: none;
  color: #000;
  padding: 0;
  font-size: 14px;
}
:deep(.leaflet-tooltip.parcel-label) {
  background: transparent;
  border: none;
  box-shadow: none;
  color: #000;
  font-weight: 700;
  font-size: 14px;
}

:deep(.leaflet-tooltip-top:before) {
  border-top-color: #000 !important;
}

:deep(.dimension-label .dim-box) {
  background: rgba(255, 255, 255, 0.96);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 15px;
  font-weight: 600;
  color: #111;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  white-space: nowrap;
  display: inline-block;
  line-height: 1;
}

:deep(.leaflet-interactive.leader-line) {
  stroke: #333;
}

:deep(.bearing-label .dim-box) {
  background: rgba(10, 132, 255, 0.95);
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px 12px;
  font-size: 15px;
}

:deep(.distance-label .dim-box) {
  background: rgba(250, 250, 250, 0.98);
  color: #111;
  padding: 8px 12px;
  font-size: 15px;
}
</style>
