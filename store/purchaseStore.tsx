// store/purchaseStore.tsx
// Entitlement store for the weekly/lifetime paywall (expo-iap).
// Single source of truth for "does this device currently have premium access".

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const PRODUCT_WEEKLY = "football_imposter_weekly";
export const PRODUCT_LIFETIME = "football_imposter_lifetime";

export type PurchaseType = "weekly" | "lifetime" | null;

type PurchaseState = {
  isPremium: boolean;
  purchaseType: PurchaseType;
  hydrated: boolean;
  setPurchase: (type: "weekly" | "lifetime") => void;
  clearPurchase: () => void;
};

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set) => ({
      isPremium: false,
      purchaseType: null,
      hydrated: false,

      setPurchase: (type) => set({ isPremium: true, purchaseType: type }),

      clearPurchase: () => set({ isPremium: false, purchaseType: null }),
    }),
    {
      name: "purchaseStore.v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isPremium: state.isPremium,
        purchaseType: state.purchaseType,
      }),
      onRehydrateStorage: () => () => {
        usePurchaseStore.setState({ hydrated: true });
      },
    }
  )
);
