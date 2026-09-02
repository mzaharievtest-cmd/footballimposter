// data/categories/managers.ts
// Managers dataset – 100 most well-known football managers (past & present)

export type ManagerItem = {
  name: string;
  nationality?: string;
  era?: "legend" | "modern";
  free: boolean;
};

// Curated list: globally recognizable legends + current/recent elite.
// Exactly 100 entries, all real coaches/managers.
const BASE_MANAGERS: Array<Omit<ManagerItem, "free">> = [
  // Absolute legends / all-time greats
  { name: "Sir Alex Ferguson", nationality: "Scotland", era: "legend" },
  { name: "Rinus Michels", nationality: "Netherlands", era: "legend" },
  { name: "Johan Cruyff", nationality: "Netherlands", era: "legend" },
  { name: "Bill Shankly", nationality: "Scotland", era: "legend" },
  { name: "Bob Paisley", nationality: "England", era: "legend" },
  { name: "Sir Matt Busby", nationality: "Scotland", era: "legend" },
  { name: "Herbert Chapman", nationality: "England", era: "legend" },
  { name: "Sir Alf Ramsey", nationality: "England", era: "legend" },
  { name: "Jock Stein", nationality: "Scotland", era: "legend" },
  { name: "Ernst Happel", nationality: "Austria", era: "legend" },
  { name: "Vittorio Pozzo", nationality: "Italy", era: "legend" },
  { name: "Béla Guttmann", nationality: "Hungary", era: "legend" },
  { name: "Nereo Rocco", nationality: "Italy", era: "legend" },
  { name: "Miguel Muñoz", nationality: "Spain", era: "legend" },
  { name: "Luis Aragonés", nationality: "Spain", era: "legend" },
  { name: "Vicente del Bosque", nationality: "Spain", era: "legend" },
  { name: "Helenio Herrera", nationality: "Argentina", era: "legend" },
  { name: "Brian Clough", nationality: "England", era: "legend" },

  // Tactical icons / era-defining
  { name: "Arrigo Sacchi", nationality: "Italy", era: "legend" },
  { name: "Arsène Wenger", nationality: "France", era: "legend" },
  { name: "Fabio Capello", nationality: "Italy", era: "legend" },
  { name: "Giovanni Trapattoni", nationality: "Italy", era: "legend" },
  { name: "Marcello Lippi", nationality: "Italy", era: "legend" },
  { name: "Ottmar Hitzfeld", nationality: "Germany", era: "legend" },
  { name: "Jupp Heynckes", nationality: "Germany", era: "legend" },
  { name: "Louis van Gaal", nationality: "Netherlands", era: "legend" },
  { name: "Guus Hiddink", nationality: "Netherlands", era: "legend" },
  { name: "Frank Rijkaard", nationality: "Netherlands", era: "legend" },
  { name: "Sven-Göran Eriksson", nationality: "Sweden", era: "legend" },
  { name: "Sir Bobby Robson", nationality: "England", era: "legend" },
  { name: "Gérard Houllier", nationality: "France", era: "legend" },
  { name: "Guy Roux", nationality: "France", era: "legend" },
  { name: "Jack Charlton", nationality: "England", era: "legend" },
  { name: "Walter Smith", nationality: "Scotland", era: "legend" },
  { name: "Carlo Mazzone", nationality: "Italy", era: "legend" },

  // National-team / World Cup legends
  { name: "Mário Zagallo", nationality: "Brazil", era: "legend" },
  { name: "Carlos Alberto Parreira", nationality: "Brazil", era: "legend" },
  { name: "Valeriy Lobanovskyi", nationality: "Ukraine", era: "legend" },
  { name: "César Luis Menotti", nationality: "Argentina", era: "legend" },
  { name: "Carlos Bilardo", nationality: "Argentina", era: "legend" },
  { name: "Óscar Tabárez", nationality: "Uruguay", era: "legend" },

  // Modern all-time elite
  { name: "Pep Guardiola", nationality: "Spain", era: "modern" },
  { name: "Carlo Ancelotti", nationality: "Italy", era: "modern" },
  { name: "José Mourinho", nationality: "Portugal", era: "modern" },
  { name: "Jürgen Klopp", nationality: "Germany", era: "modern" },
  { name: "Zinedine Zidane", nationality: "France", era: "modern" },
  { name: "Diego Simeone", nationality: "Argentina", era: "modern" },
  { name: "Antonio Conte", nationality: "Italy", era: "modern" },
  { name: "Massimiliano Allegri", nationality: "Italy", era: "modern" },
  { name: "Luciano Spalletti", nationality: "Italy", era: "modern" },
  { name: "Roberto Mancini", nationality: "Italy", era: "modern" },
  { name: "Didier Deschamps", nationality: "France", era: "modern" },
  { name: "Joachim Löw", nationality: "Germany", era: "modern" },
  { name: "Rafa Benítez", nationality: "Spain", era: "modern" },
  { name: "Claudio Ranieri", nationality: "Italy", era: "modern" },
  { name: "Fatih Terim", nationality: "Türkiye", era: "legend" },

  // South America / international modern
  { name: "Marcelo Bielsa", nationality: "Argentina", era: "modern" },
  { name: "Marcelo Gallardo", nationality: "Argentina", era: "modern" },
  { name: "Jorge Sampaoli", nationality: "Argentina", era: "modern" },
  { name: "Gerardo Martino", nationality: "Argentina", era: "modern" },
  { name: "Tite", nationality: "Brazil", era: "modern" },
  { name: "Manuel Pellegrini", nationality: "Chile", era: "modern" },
  { name: "Abel Ferreira", nationality: "Portugal", era: "modern" },

  // Current/Recent top-club managers (high recognition)
  { name: "Luis Enrique", nationality: "Spain", era: "modern" },
  { name: "Hansi Flick", nationality: "Germany", era: "modern" },
  { name: "Xabi Alonso", nationality: "Spain", era: "modern" },
  { name: "Mikel Arteta", nationality: "Spain", era: "modern" },
  { name: "Simone Inzaghi", nationality: "Italy", era: "modern" },
  { name: "Gian Piero Gasperini", nationality: "Italy", era: "modern" },
  { name: "Roberto De Zerbi", nationality: "Italy", era: "modern" },
  { name: "Thomas Tuchel", nationality: "Germany", era: "modern" },
  { name: "Julian Nagelsmann", nationality: "Germany", era: "modern" },
  { name: "Erik ten Hag", nationality: "Netherlands", era: "modern" },
  { name: "Arne Slot", nationality: "Netherlands", era: "modern" },
  { name: "Rúben Amorim", nationality: "Portugal", era: "modern" },
  { name: "Enzo Maresca", nationality: "Italy", era: "modern" },
  { name: "Vincent Kompany", nationality: "Belgium", era: "modern" },
  { name: "Ange Postecoglou", nationality: "Australia", era: "modern" },
  { name: "David Moyes", nationality: "Scotland", era: "modern" },
  { name: "Eddie Howe", nationality: "England", era: "modern" },
  { name: "Graham Potter", nationality: "England", era: "modern" },
  { name: "Brendan Rodgers", nationality: "Northern Ireland", era: "modern" },
  { name: "Ronald Koeman", nationality: "Netherlands", era: "modern" },
  { name: "Xavi", nationality: "Spain", era: "modern" },
  { name: "Maurizio Sarri", nationality: "Italy", era: "modern" },
  { name: "Stefano Pioli", nationality: "Italy", era: "modern" },
  { name: "Roberto Di Matteo", nationality: "Italy", era: "modern" },

  // National-team managers (modern recognition)
  { name: "Gareth Southgate", nationality: "England", era: "modern" },
  { name: "Lionel Scaloni", nationality: "Argentina", era: "modern" },
  { name: "Roberto Martínez", nationality: "Spain", era: "modern" },
  { name: "Jorge Jesus", nationality: "Portugal", era: "modern" },
  { name: "Hervé Renard", nationality: "France", era: "modern" },

  // Extra high-recognition modern names (depth + variety)
  { name: "Mauricio Pochettino", nationality: "Argentina", era: "modern" },
  { name: "Unai Emery", nationality: "Spain", era: "modern" },
  { name: "Ralf Rangnick", nationality: "Germany", era: "modern" },
  { name: "Kenny Dalglish", nationality: "Scotland", era: "legend" },
  { name: "Mircea Lucescu", nationality: "Romania", era: "legend" },
  { name: "Ivica Osim", nationality: "Bosnia and Herzegovina", era: "legend" },
  { name: "Tomislav Ivić", nationality: "Croatia", era: "legend" },
  { name: "Albert Batteux", nationality: "France", era: "legend" },
];

