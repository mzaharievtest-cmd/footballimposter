import React, { useMemo, useState, useEffect, useCallback, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import activePlayers from "@/data/categories/activePlayers";
import legends from "@/data/categories/legends";
import clubs from "@/data/categories/clubs";
import managers from "@/data/categories/managers";
import stadiums from "@/data/categories/stadiums";
import nationalTeams from "@/data/categories/nationalTeams";
import leagues from "@/data/categories/leagues";
import iconicMoments from "@/data/categories/iconicMoments";
import referees from "@/data/categories/referees";
import plPlayers from "@/data/categories/plPlayers";

function normalizeWords(input: unknown): string[] {
  // Support common export shapes:
  // 1) string[]
  // 2) { words: string[] }
  // 3) { items: string[] }
  // 4) array of objects with { name/word/title/... }

  let base: unknown = input;

  if (base && typeof base === "object" && !Array.isArray(base)) {
    const anyObj = base as any;
    if (Array.isArray(anyObj.words)) base = anyObj.words;
    else if (Array.isArray(anyObj.items)) base = anyObj.items;
    else if (Array.isArray(anyObj.data)) base = anyObj.data;
  }

  const arr = Array.isArray(base) ? base : [];
  const out: string[] = [];

  for (const item of arr) {
    if (typeof item === "string") {
      const s = item.trim();
      if (s) out.push(s);
      continue;
    }
    if (item && typeof item === "object") {
      const anyItem = item as any;
      const candidate =
        anyItem.word ??
        anyItem.name ??
        anyItem.title ??
        anyItem.label ??
        anyItem.value;
      if (typeof candidate === "string") {
        const s = candidate.trim();
        if (s) out.push(s);
      }
    }
  }

  return out;
}

type NormalizedCategoryData = {
  words: string[];
  items?: Array<{ name: string; free: boolean }>;
  similar?: Record<string, string[]>;
};

function normalizeCategory(input: unknown): NormalizedCategoryData {
  // Supports:
  // - string[]
  // - { words: string[], similar?: Record<string,string[]> }
  // - { items/data: ... }
  // - array of objects with name/word/title

  const words = normalizeWords(input);

  let items: Array<{ name: string; free: boolean }> | undefined;
  let similar: Record<string, string[]> | undefined;

  if (input && typeof input === "object" && !Array.isArray(input)) {
    const anyObj = input as any;

    // Preserve item-level metadata (e.g., free/pro flags)
    if (Array.isArray(anyObj.items)) {
      const cleanedItems = anyObj.items
        .map((it: any) => ({
          name: typeof it?.name === "string" ? it.name.trim() : "",
          free: it?.free === true,
        }))
        .filter((it: any) => it.name);
      if (cleanedItems.length) items = cleanedItems;
    }

    if (anyObj.similar && typeof anyObj.similar === "object" && !Array.isArray(anyObj.similar)) {
      const cleaned: Record<string, string[]> = {};
      for (const [k, v] of Object.entries(anyObj.similar)) {
        if (!k || typeof k !== "string") continue;
        if (Array.isArray(v)) {
          const arr = v
            .filter((x) => typeof x === "string" && x.trim())
            .map((x) => (x as string).trim());
          if (arr.length) cleaned[k] = arr;
        }
      }
      if (Object.keys(cleaned).length) similar = cleaned;
    }
  }

  return { words, items, similar };
}

/* =========================
   CONSTANTS
========================= */

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 8;
// Imposters can go up to (players - 1). With MAX_PLAYERS=8 this means up to 7.
export const MAX_IMPOSTERS = MAX_PLAYERS - 1;

export type GameMode = "same" | "similar";

export type CategoryKey =
  | "activePlayers"
  | "plPlayers"
  | "legends"
  | "clubs"
  | "managers"
  | "stadiums"
  | "referees"
  | "nationalTeams"
  | "leagues"
  | "iconicMoments";

export type Category = {
  key: CategoryKey;
  title: string;
  icon: string; // emoji fallback
  sfSymbol?: string; // iOS SF Symbol name
  count: number;
};

const CATEGORY_COUNTS: Record<CategoryKey, number> = {
  activePlayers: normalizeCategory(activePlayers).words.length,
  plPlayers: normalizeCategory(plPlayers).words.length,
  legends: normalizeCategory(legends).words.length,
  clubs: normalizeCategory(clubs).words.length,
  managers: normalizeCategory(managers).words.length,
  stadiums: normalizeCategory(stadiums).words.length,
  referees: normalizeCategory(referees).words.length,
  nationalTeams: normalizeCategory(nationalTeams).words.length,
  leagues: normalizeCategory(leagues).words.length,
  iconicMoments: normalizeCategory(iconicMoments).words.length,
};

export const CATEGORIES: Category[] = [
  {
    key: "activePlayers",
    title: "categories.activePlayers",
    icon: "⚽️",
    sfSymbol: "figure.soccer",
    count: CATEGORY_COUNTS.activePlayers,
  },
  {
    key: "plPlayers",
    title: "categories.plPlayers",
    icon: "👑",
    sfSymbol: "crown.fill",
    count: CATEGORY_COUNTS.plPlayers,
  },
  {
    key: "legends",
    title: "categories.legends",
    icon: "🏆",
    sfSymbol: "trophy.fill",
    count: CATEGORY_COUNTS.legends,
  },
  {
    key: "clubs",
    title: "categories.clubs",
    icon: "🛡️",
    sfSymbol: "shield.fill",
    count: CATEGORY_COUNTS.clubs,
  },
  {
    key: "managers",
    title: "categories.managers",
    icon: "🧠",
    sfSymbol: "brain.head.profile",
    count: CATEGORY_COUNTS.managers,
  },
  {
    key: "stadiums",
    title: "categories.stadiums",
    icon: "🏟️",
    sfSymbol: "sportscourt.fill",
    count: CATEGORY_COUNTS.stadiums,
  },
  {
    key: "referees",
    title: "categories.referees",
    icon: "✋",
    sfSymbol: "hand.raised.fill",
    count: CATEGORY_COUNTS.referees,
  },
  {
    key: "nationalTeams",
    title: "categories.nationalTeams",
    icon: "🌍",
    sfSymbol: "globe.europe.africa.fill",
    count: CATEGORY_COUNTS.nationalTeams,
  },
  {
    key: "leagues",
    title: "categories.leagues",
    icon: "🥇",
    sfSymbol: "medal.fill",
    count: CATEGORY_COUNTS.leagues,
  },
  {
    key: "iconicMoments",
    title: "categories.iconicMoments",
    icon: "🎬",
    sfSymbol: "play.rectangle.fill",
    count: CATEGORY_COUNTS.iconicMoments,
  },
];

/* =========================
   TYPES
========================= */

export type Player = {
  id: string;
  name: string;
};

export type RoundState = {
  /**
   * Back-compat: some screens still expect a Set with numeric indexes.
   * This is the canonical, safe-to-check field for "is imposter".
   */
  imposterIds: Set<number>;

  /** New: stable id list (useful for voting order / future features) */
  imposterPlayerIds: string[];

  /** Voting order by player id (stable identity) */
  votingOrderIds: string[];

  /** Voting order by index (back-compat) */
  votingOrderIdxs: number[];

  /** Starting player (first in voting order) */
  startingPlayerId: string | null;

  /** Starting player index (back-compat) */
  startingPlayerIdx: number | null;

  /** Category chosen for this round */
  categoryKey: CategoryKey;
  /** Convenience for UI (avoids "Category: ??") */
  categoryTitle: string;

  /** Secret word all non-imposters see */
  commonWord: string;

  /** Secret word imposters see in "similar" mode */
  imposterWord: string;
};

type SelectedMap = Record<CategoryKey, boolean>;

/* =========================
   PERSISTENCE
========================= */

const SETTINGS_STORAGE_KEY = "gameSettings.v1";

type PersistedSettings = {
  playerCount?: number;
  playerNames?: string[];

  imposters?: number;
  randomImposters?: boolean;
  randomMode?: "balanced" | "custom";
  randomMinImposters?: number;
  randomMaxImposters?: number;
  imposterNeverFirst?: boolean;
  showImposterCount?: boolean;

  mode?: GameMode;
  showCategoryToImposter?: boolean;

  selectedCategories?: SelectedMap;
  categoriesTouched?: boolean;
};

async function safeLoadSettings(): Promise<PersistedSettings | null> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as PersistedSettings;
  } catch {
    return null;
  }
}

