<template>
  <UserHeader />

  <!-- Add top padding so content isn't hidden under the fixed header -->
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">Projects</h1>
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          Create Project
        </button>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
        <!-- Loading skeleton -->
        <div v-if="loading" class="space-y-4">
          <!-- Desktop skeleton -->
          <div class="hidden md:block overflow-hidden">
            <div class="grid grid-cols-6 gap-4 mb-2">
              <div
                v-for="n in 6"
                :key="n"
                class="h-4 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"
              ></div>
            </div>
            <div class="space-y-2">
              <div
                v-for="r in 4"
                :key="r"
                class="h-8 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"
              ></div>
            </div>
          </div>
          <!-- Mobile skeleton -->
          <div class="md:hidden space-y-4">
            <div
              v-for="r in 3"
              :key="r"
              class="p-4 border border-gray-200 dark:border-slate-600 rounded-lg space-y-3"
            >
              <div class="h-4 bg-gray-200 dark:bg-slate-600 rounded animate-pulse w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-slate-600 rounded animate-pulse w-1/2"></div>
              <div class="h-3 bg-gray-200 dark:bg-slate-600 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- Desktop Table View -->
          <div class="hidden md:block overflow-x-auto">
            <table class="min-w-full text-sm text-left">
              <thead>
                <tr class="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  <th class="py-2 px-3">Project No.</th>
                  <th class="py-2 px-3">Name</th>
                  <th class="py-2 px-3 hidden lg:table-cell">Type</th>
                  <th class="py-2 px-3">Status</th>
                  <th class="py-2 px-3 hidden xl:table-cell">Created</th>
                  <th class="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="project in projects"
                  :key="project.id"
                  class="border-t border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                >
                  <td class="py-3 px-3 font-medium text-gray-800 dark:text-gray-200">
                    {{ project.number || "n/a" }}
                  </td>
                  <td class="py-3 px-3 font-medium text-gray-800 dark:text-gray-200 capitalize">
                    <div class="max-w-xs truncate">{{ project.name }}</div>
                  </td>
                  <td class="py-3 px-3 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                    {{ project.type || "n/a" }}
                  </td>
                  <td class="py-3 px-3">
                    <span :class="statusClass(project.status)" class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700">{{
                      project.status || "n/a"
                    }}</span>
                  </td>
                  <td class="py-3 px-3 text-gray-600 dark:text-gray-300 hidden xl:table-cell text-xs">
                    {{ formatDate(project.created_at) }}
                  </td>
                  <td class="py-3 px-3 relative">
                    <!-- action button -->
                    <button
                      @click.stop="toggleDropdown(project.id)"
                      class="hover:text-blue-600 text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer p-1 rounded"
                      aria-haspopup="true"
                      :aria-expanded="activeDropdown === project.id"
                    >
                      <RiMore2Fill />
                    </button>

                    <!-- dropdown -->
                    <div
                      v-if="activeDropdown === project.id"
                      @click.stop
                      class="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded shadow z-20"
                    >
                      <ul class="divide-y divide-gray-200 dark:divide-slate-600">
                        <li>
                          <button
                            @click="
                              openProject(project);
                              activeDropdown = null;
                            "
                            class="w-full text-left px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            View
                          </button>
                        </li>
                        <li>
                          <button
                            @click="
                              editProject(project);
                              activeDropdown = null;
                            "
                            class="w-full text-left px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            @click="
                              deleteProject(project);
                              activeDropdown = null;
                            "
                            class="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>

                <tr v-if="projects.length === 0">
                  <td colspan="6" class="py-6 text-center text-gray-500 dark:text-gray-400">
                    No projects found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Card View -->
          <div class="md:hidden space-y-4">
            <div
              v-for="project in projects"
              :key="project.id"
              class="p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:shadow-md transition-shadow"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200 capitalize truncate">
                    {{ project.name }}
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    #{{ project.number || "n/a" }}
                  </p>
                </div>
                <button
                  @click.stop="toggleDropdown(project.id)"
                  class="flex-shrink-0 ml-2 hover:text-blue-600 text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer p-1 rounded"
                  aria-haspopup="true"
                  :aria-expanded="activeDropdown === project.id"
                >
                  <RiMore2Fill />
                </button>

                <!-- Mobile dropdown -->
                <div
                  v-if="activeDropdown === project.id"
                  @click.stop
                  class="absolute right-4 mt-8 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded shadow z-20"
                >
                  <ul class="divide-y divide-gray-200 dark:divide-slate-600">
                    <li>
                      <button
                        @click="
                          openProject(project);
                          activeDropdown = null;
                        "
                        class="w-full text-left px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                      >
                        View
                      </button>
                    </li>
                    <li>
                      <button
                        @click="
                          editProject(project);
                          activeDropdown = null;
                        "
                        class="w-full text-left px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        @click="
                          deleteProject(project);
                          activeDropdown = null;
                        "
                        class="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500 dark:text-gray-400">Type:</span>
                  <span class="text-gray-700 dark:text-gray-300">{{ project.type || "n/a" }}</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500 dark:text-gray-400">Status:</span>
                  <span :class="statusClass(project.status)" class="px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700">{{
                    project.status || "n/a"
                  }}</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500 dark:text-gray-400">Created:</span>
                  <span class="text-gray-700 dark:text-gray-300">{{ formatDate(project.created_at) }}</span>
                </div>
              </div>
            </div>

            <div v-if="projects.length === 0" class="py-8 text-center text-gray-500 dark:text-gray-400">
              No projects found.
            </div>
          </div>
        </div>
      </div>
    </div>

    <CreateProjectModal v-model="showCreateModal" @created="onProjectCreated" />
    <EditProjectModal
      v-model="showEditModal"
      :project="editingProject"
      @updated="onProjectUpdated"
    />
    <ConfirmModal
      v-model="showConfirmDelete"
      title="Delete project"
      :message="confirmMessage"
      @confirmed="onConfirmedDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import { RiMore2Fill } from "@remixicon/vue";
