import React, { useMemo, useRef, useState } from "react";
import {
  View, StyleSheet, Pressable, Modal, TextInput, ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";

import Screen from "@/components/ui/Screen";
import AppText from "@/components/ui/AppText";
import Header from "@/components/ui/Header";
import { useI18n } from "./_layout";
import { MAX_PLAYERS, MIN_PLAYERS, useGameSettings } from "../store/gameSettings";
import { C, R, shadow } from "@/components/ui/theme";

export default function PlayersScreen() {
  const insets = useSafeAreaInsets();
  const { players, setPlayers, setPlayerCount } = useGameSettings();
  const { t } = useI18n();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draftName, setDraftName] = useState("");
  const inputRef = useRef<TextInput>(null);

  const subtitle = useMemo(() => `${MIN_PLAYERS}–${MAX_PLAYERS}`, []);
  const count = players.length;
  const canAdd = count < MAX_PLAYERS;
  const canRemove = count > MIN_PLAYERS;

  const openEdit = (idx: number) => {
    setEditIndex(idx);
    const fallback = `${t("players.player")} ${idx + 1}`;
    const current = players[idx] ?? "";
    const trimmed = current.trim();
    const isDefault = !trimmed || trimmed === fallback || /^Player\s+\d+$/i.test(trimmed);
    setDraftName(isDefault ? "" : current);
  };

  const saveEdit = () => {
    if (editIndex === null) return;
    const trimmed = draftName.trim();
    setPlayers(players.map((p, i) => (i === editIndex ? (trimmed.length ? trimmed : "") : p)));
    setEditIndex(null);
  };

  return (
    <Screen>
      <Header title={t("players.title")} onLeft={() => router.back()} />

      {/* Count row */}
      <View style={styles.countCard}>
        <View style={styles.countIcon}>
          <SymbolView name="person.3.fill" size={20} tintColor={C.white} />
        </View>
        <View style={styles.countText}>
          <AppText style={styles.countTitle}>{count} {t("players.countLabel")}</AppText>
          <AppText style={styles.countSub}>{t("common.range")}: {subtitle}</AppText>
        </View>
      </View>

      {/* Player list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, { paddingBottom: 16 + insets.bottom + 84 }]}
      >
        {players.map((name, idx) => {
          const trimmed = (name ?? "").trim();
          const isDefault = !trimmed || /^Player\s+\d+$/i.test(trimmed);
          const display = isDefault ? `${t("players.player")} ${idx + 1}` : trimmed;

          return (
            <View key={idx} style={styles.row}>
              <View style={styles.numBadge}>
                <AppText style={styles.numText}>{idx + 1}</AppText>
              </View>
              <AppText
                numberOfLines={1}
                style={[styles.playerName, isDefault && styles.playerNameMuted]}
              >
                {display}
              </AppText>
              <Pressable
                hitSlop={10}
                onPress={() => openEdit(idx)}
                style={({ pressed }) => [styles.editBtn, pressed && { opacity: 0.6 }]}
              >
                <SymbolView name="pencil" size={16} tintColor={C.textSub} />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>

      {/* Footer actions */}
      <View style={[styles.footer, { paddingBottom: 12 + insets.bottom }]}>
        <Pressable
          style={[styles.actionBtn, !canRemove && styles.actionDisabled]}
          disabled={!canRemove}
          onPress={() => setPlayerCount(count - 1)}
        >
          <AppText style={styles.actionText}>{t("common.remove")}</AppText>
        </Pressable>
        <Pressable
          style={[styles.actionBtn, styles.actionPrimary, !canAdd && styles.actionDisabled]}
          disabled={!canAdd}
          onPress={() => setPlayerCount(count + 1)}
        >
          <AppText style={styles.actionTextPrimary}>{t("common.add")}</AppText>
        </Pressable>
      </View>

      {/* Edit modal */}
      <Modal
        visible={editIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setEditIndex(null)}
        onShow={() => inputRef.current?.focus()}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <AppText style={styles.sheetTitle}>
                {editIndex === null ? t("common.edit") : `${t("players.player")} ${editIndex + 1}`}
              </AppText>
              <Pressable
                onPress={() => setEditIndex(null)}
                hitSlop={12}
                style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}
              >
                <AppText style={styles.closeText}>✕</AppText>
              </Pressable>
            </View>

            <TextInput
              ref={inputRef}
              value={draftName}
              onChangeText={setDraftName}
              placeholder={t("players.namePlaceholder")}
              placeholderTextColor={C.textMuted}
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={saveEdit}
            />

            <Pressable
              style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.85 }]}
              onPress={saveEdit}
            >
              <AppText style={styles.saveBtnText}>{t("common.save")}</AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  /* Count */
  countCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginTop: 10,
    marginBottom: 14,
    ...shadow.sm,
  },
  countIcon: {
    width: 44,
    height: 44,
    borderRadius: R.md,
    backgroundColor: C.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: { flex: 1 },
  countTitle: { fontSize: 16, fontWeight: "700", color: C.white },
  countSub: { fontSize: 12, fontWeight: "500", color: C.textMuted, marginTop: 2 },

  /* List */
  list: { gap: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    ...shadow.sm,
  },
  numBadge: {
    width: 36,
    height: 36,
    borderRadius: R.sm,
    backgroundColor: C.surfaceUp,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  numText: { fontSize: 14, fontWeight: "700", color: C.textSub },
  playerName: { flex: 1, fontSize: 16, fontWeight: "600", color: C.white },
  playerNameMuted: { color: C.textSub, fontWeight: "500" },
  editBtn: {
    width: 34,
    height: 34,
    borderRadius: R.xs,
    backgroundColor: C.surfaceUp,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* Footer */
  footer: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 0,
    paddingTop: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: C.bg,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  actionBtn: {
    flex: 1,
    borderRadius: R.lg,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: C.surfaceUp,
    borderWidth: 1,
    borderColor: C.borderMid,
  },
  actionPrimary: {
    backgroundColor: C.accentSoft,
    borderColor: C.accentBorder,
  },
  actionText: { fontSize: 14, fontWeight: "600", color: C.textSub },
  actionTextPrimary: { fontSize: 14, fontWeight: "700", color: C.accent },
  actionDisabled: { opacity: 0.38 },

  /* Modal */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  sheet: {
    width: "100%",
    backgroundColor: C.surface,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.borderMid,
    padding: 16,
    ...shadow.lg,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  sheetTitle: { fontSize: 18, fontWeight: "700", color: C.white },
  closeBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { fontSize: 16, color: C.textSub, fontWeight: "500" },
  input: {
    backgroundColor: C.surfaceUp,
    borderWidth: 1,
    borderColor: C.borderMid,
    borderRadius: R.lg,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: C.white,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: C.accent,
    borderRadius: R.lg,
    paddingVertical: 15,
    alignItems: "center",
    ...shadow.md,
  },
  saveBtnText: { fontSize: 16, fontWeight: "700", color: C.white },
});
