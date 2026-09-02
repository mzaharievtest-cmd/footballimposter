// data/categories/leagues.ts
// Football Leagues – Top 25 (Most Recognizable Worldwide)

export type League = {
  name: string;
  country: string;
  similar: string[]; // 3–5 similar leagues
  free: boolean;
};

export const LEAGUES: League[] = [
  // ===== TOP EUROPE =====
  { name: "Premier League", country: "England", similar: ["La Liga", "Serie A", "Bundesliga", "Ligue 1"], free: true },
  { name: "La Liga", country: "Spain", similar: ["Premier League", "Serie A", "Bundesliga", "Ligue 1"], free: true },
  { name: "Serie A", country: "Italy", similar: ["Premier League", "La Liga", "Bundesliga", "Ligue 1"], free: true },
  { name: "Bundesliga", country: "Germany", similar: ["Premier League", "La Liga", "Serie A", "Ligue 1"], free: true },
  { name: "Ligue 1", country: "France", similar: ["Premier League", "La Liga", "Serie A", "Bundesliga"], free: true },

  // ===== STRONG EUROPEAN LEAGUES =====
  { name: "Primeira Liga", country: "Portugal", similar: ["Eredivisie", "Belgian Pro League", "Scottish Premiership", "Turkish Süper Lig"], free: true },
  { name: "Eredivisie", country: "Netherlands", similar: ["Primeira Liga", "Belgian Pro League", "Scottish Premiership", "Turkish Süper Lig"], free: true },
  { name: "Belgian Pro League", country: "Belgium", similar: ["Eredivisie", "Primeira Liga", "Scottish Premiership", "Turkish Süper Lig"], free: true },
  { name: "Scottish Premiership", country: "Scotland", similar: ["Eredivisie", "Primeira Liga", "Belgian Pro League", "Turkish Süper Lig"], free: true },
  { name: "Turkish Süper Lig", country: "Turkey", similar: ["Primeira Liga", "Eredivisie", "Belgian Pro League", "Scottish Premiership"], free: true },

  // ===== AMERICAS =====
  { name: "Campeonato Brasileiro Série A", country: "Brazil", similar: ["Argentine Primera División", "Liga MX", "Major League Soccer"], free: true },
  { name: "Argentine Primera División", country: "Argentina", similar: ["Campeonato Brasileiro Série A", "Liga MX", "Major League Soccer"], free: true },
  { name: "Liga MX", country: "Mexico", similar: ["Major League Soccer", "Campeonato Brasileiro Série A", "Argentine Primera División"], free: true },
  { name: "Major League Soccer", country: "United States", similar: ["Liga MX", "Campeonato Brasileiro Série A", "Argentine Primera División"], free: true },

  // ===== ASIA & MIDDLE EAST =====
  { name: "Saudi Pro League", country: "Saudi Arabia", similar: ["J.League", "K League 1", "Turkish Süper Lig"], free: true },
  { name: "J.League", country: "Japan", similar: ["Saudi Pro League", "K League 1", "Chinese Super League"], free: true },
  { name: "K League 1", country: "South Korea", similar: ["J.League", "Chinese Super League", "Saudi Pro League"], free: true },
  { name: "Chinese Super League", country: "China", similar: ["J.League", "K League 1", "Saudi Pro League"], free: true },

  // ===== OTHER WELL-KNOWN EUROPE =====
  { name: "Greek Super League", country: "Greece", similar: ["Turkish Süper Lig", "Scottish Premiership", "Belgian Pro League"], free: true },
  { name: "Serbian SuperLiga", country: "Serbia", similar: ["Croatian HNL", "Greek Super League", "Turkish Süper Lig"], free: true },
  { name: "Croatian HNL", country: "Croatia", similar: ["Serbian SuperLiga", "Greek Super League", "Austrian Bundesliga"], free: true },
  { name: "Ukrainian Premier League", country: "Ukraine", similar: ["Polish Ekstraklasa", "Greek Super League", "Turkish Süper Lig"], free: true },

  // ===== OTHER NOTABLE =====
  { name: "Swiss Super League", country: "Switzerland", similar: ["Austrian Bundesliga", "Belgian Pro League"], free: true },
  { name: "Austrian Bundesliga", country: "Austria", similar: ["Swiss Super League", "Belgian Pro League"], free: true },

  // ===== SECOND TIERS (VERY WELL-KNOWN) =====
  { name: "EFL Championship", country: "England", similar: ["Serie B", "2. Bundesliga", "Ligue 2"], free: true },
  { name: "Serie B", country: "Italy", similar: ["EFL Championship", "2. Bundesliga", "Ligue 2"], free: true },
  { name: "2. Bundesliga", country: "Germany", similar: ["EFL Championship", "Serie B", "Ligue 2"], free: true },
  { name: "Ligue 2", country: "France", similar: ["EFL Championship", "Serie B", "2. Bundesliga"], free: true },

  // ===== NORDICS =====
  { name: "Allsvenskan", country: "Sweden", similar: ["Eliteserien", "Danish Superliga", "Veikkausliiga"], free: true },
  { name: "Eliteserien", country: "Norway", similar: ["Allsvenskan", "Danish Superliga", "Veikkausliiga"], free: true },
  { name: "Danish Superliga", country: "Denmark", similar: ["Allsvenskan", "Eliteserien", "Veikkausliiga"], free: true },
  { name: "Veikkausliiga", country: "Finland", similar: ["Allsvenskan", "Eliteserien", "Danish Superliga"], free: true },
  { name: "Úrvalsdeild", country: "Iceland", similar: ["Veikkausliiga", "Eliteserien", "Allsvenskan"], free: true },

  // ===== CENTRAL / EASTERN EUROPE =====
  { name: "Czech First League", country: "Czech Republic", similar: ["Slovak Super Liga", "Polish Ekstraklasa", "Austrian Bundesliga"], free: false },
  { name: "Slovak Super Liga", country: "Slovakia", similar: ["Czech First League", "Hungarian NB I", "Polish Ekstraklasa"], free: false },
  { name: "Hungarian NB I", country: "Hungary", similar: ["Slovak Super Liga", "Czech First League", "Polish Ekstraklasa"], free: false },

  // ===== ADDITIONAL WELL-KNOWN LEAGUES =====
  { name: "Polish Ekstraklasa", country: "Poland", similar: ["Czech First League", "Slovak Super Liga", "Ukrainian Premier League"], free: false },
  { name: "Russian Premier League", country: "Russia", similar: ["Turkish Süper Lig", "Ukrainian Premier League", "Greek Super League"], free: false },
  { name: "Romanian Liga I", country: "Romania", similar: ["Hungarian NB I", "Serbian SuperLiga", "Bulgarian First League"], free: false },
  { name: "Segunda División", country: "Spain", similar: ["EFL Championship", "Serie B", "Ligue 2"], free: false },
];

// Leagues is a premium category — every item is locked behind a purchase.
LEAGUES.forEach((l) => {
  l.free = false;
});

export const LEAGUE_NAMES: string[] = LEAGUES.map((l) => l.name);

export default LEAGUE_NAMES;