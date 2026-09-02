// data/categories/clubs.ts
// Clubs dataset for "Clubs" category.
// Includes: Top 5 leagues + notable clubs from other leagues.

export type ClubItem = {
  name: string;
  similar: [string, string, string, string, string];
  free: boolean;
};

export const CLUBS: ClubItem[] = [
  // ------------------------------
  // Premier League (+ a couple known extras you added)
  // ------------------------------
  { name: "Arsenal", similar: ["Tottenham Hotspur", "Chelsea", "Liverpool", "Manchester City", "West Ham United"], free: true },
  { name: "Aston Villa", similar: ["Nottingham Forest", "Leicester City", "Newcastle United", "Everton", "West Ham United"], free: false },
  { name: "Bournemouth", similar: ["Brentford", "Brighton & Hove Albion", "Fulham", "Crystal Palace", "Ipswich Town"], free: false },
  { name: "Brentford", similar: ["Brighton & Hove Albion", "Fulham", "Crystal Palace", "Bournemouth", "West Ham United"], free: false },
  { name: "Brighton & Hove Albion", similar: ["Brentford", "Fulham", "Crystal Palace", "Bournemouth", "West Ham United"], free: false },
  { name: "Chelsea", similar: ["Arsenal", "Tottenham Hotspur", "Manchester City", "Liverpool", "West Ham United"], free: true },
  { name: "Crystal Palace", similar: ["Fulham", "Brentford", "Brighton & Hove Albion", "West Ham United", "Bournemouth"], free: false },
  { name: "Everton", similar: ["Liverpool", "Newcastle United", "West Ham United", "Aston Villa", "Nottingham Forest"], free: false },
  { name: "Fulham", similar: ["Crystal Palace", "Brentford", "Chelsea", "Brighton & Hove Albion", "West Ham United"], free: false },
  { name: "Burnley", similar: ["Leicester City", "West Ham United", "Nottingham Forest", "Bournemouth", "Brentford"], free: false },
  { name: "Leeds United", similar: ["Nottingham Forest", "Burnley", "West Ham United", "Aston Villa", "Newcastle United"], free: false },
  { name: "Liverpool", similar: ["Everton", "Manchester United", "Arsenal", "Manchester City", "Tottenham Hotspur"], free: true },
  { name: "Manchester City", similar: ["Manchester United", "Liverpool", "Arsenal", "Chelsea", "Newcastle United"], free: true },
  { name: "Manchester United", similar: ["Manchester City", "Liverpool", "Arsenal", "Chelsea", "Newcastle United"], free: true },
  { name: "Newcastle United", similar: ["Sunderland", "Aston Villa", "Manchester City", "Manchester United", "West Ham United"], free: false },
  { name: "Nottingham Forest", similar: ["Leicester City", "Aston Villa", "Burnley", "West Ham United", "Everton"], free: false },
  { name: "Sunderland", similar: ["Newcastle United", "Bournemouth", "Burnley", "Leicester City", "Brentford"], free: false },
  { name: "Tottenham Hotspur", similar: ["Arsenal", "Chelsea", "Liverpool", "Manchester United", "West Ham United"], free: true },
  { name: "West Ham United", similar: ["Tottenham Hotspur", "Arsenal", "Chelsea", "Crystal Palace", "Everton"], free: false },
  { name: "Wolverhampton Wanderers", similar: ["Nottingham Forest", "Everton", "Aston Villa", "West Ham United", "Leicester City"], free: false },

  // ------------------------------
  // LaLiga
  // ------------------------------
  { name: "Athletic Club", similar: ["Real Sociedad", "CA Osasuna", "Deportivo Alavés", "Sevilla FC", "Valencia CF"], free: false },
  { name: "Atlético de Madrid", similar: ["Real Madrid", "Getafe CF", "Rayo Vallecano", "Sevilla FC", "Valencia CF"], free: true },
  { name: "CA Osasuna", similar: ["Athletic Club", "Real Sociedad", "Deportivo Alavés", "Rayo Vallecano", "RCD Mallorca"], free: false },
  { name: "Celta", similar: ["Real Sociedad", "RCD Mallorca", "Valencia CF", "Villarreal CF", "Rayo Vallecano"], free: false },
  { name: "Deportivo Alavés", similar: ["Athletic Club", "Real Sociedad", "CA Osasuna", "Getafe CF", "Rayo Vallecano"], free: false },
  { name: "Elche CF", similar: ["Levante UD", "Valencia CF", "Villarreal CF", "Getafe CF", "RCD Mallorca"], free: false },
  { name: "FC Barcelona", similar: ["RCD Espanyol de Barcelona", "Girona FC", "Real Madrid", "Atlético de Madrid", "Sevilla FC"], free: true },
  { name: "Getafe CF", similar: ["Atlético de Madrid", "Real Madrid", "Rayo Vallecano", "RCD Espanyol de Barcelona", "Valencia CF"], free: false },
  { name: "Girona FC", similar: ["FC Barcelona", "RCD Espanyol de Barcelona", "Real Sociedad", "Villarreal CF", "RCD Mallorca"], free: false },
  { name: "Levante UD", similar: ["Valencia CF", "Villarreal CF", "Elche CF", "RCD Mallorca", "Getafe CF"], free: false },
  { name: "Rayo Vallecano", similar: ["Getafe CF", "Atlético de Madrid", "CA Osasuna", "Celta", "Deportivo Alavés"], free: false },
  { name: "RCD Espanyol de Barcelona", similar: ["FC Barcelona", "Girona FC", "Getafe CF", "Valencia CF", "RCD Mallorca"], free: false },
  { name: "RCD Mallorca", similar: ["CA Osasuna", "Celta", "Valencia CF", "Deportivo Alavés", "Rayo Vallecano"], free: false },
  { name: "Real Betis", similar: ["Sevilla FC", "Valencia CF", "Villarreal CF", "Real Sociedad", "Atlético de Madrid"], free: false },
  { name: "Real Madrid", similar: ["Atlético de Madrid", "Getafe CF", "FC Barcelona", "Sevilla FC", "Valencia CF"], free: true },
  { name: "Real Oviedo", similar: ["Celta", "Real Sociedad", "Deportivo Alavés", "CA Osasuna", "RCD Mallorca"], free: false },
  { name: "Real Sociedad", similar: ["Athletic Club", "CA Osasuna", "Deportivo Alavés", "Villarreal CF", "Sevilla FC"], free: false },
  { name: "Sevilla FC", similar: ["Real Betis", "Valencia CF", "Atlético de Madrid", "Real Madrid", "Villarreal CF"], free: false },
  { name: "Valencia CF", similar: ["Levante UD", "Villarreal CF", "Sevilla FC", "Atlético de Madrid", "Real Madrid"], free: false },
  { name: "Villarreal CF", similar: ["Valencia CF", "Levante UD", "Sevilla FC", "Real Sociedad", "Real Betis"], free: false },

  // ------------------------------
  // Serie A (your added set)
  // ------------------------------
  { name: "Atalanta", similar: ["Napoli", "Lazio", "Roma", "Fiorentina", "Bologna"], free: false },
  { name: "Bologna", similar: ["Fiorentina", "Torino", "Udinese", "Atalanta", "Genoa"], free: false },
  { name: "Cagliari", similar: ["Empoli", "Lecce", "Hellas Verona", "Frosinone", "Genoa"], free: false },
  { name: "Como", similar: ["Monza", "Empoli", "Frosinone", "Cagliari", "Lecce"], free: false },
  { name: "Empoli", similar: ["Lecce", "Cagliari", "Frosinone", "Hellas Verona", "Como"], free: false },
  { name: "Fiorentina", similar: ["Bologna", "Torino", "Atalanta", "Roma", "Lazio"], free: false },
  { name: "Frosinone", similar: ["Empoli", "Lecce", "Cagliari", "Como", "Hellas Verona"], free: false },
  { name: "Genoa", similar: ["Torino", "Bologna", "Udinese", "Cagliari", "Monza"], free: false },
  { name: "Hellas Verona", similar: ["Empoli", "Lecce", "Cagliari", "Udinese", "Frosinone"], free: false },
  { name: "Inter", similar: ["AC Milan", "Juventus", "Napoli", "Roma", "Lazio"], free: true },
  { name: "Juventus", similar: ["Inter", "AC Milan", "Napoli", "Roma", "Lazio"], free: true },
  { name: "Lazio", similar: ["Roma", "Napoli", "Atalanta", "Fiorentina", "Inter"], free: false },
  { name: "Lecce", similar: ["Empoli", "Frosinone", "Cagliari", "Hellas Verona", "Como"], free: false },
  { name: "AC Milan", similar: ["Inter", "Juventus", "Napoli", "Roma", "Lazio"], free: true },
  { name: "Monza", similar: ["Como", "Empoli", "Bologna", "Udinese", "Torino"], free: false },
  { name: "Napoli", similar: ["Roma", "Lazio", "Atalanta", "Inter", "Juventus"], free: true },
  { name: "Roma", similar: ["Lazio", "Napoli", "Inter", "Juventus", "Fiorentina"], free: true },
  { name: "Torino", similar: ["Fiorentina", "Bologna", "Udinese", "Genoa", "Monza"], free: false },
  { name: "Udinese", similar: ["Torino", "Bologna", "Hellas Verona", "Monza", "Genoa"], free: false },
  { name: "Venezia", similar: ["Cagliari", "Empoli", "Como", "Lecce", "Frosinone"], free: false },

  // ------------------------------
  // Bundesliga
  // ------------------------------
  { name: "Bayern Munich", similar: ["Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen", "Borussia Mönchengladbach", "Eintracht Frankfurt"], free: true },
  { name: "Borussia Dortmund", similar: ["Bayern Munich", "RB Leipzig", "Bayer Leverkusen", "Borussia Mönchengladbach", "Eintracht Frankfurt"], free: true },
  { name: "RB Leipzig", similar: ["Bayer Leverkusen", "Bayern Munich", "Borussia Dortmund", "VfB Stuttgart", "Eintracht Frankfurt"], free: true },
  { name: "Bayer Leverkusen", similar: ["RB Leipzig", "Bayern Munich", "Borussia Dortmund", "VfB Stuttgart", "Eintracht Frankfurt"], free: false },
  { name: "VfB Stuttgart", similar: ["Eintracht Frankfurt", "SC Freiburg", "RB Leipzig", "Bayer Leverkusen", "Borussia Mönchengladbach"], free: false },
  { name: "Eintracht Frankfurt", similar: ["VfB Stuttgart", "Borussia Mönchengladbach", "SC Freiburg", "RB Leipzig", "Borussia Dortmund"], free: false },
  { name: "SC Freiburg", similar: ["VfB Stuttgart", "FC Augsburg", "Mainz 05", "TSG Hoffenheim", "Eintracht Frankfurt"], free: false },
  { name: "Borussia Mönchengladbach", similar: ["Eintracht Frankfurt", "VfB Stuttgart", "Borussia Dortmund", "Werder Bremen", "Bayern Munich"], free: false },
  { name: "Werder Bremen", similar: ["Borussia Mönchengladbach", "VfL Wolfsburg", "FC Augsburg", "Mainz 05", "Union Berlin"], free: false },
  { name: "VfL Wolfsburg", similar: ["Werder Bremen", "FC Augsburg", "TSG Hoffenheim", "Mainz 05", "Borussia Mönchengladbach"], free: false },
  { name: "Union Berlin", similar: ["FC Augsburg", "Mainz 05", "Werder Bremen", "VfL Bochum", "SC Freiburg"], free: false },
  { name: "TSG Hoffenheim", similar: ["VfL Wolfsburg", "Mainz 05", "FC Augsburg", "SC Freiburg", "VfB Stuttgart"], free: false },
  { name: "Mainz 05", similar: ["FC Augsburg", "Union Berlin", "TSG Hoffenheim", "SC Freiburg", "VfL Bochum"], free: false },
  { name: "FC Augsburg", similar: ["Mainz 05", "Union Berlin", "Werder Bremen", "SC Freiburg", "VfL Bochum"], free: false },
  { name: "VfL Bochum", similar: ["FC Augsburg", "Mainz 05", "Union Berlin", "FC Heidenheim", "St. Pauli"], free: false },
  { name: "FC Heidenheim", similar: ["VfL Bochum", "Mainz 05", "FC Augsburg", "Holstein Kiel", "St. Pauli"], free: false },
  { name: "St. Pauli", similar: ["Holstein Kiel", "FC Heidenheim", "VfL Bochum", "Mainz 05", "FC Augsburg"], free: false },
  { name: "Holstein Kiel", similar: ["St. Pauli", "FC Heidenheim", "VfL Bochum", "FC Augsburg", "Mainz 05"], free: false },

  // ------------------------------
  // Ligue 1 (your set)
  // ------------------------------
  { name: "Paris Saint-Germain", similar: ["Olympique Marseille", "AS Monaco", "Olympique Lyonnais", "Lille OSC", "RC Lens"], free: true },
  { name: "Olympique Marseille", similar: ["Paris Saint-Germain", "Olympique Lyonnais", "RC Lens", "Lille OSC", "AS Monaco"], free: true },
  { name: "AS Monaco", similar: ["Paris Saint-Germain", "Lille OSC", "Olympique Lyonnais", "OGC Nice", "Olympique Marseille"], free: true },
  { name: "Olympique Lyonnais", similar: ["Olympique Marseille", "AS Monaco", "Lille OSC", "RC Lens", "Paris Saint-Germain"], free: false },
  { name: "Lille OSC", similar: ["RC Lens", "AS Monaco", "Olympique Lyonnais", "Paris Saint-Germain", "Stade Rennais"], free: false },
  { name: "RC Lens", similar: ["Lille OSC", "Olympique Marseille", "Stade Reims", "FC Metz", "Stade Brestois"], free: false },
  { name: "Stade Rennais", similar: ["FC Nantes", "Lorient", "Lille OSC", "OGC Nice", "RC Strasbourg"], free: false },
  { name: "OGC Nice", similar: ["AS Monaco", "Olympique Marseille", "Stade Rennais", "RC Strasbourg", "Lorient"], free: false },
  { name: "FC Nantes", similar: ["Stade Rennais", "Lorient", "Stade Reims", "RC Strasbourg", "FC Metz"], free: false },
  { name: "Lorient", similar: ["FC Nantes", "Stade Rennais", "Stade Brestois", "FC Metz", "RC Strasbourg"], free: false },
  { name: "Stade Reims", similar: ["RC Lens", "RC Strasbourg", "FC Nantes", "FC Metz", "Stade Brestois"], free: false },
  { name: "RC Strasbourg", similar: ["Stade Reims", "FC Nantes", "OGC Nice", "Lorient", "FC Metz"], free: false },
  { name: "FC Metz", similar: ["Stade Reims", "RC Lens", "FC Nantes", "Lorient", "Stade Brestois"], free: false },
  { name: "Stade Brestois", similar: ["Lorient", "FC Metz", "Stade Reims", "RC Lens", "FC Nantes"], free: false },
  { name: "Toulouse FC", similar: ["Montpellier HSC", "FC Nantes", "RC Strasbourg", "Lorient", "Stade Reims"], free: false },
  { name: "Montpellier HSC", similar: ["Toulouse FC", "OGC Nice", "FC Nantes", "RC Strasbourg", "Stade Reims"], free: false },
  { name: "Clermont Foot", similar: ["FC Metz", "Stade Reims", "Stade Brestois", "Lorient", "RC Strasbourg"], free: false },
  { name: "Le Havre AC", similar: ["FC Metz", "RC Strasbourg", "FC Nantes", "Lorient", "Stade Brestois"], free: false },

  // ------------------------------
  // Notable clubs (global pool)
  // ------------------------------
  { name: "Benfica", similar: ["Porto", "Sporting CP", "Ajax", "PSV Eindhoven", "Olympiacos"], free: true },
  { name: "Porto", similar: ["Benfica", "Sporting CP", "Atlético de Madrid", "Ajax", "Olympiacos"], free: true },
  { name: "Sporting CP", similar: ["Benfica", "Porto", "PSV Eindhoven", "Feyenoord", "Braga"], free: true },
  { name: "Braga", similar: ["Sporting CP", "Genk", "Young Boys", "Basel", "Red Bull Salzburg"], free: false },

  { name: "Ajax", similar: ["Benfica", "PSV Eindhoven", "Feyenoord", "Porto", "Anderlecht"], free: true },
  { name: "PSV Eindhoven", similar: ["Ajax", "Feyenoord", "Sporting CP", "Red Bull Salzburg", "Benfica"], free: true },
  { name: "Feyenoord", similar: ["Ajax", "PSV Eindhoven", "Rangers", "Celtic", "Olympique Marseille"], free: true },

  { name: "Club Brugge", similar: ["Anderlecht", "Genk", "Ajax", "Red Bull Salzburg", "FC Copenhagen"], free: false },
  { name: "Anderlecht", similar: ["Club Brugge", "Ajax", "Benfica", "PSV Eindhoven", "Galatasaray"], free: false },
  { name: "Genk", similar: ["Braga", "Club Brugge", "Red Bull Salzburg", "Young Boys", "Basel"], free: false },

  { name: "Galatasaray", similar: ["Fenerbahçe", "Beşiktaş", "Olympiacos", "Red Star Belgrade", "Lazio"], free: true },
  { name: "Fenerbahçe", similar: ["Galatasaray", "Beşiktaş", "Olympiacos", "PAOK", "Red Star Belgrade"], free: true },
  { name: "Beşiktaş", similar: ["Galatasaray", "Fenerbahçe", "PAOK", "Rangers", "Celtic"], free: false },

  { name: "Celtic", similar: ["Rangers", "Feyenoord", "Olympiacos", "Red Star Belgrade", "Galatasaray"], free: true },
  { name: "Rangers", similar: ["Celtic", "Feyenoord", "Beşiktaş", "PAOK", "Anderlecht"], free: true },

  { name: "Olympiacos", similar: ["Panathinaikos", "PAOK", "Red Star Belgrade", "Celtic", "Galatasaray"], free: true },
  { name: "Panathinaikos", similar: ["Olympiacos", "PAOK", "Rangers", "Anderlecht", "Fenerbahçe"], free: false },
  { name: "PAOK", similar: ["Olympiacos", "Panathinaikos", "Rangers", "Beşiktaş", "Red Star Belgrade"], free: false },

  { name: "Red Bull Salzburg", similar: ["RB Leipzig", "Genk", "Young Boys", "PSV Eindhoven", "Club Brugge"], free: false },
  { name: "Young Boys", similar: ["Basel", "Red Bull Salzburg", "Genk", "FC Copenhagen", "Dinamo Zagreb"], free: false },
  { name: "Basel", similar: ["Young Boys", "FC Copenhagen", "Rangers", "Anderlecht", "Dinamo Zagreb"], free: false },

  { name: "Dinamo Zagreb", similar: ["Red Star Belgrade", "Hajduk Split", "Young Boys", "Basel", "PAOK"], free: false },
  { name: "Hajduk Split", similar: ["Dinamo Zagreb", "PAOK", "Rangers", "Red Star Belgrade", "Panathinaikos"], free: false },
  { name: "Red Star Belgrade", similar: ["Partizan", "Olympiacos", "Celtic", "Dinamo Zagreb", "Galatasaray"], free: true },
  { name: "Partizan", similar: ["Red Star Belgrade", "PAOK", "Rangers", "Panathinaikos", "Beşiktaş"], free: false },

  { name: "FC Copenhagen", similar: ["Malmö FF", "Basel", "Young Boys", "Club Brugge", "Red Bull Salzburg"], free: false },
  { name: "Malmö FF", similar: ["FC Copenhagen", "Rosenborg", "Basel", "Young Boys", "Rangers"], free: false },
  { name: "Rosenborg", similar: ["Malmö FF", "Celtic", "Rangers", "Basel", "FC Copenhagen"], free: false },

  { name: "LA Galaxy", similar: ["LAFC", "Inter Miami", "New York City FC", "Atlanta United", "Seattle Sounders"], free: true },
  { name: "Inter Miami", similar: ["LA Galaxy", "LAFC", "New York City FC", "Paris Saint-Germain", "FC Barcelona"], free: true },
  { name: "LAFC", similar: ["LA Galaxy", "Inter Miami", "Atlanta United", "Seattle Sounders", "Club América"], free: false },

  { name: "Boca Juniors", similar: ["River Plate", "Flamengo", "Palmeiras", "Peñarol", "Nacional"], free: true },
  { name: "River Plate", similar: ["Boca Juniors", "Flamengo", "Palmeiras", "São Paulo", "Nacional"], free: true },

  { name: "Flamengo", similar: ["Palmeiras", "River Plate", "Boca Juniors", "Corinthians", "Atlético Mineiro"], free: true },
  { name: "Palmeiras", similar: ["Flamengo", "São Paulo", "River Plate", "Boca Juniors", "Atlético Mineiro"], free: true },

  // ------------------------------
  // Additional notable clubs (referenced by similars)
  // ------------------------------
  { name: "Club América", similar: ["Boca Juniors", "River Plate", "Flamengo", "Palmeiras", "LAFC"], free: false },
  { name: "New York City FC", similar: ["Inter Miami", "LA Galaxy", "LAFC", "Atlanta United", "Seattle Sounders"], free: false },
  { name: "Atlanta United", similar: ["Inter Miami", "New York City FC", "LAFC", "LA Galaxy", "Seattle Sounders"], free: false },
  { name: "Seattle Sounders", similar: ["LAFC", "LA Galaxy", "Inter Miami", "New York City FC", "Atlanta United"], free: false },
  { name: "São Paulo", similar: ["Palmeiras", "Flamengo", "Corinthians", "River Plate", "Boca Juniors"], free: false },
  { name: "Corinthians", similar: ["São Paulo", "Flamengo", "Palmeiras", "Boca Juniors", "River Plate"], free: false },
  { name: "Atlético Mineiro", similar: ["Flamengo", "Palmeiras", "São Paulo", "Corinthians", "River Plate"], free: false },
  { name: "Peñarol", similar: ["Nacional", "Boca Juniors", "River Plate", "Flamengo", "Olympiacos"], free: false },
  { name: "Nacional", similar: ["Peñarol", "River Plate", "Boca Juniors", "Flamengo", "Benfica"], free: false },
  { name: "Chivas Guadalajara", similar: ["Club América", "Boca Juniors", "River Plate", "LA Galaxy", "Inter Miami"], free: false },

  { name: "Al Ahly", similar: ["Zamalek", "Galatasaray", "Olympiacos", "Red Star Belgrade", "Celtic"], free: false },
  { name: "Zamalek", similar: ["Al Ahly", "Fenerbahçe", "Galatasaray", "Olympiacos", "Red Star Belgrade"], free: false },

  {
    name: "Shakhtar Donetsk",
    similar: ["Dinamo Zagreb", "Red Star Belgrade", "Porto", "Benfica", "Galatasaray"],
    free: false,
  },
  {
    name: "Dynamo Kyiv",
    similar: ["Shakhtar Donetsk", "Dinamo Zagreb", "Red Star Belgrade", "Olympiacos", "Celtic"],
    free: false,
  },
  {
    name: "Spartak Moscow",
    similar: ["Zenit", "Galatasaray", "Fenerbahçe", "Red Star Belgrade", "Olympiacos"],
    free: false,
  },
  {
    name: "Zenit",
    similar: ["Spartak Moscow", "Galatasaray", "Fenerbahçe", "Olympiacos", "Red Star Belgrade"],
    free: false,
  },
  {
    name: "Santos",
    similar: ["Flamengo", "Palmeiras", "São Paulo", "Corinthians", "Atlético Mineiro"],
    free: false,
  },

  { name: "Al Hilal", similar: ["Al Nassr", "Galatasaray", "Fenerbahçe", "Flamengo", "River Plate"], free: true },
  { name: "Al Nassr", similar: ["Al Hilal", "Al Ahly", "Galatasaray", "Fenerbahçe", "Inter Miami"], free: true },
];

