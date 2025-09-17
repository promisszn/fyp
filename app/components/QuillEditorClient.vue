<template>
  <div
    class="quill-wrapper border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 overflow-hidden text-gr"
  >
    <component
      :is="QuillEditor"
      v-if="QuillEditor"
      :content="modelValue"
      contentType="html"
      theme="snow"
      :options="quillOptions"
      :placeholder="placeholder"
      class="min-h-[100px]"
      @update:content="handleContentChange"
    />
    <div v-else class="min-h-[100px] flex items-center justify-center">
      <span class="text-gray-500 dark:text-gray-400 text-sm"
        >Loading editor...</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  modelValue: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

// Dynamic import of QuillEditor
const QuillEditor = ref<any>(null);

onMounted(async () => {
  try {
    const { QuillEditor: QE } = await import("@vueup/vue-quill");
    await import("@vueup/vue-quill/dist/vue-quill.snow.css");
    QuillEditor.value = QE;
  } catch (error) {
    console.error("Failed to load Quill editor:", error);
  }
});

// Handle content changes and emit to parent
function handleContentChange(value: string) {
  emit("update:modelValue", value);
}

// Quill editor options
const quillOptions = {
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  },
  theme: "snow",
};
</script>

<style scoped>
.quill-wrapper :deep(.ql-editor) {
  color: rgb(17 24 39); /* text-gray-900 */
  font-size: 0.875rem; /* text-sm */
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
}

.dark .quill-wrapper :deep(.ql-editor) {
  color: rgb(243 244 246); /* dark:text-gray-100 */
  background-color: rgb(51 65 85); /* dark:bg-slate-700 */
}

.quill-wrapper :deep(.ql-toolbar) {
  border-bottom: 1px solid rgb(209 213 219); /* border-gray-300 */
  padding: 0.5rem;
}

.dark .quill-wrapper :deep(.ql-toolbar) {
  border-bottom-color: rgb(71 85 105); /* dark:border-slate-600 */
  background-color: rgb(51 65 85); /* dark:bg-slate-700 */
}

.quill-wrapper :deep(.ql-container) {
  border: none;
  font-family: inherit;
}

.quill-wrapper :deep(.ql-editor.ql-blank::before) {
  color: rgb(156 163 175); /* text-gray-400 */
  font-style: normal;
}

.dark .quill-wrapper :deep(.ql-editor.ql-blank::before) {
  color: rgb(107 114 128); /* dark:text-gray-500 */
}
</style>