async function safeSaveSettings(value: PersistedSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore
  }
}

type GameSettingsState = {
  // Backward compatible (existing screens)
  players: string[];
  setPlayers: (names: string[]) => void;
  setPlayerCount: (count: number) => void;

  // New: stable player identities
  playerList: Player[];
  setPlayerName: (playerId: string, name: string) => void;
  getPlayerName: (playerId: string) => string;

  imposters: number;
  setImposters: (n: number) => void;

  randomImposters: boolean;
  setRandomImposters: (v: boolean) => void;

  imposterNeverFirst: boolean;
  setImposterNeverFirst: (v: boolean) => void;

  // Random imposters sub-mode
  randomMode: "balanced" | "custom";
  setRandomMode: (m: "balanced" | "custom") => void;

  // Random imposters range (used only when randomMode === "custom")
  randomMinImposters: number;
  randomMaxImposters: number;
  setRandomMinImposters: (n: number) => void;
  setRandomMaxImposters: (n: number) => void;

  // Random UI: show/hide chosen count
  showImposterCount: boolean;
  setShowImposterCount: (v: boolean) => void;

  mode: GameMode;
  setMode: (m: GameMode) => void;

  showCategoryToImposter: boolean;
  setShowCategoryToImposter: (v: boolean) => void;

  selectedCategories: SelectedMap;
  categoriesTouched: boolean;
  applyDefaultCategoriesIfNeeded: () => void;
  toggleCategory: (key: CategoryKey) => void;
  selectAllCategories: () => void;
  clearAllCategories: () => void;

  // Backward compatible (idx-based) — keep for older screens
  playersSeen: number[];
  seenPlayers: number[];
  setSeenPlayers: React.Dispatch<React.SetStateAction<number[]>>;
  markPlayerSeen: (idx: number) => void;
  markSeenPlayer: (idx: number) => void;
  resetPlayersSeen: () => void;
  resetSeenPlayers: () => void;

  // New: id-based seen state (source of truth)
  playersSeenIds: string[];
  setPlayersSeenIds: React.Dispatch<React.SetStateAction<string[]>>;
  markPlayerSeenId: (playerId: string) => void;
  isPlayerSeen: (playerId: string) => boolean;

  // New: per-round assignments
  round: RoundState;
  startRound: () => void;
  startNewRound: () => void;
  isPlayerImposter: (playerId: string) => boolean;

  votingUnlocked: boolean;
  setVotingUnlocked: (v: boolean) => void;
  allPlayersSeen: boolean;
  resetRound: () => void;
};

