<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Drawing</h2>
    <div class="p-4 border border-dashed border-gray-300 dark:border-slate-600 rounded-md text-center text-sm text-gray-500 dark:text-gray-400">
      <p class="mb-2">Upload or generate drawing (placeholder).</p>
      <input type="file" @change="onFile" class="block mx-auto text-xs" />
      <p v-if="local.drawing.fileName" class="mt-2 text-xs text-green-600">Selected: {{ local.drawing.fileName }}</p>
    </div>
    <div class="flex justify-end gap-3">
      <button @click="onComplete" :disabled="!local.drawing.fileName" class="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Save & Continue</button>
    </div>
    <p class="text-[11px] text-gray-500 dark:text-gray-400">Select a drawing file to proceed.</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

interface DrawingState {
  file: File | null;
  fileName: string;
}

const props = defineProps<{ modelValue: { drawing: DrawingState } }>();
const emit = defineEmits(["update:modelValue", "complete"]);

const local = reactive<{ drawing: DrawingState }>({ drawing: { file: null, fileName: "" } });

watch(
  () => props.modelValue,
  (v) => {
    if (v) local.drawing = { ...v.drawing };
  },
  { immediate: true, deep: true }
);

function onFile(evt: Event) {
  const input = evt.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const f = input.files[0];
    local.drawing.file = f;
    local.drawing.fileName = f.name;
  }
}
function onComplete() {
  if (!local.drawing.fileName) return;
  emit("update:modelValue", { drawing: { ...local.drawing } });
  emit("complete");
}
</script>
