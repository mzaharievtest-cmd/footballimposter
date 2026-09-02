import { WordItem } from "../types";

/**
 * Legends (200)
 * - One canonical list (no duplicates)
 * - Retired / historical legends only
 * - Includes Similar Word Mode mapping (5 per name)
 */

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Single exported list (deduped). Keep the source list below as-is; duplicates are removed automatically.
// Also blocks obvious typos and a small set of still-active/not-retired names.
const BLOCKLIST = new Set<string>([
  // typos / invalid
  "Claude Claude",
  "Francesco Baresi",

  // still active / not retired (keep this short and update as needed)
  "Manuel Neuer",
  "Sergio Ramos",
  "Sergio Busquets",
  "Robert Lewandowski",
  "Luis Suárez",
  "Luka Modrić",
]);

export const words: string[] = Array.from(
  new Set([
    // GOAT / all-time icons
    "Pelé",
    "Diego Maradona",
    "Johan Cruyff",
    "Franz Beckenbauer",
    "Alfredo Di Stéfano",
    "Ferenc Puskás",
    "Michel Platini",
    "Zinédine Zidane",
    "Ronaldo Nazário",
    "Eusébio",
    "Gerd Müller",
    "Garrincha",
    "George Best",
    "Marco van Basten",
    "Paolo Maldini",
    "Lev Yashin",

    // Brazil
    "Ronaldinho",
    "Romário",
    "Zico",
    "Sócrates",
    "Falcão",
    "Rivelino",
    "Didi",
    "Jairzinho",
    "Tostão",
    "Nilton Santos",
    "Djalma Santos",
    "Carlos Alberto",
    "Cafu",
    "Roberto Carlos",
    "Rivaldo",
    "Kaká",
    "Mario Kempes",

    // Argentina / South America
    "Alfredo Di Stéfano",
    "Daniel Passarella",
    "Juan Román Riquelme",
    "Gabriel Batistuta",
    "Hernán Crespo",
    "Iván Zamorano",
    "Carlos Tevez",
    "Diego Simeone",
    "Juan Sebastián Verón",
    "Fernando Redondo",
    "Carlos Valderrama",
    "René Higuita",
    "Teófilo Cubillas",

    // Spain
    "Andrés Iniesta",
    "Xavi Hernández",
    "Raúl",
    "Fernando Torres",
    "David Villa",
    "Emilio Butragueño",
    "Fernando Hierro",
    "Paco Gento",
    "Hugo Sánchez",

    // Italy
    "Franco Baresi",
    "Fabio Cannavaro",
    "Roberto Baggio",
    "Andrea Pirlo",
    "Gennaro Gattuso",
    "Clarence Seedorf",
    "Francesco Totti",
    "Alessandro Del Piero",
    "Filippo Inzaghi",
    "Christian Vieri",
    "Giuseppe Meazza",
    "Giacinto Facchetti",
    "Gianni Rivera",
    "Sandro Mazzola",
    "Gaetano Scirea",
    "Dino Zoff",
    "Gianluigi Buffon",

    // Germany / Central Europe
    "Lothar Matthäus",
    "Bastian Schweinsteiger",
    "Michael Ballack",
    "Jürgen Klinsmann",
    "Miroslav Klose",
    "Oliver Kahn",
    "Günter Netzer",
    "Karl-Heinz Rummenigge",

    // Netherlands
    "Ruud Gullit",
    "Frank Rijkaard",
    "Johan Neeskens",
    "Ruud Krol",
    "Edgar Davids",
    "Wesley Sneijder",
    "Robin van Persie",
    "Ruud van Nistelrooy",
    "Edwin van der Sar",
    "Dennis Bergkamp",

    // France
    "Thierry Henry",
    "Raymond Kopa",
    "Just Fontaine",
    "Jean-Pierre Papin",
    "Marcel Desailly",
    "Lilian Thuram",
    "Laurent Blanc",
    "Patrick Vieira",
    "Eric Cantona",

    // Portugal
    "Luís Figo",
    "Rui Costa",

    // UK / England / Scotland
    "Bobby Charlton",
    "Bobby Moore",
    "Stanley Matthews",
    "Jimmy Greaves",
    "Dixie Dean",
    "Gordon Banks",
    "Denis Law",
    "Kenny Dalglish",
    "Alan Shearer",
    "Wayne Rooney",
    "Ryan Giggs",
    "Paul Scholes",
    "Steven Gerrard",
    "Frank Lampard",
    "John Terry",
    "Gary Lineker",
    "Paul Gascoigne",
    "Ian Rush",
    "John Barnes",
    "Peter Schmeichel",
    "Bryan Robson",
    "Graeme Souness",
    "Gianfranco Zola",

    // Balkans / Eastern Europe
    "Gheorghe Hagi",
    "Oleg Blokhin",
    "Davor Šuker",
    "Nemanja Vidić",

    // Scandinavia / other Europe
    "Michael Laudrup",
    "Allan Simonsen",
    "Henrik Larsson",
    "Jari Litmanen",
    "Uwe Seeler",
    "Kevin Keegan",
    "Gunnar Nordahl",
    "Sándor Kocsis",
    "Gyula Grosics",
    "Josef Masopust",
    "Enzo Scifo",

    // Modern legends (retired)
    "Didier Drogba",
    "Samuel Eto'o",
    "George Weah",
    "Hristo Stoichkov",
    "Pavel Nedvěd",
    "David Beckham",
    "Arjen Robben",
    "Franck Ribéry",
    "Xabi Alonso",
    "Toni Kroos",
    "Zlatan Ibrahimović",
    "Gareth Bale",

    // Extra depth to reach 200 (classic greats)
    "Matthias Sindelar",
    "Paolo Rossi",
    "Gigi Riva",
    "Roberto Donadoni",
    "Giancarlo Antognoni",
    "Esteban Cambiasso",
    "Juan Pablo Sorín",
    "Francesco Toldo",
    "Walter Zenga",
    "Patrice Evra",
    "Rio Ferdinand",
    "Yaya Touré",
    "Nándor Hidegkuti",
    "Ferenc Bene",
    "Hakan Şükür",
    "Nuno Gomes",
    "Guti",
    "Iván Helguera",
    "Brian Laudrup",
    "Glenn Hoddle",
    "Luis Enrique",
    "Javier Mascherano",
    "Javier Saviola",
    "Roberto Rivellino",
    "Pavel Nedvěd",
    "Allan Simonsen",
    "Valentino Mazzola",
    "Franco Causio",

    // Fillers (still legends, but less "GOAT" tier)
    "David Trezeguet",
    "Michael Owen",
    "Roy Keane",
    "Claude Makélélé",
    "Rui Costa",
    "Emilio Butragueño",
    "Patrick Kluivert",
    "Henrik Larsson",
    "Jean-Pierre Papin",
    "Enzo Scifo",
    "Gianluca Vialli",
    "Roberto Bettega",
    "Michael Laudrup",
    "John Charles",
    "George Weah",
    "Ray Wilkins",
    "Gary Neville",
    "Ashley Cole",
    "Cesc Fàbregas",
    "Michael Essien",
    "Claude Claude",

    // Added to reach 200 (unique, retired legends)
    "Javier Zanetti",
    "Philipp Lahm",
    "Carles Puyol",
    "Iker Casillas",
    "Alessandro Nesta",
    "David Silva",
    "Diego Forlán",
    "Jay-Jay Okocha",
    "Roger Milla",
    "Rogério Ceni",
    "Frank de Boer",
  ])
).filter((n) => n && !BLOCKLIST.has(n));

