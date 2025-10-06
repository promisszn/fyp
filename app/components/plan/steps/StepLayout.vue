<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Layout Parameters
    </h2>

    <!-- Road Parameters -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Road Parameters
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Main Road Width (m)</label
          >
          <input
            v-model.number="local.layout.main_road_width"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Secondary Road Width (m)</label
          >
          <input
            v-model.number="local.layout.secondary_road_width"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Access Road Width (m)</label
          >
          <input
            v-model.number="local.layout.access_road_width"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Parcel Parameters -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Parcel Parameters
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Min Parcel Area (m²)</label
          >
          <input
            v-model.number="local.layout.min_parcel_area"
            type="number"
            step="1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Max Parcel Area (m²)</label
          >
          <input
            v-model.number="local.layout.max_parcel_area"
            type="number"
            step="1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Min Parcel Width (m)</label
          >
          <input
            v-model.number="local.layout.min_parcel_width"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Min Parcel Depth (m)</label
          >
          <input
            v-model.number="local.layout.min_parcel_depth"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Target Parcel Ratio (Depth/Width)</label
          >
          <input
            v-model.number="local.layout.target_parcel_ratio"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Subdivision Parameters -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Subdivision Parameters
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Subdivision Type</label
          >
          <select
            v-model="local.layout.subdivision_type"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="grid">Grid</option>
            <option value="radial">Radial</option>
            <option value="organic">Organic</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Green Space Percentage (%)</label
          >
          <input
            v-model.number="local.layout.green_space_percentage"
            type="number"
            step="0.1"
            min="0"
            max="100"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="sm:col-span-2">
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                v-model="local.layout.road_hierarchy"
                class="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span>Road Hierarchy</span>
            </label>
            <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                v-model="local.layout.include_cul_de_sacs"
                class="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span>Include Cul-de-sacs</span>
            </label>
            <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                v-model="local.layout.include_green_spaces"
                class="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span>Include Green Spaces</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Setbacks -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Setbacks
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Front Setback (m)</label
          >
          <input
            v-model.number="local.layout.front_setback"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Side Setback (m)</label
          >
          <input
            v-model.number="local.layout.side_setback"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Rear Setback (m)</label
          >
          <input
            v-model.number="local.layout.rear_setback"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Block & Intersection Parameters -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Block & Intersection Parameters
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Corner Radius (m)</label
          >
          <input
            v-model.number="local.layout.corner_radius"
            type="number"
            step="0.1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Max Block Length (m)</label
          >
          <input
            v-model.number="local.layout.max_block_length"
            type="number"
            step="1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Max Block Width (m)</label
          >
          <input
            v-model.number="local.layout.max_block_width"
            type="number"
            step="1"
            min="0"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-2">
      <button
        @click="onComplete"
        type="button"
        :disabled="loading"
        class="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium"
      >
        <span v-if="!loading">Save & Continue</span>
        <span v-else>Saving...</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";

interface LayoutState {
  main_road_width: number;
  secondary_road_width: number;
  access_road_width: number;
  min_parcel_area: number;
  max_parcel_area: number;
  min_parcel_width: number;
  min_parcel_depth: number;
  target_parcel_ratio: number;
  subdivision_type: string;
  road_hierarchy: boolean;
  include_cul_de_sacs: boolean;
  include_green_spaces: boolean;
  green_space_percentage: number;
  front_setback: number;
  side_setback: number;
  rear_setback: number;
  corner_radius: number;
  max_block_length: number;
  max_block_width: number;
}

const props = defineProps<{
  modelValue: { layout: LayoutState };
  loading?: boolean;
}>();
const emit = defineEmits(["update:modelValue", "complete"]);

const local = reactive<{ layout: LayoutState }>({
  layout: {
    main_road_width: 15.0,
    secondary_road_width: 12.0,
    access_road_width: 9.0,
    min_parcel_area: 450.0,
    max_parcel_area: 1000.0,
    min_parcel_width: 15.0,
    min_parcel_depth: 25.0,
    target_parcel_ratio: 1.5,
    subdivision_type: "grid",
    road_hierarchy: true,
    include_cul_de_sacs: true,
    include_green_spaces: true,
    green_space_percentage: 10.0,
    front_setback: 6.0,
    side_setback: 3.0,
    rear_setback: 3.0,
    corner_radius: 5.0,
    max_block_length: 200.0,
    max_block_width: 100.0,
  },
});

watch(
  () => props.modelValue,
  (v) => {
    if (v?.layout) {
      local.layout = { ...local.layout, ...v.layout };
    }
  },
  { immediate: true, deep: true }
);

const loading = computed(() => !!props.loading);

function onComplete() {
  emit("update:modelValue", { layout: { ...local.layout } });
  emit("complete");
}
</script>
