// data/categories/nationalTeams.ts
// National Teams – Top 100 (game-ready)

const words: string[] = [
  "Spain",
  "Argentina",
  "France",
  "England",
  "Brazil",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Germany",
  "Croatia",
  "Morocco",
  "Italy",
  "Colombia",
  "United States",
  "Mexico",
  "Uruguay",
  "Switzerland",
  "Japan",
  "Senegal",
  "Iran",
  "Denmark",
  "South Korea",
  "Ecuador",
  "Austria",
  "Türkiye",
  "Australia",
  "Canada",
  "Ukraine",
  "Norway",
  "Panama",
  "Poland",
  "Wales",
  "Russia",
  "Egypt",
  "Algeria",
  "Scotland",
  "Serbia",
  "Nigeria",
  "Paraguay",
  "Tunisia",
  "Hungary",
  "Ivory Coast",
  "Sweden",
  "Czech Republic",
  "Slovakia",
  "Greece",
  "Romania",
  "Venezuela",
  "Costa Rica",
  "Uzbekistan",
  "Qatar",
  "Peru",
  "Chile",
  "Mali",
  "Slovenia",
  "DR Congo",
  "Cameroon",
  "Iraq",
  "Republic of Ireland",
  "Saudi Arabia",
  "South Africa",
  "Burkina Faso",
  "Albania",
  "Honduras",
  "North Macedonia",
  "Jordan",
  "United Arab Emirates",
  "Cape Verde",
  "Northern Ireland",
  "Jamaica",
  "Bosnia and Herzegovina",
  "Ghana",
  "Georgia",
  "Iceland",
  "Finland",
  "Bolivia",
  "Israel",
  "Gabon",
  "Oman",
  "Kosovo",
  "Guinea",
  "Curaçao",
  "Montenegro",
  "Haiti",
  "Uganda",
  "New Zealand",
  "Syria",
  "Bulgaria",
  "Angola",
  "Zambia",
  "Bahrain",
  "Benin",
  "China",
  "Guatemala",
  "Thailand",
  "Palestine",
  "Equatorial Guinea",
  "Trinidad and Tobago",
  "Belarus",
  "El Salvador",
];

type Confederation = "UEFA" | "CONMEBOL" | "CONCACAF" | "CAF" | "AFC" | "OFC";

// Confederation groups (only teams that exist in `words`)
const UEFA = new Set([
  "Spain",
  "France",
  "England",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Germany",
  "Croatia",
  "Italy",
  "Switzerland",
  "Denmark",
  "Austria",
  "Türkiye",
  "Ukraine",
  "Norway",
  "Poland",
  "Wales",
  "Russia",
  "Scotland",
  "Serbia",
  "Hungary",
  "Sweden",
  "Czech Republic",
  "Slovakia",
  "Greece",
  "Romania",
  "Slovenia",
  "Republic of Ireland",
  "Albania",
  "North Macedonia",
  "Northern Ireland",
  "Bosnia and Herzegovina",
  "Georgia",
  "Iceland",
  "Finland",
  "Israel",
  "Kosovo",
  "Montenegro",
  "Bulgaria",
  "Belarus",
]);

const CONMEBOL = new Set([
  "Argentina",
  "Brazil",
  "Uruguay",
  "Colombia",
  "Ecuador",
  "Paraguay",
  "Peru",
  "Chile",
  "Venezuela",
  "Bolivia",
]);

const CONCACAF = new Set([
  "United States",
  "Mexico",
  "Canada",
  "Panama",
  "Costa Rica",
  "Honduras",
  "Jamaica",
  "Curaçao",
  "Haiti",
  "Guatemala",
  "El Salvador",
  "Trinidad and Tobago",
]);

const CAF = new Set([
  "Morocco",
  "Senegal",
  "Egypt",
  "Algeria",
  "Nigeria",
  "Tunisia",
  "Ivory Coast",
  "Ghana",
  "Cameroon",
  "Mali",
  "DR Congo",
  "South Africa",
  "Cape Verde",
  "Guinea",
  "Gabon",
  "Uganda",
  "Angola",
  "Zambia",
  "Burkina Faso",
  "Benin",
  "Equatorial Guinea",
]);

