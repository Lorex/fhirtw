import { defineConfig } from "cf/config";

// FHIR.tw 是純靜態網站：`cf deploy ./public` 會把 public/ 以 assets-only Worker 部署。
export default defineConfig({
  worker: {
    name: "fhirtw",
    compatibilityDate: "2026-11-01",
    domains: ["fhir.tw", "www.fhir.tw"],
    workersDev: false,
    previewUrls: false,
    assets: {
      htmlHandling: "auto-trailing-slash",
      notFoundHandling: "404-page",
    },
  },
});
