// Using GrowthBook React SDK for client-side feature flags
// @flags-sdk/growthbook is server-side only and uses Node.js modules
import { useFeature, useGrowthBook } from "@growthbook/growthbook-react";
import { useEffect } from "react";

// For client components, use the useFeature hook directly
// This is a helper hook for the price chart flag
export function usePriceChartFlag() {
  const { ready } = useGrowthBook();
  const feature = useFeature("plan-graph");

  useEffect(() => {
    if (ready) {
      console.log("GrowthBook ready, feature 'plan-graph':", feature);
    }
  }, [ready, feature]);

  // Return the feature value once GrowthBook is ready
  // If not ready yet, return false to avoid showing content before features load
  return ready ? feature.on : false;
}