export const items: Array<{ name: string; free: boolean }> = words.map((name) => ({
  name,
  free: false,
}));

// Remove obvious bad entries (typos) and active/not-retired if they slip in.
const HARD_BLOCKLIST = new Set<string>([
  "Claude Claude", // typo
  "Manuel Neuer",
  "Sergio Ramos",
  "Sergio Busquets",
]);

// Deterministic shuffle so similars are stable across reloads
function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffled<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    // xorshift32
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Lightweight clusters to make similars feel meaningful.
// (We avoid heavy metadata; clusters are partial and the fallback keeps it robust.)
const CLUSTERS: Record<string, string[]> = {
  brazil: [
    "Pelé",
    "Garrincha",
    "Ronaldinho",
    "Ronaldo Nazário",
    "Romário",
    "Zico",
    "Sócrates",
    "Rivaldo",
    "Kaká",
    "Cafu",
    "Roberto Carlos",
    "Carlos Alberto",
  ],
  argentina: [
    "Diego Maradona",
    "Alfredo Di Stéfano",
    "Daniel Passarella",
    "Juan Román Riquelme",
    "Gabriel Batistuta",
    "Hernán Crespo",
    "Diego Simeone",
    "Juan Sebastián Verón",
    "Fernando Redondo",
    "Javier Mascherano",
    "Carlos Tevez",
  ],
  italy: [
    "Paolo Maldini",
    "Franco Baresi",
    "Fabio Cannavaro",
    "Roberto Baggio",
    "Andrea Pirlo",
    "Gennaro Gattuso",
    "Francesco Totti",
    "Alessandro Del Piero",
    "Gianluigi Buffon",
    "Dino Zoff",
    "Giuseppe Meazza",
    "Gianni Rivera",
  ],
  spain: [
    "Johan Cruyff",
    "Andrés Iniesta",
    "Xavi Hernández",
    "Raúl",
    "David Villa",
    "Fernando Torres",
    "Paco Gento",
    "Luis Enrique",
  ],
  england: [
    "Bobby Charlton",
    "Bobby Moore",
    "Jimmy Greaves",
    "Dixie Dean",
    "Gordon Banks",
    "Alan Shearer",
    "Wayne Rooney",
    "Steven Gerrard",
    "Frank Lampard",
    "John Terry",
    "Paul Scholes",
  ],
  netherlands: [
    "Johan Cruyff",
    "Rinus Michels", // not in list, but harmless if absent
    "Marco van Basten",
    "Ruud Gullit",
    "Frank Rijkaard",
    "Dennis Bergkamp",
    "Wesley Sneijder",
    "Robin van Persie",
    "Ruud van Nistelrooy",
    "Edwin van der Sar",
  ],
  france: [
    "Zinédine Zidane",
    "Thierry Henry",
    "Raymond Kopa",
    "Just Fontaine",
    "Eric Cantona",
    "Patrick Vieira",
    "Marcel Desailly",
    "Lilian Thuram",
    "Laurent Blanc",
  ],
  goalkeepers: [
    "Lev Yashin",
    "Gianluigi Buffon",
    "Dino Zoff",
    "Oliver Kahn",
    "Peter Schmeichel",
    "Iker Casillas",
    "Walter Zenga",
  ],
};

const CLUSTER_BY_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(CLUSTERS).flatMap(([cluster, names]) =>
    names.map((n) => [n, cluster] as const)
  )
);

function pickSimilars(name: string, count = 5): string[] {
  const seed = hashString(name);
  const cluster = CLUSTER_BY_NAME[name];

  const clusterPool = cluster
    ? (CLUSTERS[cluster] || []).filter((n) => n !== name && words.includes(n))
    : [];

  const globalPool = words.filter((n) => n !== name);

  const combined = [
    ...shuffled(clusterPool, seed),
    ...shuffled(globalPool, seed ^ 0x9e3779b9),
  ];

  const unique = Array.from(new Set(combined));
  return unique.slice(0, count);
}

// Similar Word Mode: exactly 5 similars per legend
export const similar: Record<string, string[]> = Object.fromEntries(
  words.map((n) => [n, pickSimilars(n, 5)])
);

// Optional: keep a WordItem[] export for UI that expects ids
export const legends: WordItem[] = words.map((name, idx) => ({
  id: `${slugify(name)}-${idx}`,
  value: name,
  free: false,
}));

export default {
  items,
  words,
  similar,
  legends,
};