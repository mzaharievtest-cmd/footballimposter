/**
 * Design tokens — dark green, neon green accent.
 * Reference: the players edit modal (rgba(255,255,255,0.04) surface, #00e06a button).
 */

export const C = {
  // Backgrounds — dark green, three levels
  bg:         "#06110a",   // screen background
  surface:    "rgba(255,255,255,0.04)",   // cards, modals, sheets
  surfaceUp:  "rgba(255,255,255,0.07)",   // raised elements, inputs
  surfaceTop: "rgba(255,255,255,0.10)",   // highest surface, badges

  // Borders
  border:     "rgba(255,255,255,0.07)",
  borderMid:  "rgba(255,255,255,0.14)",

  // Accent — neon green matching the Save button
  accent:       "#00e06a",
  accentSoft:   "rgba(0,224,106,0.14)",
  accentBorder: "rgba(0,224,106,0.35)",

  // Semantic
  danger:       "#EF4444",
  dangerSoft:   "rgba(239,68,68,0.13)",
  gold:         "#F59E0B",
  goldSoft:     "rgba(245,158,11,0.13)",

  // Text
  white:        "#FFFFFF",
  text:         "rgba(255,255,255,0.92)",
  textSub:      "rgba(255,255,255,0.50)",
  textMuted:    "rgba(255,255,255,0.28)",
} as const;

export const R = {
  xs:   8,
  sm:   12,
  md:   16,
  lg:   20,
  xl:   26,
  pill: 999,
} as const;

// Black shadows only — no colored glows
export const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 14,
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 22,
    elevation: 9,
  },
} as const;
