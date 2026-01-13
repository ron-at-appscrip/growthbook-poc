"use client";

import { useEffect, useState } from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { growthbook } from "@/lib/growthbook";

export function GrowthBookProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for features to load
    if (growthbook.ready) {
      setIsReady(true);
    } else {
      const unsubscribe = growthbook.subscribe(() => {
        if (growthbook.ready) {
          setIsReady(true);
          unsubscribe();
        }
      });
      
      // Also try loading features if not already loading
      if (typeof window !== "undefined") {
        growthbook.loadFeatures().then(() => {
          setIsReady(true);
        }).catch((err) => {
          console.error("Failed to load GrowthBook features:", err);
          // Still set ready to true to avoid blocking the app
          setIsReady(true);
        });
      }
    }
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      {children}
    </GrowthBookProvider>
  );
}