// =========================
// Free vs Pro access (LOCKED)
// These 40 clubs are ALWAYS free
// =========================
export const FREE_CLUB_NAMES = [
  "Arsenal",
  "Chelsea",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Tottenham Hotspur",
  "FC Barcelona",
  "Real Madrid",
  "Atlético de Madrid",
  "Juventus",
  "Inter",
  "AC Milan",
  "Napoli",
  "Roma",
  "Bayern Munich",
  "Borussia Dortmund",
  "RB Leipzig",
  "Paris Saint-Germain",
  "Olympique Marseille",
  "AS Monaco",
  "Ajax",
  "PSV Eindhoven",
  "Feyenoord",
  "Benfica",
  "Porto",
  "Sporting CP",
  "Galatasaray",
  "Fenerbahçe",
  "Celtic",
  "Rangers",
  "Red Star Belgrade",
  "Olympiacos",
  "LA Galaxy",
  "Inter Miami",
  "Boca Juniors",
  "River Plate",
  "Flamengo",
  "Palmeiras",
  "Al Nassr",
  "Al Hilal",
] as const;

// Clubs is a premium category — every item is locked behind a purchase.
CLUBS.forEach((club) => {
  club.free = false;
});

/**
 * Helper: "similar" suggestions (used for Similar Word Mode)
 */
export function getSimilarClubs(targetName: string, count = 2): string[] {
  const t = CLUBS.find((c) => c.name === targetName);
  const want = Math.max(0, Math.min(5, count));

  if (t) return t.similar.slice(0, want);

  const extras = CLUB_NAMES.filter((n) => n !== targetName);
  // No shuffle, just return first N
  return extras.slice(0, want);
}

export const CLUB_NAMES: string[] = CLUBS.map((c) => c.name);
export default CLUB_NAMES;