const AFC = new Set([
  "Japan",
  "Iran",
  "South Korea",
  "Australia",
  "Saudi Arabia",
  "Qatar",
  "Iraq",
  "Jordan",
  "United Arab Emirates",
  "Oman",
  "Bahrain",
  "Syria",
  "Palestine",
  "China",
  "Thailand",
  "Uzbekistan",
]);

const OFC = new Set(["New Zealand"]);

function getConfederation(team: string): Confederation {
  if (UEFA.has(team)) return "UEFA";
  if (CONMEBOL.has(team)) return "CONMEBOL";
  if (CONCACAF.has(team)) return "CONCACAF";
  if (CAF.has(team)) return "CAF";
  if (AFC.has(team)) return "AFC";
  return "OFC";
}

// A few high-signal rivalries / classic matchups to bias similars (must exist in `words`)
const rivalryPairs: Record<string, string[]> = {
  Spain: ["Portugal", "France"],
  England: ["Scotland", "Wales"],
  France: ["England", "Germany"],
  Germany: ["Netherlands", "France"],
  Netherlands: ["Belgium", "Germany"],
  Belgium: ["Netherlands", "France"],
  Italy: ["France", "Germany"],
  Croatia: ["Serbia", "Bosnia and Herzegovina"],
  Serbia: ["Croatia", "Bosnia and Herzegovina"],
  "Bosnia and Herzegovina": ["Serbia", "Croatia"],
  "Republic of Ireland": ["Northern Ireland", "Scotland"],
  "Northern Ireland": ["Republic of Ireland", "Scotland"],

  Argentina: ["Brazil", "Uruguay"],
  Brazil: ["Argentina", "Uruguay"],
  Uruguay: ["Argentina", "Brazil"],
  Colombia: ["Ecuador", "Peru"],

  "United States": ["Mexico", "Canada"],
  Mexico: ["United States", "Honduras"],
  Canada: ["United States", "Mexico"],

  Morocco: ["Algeria", "Tunisia"],
  Algeria: ["Morocco", "Tunisia"],
  Tunisia: ["Algeria", "Morocco"],
  Nigeria: ["Ghana", "Cameroon"],
  Ghana: ["Nigeria", "Ivory Coast"],
  "Ivory Coast": ["Ghana", "Nigeria"],

  Japan: ["South Korea", "Australia"],
  "South Korea": ["Japan", "Iran"],
  Iran: ["South Korea", "Saudi Arabia"],
  Australia: ["Japan", "New Zealand"],
  "Saudi Arabia": ["Qatar", "United Arab Emirates"],
  Qatar: ["Saudi Arabia", "United Arab Emirates"],
  "United Arab Emirates": ["Saudi Arabia", "Qatar"],
};

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

function uniq<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function pickSimilars(team: string, count = 5): string[] {
  const conf = getConfederation(team);
  const sameConfPool = words.filter((t) => t !== team && getConfederation(t) === conf);

  // Start with rivalry-biased picks
  const rivals = (rivalryPairs[team] || []).filter((t) => words.includes(t) && t !== team);

  // Then fill from same confederation
  const seed = hashString(team);
  const restSameConf = shuffled(sameConfPool, seed);

  // If still not enough, fill from global pool (keeps game robust)
  const globalPool = shuffled(words.filter((t) => t !== team), seed ^ 0x9e3779b9);

  const combined = uniq([...rivals, ...restSameConf, ...globalPool]).filter((t) => t !== team);
  return combined.slice(0, count);
}

// Build similar map (exactly 5 per team)
const similar: Record<string, string[]> = Object.fromEntries(
  words.map((t) => [t, pickSimilars(t, 5)])
);

export const items: Array<{ name: string; free: boolean }> = words.map((name) => ({
  name,
  free: false,
}));

export default {
  words,
  similar,
};