/* =========================
   HELPERS
========================= */

const CATEGORY_DATA: Record<CategoryKey, NormalizedCategoryData> = {
  activePlayers: normalizeCategory(activePlayers),
  plPlayers: normalizeCategory(plPlayers),
  legends: normalizeCategory(legends),
  clubs: normalizeCategory(clubs),
  managers: normalizeCategory(managers),
  stadiums: normalizeCategory(stadiums),
  referees: normalizeCategory(referees),
  nationalTeams: normalizeCategory(nationalTeams),
  leagues: normalizeCategory(leagues),
  iconicMoments: normalizeCategory(iconicMoments),
};

function getAllowedWords(data: NormalizedCategoryData): string[] {
  return data.words;
}

function pickOne<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickDifferent(arr: string[], notThis: string) {
  if (arr.length <= 1) return notThis;
  let next = notThis;
  for (let i = 0; i < 12; i++) {
    next = pickOne(arr);
    if (next !== notThis) return next;
  }
  return arr.find((w) => w !== notThis) ?? notThis;
}

const GameSettingsCtx = createContext<GameSettingsState | null>(null);

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function ensurePlayers(count: number, prev: Player[]) {
  const out = [...prev];
  if (out.length > count) return out.slice(0, count);
  while (out.length < count) {
    out.push({ id: makeId(), name: `Player ${out.length + 1}` });
  }
  return out;
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DEFAULT_SELECTED_CATEGORIES: SelectedMap = {
  activePlayers: true,
  plPlayers: false,
  legends: false,
  clubs: false,
  managers: false,
  stadiums: false,
  referees: false,
  nationalTeams: false,
  leagues: false,
  iconicMoments: false,
};

function makeDefaultSelected(): SelectedMap {
  return { ...DEFAULT_SELECTED_CATEGORIES };
}

function makeAllSelected(): SelectedMap {
  const init = {} as SelectedMap;
  CATEGORIES.forEach((c) => (init[c.key] = true));
  return init;
}

/* =========================
   PROVIDER
========================= */

export function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  const [playerList, setPlayerList] = useState<Player[]>(ensurePlayers(MIN_PLAYERS, []));
  const [imposters, setImpostersState] = useState(1);
  const [randomImposters, setRandomImposters] = useState(false);
  const [imposterNeverFirst, setImposterNeverFirst] = useState(false);

  const [randomMode, setRandomMode] = useState<"balanced" | "custom">("balanced");
  const [randomMinImposters, setRandomMinImpostersState] = useState(0);
  const [randomMaxImposters, setRandomMaxImpostersState] = useState(MIN_PLAYERS);

  const [showImposterCount, setShowImposterCount] = useState(true);

  const [mode, setMode] = useState<GameMode>("same");
  const [showCategoryToImposter, setShowCategoryToImposter] = useState(true);

  const [didHydrate, setDidHydrate] = useState(false);

  const [usedWordsByCategory, setUsedWordsByCategory] =
    useState<Partial<Record<CategoryKey, string[]>>>({});
  const [categoriesTouched, setCategoriesTouched] = useState(false);
  const [selectedCategories, setSelectedCategories] =
    useState<SelectedMap>(() => makeDefaultSelected());

  // HYDRATE settings once (players, imposters, toggles, categories...)
  useEffect(() => {
    let mounted = true;

    (async () => {
      const saved = await safeLoadSettings();
      if (!mounted || !saved) {
        if (mounted) setDidHydrate(true);
        return;
      }

      const savedCount =
        typeof saved.playerCount === "number" && Number.isFinite(saved.playerCount)
          ? saved.playerCount
          : undefined;

      const targetCount = clamp(savedCount ?? playerList.length, MIN_PLAYERS, MAX_PLAYERS);

      setPlayerList((prev) => {
        const next = ensurePlayers(targetCount, prev);
        const names = Array.isArray(saved.playerNames) ? saved.playerNames : [];
        if (!names.length) return next;
        return next.map((p, i) => ({
          ...p,
          name: typeof names[i] === "string" && names[i].trim() ? names[i] : p.name,
        }));
      });

      if (typeof saved.imposters === "number" && Number.isFinite(saved.imposters)) setImpostersState(saved.imposters);
      if (typeof saved.randomImposters === "boolean") setRandomImposters(saved.randomImposters);
      if (saved.randomMode === "balanced" || saved.randomMode === "custom") setRandomMode(saved.randomMode);
      if (typeof saved.randomMinImposters === "number" && Number.isFinite(saved.randomMinImposters)) {
        setRandomMinImpostersState(saved.randomMinImposters);
      }
      if (typeof saved.randomMaxImposters === "number" && Number.isFinite(saved.randomMaxImposters)) {
        setRandomMaxImpostersState(saved.randomMaxImposters);
      }
      if (typeof saved.imposterNeverFirst === "boolean") setImposterNeverFirst(saved.imposterNeverFirst);
      if (typeof saved.showImposterCount === "boolean") setShowImposterCount(saved.showImposterCount);

      if (saved.mode === "same" || saved.mode === "similar") setMode(saved.mode);
      if (typeof saved.showCategoryToImposter === "boolean") setShowCategoryToImposter(saved.showCategoryToImposter);

      if (typeof saved.categoriesTouched === "boolean") setCategoriesTouched(saved.categoriesTouched);

      if (saved.selectedCategories && typeof saved.selectedCategories === "object") {
        const nextSel: any = {};
        for (const c of CATEGORIES) nextSel[c.key] = Boolean((saved.selectedCategories as any)[c.key]);
        const anySelected = Object.values(nextSel).some(Boolean);
        setSelectedCategories(anySelected ? (nextSel as SelectedMap) : makeDefaultSelected());
      }

      // clamp after we know player count
      Promise.resolve().then(() => {
        const pc = targetCount;

        const maxFixed = Math.min(MAX_IMPOSTERS, Math.max(0, pc - 1));
        setImpostersState((v) => clamp(v, 1, Math.max(1, maxFixed)));

        const maxRand = Math.max(0, pc);
        setRandomMinImpostersState((v) => clamp(v, 0, maxRand));
        setRandomMaxImpostersState((v) => clamp(v, 0, maxRand));

        setRandomMinImpostersState((minV) => {
          setRandomMaxImpostersState((maxV) => (minV > maxV ? minV : maxV));
          return minV;
        });
      });

      setDidHydrate(true);
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SAVE settings on changes (debounced) — ONLY after hydration
  useEffect(() => {
    if (!didHydrate) return;

    const handle = setTimeout(() => {
      const payload: PersistedSettings = {
        playerCount: playerList.length,
        playerNames: playerList.map((p) => p.name),

        imposters,
        randomImposters,
        randomMode,
        randomMinImposters,
        randomMaxImposters,
        imposterNeverFirst,
        showImposterCount,

        mode,
        showCategoryToImposter,

        categoriesTouched,
        selectedCategories,
      };

      safeSaveSettings(payload);
    }, 250);

    return () => clearTimeout(handle);
  }, [
    didHydrate,
    playerList,
    imposters,
    randomImposters,
    randomMode,
    randomMinImposters,
    randomMaxImposters,
    imposterNeverFirst,
    showImposterCount,
    mode,
    showCategoryToImposter,
    categoriesTouched,
    selectedCategories,
  ]);

  const [playersSeenIds, setPlayersSeenIds] = useState<string[]>([]);
  const [playersSeen, setPlayersSeen] = useState<number[]>([]);

  const [round, setRound] = useState<RoundState>({
    imposterIds: new Set<number>(),
    imposterPlayerIds: [],
    votingOrderIds: [],
    votingOrderIdxs: [],
    startingPlayerId: null,
    startingPlayerIdx: null,
    categoryKey: "activePlayers",
    categoryTitle: CATEGORIES.find((c) => c.key === "activePlayers")?.title ?? "categories.activePlayers",
    commonWord: "",
    imposterWord: "",
  });

  const [votingUnlocked, setVotingUnlocked] = useState(false);

  const applyDefaultCategoriesIfNeeded = useCallback(() => {
    if (categoriesTouched) return;
    setSelectedCategories(makeDefaultSelected());
  }, [categoriesTouched]);

  const api = useMemo<GameSettingsState>(() => {
    const maxFixedImposters = (playerCount: number) => {
      // Fixed/manual imposters: 1..(players - 1) and capped by MAX_IMPOSTERS
      return Math.min(MAX_IMPOSTERS, Math.max(0, playerCount - 1));
    };

    const maxRandomImposters = (playerCount: number) => {
      // Random imposters: 0..players (can be everyone)
      return Math.max(0, playerCount);
    };

    const players = playerList.map((p) => p.name);
    const playerIds = playerList.map((p) => p.id);

    const getPlayerName = (playerId: string) =>
      playerList.find((p) => p.id === playerId)?.name ?? "";

    const setPlayerName = (playerId: string, name: string) => {
      setPlayerList((prev) =>
        prev.map((p) => (p.id === playerId ? { ...p, name } : p))
      );
    };

    const setPlayerCount = (count: number) => {
      const c = clamp(count, MIN_PLAYERS, MAX_PLAYERS);

      setPlayerList((prev) => {
        const next = ensurePlayers(c, prev);
        const nextIds = next.map((p) => p.id);

        const maxFixed = maxFixedImposters(next.length);
        setImpostersState((prevImp) => clamp(prevImp, 1, Math.max(1, maxFixed)));

        const maxRand = maxRandomImposters(next.length);

        setRandomMinImpostersState((prevMin) => clamp(prevMin, 0, maxRand));
        setRandomMaxImpostersState((prevMax) => {
          const clamped = clamp(prevMax, 0, maxRand);
          // if old max was above new playerCount -> snap to new max
          return prevMax > maxRand ? maxRand : clamped;
        });

        // Ensure min/max relationship remains valid after clamping
        setRandomMinImpostersState((prevMin) => {
          const clampedMin = clamp(prevMin, 0, maxRand);
          setRandomMaxImpostersState((prevMax) => {
            const clampedMax = clamp(prevMax, 0, maxRand);
            return clampedMin > clampedMax ? clampedMin : clampedMax;
          });
          return clampedMin;
        });

        setPlayersSeenIds((prevSeen) => {
          const filtered = prevSeen.filter((id) => nextIds.includes(id));
          setTimeout(() => {
            const idxs: number[] = [];
            for (let i = 0; i < next.length; i++) {
              if (filtered.includes(next[i].id)) idxs.push(i);
            }
            setPlayersSeen(idxs);
          }, 0);
          return filtered;
        });

        setRound((prevRound) => {
          const nextIdSet = new Set(nextIds);

          const nextVotingIdxs =
            prevRound.votingOrderIdxs?.filter((i) => Number.isFinite(i) && i >= 0 && i < next.length) ?? [];

          const nextImposterIdxs: number[] = [];
          if (prevRound.imposterIds instanceof Set) {
            for (const i of prevRound.imposterIds) {
              if (Number.isFinite(i) && i >= 0 && i < next.length) nextImposterIdxs.push(i);
            }
          }

          const nextImposterSet = new Set<number>(nextImposterIdxs);

          const nextImposterPlayerIds = (prevRound.imposterPlayerIds ?? []).filter((id) => nextIdSet.has(id));
          const nextVotingOrderIds = (prevRound.votingOrderIds ?? []).filter((id) => nextIdSet.has(id));

          const nextStartingId = nextVotingOrderIds[0] ?? null;
          const nextStartingIdx = nextStartingId != null ? next.findIndex((p) => p.id === nextStartingId) : null;

          const key = (prevRound.categoryKey ?? "activePlayers") as CategoryKey;
          const title = CATEGORIES.find((c) => c.key === key)?.title ?? "categories.activePlayers";

          return {
            imposterIds: nextImposterSet,
            imposterPlayerIds: nextImposterPlayerIds,
            votingOrderIds: nextVotingOrderIds,
            votingOrderIdxs: nextVotingIdxs,
            startingPlayerId: nextStartingId,
            startingPlayerIdx: Number.isFinite(nextStartingIdx as any) ? (nextStartingIdx as number) : null,
            categoryKey: key,
            categoryTitle: title,
            commonWord: prevRound.commonWord ?? "",
            imposterWord: prevRound.imposterWord ?? "",
          };
        });

        return next;
      });
    };

    const setImposters = (n: number) => {
      const maxFixed = maxFixedImposters(playerList.length);
      setImpostersState(clamp(n, 1, Math.max(1, maxFixed)));
    };

    const markPlayerSeenId = (playerId: string) => {
      if (!playerId) return;
      setPlayersSeenIds((prev) => {
        const next = prev.includes(playerId) ? prev : [...prev, playerId];
        setTimeout(() => {
          const idxs: number[] = [];
          for (let i = 0; i < playerList.length; i++) {
            if (next.includes(playerList[i].id)) idxs.push(i);
          }
          setPlayersSeen(idxs);
        }, 0);
        return next;
      });
    };

    const markPlayerSeen = (idx: number) => {
      if (!Number.isFinite(idx)) return;
      const p = playerList[idx];
      if (!p) return;
      markPlayerSeenId(p.id);
    };

    const isPlayerSeen = (playerId: string) => playersSeenIds.includes(playerId);

    const resetPlayersSeen = () => {
      setPlayersSeenIds([]);
      setPlayersSeen([]);
    };

    const resetSeenPlayers = resetPlayersSeen;

    const allPlayersSeen = playersSeenIds.length === playerList.length;

    const startRound = () => {
      const votingOrderIds = shuffle(playerIds);

      const startingPlayerId = votingOrderIds[0] ?? null;
      const startingPlayerIdx =
        startingPlayerId != null ? playerList.findIndex((p) => p.id === startingPlayerId) : null;

      const enabledKeys = CATEGORIES.map((c) => c.key).filter((k) => selectedCategories[k]);
      const categoryKey: CategoryKey = enabledKeys.length
        ? enabledKeys[Math.floor(Math.random() * enabledKeys.length)]
        : "activePlayers";

      const categoryTitle =
        CATEGORIES.find((c) => c.key === categoryKey)?.title ??
        CATEGORIES.find((c) => c.key === "activePlayers")?.title ??
        "categories.activePlayers";

      let data = CATEGORY_DATA[categoryKey];
      let words = data?.words ?? [];

      if (!words.length) {
        data = CATEGORY_DATA.activePlayers;
        words = data?.words ?? [];
      }

      const pool = getAllowedWords(data);
      const poolSet = new Set(pool);

      const used = usedWordsByCategory[categoryKey] ?? [];
      const usedSet = new Set(used);
      const available = pool.filter((w) => !usedSet.has(w));

      const finalPool = available.length ? available : pool;

      const commonWord = finalPool.length ? pickOne(finalPool) : "";
      if (commonWord) {
        setUsedWordsByCategory((prev) => {
          const prevUsed = prev[categoryKey] ?? [];
          const nextUsed = available.length ? [...prevUsed, commonWord] : [commonWord];
          return { ...prev, [categoryKey]: nextUsed };
        });
      }

      let imposterWord = "";
      if (mode === "similar" && commonWord) {
        const fromMap = data?.similar?.[commonWord];
        const candidates = Array.isArray(fromMap)
          ? fromMap.filter((w) => poolSet.has(w) && w !== commonWord)
          : [];

        if (candidates.length) imposterWord = pickDifferent(candidates, commonWord);
        else imposterWord = pickDifferent(pool, commonWord);
      }

      const baseMaxFixed = maxFixedImposters(playerList.length);
      const baseMaxRandom = maxRandomImposters(playerList.length);

      const maxNeverFirst = Math.max(0, playerList.length - 1);
      const effectiveMaxFixed = imposterNeverFirst ? Math.min(baseMaxFixed, maxNeverFirst) : baseMaxFixed;
      const effectiveMaxRandom = imposterNeverFirst ? Math.min(baseMaxRandom, maxNeverFirst) : baseMaxRandom;

      let desiredCount = 1;

      if (randomImposters) {
        if (randomMode === "custom") {
          const minC = clamp(randomMinImposters, 0, effectiveMaxRandom);
          const maxC = clamp(randomMaxImposters, 0, effectiveMaxRandom);
          const lo = Math.min(minC, maxC);
          const hi = Math.max(minC, maxC);
          desiredCount = lo + Math.floor(Math.random() * (hi - lo + 1));
        } else {
          desiredCount = Math.floor(Math.random() * (effectiveMaxRandom + 1));
        }
      } else {
        desiredCount = clamp(imposters, 1, Math.max(1, effectiveMaxFixed));
      }

      const starterId = votingOrderIds[0];
      const poolIds = imposterNeverFirst ? votingOrderIds.filter((id) => id !== starterId) : votingOrderIds;

      const finalDesiredCount = Math.min(desiredCount, poolIds.length);

      const chosenIds: string[] = [];
      const shuffledPool = shuffle(poolIds);
      for (let i = 0; i < shuffledPool.length && chosenIds.length < finalDesiredCount; i++) {
        chosenIds.push(shuffledPool[i]);
      }

      if (!randomImposters && finalDesiredCount >= 1 && chosenIds.length === 0 && poolIds.length) {
        chosenIds.push(poolIds[poolIds.length - 1]);
      }

      const idToIdx = new Map<string, number>();
      for (let i = 0; i < playerList.length; i++) idToIdx.set(playerList[i].id, i);

      const imposterIdxs: number[] = [];
      for (const id of chosenIds) {
        const idx = idToIdx.get(id);
        if (Number.isFinite(idx)) imposterIdxs.push(idx as number);
      }
      const imposterSet = new Set<number>(imposterIdxs);

      const votingOrderIdxs = votingOrderIds
        .map((id) => idToIdx.get(id))
        .filter((v): v is number => typeof v === "number" && Number.isFinite(v));

      setRound({
        imposterIds: imposterSet,
        imposterPlayerIds: chosenIds,
        votingOrderIds,
        votingOrderIdxs,
        startingPlayerId,
        startingPlayerIdx: Number.isFinite(startingPlayerIdx as any) ? (startingPlayerIdx as number) : null,
        categoryKey,
        categoryTitle,
        commonWord,
        imposterWord,
      });

      setVotingUnlocked(false);
      resetPlayersSeen();
    };

    const isPlayerImposter = (playerId: string) => {
      if (round.imposterPlayerIds?.includes(playerId)) return true;
      const asNum = Number(playerId);
      if (Number.isFinite(asNum) && round.imposterIds instanceof Set) return round.imposterIds.has(asNum);
      const idx = playerList.findIndex((p) => p.id === playerId);
      return idx >= 0 && round.imposterIds instanceof Set ? round.imposterIds.has(idx) : false;
    };

    const resetRound = () => {
      resetPlayersSeen();
      setVotingUnlocked(false);
      setRound({
        imposterIds: new Set<number>(),
        imposterPlayerIds: [],
        votingOrderIds: [],
        votingOrderIdxs: [],
        startingPlayerId: null,
        startingPlayerIdx: null,
        categoryKey: "activePlayers",
        categoryTitle: CATEGORIES.find((c) => c.key === "activePlayers")?.title ?? "categories.activePlayers",
        commonWord: "",
        imposterWord: "",
      });
    };

    return {
      players,
      setPlayers: (names) => {
        setPlayerList((prev) => {
          const next = ensurePlayers(Math.max(MIN_PLAYERS, names.length), prev).map((p, i) => ({
            ...p,
            name: names[i] ?? p.name,
          }));
          return next;
        });
      },
      setPlayerCount,

      playerList,
      setPlayerName,
      getPlayerName,

      imposters,
      setImposters,

      randomImposters,
      setRandomImposters,

      imposterNeverFirst,
      setImposterNeverFirst,

      randomMode,
      setRandomMode,

      randomMinImposters,
      randomMaxImposters,

      // Slider rules:
      // - 0..players
      // - min>max => max follows up
      // - max<min => min follows down
      setRandomMinImposters: (n) => {
        const maxRand = maxRandomImposters(playerList.length);
        const nextMin = clamp(n, 0, maxRand);
        setRandomMinImpostersState(nextMin);
        setRandomMaxImpostersState((prevMax) => {
          const clampedPrevMax = clamp(prevMax, 0, maxRand);
          return nextMin > clampedPrevMax ? nextMin : clampedPrevMax;
        });
      },

      setRandomMaxImposters: (n) => {
        const maxRand = maxRandomImposters(playerList.length);
        const nextMax = clamp(n, 0, maxRand);
        setRandomMaxImpostersState(nextMax);
        setRandomMinImpostersState((prevMin) => {
          const clampedPrevMin = clamp(prevMin, 0, maxRand);
          return nextMax < clampedPrevMin ? nextMax : clampedPrevMin;
        });
      },

      showImposterCount,
      setShowImposterCount,

      mode,
      setMode,

      showCategoryToImposter,
      setShowCategoryToImposter,

      selectedCategories,
      categoriesTouched,
      applyDefaultCategoriesIfNeeded,
      toggleCategory: (key) => {
        setCategoriesTouched(true);
        setSelectedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
      },
      selectAllCategories: () => {
        setCategoriesTouched(true);
        setSelectedCategories(makeAllSelected());
      },
      clearAllCategories: () => {
        setCategoriesTouched(true);
        const cleared = {} as SelectedMap;
        CATEGORIES.forEach((c) => (cleared[c.key] = false));
        setSelectedCategories(cleared);
      },

      playersSeen,
      seenPlayers: playersSeen,
      setSeenPlayers: setPlayersSeen,

      markPlayerSeen,
      markSeenPlayer: markPlayerSeen,

      resetPlayersSeen,
      resetSeenPlayers,

      playersSeenIds,
      setPlayersSeenIds,
      markPlayerSeenId,
      isPlayerSeen,

      round,
      startRound,
      startNewRound: startRound,
      isPlayerImposter,

      votingUnlocked,
      setVotingUnlocked,
      allPlayersSeen,
      resetRound,
    };
  }, [
    playerList,
    imposters,
    randomImposters,
    imposterNeverFirst,
    randomMode,
    randomMinImposters,
    randomMaxImposters,
    showImposterCount,
    mode,
    showCategoryToImposter,
    usedWordsByCategory,
    selectedCategories,
    categoriesTouched,
    applyDefaultCategoriesIfNeeded,
    playersSeen,
    playersSeenIds,
    round,
    votingUnlocked,
  ]);

  return <GameSettingsCtx.Provider value={api}>{children}</GameSettingsCtx.Provider>;
}

/* =========================
   HOOK
========================= */

export function useGameSettings() {
  const ctx = useContext(GameSettingsCtx);
  if (!ctx) {
    throw new Error("useGameSettings must be used inside GameSettingsProvider");
  }
  return ctx;
}