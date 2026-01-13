"use client";

import { GrowthBook } from "@growthbook/growthbook-react";

// Initialize GrowthBook instance with your credentials
export const growthbook = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST || "https://cdn.growthbook.io",
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || "sdk-qvSCiNISVR7HRD4c",
  enableDevMode: process.env.NODE_ENV !== "production",
  attributes: {
    id: "user-123",
    loggedIn: true,
  },
});

// Load features from API
if (typeof window !== "undefined") {
  growthbook.loadFeatures().catch((err) => {
    console.error("Failed to load GrowthBook features:", err);
  });
}
