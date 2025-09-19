<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold">Topographic Settings</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left column -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-3">
            <input
              type="checkbox"
              v-model="local.show_spot_heights"
              class="form-checkbox h-4 w-4"
            />
            <span class="text-sm font-medium">Show spot heights</span>
          </label>
          <span class="text-xs text-gray-500"
            >Toggle display of point elevations</span
          >
        </div>

        <div>
          <label class="block text-xs text-gray-600 mb-1"
            >Point label scale</label
          >
          <input
            v-model.number="local.point_label_scale"
            type="number"
            step="0.01"
            class="w-full px-3 py-2 rounded border bg-white dark:bg-slate-800"
          />
        </div>

        <div class="flex items-center justify-between mt-2">
          <label class="flex items-center gap-3">
            <input
              type="checkbox"
              v-model="local.show_contours"
              class="form-checkbox h-4 w-4"
            />
            <span class="text-sm font-medium">Show contours</span>
          </label>
          <span class="text-xs text-gray-500"
            >Generate contour lines from TIN</span
          >
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-600 mb-1"
              >Contour interval</label
            >
            <input
              v-model.number="local.contour_interval"
              type="number"
              step="0.01"
              class="w-full px-3 py-2 rounded border bg-white dark:bg-slate-800"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-600 mb-1"
              >Major contour</label
            >
            <input
              v-model.number="local.major_contour"
              type="number"
              step="1"
              class="w-full px-3 py-2 rounded border bg-white dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-4">
        <div>
          <label class="block text-xs text-gray-600 mb-1"
            >Minimum distance</label
          >
          <input
            v-model.number="local.minimum_distance"
            type="number"
            step="0.01"
            class="w-full px-3 py-2 rounded border bg-white dark:bg-slate-800"
          />
        </div>

        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            v-model="local.show_contours_labels"
            class="form-checkbox h-4 w-4"
          />
          <label class="text-sm font-medium">Show contour labels</label>
        </div>

        <div>
          <label class="block text-xs text-gray-600 mb-1"
            >Contour label scale</label
          >
          <input
            v-model.number="local.contour_label_scale"
            type="number"
            step="0.01"
            class="w-full px-3 py-2 rounded border bg-white dark:bg-slate-800"
          />
        </div>

        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            v-model="local.show_boundary"
            class="form-checkbox h-4 w-4"
          />
          <label class="text-sm font-medium">Show boundary</label>
        </div>

        <div>
          <label class="block text-xs text-gray-600 mb-1"
            >Boundary label scale</label
          >
          <input
            v-model.number="local.boundary_label_scale"
            type="number"
            step="0.01"
            class="w-full px-3 py-2 rounded border bg-white dark:bg-slate-800"
          />
        </div>

        <!-- <div class="flex items-center gap-4 mt-2">
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="local.tin" class="form-checkbox h-4 w-4" />
            <span class="text-sm font-medium">TIN</span>
          </label>

          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="local.grid" class="form-checkbox h-4 w-4" />
            <span class="text-sm font-medium">Grid</span>
          </label>
        </div> -->
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button
        @click="onSave"
        :disabled="submitting"
        class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
      >
        {{ submitting ? "Saving..." : "Save & Continue" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const props = defineProps<{
  modelValue: { settings: any };
  loading?: boolean;
}>();
const emit = defineEmits(["update:modelValue", "complete"]);

const local = reactive<any>({
  show_spot_heights: true,
  point_label_scale: 0.2,
  show_contours: true,
  contour_interval: 1,
  major_contour: 5,
  minimum_distance: 0.1,
  show_contours_labels: true,
  contour_label_scale: 0.5,
  show_boundary: true,
  boundary_label_scale: 0.2,
  tin: false,
  grid: false,
});

const submitting = ref(false);
const route = useRoute();
const planId = String(route.params.plan || "");

watch(
  () => props.modelValue?.settings,
  (v) => {
    if (v && typeof v === "object") {
      Object.assign(local, v);
    }
  },
  { immediate: true, deep: true }
);

// emit changes upward when local changes
watch(
  () => local,
  (v) => {
    emit("update:modelValue", { settings: { ...v } });
  },
  { deep: true }
);

async function onSave() {
  if (submitting.value) return;
  submitting.value = true;
  try {
    const payload = {
      show_spot_heights: !!local.show_spot_heights,
      point_label_scale: Number(local.point_label_scale || 0),
      show_contours: !!local.show_contours,
      contour_interval: Number(local.contour_interval || 0),
      major_contour: Number(local.major_contour || 0),
      minimum_distance: Number(local.minimum_distance || 0),
      show_contours_labels: !!local.show_contours_labels,
      contour_label_scale: Number(local.contour_label_scale || 0),
      show_boundary: !!local.show_boundary,
      boundary_label_scale: Number(local.boundary_label_scale || 0),
      tin: !!local.tin,
      grid: !!local.grid,
    };

    await axios.put(`/plan/topo/setting/edit/${planId}`, payload);
    // notify parent to advance
    emit("complete");
  } catch (err) {
    // best-effort: emit update so parent can show a toast if desired
    emit("update:modelValue", { settings: { ...local } });
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped></style>
