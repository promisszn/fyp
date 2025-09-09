<template>
  <UserHeader />

  <!-- Add top padding so content isn't hidden under the fixed header -->
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back navigation -->
      <div class="mb-4">
        <button
          @click="navigateTo('/dashboard')"
          class="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <RiArrowLeftLine class="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      <h1
        class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6"
      >
        Project Details
      </h1>

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-6">
        <!-- Project details skeleton -->
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div
            class="h-8 bg-gray-200 dark:bg-slate-600 rounded animate-pulse mb-4 w-3/4"
          ></div>
          <div
            class="h-4 bg-gray-200 dark:bg-slate-600 rounded animate-pulse mb-2 w-full"
          ></div>
          <div
            class="h-4 bg-gray-200 dark:bg-slate-600 rounded animate-pulse mb-4 w-2/3"
          ></div>
          <div
            class="h-3 bg-gray-200 dark:bg-slate-600 rounded animate-pulse w-1/3"
          ></div>
        </div>

        <!-- Plans skeleton -->
        <div>
          <div
            class="h-6 bg-gray-200 dark:bg-slate-600 rounded animate-pulse mb-4 w-1/4"
          ></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="n in 4"
              :key="n"
              class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 space-y-3"
            >
              <div
                class="h-5 bg-gray-200 dark:bg-slate-600 rounded animate-pulse w-3/4"
              ></div>
              <div
                class="h-4 bg-gray-200 dark:bg-slate-600 rounded animate-pulse w-1/2"
              ></div>
              <div
                class="h-3 bg-gray-200 dark:bg-slate-600 rounded animate-pulse w-2/3"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else class="space-y-6">
        <!-- Project Overview -->
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div
            class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4"
          >
            <div class="flex-1">
              <h2
                class="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100 capitalize"
              >
                {{ project.name }}
              </h2>
              <div
                class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3"
              >
                <span v-if="project.number"
                  >Project No: {{ project.number }}</span
                >
                <span v-if="project.type" class="capitalize"
                  >Type: {{ project.type }}</span
                >
                <span v-if="project.created_at"
                  >Created: {{ formatDate(project.created_at) }}</span
                >
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div v-if="project.status">
                <span
                  :class="getStatusClass(project.status)"
                  class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700 capitalize"
                >
                  {{ project.status }}
                </span>
              </div>
              <!-- Action buttons -->
              <div class="flex items-center gap-2">
                <button
                  @click="editProject"
                  class="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Edit Project"
                >
                  <RiEditLine class="w-4 h-4" />
                </button>
                <button
                  @click="deleteProject"
                  class="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Delete Project"
                >
                  <RiDeleteBinLine class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <p
            v-if="project.description"
            class="text-gray-700 dark:text-gray-300 mb-4"
          >
            {{ project.description }}
          </p>

          <!-- Project Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Client Information -->
            <div>
              <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Client
              </h4>
              <div class="text-sm space-y-1">
                <div v-if="project.client?.name || project.client?.email || project.client?.phone">
                  <div v-if="project.client.name" class="text-gray-700 dark:text-gray-300">
                    {{ project.client.name }}
                  </div>
                  <div v-if="project.client.email" class="text-gray-500 dark:text-gray-400">
                    {{ project.client.email }}
                  </div>
                  <div v-if="project.client.phone" class="text-gray-500 dark:text-gray-400">
                    {{ project.client.phone }}
                  </div>
                </div>
                <div v-else class="text-gray-500 dark:text-gray-400">N/A</div>
              </div>
            </div>

            <!-- Surveyor Information -->
            <div>
              <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Surveyor
              </h4>
              <div class="text-sm space-y-1">
                <div v-if="project.surveyor?.name || project.surveyor?.license_no">
                  <div v-if="project.surveyor.name" class="text-gray-700 dark:text-gray-300">
                    {{ project.surveyor.name }}
                  </div>
                  <div v-if="project.surveyor.license_no" class="text-gray-500 dark:text-gray-400">
                    License: {{ project.surveyor.license_no }}
                  </div>
                </div>
                <div v-else class="text-gray-500 dark:text-gray-400">N/A</div>
              </div>
            </div>

            <!-- Location Information -->
            <div>
              <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Location
              </h4>
              <div class="text-sm space-y-1">
                <div v-if="project.location?.address || project.location?.city || project.location?.state || project.location?.country">
                  <div v-if="project.location.address" class="text-gray-700 dark:text-gray-300">
                    {{ project.location.address }}
                  </div>
                  <div v-if="project.location.city || project.location.state" class="text-gray-500 dark:text-gray-400">
                    {{ getLocationText() }}
                  </div>
                  <div v-if="project.location.country" class="text-gray-500 dark:text-gray-400">
                    {{ project.location.country }}
                  </div>
                </div>
                <div v-else class="text-gray-500 dark:text-gray-400">N/A</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3
            class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100"
          >
            Plans
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="plan in plans"
              :key="plan.id"
              class="bg-white dark:bg-slate-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow border border-gray-200 dark:border-slate-600"
            >
              <div
                class="font-bold text-lg mb-1 text-gray-800 dark:text-gray-200"
              >
                {{ plan.name }}
              </div>
              <div class="text-gray-600 dark:text-gray-300 mb-2">
                Software: {{ plan.software }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Type: {{ plan.type }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Project Modal -->
  <EditProjectModal
    v-model="showEditModal"
    :project="project"
    @updated="onProjectUpdated"
  />

  <!-- Delete Confirmation Modal -->
  <ConfirmModal
    v-model="showDeleteModal"
    title="Delete Project"
    message="Are you sure you want to delete this project? This action cannot be undone."
    @confirm="confirmDelete"
  />
</template>

<script lang="ts" setup>
import { RiArrowLeftLine, RiEditLine, RiDeleteBinLine } from "@remixicon/vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface ProjectData {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    email: string;
    first_name: string;
    last_name: string;
    image?: string;
    id: string;
  };
  name: string;
  description: string;
  number?: string;
  type: string;
  status?: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  client?: {
    name: string;
    email: string;
    phone?: string;
  };
  surveyor?: {
    name: string;
    license_no?: string;
  };
}

