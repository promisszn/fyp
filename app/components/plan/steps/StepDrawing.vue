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
          <polyline
            v-if="polyline"
            :points="polyline"
            fill="none"
            stroke="#2563eb"
            stroke-width="1.5"
          />
          <!-- points -->
          <g>
            <circle
              v-for="p in points"
              :key="p.key"
              :cx="p.x"
              :cy="p.y"
              r="1.2"
              fill="#1e40af"
            />
            <text
              v-for="p in points"
              :key="p.key + '-label'"
              :x="p.x + 1.8"
              :y="p.y - 1.2"
              font-size="3"
              fill="#334155"
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
const props = defineProps<{ modelValue?: any; coordinates?: CoordInput[] }>();
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

  return src.map((p) => ({
    key: p.key,
    label: p.label,
    x: pad + (p.x - minX) * scale,
    // invert Y so larger northing goes up
    y: pad + (maxY - p.y) * scale,
  }));
});

const polyline = computed(() => {
  if (!points.value.length) return "";
  return points.value.map((p) => `${p.x},${p.y}`).join(" ");
});
function onComplete() {
  emit("complete");
}
</script>
