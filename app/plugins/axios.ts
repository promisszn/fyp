import axios from "axios";
import { defineNuxtPlugin, useCookie, useRuntimeConfig } from "#imports";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Set baseURL from runtime config if available
  if (config?.public?.BASE_URL) {
    axios.defaults.baseURL = config.public.BASE_URL;
  }

  // Add a request interceptor to attach headers for non-auth endpoints
  axios.interceptors.request.use((req) => {
    if (!req || !req.url) return req;

    const url = String(req.url);

    // Don't add headers for login-related auth endpoints (these are used before we have tokens)
    // Allow other auth endpoints (for example /auth/logout) to receive auth headers.
    if (/\/auth\/login(\/otp)?/.test(url)) {
      return req;
    }

    // Ensure headers object exists
    req.headers = req.headers || {};

    // Add Authorization header if not already present
    const hasAuthHeader = Boolean(
      req.headers["Authorization"] || req.headers["authorization"]
    );
    if (!hasAuthHeader) {
      const token = useCookie("token").value;
      if (token) req.headers["Authorization"] = `Bearer ${token}`;
    }

    // Add x-api-token header if not already present
    if (!req.headers["x-api-token"] && !req.headers["X-Api-Token"]) {
      const apiToken = useCookie("api_token").value;
      if (apiToken) req.headers["x-api-token"] = apiToken;
    }

    return req;
  });

  return {
    provide: {
      axios,
    },
  };
});