const toast = useToast();
const route = useRoute();
const project = ref<ProjectData>({ name: "", description: "", type: "" });
const loading = ref(true);

// Modal states
const showEditModal = ref(false);
const showDeleteModal = ref(false);

// Format date function
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Status class function (matching dashboard styles)
const getStatusClass = (status: string) => {
  const raw = (status || "").toLowerCase();

  const statusClasses: Record<string, string> = {
    draft: "text-gray-600 dark:text-gray-400",
    in_progress: "text-yellow-600 font-semibold",
    field_work_complete: "text-blue-600 font-semibold",
    computed: "text-indigo-600 font-semibold",
    plan_prepared: "text-green-600 font-semibold",
    completed: "text-green-600 font-semibold",
  };

  return statusClasses[raw] ?? "text-gray-600 dark:text-gray-400";
};

// Get location text (city, state)
const getLocationText = () => {
  const city = project.value.location?.city;
  const state = project.value.location?.state;
  
  if (city && state) {
    return `${city}, ${state}`;
  } else if (city) {
    return city;
  } else if (state) {
    return state;
  } else {
    return '';
  }
};

// Action functions
const editProject = () => {
  showEditModal.value = true;
};

const deleteProject = () => {
  showDeleteModal.value = true;
};

// Handle project update
const onProjectUpdated = (updatedProject: ProjectData) => {
  project.value = updatedProject;
  showEditModal.value = false;
};

// Handle project deletion
const confirmDelete = async () => {
  try {
    await axios.delete(`/project/delete/${project.value.id}`);
    toast.add({
      title: "Project deleted successfully",
      color: "success",
    });
    navigateTo("/dashboard");
  } catch (error) {
    toast.add({
      title: "Failed to delete project",
      color: "error",
    });
  }
  showDeleteModal.value = false;
};

// Dummy plans data
const plans = ref([
  {
    id: 1,
    name: "Topographic Survey Plan",
    software: "AutoCAD",
    type: "Topographic",
  },
  {
    id: 2,
    name: "Boundary Survey Plan",
    software: "Civil 3D",
    type: "Boundary",
  },
  {
    id: 3,
    name: "Construction Layout Plan",
    software: "AutoCAD",
    type: "Construction",
  },
]);

onMounted(async () => {
  try {
    const { id } = route.params;
    const res = await axios.get(`/project/fetch/${id}`);
    project.value = res.data.data;
  } catch (e) {
    toast.add({
      title: "Failed to load project. Redirecting to projects list.",
      color: "error",
    });
    navigateTo("/projects");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