export const MANAGERS: ManagerItem[] = BASE_MANAGERS.map((m) => ({
  ...m,
  free: false,
}));

// Convenience export for paywall/locks UI
export const items: Array<{ name: string; free: boolean }> = MANAGERS.map(({ name, free }) => ({
  name,
  free,
}));

export const MANAGER_NAMES: string[] = MANAGERS.map((m) => m.name);

export function getSimilarManagers(target: string, count = 5): string[] {
  const t = MANAGERS.find((m) => m.name === target);

  // 1) Strong match: same nationality AND same era
  let pool = MANAGERS.filter(
    (m) =>
      m.name !== target &&
      (t?.nationality ? m.nationality === t.nationality : true) &&
      (t?.era ? m.era === t.era : true)
  ).map((m) => m.name);

  // 2) If not enough, same nationality
  if (pool.length < count) {
    pool = MANAGERS.filter(
      (m) => m.name !== target && (t?.nationality ? m.nationality === t.nationality : true)
    ).map((m) => m.name);
  }

  // 3) If still not enough, same era
  if (pool.length < count) {
    pool = MANAGERS.filter((m) => m.name !== target && (t?.era ? m.era === t.era : true)).map(
      (m) => m.name
    );
  }

  // 4) Fallback: anyone
  if (pool.length < count) {
    pool = MANAGER_NAMES.filter((n) => n !== target);
  }

  return shuffle(pool).slice(0, count);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// -----------------------------
// Default export (game word bank)
// Shape: { words: string[]; similar: Record<string, string[]> }
// -----------------------------

const words = MANAGER_NAMES;

// Build a "similar" map used by Similar Word Mode.
// 5 alternatives per manager (aligned with other categories).
const similar: Record<string, string[]> = Object.fromEntries(
  words.map((name) => [name, getSimilarManagers(name, 5)])
);

const MANAGERS_BANK = { items, words, similar };

export default MANAGERS_BANK;