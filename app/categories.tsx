import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { router } from "expo-router";
import { CATEGORIES, CategoryKey, useGameSettings } from "../store/gameSettings";
import { usePurchaseStore } from "../store/purchaseStore";
import { useI18n } from "./_layout";

import Screen from "@/components/ui/Screen";
import Card from "@/components/ui/Card";
import AppText from "@/components/ui/AppText";
import Header from "@/components/ui/Header";
import { SymbolView } from "expo-symbols";

const PRIMARY = "#00e06a";
const GOLD = "#ffc400";

const FREE_CATEGORY_KEY: CategoryKey = "activePlayers";

export default function Categories() {
  const {
    selectedCategories,
    toggleCategory,
    selectAllCategories,
    clearAllCategories,
    applyDefaultCategoriesIfNeeded,
  } = useGameSettings();

  const { t } = useI18n();

  const isPremium = usePurchaseStore((s) => s.isPremium);
  const clearPurchase = usePurchaseStore((s) => s.clearPurchase);

  const selectedCount = useMemo(
    () => CATEGORIES.filter((c) => selectedCategories[c.key]).length,
    [selectedCategories]
  );

  useEffect(() => {
    applyDefaultCategoriesIfNeeded();
  }, [applyDefaultCategoriesIfNeeded]);

  // Safety net: if a category was selected under an older entitlement model,
  // drop anything premium the user no longer (or doesn't yet) have access to.
  useEffect(() => {
    if (isPremium) return;
    for (const c of CATEGORIES) {
      if (c.key !== FREE_CATEGORY_KEY && selectedCategories[c.key]) {
        toggleCategory(c.key);
      }
    }
  }, [isPremium, selectedCategories, toggleCategory]);

  const isCategoryFree = (key: CategoryKey) => key === FREE_CATEGORY_KEY;

  const handleCategoryPress = (key: CategoryKey) => {
    if (isCategoryFree(key) || isPremium) {
      toggleCategory(key);
      return;
    }
    router.push("/paywall");
  };

  const handleSelectAll = () => {
    if (!isPremium) {
      router.push("/paywall");
      return;
    }
    selectAllCategories();
  };

  return (
    <Screen>
      <Header title={t("categories.title")} onLeft={() => router.back()} />

      {/* Meta row */}
      <View style={styles.actions}>
        <AppText variant="muted">
          {t("categories.selected")}{" "}
          <AppText variant="label" style={styles.selectedCount}>
            {selectedCount}
          </AppText>
        </AppText>

        <View style={styles.spacer} />

        <Pressable onPress={handleSelectAll} hitSlop={8}>
          <AppText variant="label" style={styles.link}>
            {t("categories.all")}
          </AppText>
        </Pressable>

        <AppText variant="muted" style={styles.dot}>
          •
        </AppText>

        <Pressable onPress={clearAllCategories} hitSlop={8}>
          <AppText variant="label" style={styles.link}>
            {t("categories.none")}
          </AppText>
        </Pressable>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const on = selectedCategories[item.key];
          const free = isCategoryFree(item.key);
          const locked = !free && !isPremium;

          return (
            <Pressable style={styles.itemFlex} onPress={() => handleCategoryPress(item.key)}>
              <Card
                style={[
                  styles.card,
                  on && !locked ? styles.cardActive : styles.cardIdle,
                  locked && styles.cardLocked,
                ]}
              >
                {locked ? (
                  <View style={styles.lockBadge}>
                    <SymbolView name="lock.fill" size={11} tintColor={GOLD} />
                  </View>
                ) : null}

                <View style={styles.iconChip}>
                  {item.sfSymbol ? (
                    <SymbolView name={item.sfSymbol} size={22} tintColor="rgba(255,255,255,0.9)" />
                  ) : (
                    <AppText style={styles.iconText}>{item.icon}</AppText>
                  )}
                </View>

                <AppText variant="title" numberOfLines={2} style={styles.cardTitle}>
                  {t(item.title)}
                </AppText>

                <View style={styles.countRow}>
                  <View style={[styles.dot16, locked ? styles.dotGold : styles.dotBlue]} />

                  <AppText variant="muted" style={[styles.countText, locked && styles.countTextLocked]}>
                    {locked ? t("categories.premiumLabel") : `${item.count} / ${item.count}`}
                  </AppText>
                </View>
              </Card>
            </Pressable>
          );
        }}
      />

      {__DEV__ ? (
        <Pressable style={styles.devReset} onPress={clearPurchase} hitSlop={10}>
          <AppText variant="muted" style={styles.devResetText}>
            {t("dev.resetToFree")}
          </AppText>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  link: { color: "#00e06a" },
  dot: { marginHorizontal: 8 },

  columns: { gap: 12, paddingHorizontal: 18 },
  listContent: { gap: 12, paddingBottom: 24 },

  card: {
    minHeight: 150,
    padding: 14,
    borderRadius: 22,
    justifyContent: "space-between",
  },
  cardIdle: {},
  cardActive: {
    borderColor: "rgba(0,224,106,0.35)",
    backgroundColor: "rgba(0,224,106,0.06)",
  },
  cardLocked: {
    opacity: 0.72,
  },

  lockBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,196,0,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,196,0,0.35)",
  },

  iconChip: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 18 },

  cardTitle: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
  },

  countRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 },
  dot16: { width: 8, height: 8, borderRadius: 999 },
  dotBlue: { backgroundColor: PRIMARY },
  dotGold: { backgroundColor: GOLD },
  countText: { opacity: 0.9 },
  countTextLocked: { color: GOLD, opacity: 1 },

  selectedCount: { color: "white" },
  spacer: { flex: 1 },
  itemFlex: { flex: 1 },

  devReset: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  devResetText: {
    fontSize: 11,
    opacity: 0.5,
  },
});
