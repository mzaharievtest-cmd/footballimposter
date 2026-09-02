import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import {
  useIAP,
  ErrorCode,
  getAvailablePurchases as getAvailablePurchasesDirect,
  hasActiveSubscriptions as hasActiveSubscriptionsDirect,
} from "expo-iap";

import AppText from "@/components/ui/AppText";
import Card from "@/components/ui/Card";
import { C, R, shadow } from "@/components/ui/theme";
import { useI18n } from "./_layout";
import { PRODUCT_LIFETIME, PRODUCT_WEEKLY, usePurchaseStore } from "@/store/purchaseStore";

const BG = "#06110a";
const PRIMARY = "#00e06a";
const GOLD = "#ffc400";

type PlanKey = "weekly" | "lifetime";

export default function Paywall() {
  const { t } = useI18n();
  const isPremium = usePurchaseStore((s) => s.isPremium);
  const setPurchase = usePurchaseStore((s) => s.setPurchase);

  const [selected, setSelected] = useState<PlanKey>("lifetime");
  const [busy, setBusy] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const purchaseInitiatedRef = useRef(false);

  const { connected, products, subscriptions, fetchProducts, requestPurchase, finishTransaction } =
    useIAP({
      onPurchaseSuccess: async (purchase: any) => {
        const id = purchase?.productId ?? purchase?.id;
        setPurchase(id === PRODUCT_LIFETIME ? "lifetime" : "weekly");
        try {
          await finishTransaction({ purchase, isConsumable: false });
        } catch {}
        setBusy(false);
        if (purchaseInitiatedRef.current) {
          purchaseInitiatedRef.current = false;
          router.back();
        }
      },
      onPurchaseError: (error) => {
        const wasInitiated = purchaseInitiatedRef.current;
        purchaseInitiatedRef.current = false;
        setBusy(false);
        if (wasInitiated && error?.code !== ErrorCode.UserCancelled) {
          Alert.alert(t("paywall.purchaseErrorTitle"), t("paywall.purchaseErrorBody"));
        }
      },
    });

  useEffect(() => {
    if (!connected || !fetchProducts) return;
    fetchProducts({ skus: [PRODUCT_LIFETIME], type: "in-app" }).catch(() => {});
    fetchProducts({ skus: [PRODUCT_WEEKLY], type: "subs" }).catch(() => {});
  }, [connected, fetchProducts]);

  useEffect(() => {
    if (isPremium) router.back();
  }, [isPremium]);

  const weeklyProduct = useMemo(
    () => subscriptions?.find((p: any) => (p?.id ?? p?.productId) === PRODUCT_WEEKLY),
    [subscriptions]
  );
  const lifetimeProduct = useMemo(
    () => products?.find((p: any) => (p?.id ?? p?.productId) === PRODUCT_LIFETIME),
    [products]
  );

  const weeklyPrice = (weeklyProduct as any)?.displayPrice ?? "0.99 €";
  const lifetimePrice = (lifetimeProduct as any)?.displayPrice ?? "3.99 €";
  const selectedPrice = selected === "weekly" ? weeklyPrice : lifetimePrice;

  async function handlePurchase() {
    if (!requestPurchase || busy || restoring) return;
    setBusy(true);
    purchaseInitiatedRef.current = true;

    try {
      if (selected === "weekly") {
        const androidOffers = (weeklyProduct as any)?.subscriptionOfferDetailsAndroid;
        const offerToken = Array.isArray(androidOffers) ? androidOffers[0]?.offerToken : undefined;

        await requestPurchase({
          request: {
            apple: { sku: PRODUCT_WEEKLY },
            google: {
              skus: [PRODUCT_WEEKLY],
              ...(offerToken
                ? { subscriptionOffers: [{ sku: PRODUCT_WEEKLY, offerToken }] }
                : {}),
            },
          },
          type: "subs",
        });
      } else {
        await requestPurchase({
          request: {
            apple: { sku: PRODUCT_LIFETIME },
            google: { skus: [PRODUCT_LIFETIME] },
          },
          type: "in-app",
        });
      }
    } catch {
      purchaseInitiatedRef.current = false;
      setBusy(false);
    }
  }

  async function handleRestore() {
    if (busy || restoring) return;
    setRestoring(true);
    try {
      const hasWeekly = await hasActiveSubscriptionsDirect([PRODUCT_WEEKLY]).catch(() => false);
      if (hasWeekly) {
        setPurchase("weekly");
        Alert.alert(t("paywall.restoredTitle"), t("paywall.restoredBody"));
        router.back();
        return;
      }

      const purchases = await getAvailablePurchasesDirect().catch(() => []);
      const ownsLifetime = purchases?.some(
        (p: any) => (p?.productId ?? p?.id) === PRODUCT_LIFETIME
      );
      if (ownsLifetime) {
        setPurchase("lifetime");
        Alert.alert(t("paywall.restoredTitle"), t("paywall.restoredBody"));
        router.back();
        return;
      }

      Alert.alert(t("paywall.restoreNoneTitle"), t("paywall.restoreNoneBody"));
    } catch {
      Alert.alert(t("paywall.restoreErrorTitle"), t("paywall.restoreErrorBody"));
    } finally {
      setRestoring(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <Pressable
        style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
        onPress={() => router.back()}
        hitSlop={12}
      >
        <SymbolView name="xmark" size={16} tintColor="rgba(255,255,255,0.85)" />
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        bounces={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <AppText style={styles.heroIcon}>🏆</AppText>
          </View>
          <AppText variant="hero" style={styles.heroTitle}>
            {t("paywall.heroTitle")}
          </AppText>
          <AppText variant="muted" style={styles.heroSubtitle}>
            {t("paywall.heroSubtitle")}
          </AppText>
        </View>

        <View style={styles.features}>
          {[
            t("paywall.featureAllCategories"),
            t("paywall.featureUnlimited"),
            t("paywall.featureSupport"),
          ].map((label) => (
            <View key={label} style={styles.featureRow}>
              <SymbolView name="checkmark.circle.fill" size={18} tintColor={PRIMARY} />
              <AppText style={styles.featureText}>{label}</AppText>
            </View>
          ))}
        </View>

        <View style={styles.plans}>
          <PlanCard
            selected={selected === "weekly"}
            onPress={() => setSelected("weekly")}
            title={t("paywall.weeklyTitle")}
            price={weeklyPrice}
            period={t("paywall.weeklyPeriod")}
          />
          <PlanCard
            selected={selected === "lifetime"}
            onPress={() => setSelected("lifetime")}
            title={t("paywall.lifetimeTitle")}
            price={lifetimePrice}
            period={t("paywall.lifetimePeriod")}
            badge={t("paywall.bestValue")}
            highlighted
          />
        </View>

        <Pressable
          onPress={handlePurchase}
          disabled={busy || restoring}
          style={({ pressed }) => [
            styles.ctaBtn,
            (busy || restoring) && styles.ctaBtnDisabled,
            pressed && !busy && styles.ctaBtnPressed,
          ]}
        >
          <AppText style={styles.ctaText}>
            {busy
              ? t("common.loading")
              : t("paywall.continueWithPrice", { price: selectedPrice })}
          </AppText>
        </Pressable>

        <AppText variant="caption" style={styles.legal}>
          {t("paywall.legal")}
        </AppText>
      </ScrollView>

      <Pressable
        onPress={handleRestore}
        disabled={busy || restoring}
        hitSlop={10}
        style={styles.restoreBtn}
      >
        <AppText variant="label" style={styles.restoreText}>
          {restoring ? t("paywall.restoring") : t("paywall.restorePurchases")}
        </AppText>
      </Pressable>
    </SafeAreaView>
  );
}

function PlanCard({
  selected,
  onPress,
  title,
  price,
  period,
  badge,
  highlighted,
}: {
  selected: boolean;
  onPress: () => void;
  title: string;
  price: string;
  period: string;
  badge?: string;
  highlighted?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={styles.planTouchable}>
      <View style={styles.planCardWrap}>
        {badge ? (
          <View style={styles.badge}>
            <AppText style={styles.badgeText}>{badge}</AppText>
          </View>
        ) : null}

        <Card
          style={[
            styles.planCard,
            highlighted && styles.planCardHighlighted,
            selected && styles.planCardSelected,
          ]}
        >
          <View style={styles.planRow}>
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {selected ? <View style={styles.radioDot} /> : null}
            </View>

            <View style={styles.planTextWrap}>
              <AppText variant="title" style={styles.planTitle}>
                {title}
              </AppText>
              <AppText variant="muted" style={styles.planPeriod}>
                {period}
              </AppText>
            </View>

            <AppText variant="title" style={styles.planPrice}>
              {price}
            </AppText>
          </View>
        </Card>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  closeBtn: {
    position: "absolute",
    top: 8,
    right: 18,
    zIndex: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  closeBtnPressed: { backgroundColor: "rgba(255,255,255,0.12)" },

  scroll: { paddingHorizontal: 22, paddingTop: 48, paddingBottom: 16, gap: 22 },

  hero: { alignItems: "center", gap: 8 },
  heroIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "rgba(0,224,106,0.14)",
    borderWidth: 1,
    borderColor: "rgba(0,224,106,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    ...shadow.md,
  },
  heroIcon: { fontSize: 36 },
  heroTitle: { fontSize: 26, textAlign: "center" },
  heroSubtitle: { textAlign: "center", paddingHorizontal: 12 },

  features: { gap: 10 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { color: C.text, fontSize: 14, fontWeight: "600" },

  plans: { gap: 12 },
  planTouchable: {},
  planCardWrap: { position: "relative" },
  planCard: {
    borderRadius: R.lg,
    padding: 16,
  },
  planCardHighlighted: {
    borderColor: "rgba(245,158,11,0.35)",
    backgroundColor: "rgba(245,158,11,0.06)",
  },
  planCardSelected: {
    borderColor: PRIMARY,
    borderWidth: 2,
  },

  badge: {
    position: "absolute",
    top: -10,
    right: 16,
    zIndex: 1,
    backgroundColor: GOLD,
    borderRadius: R.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 10, fontWeight: "800", color: "#1A1200", letterSpacing: 0.4 },

  planRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: PRIMARY },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: PRIMARY },

  planTextWrap: { flex: 1 },
  planTitle: { fontSize: 16 },
  planPeriod: { marginTop: 2 },
  planPrice: { fontSize: 18 },

  ctaBtn: {
    backgroundColor: PRIMARY,
    borderRadius: R.xl,
    paddingVertical: 17,
    alignItems: "center",
    ...shadow.md,
  },
  ctaBtnPressed: { opacity: 0.88 },
  ctaBtnDisabled: { opacity: 0.6 },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 0.2 },

  legal: { textAlign: "center", textTransform: "none", letterSpacing: 0, lineHeight: 16 },

  restoreBtn: { alignItems: "center", paddingVertical: 14 },
  restoreText: { color: "rgba(255,255,255,0.65)" },
});
