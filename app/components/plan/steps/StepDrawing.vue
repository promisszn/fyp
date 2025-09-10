<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Drawing
    </h2>

    <!-- Simple SVG Plot (plain background) -->
    <div
      class="rounded-md overflow-hidden border border-gray-200 dark:border-slate-600 bg-black"
    >
      <div v-if="points.length" class="w-full h-72">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          class="w-full h-full"
        >
          <!-- polygon shape -->
          <!-- parcel label at centroid -->
          <text
            v-if="parcelLabel && points.length"
            :x="centroid.x"
            :y="centroid.y"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="6"
            font-weight="600"
            fill="#f8fafc"
            stroke="#000"
            stroke-opacity="0.35"
            stroke-width="0.8"
            paint-order="stroke"
          >
            {{ parcelLabel }}
          </text>
          <polygon
            v-if="polygon"
            :points="polygon"
            fill="none"
            stroke="#fff"
            stroke-width="1"
          />
          <g>
            <circle
              v-for="p in points"
              :key="p.key + '-pt'"
              :cx="p.x"
              :cy="p.y"
              r="1.5"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
            <text
              v-for="p in points"
              :key="p.key + '-label'"
              :x="p.x + 1.8"
              :y="p.y - 1.2"
              font-size="5"
              fill="#fff"
            >
              {{ p.label }}
            </text>
          </g>
        </svg>
      </div>
      <div
        v-else
        class="p-6 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        No coordinates to plot yet. Add coordinates in Step 1.
      </div>
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
import { computed } from "vue";

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
}>();
const emit = defineEmits(["complete"]);

// Prepare scaled points for a 100x100 SVG canvas with padding and Y-axis inversion
const points = computed(() => {
  const src = (props.coordinates || [])
    .filter((r) => r.northing != null && r.easting != null)
    .map((r) => ({
      key: r.point || `${r.easting},${r.northing}`,
      label: r.point || "",
      x: Number(r.easting),
      y: Number(r.northing),
    }));
  if (!src.length)
    return [] as Array<{ key: string; label: string; x: number; y: number }>;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of src) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const rangeX = Math.max(1, maxX - minX);
  const rangeY = Math.max(1, maxY - minY);
  const pad = 8; // percent of 100
  const inner = 100 - pad * 2;
  const scale = inner / Math.max(rangeX, rangeY);
  const usedWidth = rangeX * scale;
  const usedHeight = rangeY * scale;
  const offsetX = pad + (inner - usedWidth) / 2;
  const offsetY = pad + (inner - usedHeight) / 2;

  return src.map((p) => ({
    key: p.key,
    label: p.label,
    x: offsetX + (p.x - minX) * scale,
    // invert Y so larger northing goes up
    y: offsetY + (maxY - p.y) * scale,
  }));
});

const polygon = computed(() => {
  if (!points.value.length) return "";
  return points.value.map((p) => `${p.x},${p.y}`).join(" ");
});

const parcelLabel = computed(() => (props.parcelName || "").trim());

// centroid of polygon (in SVG coords). If degenerate, fallback to average of points
const centroid = computed(() => {
  const pts = points.value;
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

function onComplete() {
  emit("complete");
}
</script>
