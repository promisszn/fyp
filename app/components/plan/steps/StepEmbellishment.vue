<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Plan Embellishment
    </h2>

    <!-- Project's Information -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Project's Information
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >File / Template Name</label
          >
          <input
            v-model="local.embellishment.name"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Auto Plan"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Personnel Name</label
          >
          <input
            v-model="local.embellishment.personel_name"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Surveyor / Supervisor</label
          >
          <input
            v-model="local.embellishment.surveyor_name"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Surveyor Alabi"
          />
        </div>
      </div>
    </div>

    <!-- Parcel's Information -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Parcel's Information
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Title</label
          >
          <input
            v-model="local.embellishment.title"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Survey Plan Title"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Address</label
          >
          <input
            v-model="local.embellishment.address"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Street, City"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Local Govt</label
          >
          <input
            v-model="local.embellishment.local_govt"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="LGA"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >State</label
          >
          <input
            v-model="local.embellishment.state"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="State"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Plan Number</label
          >
          <input
            v-model="local.embellishment.plan_number"
            type="text"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="PLN12345"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Origin</label
          >
          <select
            v-model="local.embellishment.origin"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="utm_zone_31">U.T.M. Zone 31</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Formatting & Symbols -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Text & Symbols
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Font</label
          >
          <select
            v-model="local.embellishment.font"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Font Size</label
          >
          <input
            v-model.number="local.embellishment.font_size"
            type="number"
            min="6"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Scale</label
          >
          <input
            v-model.number="local.embellishment.scale"
            type="number"
            min="1"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="sm:col-span-3">
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Beacon Type</label
          >
          <div class="flex flex-wrap gap-3">
            <label
              class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <input
                type="radio"
                class="accent-blue-600"
                value="none"
                v-model="local.embellishment.beacon_type"
              />
              <span>None</span>
            </label>
            <label
              class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <input
                type="radio"
                class="accent-blue-600"
                value="dot"
                v-model="local.embellishment.beacon_type"
              />
              <SvgsDot class="w-15 h-15" />
            </label>
            <label
              class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <input
                type="radio"
                class="accent-blue-600"
                value="circle"
                v-model="local.embellishment.beacon_type"
              />
              <SvgsCircle class="w-15 h-15" />
            </label>
            <label
              class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <input
                type="radio"
                class="accent-blue-600"
                value="square"
                v-model="local.embellishment.beacon_type"
              />
              <SvgsBox class="w-15 h-15" />
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Notes -->
    <!-- <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes / Annotations</label>
      <textarea
        v-model="local.embellishment.notes"
        rows="4"
        class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter legend, north arrow notes, disclaimers..."
      />
    </div> -->

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

interface EmbellishmentState {
  name: string;
  font: string;
  font_size: number;
  title: string;
  address: string;
  local_govt: string;
  state: string;
  plan_number: string;
  origin: string;
  scale: number;
  beacon_type: string;
  personel_name: string;
  surveyor_name: string;
}

const props = defineProps<{
  modelValue: { embellishment: EmbellishmentState };
  loading?: boolean;
}>();
const emit = defineEmits(["update:modelValue", "complete"]);

const local = reactive<{ embellishment: EmbellishmentState }>({
  embellishment: {
    name: "",
    font: "Arial",
    font_size: 12,
    title: "",
    address: "",
    local_govt: "",
    state: "",
    plan_number: "",
    origin: "utm_zone_31",
    scale: 1,
    beacon_type: "none",
    personel_name: "",
    surveyor_name: "",
  },
});

watch(
  () => props.modelValue,
  (v) => {
    if (v?.embellishment) {
      local.embellishment = { ...local.embellishment, ...v.embellishment };
    }
  },
  { immediate: true, deep: true }
);

const loading = computed(() => !!props.loading);

function onComplete() {
  emit("update:modelValue", { embellishment: { ...local.embellishment } });
  emit("complete");
}
</script>
