<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Drawing
    </h2>

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

// Prepare parcel data for rendering all parcels together
const allParcels = computed(() => {
  if (!Array.isArray(props.parcels) || !Array.isArray(props.coordinates)) {
    return [];
  }

  return props.parcels
    .map((parcel) => {
      const parcelName = (parcel?.name || "").trim();
      const parcelIds = parcel?.ids?.filter(Boolean) || [];
      if (!parcelIds.length) return null;

      // Filter coordinates for this parcel
      const set = new Set(parcelIds);
      const filtered =
        props.coordinates?.filter((r) => r.point && set.has(r.point)) || [];
      if (!filtered.length) return null;

      // Map to raw points
      const points = filtered
        .filter((r) => r.northing != null && r.easting != null)
        .map((r) => ({
          key: r.point || `${r.easting},${r.northing}`,
          label: r.point || "",
          x: Number(r.easting),
          y: Number(r.northing),
        }));

      if (!points.length) return null;

      return { name: parcelName, points };
    })
    .filter(Boolean) as Array<{
    name: string;
    points: Array<{ key: string; label: string; x: number; y: number }>;
  }>;
});

// Get all raw points to determine bounds and geographic orientation
const allRawPoints = computed(() => {
  const points: Array<{ key: string; label: string; x: number; y: number }> =
    [];
  allParcels.value.forEach((parcel) => {
    parcel.points.forEach((point) => points.push(point));
  });
  return points;
});



// Leaflet map state (client-only)
const LRef = shallowRef<any>(null);
const mapEl = ref<HTMLElement | null>(null);
const mapRef = shallowRef<any>(null);
let polygonLayers: any[] = [];
let pointLayers: any[] = [];
let centroidMarkers: any[] = [];
let dimensionLayers: any[] = [];
const baseLayers = shallowRef<Record<string, any>>({});
const activeBaseKey = ref<string>("OpenStreetMap");
const crsMode = ref<"geo" | "simple" | null>(null);

