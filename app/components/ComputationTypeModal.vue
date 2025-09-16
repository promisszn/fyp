<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="onClose"></div>

    <div class="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full mx-4 z-10 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Choose Computation Type
        </h3>
        <button @click="onClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Select the type of computation you want to perform:
      </p>

      <div class="space-y-3">
        <!-- Forward Computation Option -->
        <button
          @click="selectComputationType('forward')"
          class="w-full p-4 text-left border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
        >
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-1">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400">
                Forward Computation
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Calculate coordinates of unknown points using known points, bearings, and distances.
              </p>
            </div>
          </div>
        </button>

        <!-- Traverse Computation Option -->
        <button
          @click="selectComputationType('traverse')"
          class="w-full p-4 text-left border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
        >
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-1">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Traverse Computation
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Perform traverse calculations for a series of connected survey points.
              </p>
            </div>
          </div>
        </button>
      </div>

      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-slate-600">
        <button
          @click="onClose"
          class="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ 
  modelValue: boolean 
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'select': [type: 'forward' | 'traverse']
}>();

function onClose() {
  emit('update:modelValue', false);
}

function selectComputationType(type: 'forward' | 'traverse') {
  emit('select', type);
  emit('update:modelValue', false);
}
</script>
