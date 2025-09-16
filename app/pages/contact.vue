<template>
  <div class="relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/10 to-indigo-600/10 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-400/10 to-pink-600/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <!-- Page Header -->
      <div class="text-center mb-12 md:mb-16">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6"
        >
          📞 Get in touch
        </div>

        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          <span
            class="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent"
          >
            Contact Us
          </span>
        </h1>

        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          Have questions about AutoPlan? Need help with your surveying projects?
          We're here to assist you with all your cadastral and topographic
          automation needs.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Contact Form -->
        <div class="space-y-8">
          <div
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-10"
          >
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a message
            </h2>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  for="company"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Company/Organization
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label
                  for="subject"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales & Pricing</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-300"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubmitting">Send Message</span>
                <span v-else class="flex items-center">
                  <div
                    class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"
                  ></div>
                  Sending...
                </span>
                <Icon
                  v-if="!isSubmitting"
                  name="heroicons:paper-airplane-20-solid"
                  class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Contact Details -->
          <div
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-10"
          >
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"
                >
                  <Icon
                    name="heroicons:envelope-20-solid"
                    class="w-6 h-6 text-white"
                  />
                </div>
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Email
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    support@autoplan.app
                  </p>
                  <p class="text-gray-600 dark:text-gray-400">
                    sales@autoplan.app
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center"
                >
                  <Icon
                    name="heroicons:phone-20-solid"
                    class="w-6 h-6 text-white"
                  />
                </div>
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Phone
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    +234 (0) 123 456 7890
                  </p>
                  <p class="text-gray-500 dark:text-gray-500 text-sm">
                    Mon-Fri 9AM-6PM WAT
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center"
                >
                  <Icon
                    name="heroicons:map-pin-20-solid"
                    class="w-6 h-6 text-white"
                  />
                </div>
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Office
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    123 Survey Street<br />Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center"
                >
                  <Icon
                    name="heroicons:clock-20-solid"
                    class="w-6 h-6 text-white"
                  />
                </div>
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Business Hours
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p class="text-gray-600 dark:text-gray-400">
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                  <p class="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <div
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-10"
          >
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Questions
            </h2>

            <div class="space-y-4">
              <details class="group">
                <summary
                  class="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-900 dark:text-white p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-300"
                >
                  How do I get started with AutoPlan?
                  <Icon
                    name="heroicons:chevron-down-20-solid"
                    class="w-5 h-5 group-open:rotate-180 transition-transform duration-300"
                  />
                </summary>
                <div class="mt-3 p-4 text-gray-600 dark:text-gray-400">
                  Simply sign up for a free account and start by creating your
                  first project. You can import coordinates or files to begin
                  your cadastral survey work immediately.
                </div>
              </details>

              <details class="group">
                <summary
                  class="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-900 dark:text-white p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-300"
                >
                  What file formats do you support?
                  <Icon
                    name="heroicons:chevron-down-20-solid"
                    class="w-5 h-5 group-open:rotate-180 transition-transform duration-300"
                  />
                </summary>
                <div class="mt-3 p-4 text-gray-600 dark:text-gray-400">
                  We support various geospatial formats including GeoJSON,
                  Shapefile (.shp), DXF, CAD files, and coordinate text files
                  for seamless integration with your existing workflow.
                </div>
              </details>

              <details class="group">
                <summary
                  class="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-900 dark:text-white p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-300"
                >
                  Do you offer technical support?
                  <Icon
                    name="heroicons:chevron-down-20-solid"
                    class="w-5 h-5 group-open:rotate-180 transition-transform duration-300"
                  />
                </summary>
                <div class="mt-3 p-4 text-gray-600 dark:text-gray-400">
                  Yes! We provide comprehensive technical support via email and
                  phone during business hours. Our team of surveying experts is
                  ready to help you with any questions.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

definePageMeta({
  layout: "website",
});

// Form data
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;

  // Simulate form submission
  try {
    // Replace this with actual form submission logic
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form on success
    form.value = {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    };

    // You could show a success message here
    alert("Thank you for your message! We'll get back to you soon.");
  } catch (error) {
    // Handle error
    alert("Sorry, there was an error sending your message. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

// Set page metadata
useHead({
  title: "Contact Us - AutoPlan",
  meta: [
    {
      name: "description",
      content:
        "Get in touch with AutoPlan for support, sales inquiries, or general questions about our cadastral and topographic plan automation platform.",
    },
    {
      property: "og:title",
      content: "Contact Us - AutoPlan",
    },
    {
      property: "og:description",
      content:
        "Contact the AutoPlan team for assistance with your surveying and cadastral automation needs.",
    },
  ],
});
</script>

<style scoped>
/* All styles handled by Tailwind CSS classes */
</style>