definePageMeta({
  middleware: ["auth"],
});

import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRuntimeConfig, navigateTo } from "#imports";

const config = useRuntimeConfig();
const toast = useToast();

const projects = ref<any[]>([]);
const loading = ref(true);

const showCreateModal = ref(false);

const activeDropdown = ref<number | string | null>(null);

const showEditModal = ref(false);
const editingProject = ref<any | null>(null);

const showConfirmDelete = ref(false);
const projectToDelete = ref<any | null>(null);
const confirmMessage = ref(
  "Are you sure you want to delete this project? This cannot be undone."
);

const fetchProjects = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${config.public.BASE_URL}/project/list`);
    projects.value = res.data?.data ?? res.data ?? [];
  } catch (e: any) {
    toast.add({ title: "Failed to load projects.", color: "error" });
    projects.value = [];
  } finally {
    loading.value = false;
  }
};

function toggleDropdown(id: any) {
  activeDropdown.value = activeDropdown.value === id ? null : id;
}

function handleOutsideClick() {
  activeDropdown.value = null;
}

onMounted(() => {
  fetchProjects();
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function formatDate(v: string | null | undefined) {
  if (!v) return "-";
  try {
    const dt = new Date(v);
    if (isNaN(dt.getTime())) return String(v);

    const fmt = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const parts = fmt.formatToParts(dt);
    return parts
      .map((p) => (p.type === "dayPeriod" ? p.value.toLowerCase() : p.value))
      .join("");
  } catch (e) {
    return String(v);
  }
}

function statusClass(status: string | null | undefined) {
  const raw = (status || "").toLowerCase();

  const map: Record<string, string> = {
    draft: "text-gray-600 dark:text-gray-400",
    in_progress: "text-yellow-600 font-semibold",
    field_work_complete: "text-blue-600 font-semibold",
    computed: "text-indigo-600 font-semibold",
    plan_prepared: "text-green-600 font-semibold",
    completed: "text-green-600 font-semibold",
  };

  return map[raw] ?? "text-gray-600 dark:text-gray-400";
}

function openProject(p: any) {
  const id = p?.id;
  if (!id) {
    toast.add({ title: "Cannot open project: missing id.", color: "error" });
    return;
  }
  navigateTo(`/project/${id}`);
}

function editProject(p: any) {
  const id = p?.id;
  if (!id) {
    toast.add({ title: "Cannot edit project: missing id.", color: "error" });
    return;
  }
  // open edit modal (prefer modal over navigation)
  editingProject.value = p;
  showEditModal.value = true;
}

async function deleteProject(p: any) {
  const id = p?.id;
  if (!id) {
    toast.add({ title: "Cannot delete project: missing id.", color: "error" });
    return;
  }

  projectToDelete.value = p;
  confirmMessage.value = `Are you sure you want to delete project "${
    p?.name || p?.number || id
  }"? This cannot be undone.`;
  showConfirmDelete.value = true;
}

async function onConfirmedDelete() {
  const p = projectToDelete.value;
  const id = p?.id;
  if (!id) return;
  try {
    await axios.delete(`${config.public.BASE_URL}/project/delete/${id}`);
    projects.value = projects.value.filter((pr) => pr.id !== id);
    toast.add({ title: "Project deleted.", color: "success" });
  } catch (e: any) {
    toast.add({ title: "Failed to delete project.", color: "error" });
  } finally {
    projectToDelete.value = null;
  }
}

function onProjectUpdated(updated: any) {
  // replace the project in the list
  const id = updated?.id;
  if (!id) return;
  const idx = projects.value.findIndex((p) => p.id === id);
  if (idx !== -1)
    projects.value.splice(idx, 1, { ...projects.value[idx], ...updated });
  else projects.value.unshift(updated);
}

function onProjectCreated(p: any) {
  projects.value.unshift(p);
}
</script>

<style scoped></style>
