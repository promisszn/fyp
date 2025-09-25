<template>
  <div class="flex justify-end mb-2">
    <button
      @click="onComplete"
      :disabled="!modelValue.coordinates.length || submitting"
      class="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
    >
      Save & Continue
    </button>
  </div>

  <StepTopoPointsTable
    :model-value="tableModel"
    @update:modelValue="onUpdate"
  />
  <div class="flex justify-end mt-6">
    <button
      @click="onComplete"
      :disabled="!modelValue.coordinates.length || submitting"
      class="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
    >
      Save & Continue
    </button>
  </div>
</template>

<script lang="ts" setup>
import StepTopoPointsTable from "./StepTopoPointsTable.vue";
import { ref, watch } from "vue";
import { computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "complete"]);
const route = useRoute();
const planId = route.params.plan as string;
const submitting = ref(false);

// Stable wrapper for table model to avoid recreating object each render
const tableModel = computed(() => ({
  coordinates: props.modelValue.coordinates,
}));

function onUpdate(v: { coordinates: any[] }) {
  emit("update:modelValue", v);
}

async function onComplete() {
  if (submitting.value) return;
  if (!props.modelValue.coordinates.length) return;
  try {
    submitting.value = true;
    const payload = {
      coordinates: props.modelValue.coordinates.map((r: any) => ({
        id: r.point,
        northing: r.northing != null ? Number(r.northing) : 0,
        easting: r.easting != null ? Number(r.easting) : 0,
        elevation: r.elevation != null ? Number(r.elevation) : 0,
      })),
    };

    await axios.put(`/plan/coordinates/edit/${planId}`, payload);
    emit("complete");
  } catch (error) {
    // handle error, optionally emit error event
  } finally {
    submitting.value = false;
  }
}
</script>