// Determine geographic orientation (supports lon/lat or lat/lon). "none" means non-geographic.
const geoOrientation = computed<"lonlat" | "latlon" | "none">(() => {
  const pts = allRawPoints.value;
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

// Generate arrays of [lat, lng] pairs for each parcel's polygon
const parcelLatLngs = computed<
  Array<{ name: string; points: [number, number][] }>
>(() => {
  const orient = geoOrientation.value;
  return allParcels.value.map((parcel) => {
    const points = parcel.points.map((p) => {
      if (orient === "latlon") return [p.x, p.y] as [number, number]; // x=lat, y=lng
      return [p.y, p.x] as [number, number]; // y=lat, x=lng (default)
    });
    return { name: parcel.name, points };
  });
});

// Single array of [lat, lng] pairs for backward compatibility
const latLngs = computed<[number, number][]>(() => {
  const orient = geoOrientation.value;
  if (allRawPoints.value.length === 0) return [];

  return allRawPoints.value.map((p) => {
    if (orient === "latlon") return [p.x, p.y] as [number, number]; // x=lat, y=lng
    return [p.y, p.x] as [number, number]; // y=lat, x=lng (default)
  });
});

// Points mapped to lat/lng for markers with labels
const pointsLatLng = computed(() =>
  allRawPoints.value.map((p) => {
    const orient = geoOrientation.value;
    return orient === "latlon"
      ? { key: p.key, label: p.label, lat: p.x, lng: p.y }
      : { key: p.key, label: p.label, lat: p.y, lng: p.x };
  })
);

// Map bounds computed from all points with padding
const bounds = computed(() => {
  const allPoints = latLngs.value;
  if (!allPoints.length)
    return undefined as unknown as [[number, number], [number, number]];

  let minLat = Infinity,
    minLng = Infinity,
    maxLat = -Infinity,
    maxLng = -Infinity;

  for (const [lat, lng] of allPoints) {
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

// Map bounds computed from all points with padding
const parcelCentroids = computed(() => {
  return parcelLatLngs.value.map((parcel) => {
    const pts = parcel.points;
    const n = pts.length;

    if (!n) return { name: parcel.name, position: [0, 0] as [number, number] };
    if (n < 3) {
      const s = pts.reduce(
        (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng] as [number, number],
        [0, 0]
      );
      return {
        name: parcel.name,
        position: [s[0] / n, s[1] / n] as [number, number],
      };
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
      return {
        name: parcel.name,
        position: [s[0] / n, s[1] / n] as [number, number],
      };
    }

    return {
      name: parcel.name,
      position: [cy / (3 * area2), cx / (3 * area2)] as [number, number],
    };
  });
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
  for (const layer of polygonLayers) {
    map.removeLayer(layer);
  }
  polygonLayers = [];

  for (const layer of pointLayers) {
    map.removeLayer(layer);
  }
  pointLayers = [];

  for (const marker of centroidMarkers) {
    map.removeLayer(marker);
  }
  centroidMarkers = [];

  if (!latLngs.value.length) return;

  // Fit bounds
  const b = bounds.value as unknown as [[number, number], [number, number]];
  if (b) map.fitBounds(L.latLngBounds(b), { padding: [10, 10] });

  // Draw each parcel polygon
  for (const parcel of parcelLatLngs.value) {
    if (parcel.points.length < 3) continue;

    const polygonLayer = L.polygon(parcel.points, {
      color: "#000000",
      weight: 1,
      fill: false,
    }).addTo(map);

    polygonLayers.push(polygonLayer);
  }

  // Points + labels (respect orientation)
  for (const p of pointsLatLng.value) {
    const cm = L.circleMarker([p.lat, p.lng], {
      radius: 2,
      color: "#000000",
      weight: 1,
      fill: true,
      fillColor: "#000000",
      fillOpacity: 1,
    })
      .addTo(map)
      .bindTooltip(p.label, {
        permanent: true,
        direction: "top",
        className: "leaflet-tooltip point-label",
        offset: [-6, -10], // Position point labels directly above points
      });
    pointLayers.push(cm);
  }

  // Add parcel labels at centroids
  for (const parcel of parcelCentroids.value) {
    if (!parcel.name) continue;

    const marker = L.marker(parcel.position, {
      icon: L.divIcon({ className: "empty-icon", html: "", iconSize: [0, 0] }),
    })
      .addTo(map)
      .bindTooltip(parcel.name, {
        permanent: true,
        direction: "center",
        className: "leaflet-tooltip parcel-label",
      });

    centroidMarkers.push(marker);
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
      const distTxt = `${Number(leg.distance).toFixed(2)}m`;
      // format bearing as degrees and minutes with unit - exactly matching screenshot format
      const bd = leg.bearing;
      let bearingTxt = "";
      if (bd && typeof bd.decimal === "number") {
        const deg = Math.floor(bd.decimal);
        const minutes = Math.floor((bd.decimal - deg) * 60);
        bearingTxt = `${deg}°${minutes}'`;
      } else if (bd && typeof bd.degrees === "number") {
        const deg = bd.degrees;
        const minutes = bd.minutes ?? 0;
        bearingTxt = `${deg}°${minutes}'`;
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
        24,
        Math.max(6, Math.floor(segPixelLen * 0.08))
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

      // Find the closest parcel centroid for this line segment
      let closestCentroid: [number, number] | null = null;
      let minDistance = Infinity;

      for (const parcel of parcelCentroids.value) {
        if (parcel.position) {
          const [centLat, centLng] = parcel.position;
          const midPointDist = Math.hypot(centLat - midLat, centLng - midLng);
          if (midPointDist < minDistance) {
            minDistance = midPointDist;
            closestCentroid = parcel.position;
          }
        }
      }

      try {
        if (closestCentroid) {
          const centroidLL = L.latLng(closestCentroid[0], closestCentroid[1]);
          const centroidLayer = map.latLngToLayerPoint(centroidLL);
          const cx = centroidLayer.x - layerPoint.x;
          const cy = centroidLayer.y - layerPoint.y;
          const dot = cx * px + cy * py; // if positive, positive perp points toward centroid (inside)
          // we want bearing outside (away from centroid)
          bearingSign = dot > 0 ? -1 : 1;
        }
      } catch (e) {
        bearingSign = 1;
      }

      // make bearing offset proportional but clamped so it never goes absurdly far
      const bearingOffset = Math.max(
        12,
        Math.min(Math.floor(segPixelLen * 0.25), offsetPx + 12)
      );
      // distance offset should be smaller and proportional to segment length
      const distOffset = Math.max(
        4,
        Math.min(Math.floor(segPixelLen * 0.1), Math.floor(offsetPx / 2))
      );

      // bearing label (outside)
      const bearingPt = L.point(
        layerPoint.x + px * bearingOffset * bearingSign,
        layerPoint.y + py * bearingOffset * bearingSign
      );
      const bearingLatLng = map.layerPointToLatLng(bearingPt);
      // center rotated label so vertical/higher-angle labels align around marker point
      // Use horizontal alignment to better match the screenshot
      const bearingHtml = `<div class="dim-box" style="transform: translate(-50%,-50%) rotate(${angleDeg}deg); transform-origin: center; text-align: center;">${bearingTxt}</div>`;
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
        layerPoint.x, // Place directly on the midpoint
        layerPoint.y
      );
      const distLatLng = map.layerPointToLatLng(distPt);
      const distHtml = `<div class="dim-box" style="transform: translate(-50%,-50%) rotate(${angleDeg}deg); transform-origin: center; text-align: center;">${distTxt}</div>`;
      const distIcon = L.divIcon({
        className: "dimension-label distance-label",
        html: distHtml,
        iconAnchor: [0, 0],
      });
      const distMarker = L.marker(distLatLng, {
        icon: distIcon,
        interactive: false,
      }).addTo(map);

      // Ensure proper placement of labels to avoid overlapping
      try {
        // Place distance label exactly on the midpoint of the line
        const midLP = layerPoint;
        const onLineDistPt = L.point(midLP.x, midLP.y);
        const onLineDistLatLng = map.layerPointToLatLng(onLineDistPt);

        // Update distance marker position to be directly on the line
        map.removeLayer(distMarker);
        const newDistMarker = L.marker(onLineDistLatLng, {
          icon: distIcon,
          interactive: false,
        }).addTo(map);

        // Always place bearing label further outside to avoid overlap
        const outsideBearingPt = L.point(
          layerPoint.x + px * (bearingOffset * 1.2) * bearingSign,
          layerPoint.y + py * (bearingOffset * 1.2) * bearingSign
        );
        const outsideBearingLatLng = map.layerPointToLatLng(outsideBearingPt);

        // Update bearing marker position
        map.removeLayer(bearingMarker);
        const newBearingMarker = L.marker(outsideBearingLatLng, {
          icon: bearingIcon,
          interactive: false,
        }).addTo(map);

        dimensionLayers.push(newBearingMarker, newDistMarker);
      } catch (e) {
        dimensionLayers.push(bearingMarker, distMarker);
      }
    }
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
  polygonLayers = [];
  pointLayers = [];
  centroidMarkers = [];
  dimensionLayers = [];
});

watch(
  () => latLngs.value,
  () => {
    renderLayers();
  }
);

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
  font-size: 12px;
  font-weight: 400;
}
:deep(.leaflet-tooltip.parcel-label) {
  background: transparent;
  border: none;
  box-shadow: none;
  color: #000;
  font-weight: 700;
  font-size: 14px;
  text-shadow: 1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white,
    -1px 1px 0 white;
}

:deep(.leaflet-tooltip-top:before) {
  border-top-color: #000 !important;
}

:deep(.dimension-label) {
  margin: 0;
  padding: 0;
}

:deep(.dimension-label .dim-box) {
  background: transparent;
  padding: 0;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  white-space: nowrap;
  display: inline-block;
  line-height: 1;
}

:deep(.leaflet-interactive.leader-line) {
  stroke: #000;
}

:deep(.bearing-label .dim-box) {
  background: transparent;
  color: #000;
  padding: 0;
  font-size: 12px;
}

:deep(.distance-label .dim-box) {
  background: transparent;
  color: #000;
  padding: 0;
  font-size: 12px;
}
</style>
