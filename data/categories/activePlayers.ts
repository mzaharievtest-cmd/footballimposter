/* =========================
   CURRENT PLAYERS (ACTIVE)
   Real players only — no variants
========================= */

export type ActivePlayer = {
  name: string;
  club: string;
  nationality: string;
  position: string;
  free: boolean;
};

export const players: ActivePlayer[] = [
  { name: "Ousmane Dembélé", club: "PSG", nationality: "France", position: "Forward", free: false },
  { name: "Lamine Yamal", club: "Barcelona", nationality: "Spain", position: "Winger", free: false },
  { name: "Kylian Mbappé", club: "Real Madrid", nationality: "France", position: "Forward", free: false },
  { name: "Erling Haaland", club: "Man City", nationality: "Norway", position: "Striker", free: false },
  { name: "Harry Kane", club: "Bayern Munich", nationality: "England", position: "Striker", free: false },
  { name: "Jude Bellingham", club: "Real Madrid", nationality: "England", position: "Midfielder", free: false },
  { name: "Rodri", club: "Man City", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Cole Palmer", club: "Chelsea", nationality: "England", position: "Playmaker", free: false },
  { name: "Vinícius Júnior", club: "Real Madrid", nationality: "Brazil", position: "Winger", free: false },
  { name: "Vitinha", club: "PSG", nationality: "Portugal", position: "Midfielder", free: false },
  { name: "Mohamed Salah", club: "Liverpool", nationality: "Egypt", position: "Winger", free: false },
  { name: "Florian Wirtz", club: "Liverpool", nationality: "Germany", position: "Midfielder", free: false },
  { name: "Bukayo Saka", club: "Arsenal", nationality: "England", position: "Winger", free: false },
  { name: "Jamal Musiala", club: "Bayern Munich", nationality: "Germany", position: "Midfielder", free: false },
  { name: "Pedri", club: "Barcelona", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Achraf Hakimi", club: "PSG", nationality: "Morocco", position: "Right-Back", free: false },
  { name: "William Saliba", club: "Arsenal", nationality: "France", position: "Center-Back", free: false },
  { name: "Lautaro Martínez", club: "Inter Milan", nationality: "Argentina", position: "Striker", free: false },
  { name: "Phil Foden", club: "Man City", nationality: "England", position: "Midfielder", free: false },
  { name: "Alisson Becker", club: "Liverpool", nationality: "Brazil", position: "Goalkeeper", free: false },
  { name: "Martin Ødegaard", club: "Arsenal", nationality: "Norway", position: "Midfielder", free: false },
  { name: "Virgil van Dijk", club: "Liverpool", nationality: "Netherlands", position: "Center-Back", free: false },
  { name: "Declan Rice", club: "Arsenal", nationality: "England", position: "Midfielder", free: false },
  { name: "Alexander Isak", club: "Liverpool", nationality: "Sweden", position: "Striker", free: false },
  { name: "Bruno Fernandes", club: "Man Utd", nationality: "Portugal", position: "Midfielder", free: false },
  { name: "Alexis Mac Allister", club: "Liverpool", nationality: "Argentina", position: "Midfielder", free: false },
  { name: "Trent Alexander-Arnold", club: "Liverpool", nationality: "England", position: "Right-Back", free: false },
  { name: "Gabriel Magalhães", club: "Arsenal", nationality: "Brazil", position: "Center-Back", free: false },
  { name: "Joško Gvardiol", club: "Man City", nationality: "Croatia", position: "Left-Back", free: false },
  { name: "David Raya", club: "Arsenal", nationality: "Spain", position: "Goalkeeper", free: false },
  { name: "Kobbie Mainoo", club: "Man Utd", nationality: "England", position: "Midfielder", free: false },
  { name: "Bernardo Silva", club: "Man City", nationality: "Portugal", position: "Midfielder", free: false },
  { name: "Jérémy Doku", club: "Man City", nationality: "Belgium", position: "Winger", free: false },
  { name: "Estêvão Willian", club: "Chelsea", nationality: "Brazil", position: "Winger", free: false },
  { name: "Gianluigi Donnarumma", club: "PSG", nationality: "Italy", position: "Goalkeeper", free: false },
  { name: "Ollie Watkins", club: "Aston Villa", nationality: "England", position: "Striker", free: false },
  { name: "Emiliano Martínez", club: "Aston Villa", nationality: "Argentina", position: "Goalkeeper", free: false },
  { name: "Luis Díaz", club: "Liverpool", nationality: "Colombia", position: "Winger", free: false },
  { name: "Darwin Núñez", club: "Liverpool", nationality: "Uruguay", position: "Striker", free: false },
  { name: "Micky van de Ven", club: "Tottenham", nationality: "Netherlands", position: "Center-Back", free: false },
  { name: "Destiny Udogie", club: "Tottenham", nationality: "Italy", position: "Left-Back", free: false },
  { name: "Pedro Porro", club: "Tottenham", nationality: "Spain", position: "Right-Back", free: false },
  { name: "James Maddison", club: "Tottenham", nationality: "England", position: "Midfielder", free: false },
  { name: "Marcus Hudson-Odoi", club: "Nottm Forest", nationality: "England", position: "Winger", free: false },
  { name: "Bryan Mbeumo", club: "Brentford", nationality: "Cameroon", position: "Forward", free: false },
  { name: "Antoine Semenyo", club: "Bournemouth", nationality: "Ghana", position: "Forward", free: false },
  { name: "Murillo", club: "Nottm Forest", nationality: "Brazil", position: "Center-Back", free: false },
  { name: "Illia Zabarnyi", club: "Bournemouth", nationality: "Ukraine", position: "Center-Back", free: false },
  { name: "Nicolas Jackson", club: "Chelsea", nationality: "Senegal", position: "Striker", free: false },
  { name: "Enzo Fernández", club: "Chelsea", nationality: "Argentina", position: "Midfielder", free: false },
  { name: "Levi Colwill", club: "Chelsea", nationality: "England", position: "Center-Back", free: false },
  { name: "Moises Caicedo", club: "Chelsea", nationality: "Ecuador", position: "Midfielder", free: false },
  { name: "Romeo Lavia", club: "Chelsea", nationality: "Belgium", position: "Midfielder", free: false },
  { name: "Pedro Neto", club: "Chelsea", nationality: "Portugal", position: "Winger", free: false },
  { name: "Ruben Dias", club: "Man City", nationality: "Portugal", position: "Center-Back", free: false },
  { name: "Manuel Akanji", club: "Man City", nationality: "Switzerland", position: "Center-Back", free: false },
  { name: "Savinho", club: "Man City", nationality: "Brazil", position: "Winger", free: false },
  { name: "Rico Lewis", club: "Man City", nationality: "England", position: "Full-Back", free: false },
  { name: "Alejandro Garnacho", club: "Man Utd", nationality: "Argentina", position: "Winger", free: false },
  { name: "Rasmus Højlund", club: "Man Utd", nationality: "Denmark", position: "Striker", free: false },
  { name: "Matthijs de Ligt", club: "Man Utd", nationality: "Netherlands", position: "Center-Back", free: false },
  { name: "Federico Valverde", club: "Real Madrid", nationality: "Uruguay", position: "Midfielder", free: false },
  { name: "Raphinha", club: "Barcelona", nationality: "Brazil", position: "Winger", free: false },
  { name: "Robert Lewandowski", club: "Barcelona", nationality: "Poland", position: "Striker", free: false },
  { name: "Antonio Rüdiger", club: "Real Madrid", nationality: "Germany", position: "Center-Back", free: false },
  { name: "Thibaut Courtois", club: "Real Madrid", nationality: "Belgium", position: "Goalkeeper", free: false },
  { name: "Gavi", club: "Barcelona", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Pau Cubarsí", club: "Barcelona", nationality: "Spain", position: "Center-Back", free: false },
  { name: "Jules Koundé", club: "Barcelona", nationality: "France", position: "Right-Back", free: false },
  { name: "Eduardo Camavinga", club: "Real Madrid", nationality: "France", position: "Midfielder", free: false },
  { name: "Aurélien Tchouaméni", club: "Real Madrid", nationality: "France", position: "Midfielder", free: false },
  { name: "Antoine Griezmann", club: "Atletico Madrid", nationality: "France", position: "Forward", free: false },
  { name: "Nico Williams", club: "Athletic Club", nationality: "Spain", position: "Winger", free: false },
  { name: "Dani Olmo", club: "Barcelona", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Arda Güler", club: "Real Madrid", nationality: "Turkey", position: "Playmaker", free: false },
  { name: "Endrick", club: "Real Madrid", nationality: "Brazil", position: "Striker", free: false },
  { name: "Alphonso Davies", club: "Real Madrid", nationality: "Canada", position: "Left-Back", free: false },
  { name: "Marc-André ter Stegen", club: "Barcelona", nationality: "Germany", position: "Goalkeeper", free: false },
  { name: "Frenkie de Jong", club: "Barcelona", nationality: "Netherlands", position: "Midfielder", free: false },
  { name: "Ronald Araújo", club: "Barcelona", nationality: "Uruguay", position: "Center-Back", free: false },
  { name: "Alejandro Balde", club: "Barcelona", nationality: "Spain", position: "Left-Back", free: false },
  { name: "Fermín López", club: "Barcelona", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Julian Alvarez", club: "Atletico Madrid", nationality: "Argentina", position: "Forward", free: false },
  { name: "Alexander Sørloth", club: "Atletico Madrid", nationality: "Norway", position: "Striker", free: false },
  { name: "Marcos Llorente", club: "Atletico Madrid", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Jan Oblak", club: "Atletico Madrid", nationality: "Slovenia", position: "Goalkeeper", free: false },
  { name: "Robin Le Normand", club: "Atletico Madrid", nationality: "Spain", position: "Center-Back", free: false },
  { name: "Conor Gallagher", club: "Atletico Madrid", nationality: "England", position: "Midfielder", free: false },
  { name: "Takefusa Kubo", club: "Real Sociedad", nationality: "Japan", position: "Winger", free: false },
  { name: "Martín Zubimendi", club: "Real Sociedad", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Mikel Oyarzabal", club: "Real Sociedad", nationality: "Spain", position: "Forward", free: false },
  { name: "Brais Méndez", club: "Real Sociedad", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Álex Baena", club: "Villarreal", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Yeremy Pino", club: "Villarreal", nationality: "Spain", position: "Winger", free: false },
  { name: "Bryan Zaragoza", club: "Osasuna", nationality: "Spain", position: "Winger", free: false },
  { name: "Alberto Moleiro", club: "Las Palmas", nationality: "Spain", position: "Playmaker", free: false },
  { name: "Eder Militão", club: "Real Madrid", nationality: "Brazil", position: "Center-Back", free: false },
  { name: "Rodrygo Goes", club: "Real Madrid", nationality: "Brazil", position: "Forward", free: false },
  { name: "Fran García", club: "Real Madrid", nationality: "Spain", position: "Left-Back", free: false },
  { name: "Luka Modrić", club: "Real Madrid", nationality: "Croatia", position: "Midfielder", free: false },
  { name: "Brahim Díaz", club: "Real Madrid", nationality: "Morocco", position: "Midfielder", free: false },
  { name: "Dani Carvajal", club: "Real Madrid", nationality: "Spain", position: "Right-Back", free: false },
  { name: "Andreas Christensen", club: "Barcelona", nationality: "Denmark", position: "Center-Back", free: false },
  { name: "Ferran Torres", club: "Barcelona", nationality: "Spain", position: "Forward", free: false },
  { name: "Khvicha Kvaratskhelia", club: "PSG", nationality: "Georgia", position: "Winger", free: false },
  { name: "Warren Zaïre-Emery", club: "PSG", nationality: "France", position: "Midfielder", free: false },
  { name: "Bradley Barcola", club: "PSG", nationality: "France", position: "Winger", free: false },
  { name: "João Neves", club: "PSG", nationality: "Portugal", position: "Midfielder", free: false },
  { name: "Marquinhos", club: "PSG", nationality: "Brazil", position: "Center-Back", free: false },
  { name: "Nuno Mendes", club: "PSG", nationality: "Portugal", position: "Left-Back", free: false },
  { name: "Lucas Hernández", club: "PSG", nationality: "France", position: "Center-Back", free: false },
  { name: "Michael Olise", club: "Bayern Munich", nationality: "France", position: "Winger", free: false },
  { name: "Joshua Kimmich", club: "Bayern Munich", nationality: "Germany", position: "Midfielder", free: false },
  { name: "Leroy Sané", club: "Bayern Munich", nationality: "Germany", position: "Winger", free: false },
  { name: "Dayot Upamecano", club: "Bayern Munich", nationality: "France", position: "Center-Back", free: false },
  { name: "Manuel Neuer", club: "Bayern Munich", nationality: "Germany", position: "Goalkeeper", free: false },
  { name: "Victor Boniface", club: "Leverkusen", nationality: "Nigeria", position: "Striker", free: false },
  { name: "Alejandro Grimaldo", club: "Leverkusen", nationality: "Spain", position: "Left-Back", free: false },
  { name: "Jeremie Frimpong", club: "Leverkusen", nationality: "Netherlands", position: "Right-Back", free: false },
  { name: "Granit Xhaka", club: "Leverkusen", nationality: "Switzerland", position: "Midfielder", free: false },
  { name: "Jonathan Tah", club: "Leverkusen", nationality: "Germany", position: "Center-Back", free: false },
  { name: "Benjamin Šeško", club: "RB Leipzig", nationality: "Slovenia", position: "Striker", free: false },
  { name: "Xavi Simons", club: "RB Leipzig", nationality: "Netherlands", position: "Midfielder", free: false },
  { name: "Loïs Openda", club: "RB Leipzig", nationality: "Belgium", position: "Striker", free: false },
  { name: "Castello Lukeba", club: "RB Leipzig", nationality: "France", position: "Center-Back", free: false },
  { name: "Gregor Kobel", club: "Dortmund", nationality: "Switzerland", position: "Goalkeeper", free: false },
  { name: "Nico Schlotterbeck", club: "Dortmund", nationality: "Germany", position: "Center-Back", free: false },
  { name: "Jamie Gittens", club: "Dortmund", nationality: "England", position: "Winger", free: false },
  { name: "Serhou Guirassy", club: "Dortmund", nationality: "Guinea", position: "Striker", free: false },
  { name: "Nicolò Barella", club: "Inter Milan", nationality: "Italy", position: "Midfielder", free: false },
  { name: "Alessandro Bastoni", club: "Inter Milan", nationality: "Italy", position: "Center-Back", free: false },
  { name: "Federico Dimarco", club: "Inter Milan", nationality: "Italy", position: "Left-Back", free: false },
  { name: "Hakan Çalhanoğlu", club: "Inter Milan", nationality: "Turkey", position: "Midfielder", free: false },
  { name: "Marcus Thuram", club: "Inter Milan", nationality: "France", position: "Forward", free: false },
  { name: "Rafael Leão", club: "AC Milan", nationality: "Portugal", position: "Winger", free: false },
  { name: "Theo Hernandez", club: "AC Milan", nationality: "France", position: "Left-Back", free: false },
  { name: "Mike Maignan", club: "AC Milan", nationality: "France", position: "Goalkeeper", free: false },
  { name: "Christian Pulisic", club: "AC Milan", nationality: "USA", position: "Winger", free: false },
  { name: "Tijjani Reijnders", club: "AC Milan", nationality: "Netherlands", position: "Midfielder", free: false },
  { name: "Dušan Vlahović", club: "Juventus", nationality: "Serbia", position: "Striker", free: false },
  { name: "Kenan Yıldız", club: "Juventus", nationality: "Turkey", position: "Forward", free: false },
  { name: "Teun Koopmeiners", club: "Juventus", nationality: "Netherlands", position: "Midfielder", free: false },
  { name: "Gleison Bremer", club: "Juventus", nationality: "Brazil", position: "Center-Back", free: false },
  { name: "Alessandro Buongiorno", club: "Napoli", nationality: "Italy", position: "Center-Back", free: false },
  { name: "Romelu Lukaku", club: "Napoli", nationality: "Belgium", position: "Striker", free: false },
  { name: "Scott McTominay", club: "Napoli", nationality: "Scotland", position: "Midfielder", free: false },
  { name: "Ademola Lookman", club: "Atalanta", nationality: "Nigeria", position: "Forward", free: false },
  { name: "Viktor Gyökeres", club: "Sporting CP", nationality: "Sweden", position: "Striker", free: false },
  { name: "Lionel Messi", club: "Inter Miami", nationality: "Argentina", position: "Forward", free: false },
  { name: "Cristiano Ronaldo", club: "Al-Nassr", nationality: "Portugal", position: "Striker", free: false },
  { name: "Neymar", club: "Santos", nationality: "Brazil", position: "Forward", free: false },
  { name: "Karim Benzema", club: "Al-Ittihad", nationality: "France", position: "Striker", free: false },
  { name: "Sadio Mané", club: "Al-Nassr", nationality: "Senegal", position: "Winger", free: false },
  { name: "Riyad Mahrez", club: "Al-Ahli", nationality: "Algeria", position: "Winger", free: false },
  { name: "N'Golo Kanté", club: "Al-Ittihad", nationality: "France", position: "Midfielder", free: false },
  { name: "Aleksandar Mitrović", club: "Al-Hilal", nationality: "Serbia", position: "Striker", free: false },
  { name: "Sergej Milinković-Savić", club: "Al-Hilal", nationality: "Serbia", position: "Midfielder", free: false },
  { name: "Aymeric Laporte", club: "Al-Nassr", nationality: "Spain", position: "Center-Back", free: false },
  { name: "Bono", club: "Al-Hilal", nationality: "Morocco", position: "Goalkeeper", free: false },
  { name: "Moussa Diaby", club: "Al-Ittihad", nationality: "France", position: "Winger", free: false },
  { name: "Gabri Veiga", club: "Al-Ahli", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Ivan Toney", club: "Al-Ahli", nationality: "England", position: "Striker", free: false },
  { name: "Sergio Busquets", club: "Inter Miami", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Riqui Puig", club: "LA Galaxy", nationality: "Spain", position: "Midfielder", free: false },
  { name: "Heung-min Son", club: "LAFC", nationality: "South Korea", position: "Forward", free: false },
  { name: "Olivier Giroud", club: "LAFC", nationality: "France", position: "Striker", free: false },
  { name: "Marco Reus", club: "LA Galaxy", nationality: "Germany", position: "Midfielder", free: false },
  { name: "Franco Mastantuono", club: "Real Madrid", nationality: "Argentina", position: "Playmaker", free: false },
  { name: "Claudio Echeverri", club: "Man City", nationality: "Argentina", position: "Midfielder", free: false },
  { name: "Geovany Quenda", club: "Sporting CP", nationality: "Portugal", position: "Winger", free: false },
  { name: "Morten Hjulmand", club: "Sporting CP", nationality: "Denmark", position: "Midfielder", free: false },
  { name: "Gonçalo Inácio", club: "Sporting CP", nationality: "Portugal", position: "Center-Back", free: false },
  { name: "Ousmane Diomande", club: "Sporting CP", nationality: "Ivory Coast", position: "Center-Back", free: false },
  { name: "Samu Omorodion", club: "Porto", nationality: "Spain", position: "Striker", free: false },
  { name: "Alan Varela", club: "Porto", nationality: "Argentina", position: "Midfielder", free: false },
  { name: "Diogo Costa", club: "Porto", nationality: "Portugal", position: "Goalkeeper", free: false },
  { name: "Orkun Kökçü", club: "Benfica", nationality: "Turkey", position: "Midfielder", free: false },
  { name: "Kerem Aktürkoğlu", club: "Benfica", nationality: "Turkey", position: "Winger", free: false },
  { name: "António Silva", club: "Benfica", nationality: "Portugal", position: "Center-Back", free: false },
  { name: "Anatoliy Trubin", club: "Benfica", nationality: "Ukraine", position: "Goalkeeper", free: false },
  { name: "Johan Bakayoko", club: "PSV", nationality: "Belgium", position: "Winger", free: false },
  { name: "Joey Veerman", club: "PSV", nationality: "Netherlands", position: "Midfielder", free: false },
  { name: "Ricardo Pepi", club: "PSV", nationality: "USA", position: "Striker", free: false },
  { name: "Jorrel Hato", club: "Ajax", nationality: "Netherlands", position: "Center-Back", free: false },
  { name: "Brian Brobbey", club: "Ajax", nationality: "Netherlands", position: "Striker", free: false },
  { name: "Mauro Icardi", club: "Galatasaray", nationality: "Argentina", position: "Striker", free: false },
  { name: "Victor Osimhen", club: "Galatasaray", nationality: "Nigeria", position: "Striker", free: false },
  { name: "Davinson Sánchez", club: "Galatasaray", nationality: "Colombia", position: "Center-Back", free: false },
  { name: "Edin Džeko", club: "Fenerbahçe", nationality: "Bosnia", position: "Striker", free: false },
  { name: "Dušan Tadić", club: "Fenerbahçe", nationality: "Serbia", position: "Winger", free: false },
  { name: "Sofyan Amrabat", club: "Fenerbahçe", nationality: "Morocco", position: "Midfielder", free: false },
  { name: "Sebastian Szymański", club: "Fenerbahçe", nationality: "Poland", position: "Midfielder", free: false },
  { name: "Lucas Paquetá", club: "West Ham", nationality: "Brazil", position: "Midfielder", free: false },
  { name: "Mohammed Kudus", club: "Tottenham", nationality: "Ghana", position: "Midfielder", free: false },
  { name: "Nico Paz", club: "Como", nationality: "Argentina", position: "Playmaker", free: false },
  { name: "Désiré Doué", club: "PSG", nationality: "France", position: "Winger", free: false },
  { name: "Willian Pacho", club: "PSG", nationality: "Ecuador", position: "Center-Back", free: false },
  { name: "Ryan Gravenberch", club: "Liverpool", nationality: "Netherlands", position: "Midfielder", free: false },
  { name: "Ethan Nwaneri", club: "Arsenal", nationality: "England", position: "Midfielder", free: false },
  { name: "Leny Yoro", club: "Man Utd", nationality: "France", position: "Center-Back", free: false },
];

// Active Players is the fully free category — every item is playable without a purchase.
players.forEach((p) => {
  p.free = true;
});

export const words: string[] = players.map((p) => p.name);

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

function scoreSimilar(a: ActivePlayer, b: ActivePlayer): number {
  let score = 0;
  if (a.club === b.club) score += 3;
  if (a.position === b.position) score += 2;
  if (a.nationality === b.nationality) score += 1;
  return score;
}

function pickSimilars(name: string, count = 5): string[] {
  const me = players.find((p) => p.name === name);
  if (!me) return [];

  const seed = hashString(name);
  const ranked = players
    .filter((p) => p.name !== name)
    .map((p, idx) => ({
      name: p.name,
      score: scoreSimilar(me, p),
      // deterministic tie-break using seed + index
      tie: hashString(`${seed}-${idx}-${p.name}`),
    }))
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      return x.tie - y.tie;
    })
    .map((x) => x.name);

  // If many have same score, we still keep it stable.
  // Ensure we always return exactly `count`.
  const picked = ranked.slice(0, count);
  if (picked.length < count) {
    const rest = shuffled(
      words.filter((n) => n !== name && !picked.includes(n)),
      seed ^ 0x9e3779b9
    );
    return [...picked, ...rest].slice(0, count);
  }
  return picked;
}

export const similar: Record<string, string[]> = Object.fromEntries(
  words.map((n) => [n, pickSimilars(n, 5)])
);

export default {
  words,
  similar,
  players,
};