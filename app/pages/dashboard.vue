<template>
  <UserHeader />

  <!-- Add top padding so content isn't hidden under the fixed header -->
  <div class="min-h-screen bg-gray-50 pt-20 pb-8">
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold text-gray-800">Projects</h1>
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Project
        </button>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <!-- Loading skeleton -->
        <div v-if="loading" class="space-y-4">
          <div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          <div class="overflow-hidden">
            <div class="grid grid-cols-5 gap-4 mb-2">
              <div
                v-for="n in 5"
                :key="n"
                class="h-4 bg-gray-200 rounded animate-pulse"
              ></div>
            </div>
            <div class="space-y-2">
              <div
                v-for="r in 4"
                :key="r"
                class="h-8 bg-gray-200 rounded animate-pulse"
              ></div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div v-else>
          <table class="min-w-full text-sm text-left">
            <thead>
              <tr class="text-xs text-gray-500 uppercase">
                <th class="py-2 px-3">Project No.</th>
                <th class="py-2 px-3">Name</th>
                <th class="py-2 px-3">Type</th>
                <th class="py-2 px-3">Status</th>
                <th class="py-2 px-3">Created</th>
                <th class="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in projects"
                :key="project.id"
                class="border-t"
              >
                <td class="py-3 px-3 font-medium text-gray-800">
                  {{ project.number || "n/a" }}
                </td>
                <td class="py-3 px-3 font-medium text-gray-800">
                  {{ project.name }}
                </td>
                <td class="py-3 px-3 text-gray-600">
                  {{ project.type || "n/a" }}
                </td>
                <td class="py-3 px-3">
                  <span :class="statusClass(project.status)">{{
                    project.status || "n/a"
                  }}</span>
                </td>
                <td class="py-3 px-3 text-gray-600">
                  {{ formatDate(project.created_at) }}
                </td>
                <td class="py-3 px-3">
                  <button
                    class="text-blue-600 hover:underline"
                    @click="openProject(project)"
                  >
                    Open
                  </button>
                </td>
              </tr>

              <tr v-if="projects.length === 0">
                <td colspan="5" class="py-6 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <CreateProjectModal v-model="showCreateModal" @created="onProjectCreated" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

import { ref, onMounted } from "vue";
import axios from "axios";
import { useRuntimeConfig, navigateTo } from "#imports";

const config = useRuntimeConfig();
const toast = useToast();

const projects = ref<any[]>([]);
const loading = ref(true);

const showCreateModal = ref(false);

const fetchProjects = async () => {
  loading.value = true;
  try {
    // follow existing project conventions (response.data.data)
    const res = await axios.get(`${config.public.BASE_URL}/project/list`);
    projects.value = res.data?.data ?? res.data ?? [];
  } catch (e: any) {
    toast.add({ title: "Failed to load projects.", color: "error" });
    projects.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProjects();
});

function formatDate(v: string | null | undefined) {
  if (!v) return "-";
  try {
    return new Date(v).toLocaleString();
  } catch (e) {
    return String(v);
  }
}

function statusClass(status: string | null | undefined) {
  const s = (status || "").toLowerCase();
  if (s === "active" || s === "running" || s === "open")
    return "text-green-600 font-semibold";
  if (s === "pending" || s === "waiting")
    return "text-yellow-600 font-semibold";
  if (s === "failed" || s === "closed" || s === "archived")
    return "text-red-600 font-semibold";
  return "text-gray-600";
}

function openProject(p: any) {
  const id = p?.id || p?.project_id;
  if (!id) {
    toast.add({ title: "Cannot open project: missing id.", color: "error" });
    return;
  }
  navigateTo(`/project/${id}`);
}

// createProject handled in CreateProjectModal; parent listens for 'created' event

function onProjectCreated(p: any) {
  projects.value.unshift(p);
}
</script>

<style scoped></style>
