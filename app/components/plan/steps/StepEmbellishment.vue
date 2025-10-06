<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Plan Embellishment
    </h2>

    <!-- Project's Information -->
    <!-- <div
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
    </div> -->

    <!-- Parcel's Information -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Parcel's Information
      </h3>
      <!-- Title field - Full width -->
      <div class="space-y-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Title</label
          >
          <ClientOnly>
            <QuillEditorClient
              v-model="local.embellishment.title"
              placeholder="Survey Plan Title"
            />
            <template #fallback>
              <div
                class="w-full h-[140px] rounded-md border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 flex items-center justify-center"
              >
                <span class="text-gray-500 dark:text-gray-400 text-sm"
                  >Loading editor...</span
                >
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
      <!-- Other fields in grid layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          <select
            name="scale"
            id="scale"
            v-model="local.embellishment.scale"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="500">1:500</option>
            <option value="1000">1:1000</option>
            <option value="1500">1:1500</option>
            <option value="2000">1:2000</option>
          </select>
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Beacon Size</label
          >
          <input
            v-model.number="local.embellishment.beacon_size"
            type="number"
            step="0.1"
            min="0.1"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Label Size</label
          >
          <input
            v-model.number="local.embellishment.label_size"
            type="number"
            step="0.1"
            min="0.1"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="sm:col-span-2 lg:col-span-5">
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
                value="box"
                v-model="local.embellishment.beacon_type"
              />
              <SvgsBox class="w-15 h-15" />
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Settings -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Page Settings
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Page Size</label
          >
          <select
            v-model="local.embellishment.page_size"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="A2">A2</option>
          </select>
        </div>
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Page Orientation</label
          >
          <select
            v-model="local.embellishment.page_orientation"
            class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Footers -->
    <div
      class="bg-gray-50 dark:bg-slate-900/40 rounded-md border border-gray-200 dark:border-slate-700 p-4 space-y-4"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Footers
      </h3>
      <div class="space-y-4">
        <div
          v-for="(footer, index) in safeFooters"
          :key="index"
          class="relative"
        >
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Footer {{ index + 1 }}</label
          >
          <div class="relative">
            <ClientOnly>
              <QuillEditorClient
                :model-value="footer || ''"
                @update:model-value="updateFooter(index, $event)"
                :placeholder="`Enter footer ${index + 1}...`"
              />
              <template #fallback>
                <div
                  class="w-full h-[100px] rounded-md border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 flex items-center justify-center"
                >
                  <span class="text-gray-500 dark:text-gray-400 text-sm"
                    >Loading editor...</span
                  >
                </div>
              </template>
            </ClientOnly>
            <button
              v-if="safeFooters.length > 1"
              @click="removeFooter(index)"
              type="button"
              class="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold z-10"
            >
              ×
            </button>
          </div>
        </div>
        <button
          @click="addFooter"
          type="button"
          class="w-full py-2 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Add Footer
        </button>
      </div>
      <div class="mt-4">
        <label
          class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Footer Size</label
        >
        <input
          v-model.number="local.embellishment.footer_size"
          type="number"
          step="0.1"
          min="0.1"
          class="w-full text-sm rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
  beacon_size: number;
  label_size: number;
  personel_name: string;
  surveyor_name: string;
  page_size: string;
  page_orientation: string;
  footers: string[];
  footer_size: number;
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
    font_size: 1,
    title: "",
    address: "",
    local_govt: "",
    state: "",
    plan_number: "",
    origin: "utm_zone_31",
    scale: 1,
    beacon_type: "none",
    beacon_size: 0.75,
    label_size: 0.25,
    personel_name: "",
    surveyor_name: "",
    page_size: "A4",
    page_orientation: "portrait",
    footers: [""],
    footer_size: 1,
  },
});

watch(
  () => props.modelValue,
  (v) => {
    if (v?.embellishment) {
      local.embellishment = {
        ...local.embellishment,
        ...v.embellishment,
        footers: v.embellishment.footers?.length
          ? v.embellishment.footers
          : [""],
      };
    }
  },
  { immediate: true, deep: true }
);

const loading = computed(() => !!props.loading);

// Ensure footers are always properly initialized
const safeFooters = computed(() => {
  return local.embellishment.footers.length > 0
    ? local.embellishment.footers
    : [""];
});

function addFooter() {
  local.embellishment.footers.push("");
}

function removeFooter(index: number) {
  local.embellishment.footers.splice(index, 1);
}

function updateFooter(index: number, value: string) {
  local.embellishment.footers[index] = value;
}

function onComplete() {
  emit("update:modelValue", { embellishment: { ...local.embellishment } });
  emit("complete");
}
</script>
