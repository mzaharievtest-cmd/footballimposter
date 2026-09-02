// Premier League – Active Players (Top 150)

export type PLPlayer = {
  name: string;
  club: string;
  nationality: string;
  position: string;
  free: boolean;
};

const BASE_PLAYERS: Array<Omit<PLPlayer, "free">> = [
  { name: "Erling Haaland", club: "Manchester City", nationality: "Norway", position: "Forward" },
  { name: "Mohamed Salah", club: "Liverpool", nationality: "Egypt", position: "Forward" },
  { name: "Bukayo Saka", club: "Arsenal", nationality: "England", position: "Forward" },
  { name: "Kevin De Bruyne", club: "Manchester City", nationality: "Belgium", position: "Midfielder" },
  { name: "Cole Palmer", club: "Chelsea", nationality: "England", position: "Midfielder" },
  { name: "Rodri", club: "Manchester City", nationality: "Spain", position: "Midfielder" },
  { name: "Martin Ødegaard", club: "Arsenal", nationality: "Norway", position: "Midfielder" },
  { name: "Declan Rice", club: "Arsenal", nationality: "England", position: "Midfielder" },
  { name: "Virgil van Dijk", club: "Liverpool", nationality: "Netherlands", position: "Defender" },
  { name: "Phil Foden", club: "Manchester City", nationality: "England", position: "Forward" },
  { name: "Alisson Becker", club: "Liverpool", nationality: "Brazil", position: "Goalkeeper" },
  { name: "Emiliano Martínez", club: "Aston Villa", nationality: "Argentina", position: "Goalkeeper" },
  { name: "William Saliba", club: "Arsenal", nationality: "France", position: "Defender" },
  { name: "Bruno Fernandes", club: "Manchester United", nationality: "Portugal", position: "Midfielder" },
  { name: "Alexander Isak", club: "Newcastle United", nationality: "Sweden", position: "Forward" },
  { name: "Alexis Mac Allister", club: "Liverpool", nationality: "Argentina", position: "Midfielder" },
  { name: "Enzo Fernández", club: "Chelsea", nationality: "Argentina", position: "Midfielder" },
  { name: "Dominic Solanke", club: "Tottenham", nationality: "England", position: "Forward" },
  { name: "Ollie Watkins", club: "Aston Villa", nationality: "England", position: "Forward" },
  { name: "Bernardo Silva", club: "Manchester City", nationality: "Portugal", position: "Midfielder" },
  { name: "Gabriel Magalhães", club: "Arsenal", nationality: "Brazil", position: "Defender" },
  { name: "Rúben Dias", club: "Manchester City", nationality: "Portugal", position: "Defender" },
  { name: "Joško Gvardiol", club: "Manchester City", nationality: "Croatia", position: "Defender" },
  { name: "Micky van de Ven", club: "Tottenham", nationality: "Netherlands", position: "Defender" },
  { name: "Cristian Romero", club: "Tottenham", nationality: "Argentina", position: "Defender" },
  { name: "James Maddison", club: "Tottenham", nationality: "England", position: "Midfielder" },
  { name: "Heung-min Son", club: "Tottenham", nationality: "South Korea", position: "Forward" },
  { name: "Kai Havertz", club: "Arsenal", nationality: "Germany", position: "Forward" },
  { name: "David Raya", club: "Arsenal", nationality: "Spain", position: "Goalkeeper" },
  { name: "Guglielmo Vicario", club: "Tottenham", nationality: "Italy", position: "Goalkeeper" },
  { name: "Kobbie Mainoo", club: "Manchester United", nationality: "England", position: "Midfielder" },
  { name: "Alejandro Garnacho", club: "Manchester United", nationality: "Argentina", position: "Forward" },
  { name: "Marcus Rashford", club: "Manchester United", nationality: "England", position: "Forward" },
  { name: "Matthijs de Ligt", club: "Manchester United", nationality: "Netherlands", position: "Defender" },
  { name: "Lisandro Martínez", club: "Manchester United", nationality: "Argentina", position: "Defender" },
  { name: "Bruno Guimarães", club: "Newcastle United", nationality: "Brazil", position: "Midfielder" },
  { name: "Anthony Gordon", club: "Newcastle United", nationality: "England", position: "Forward" },
  { name: "Sandro Tonali", club: "Newcastle United", nationality: "Italy", position: "Midfielder" },
  { name: "Luis Díaz", club: "Liverpool", nationality: "Colombia", position: "Forward" },
  { name: "Dominik Szoboszlai", club: "Liverpool", nationality: "Hungary", position: "Midfielder" },
  { name: "Ryan Gravenberch", club: "Liverpool", nationality: "Netherlands", position: "Midfielder" },
  { name: "Ibrahima Konaté", club: "Liverpool", nationality: "France", position: "Defender" },
  { name: "Trent Alexander-Arnold", club: "Liverpool", nationality: "England", position: "Defender" },
  { name: "Moises Caicedo", club: "Chelsea", nationality: "Ecuador", position: "Midfielder" },
  { name: "Nicolas Jackson", club: "Chelsea", nationality: "Senegal", position: "Forward" },
  { name: "Pedro Neto", club: "Chelsea", nationality: "Portugal", position: "Forward" },
  { name: "Christopher Nkunku", club: "Chelsea", nationality: "France", position: "Forward" },
  { name: "Levi Colwill", club: "Chelsea", nationality: "England", position: "Defender" },
  { name: "Reece James", club: "Chelsea", nationality: "England", position: "Defender" },
  { name: "Marc Cucurella", club: "Chelsea", nationality: "Spain", position: "Defender" },
  { name: "Eberechi Eze", club: "Crystal Palace", nationality: "England", position: "Midfielder" },
  { name: "Marc Guéhi", club: "Crystal Palace", nationality: "England", position: "Defender" },
  { name: "Jordan Pickford", club: "Everton", nationality: "England", position: "Goalkeeper" },
  { name: "Jarrad Branthwaite", club: "Everton", nationality: "England", position: "Defender" },
  { name: "Dwight McNeil", club: "Everton", nationality: "England", position: "Forward" },
  { name: "Amadou Onana", club: "Aston Villa", nationality: "Belgium", position: "Midfielder" },
  { name: "Youri Tielemans", club: "Aston Villa", nationality: "Belgium", position: "Midfielder" },
  { name: "John McGinn", club: "Aston Villa", nationality: "Scotland", position: "Midfielder" },
  { name: "Morgan Rogers", club: "Aston Villa", nationality: "England", position: "Forward" },
  { name: "Lucas Digne", club: "Aston Villa", nationality: "France", position: "Defender" },
  { name: "Jarrod Bowen", club: "West Ham", nationality: "England", position: "Forward" },
  { name: "Mohammed Kudus", club: "West Ham", nationality: "Ghana", position: "Forward" },
  { name: "Lucas Paquetá", club: "West Ham", nationality: "Brazil", position: "Midfielder" },
  { name: "Jean-Clair Todibo", club: "West Ham", nationality: "France", position: "Defender" },
  { name: "Kaoru Mitoma", club: "Brighton", nationality: "Japan", position: "Forward" },
  { name: "Joao Pedro", club: "Brighton", nationality: "Brazil", position: "Forward" },
  { name: "Bart Verbruggen", club: "Brighton", nationality: "Netherlands", position: "Goalkeeper" },
  { name: "Evan Ferguson", club: "Brighton", nationality: "Ireland", position: "Forward" },
  { name: "Lewis Dunk", club: "Brighton", nationality: "England", position: "Defender" },
  { name: "Murillo", club: "Nott'm Forest", nationality: "Brazil", position: "Defender" },
  { name: "Morgan Gibbs-White", club: "Nott'm Forest", nationality: "England", position: "Midfielder" },
  { name: "Anthony Elanga", club: "Nott'm Forest", nationality: "Sweden", position: "Forward" },
  { name: "Taiwo Awoniyi", club: "Nott'm Forest", nationality: "Nigeria", position: "Forward" },
  { name: "Matheus Cunha", club: "Wolves", nationality: "Brazil", position: "Forward" },
  { name: "Rayan Aït-Nouri", club: "Wolves", nationality: "Algeria", position: "Defender" },
  { name: "Joao Gomes", club: "Wolves", nationality: "Brazil", position: "Midfielder" },
  { name: "Bryan Mbeumo", club: "Brentford", nationality: "Cameroon", position: "Forward" },
  { name: "Yoane Wissa", club: "Brentford", nationality: "DR Congo", position: "Forward" },
  { name: "Nathan Collins", club: "Brentford", nationality: "Ireland", position: "Defender" },
  { name: "Bernd Leno", club: "Fulham", nationality: "Germany", position: "Goalkeeper" },
  { name: "Antonee Robinson", club: "Fulham", nationality: "USA", position: "Defender" },
  { name: "Alex Iwobi", club: "Fulham", nationality: "Nigeria", position: "Midfielder" },
  { name: "Emile Smith Rowe", club: "Fulham", nationality: "England", position: "Midfielder" },
  { name: "Andreas Pereira", club: "Fulham", nationality: "Brazil", position: "Midfielder" },
  { name: "Justin Kluivert", club: "Bournemouth", nationality: "Netherlands", position: "Forward" },
  { name: "Antoine Semenyo", club: "Bournemouth", nationality: "Ghana", position: "Forward" },
  { name: "Evanilson", club: "Bournemouth", nationality: "Brazil", position: "Forward" },
  { name: "Milos Kerkez", club: "Bournemouth", nationality: "Hungary", position: "Defender" },
  { name: "Ilya Zabarnyi", club: "Bournemouth", nationality: "Ukraine", position: "Defender" },
  { name: "Ben White", club: "Arsenal", nationality: "England", position: "Defender" },
  { name: "Jurriën Timber", club: "Arsenal", nationality: "Netherlands", position: "Defender" },
  { name: "Riccardo Calafiori", club: "Arsenal", nationality: "Italy", position: "Defender" },
  { name: "Mikel Merino", club: "Arsenal", nationality: "Spain", position: "Midfielder" },
  { name: "Gabriel Jesus", club: "Arsenal", nationality: "Brazil", position: "Forward" },
  { name: "Leandro Trossard", club: "Arsenal", nationality: "Belgium", position: "Forward" },
  { name: "Raheem Sterling", club: "Arsenal", nationality: "England", position: "Forward" },
  { name: "Jorginho", club: "Arsenal", nationality: "Italy", position: "Midfielder" },
  { name: "John Stones", club: "Manchester City", nationality: "England", position: "Defender" },
  { name: "Nathan Aké", club: "Manchester City", nationality: "Netherlands", position: "Defender" },
  { name: "Kyle Walker", club: "Manchester City", nationality: "England", position: "Defender" },
  { name: "Rico Lewis", club: "Manchester City", nationality: "England", position: "Defender" },
  { name: "Mateo Kovačić", club: "Manchester City", nationality: "Croatia", position: "Midfielder" },
  { name: "Jeremy Doku", club: "Manchester City", nationality: "Belgium", position: "Forward" },
  { name: "Savinho", club: "Manchester City", nationality: "Brazil", position: "Forward" },
  { name: "Jack Grealish", club: "Manchester City", nationality: "England", position: "Forward" },
  { name: "Darwin Núñez", club: "Liverpool", nationality: "Uruguay", position: "Forward" },
  { name: "Cody Gakpo", club: "Liverpool", nationality: "Netherlands", position: "Forward" },
  { name: "Federico Chiesa", club: "Liverpool", nationality: "Italy", position: "Forward" },
  { name: "Harvey Elliott", club: "Liverpool", nationality: "England", position: "Midfielder" },
  { name: "Curtis Jones", club: "Liverpool", nationality: "England", position: "Midfielder" },
  { name: "Andrew Robertson", club: "Liverpool", nationality: "Scotland", position: "Defender" },
  { name: "Pedro Porro", club: "Tottenham", nationality: "Spain", position: "Defender" },
  { name: "Destiny Udogie", club: "Tottenham", nationality: "Italy", position: "Defender" },
  { name: "Brennan Johnson", club: "Tottenham", nationality: "Wales", position: "Forward" },
  { name: "Richarlison", club: "Tottenham", nationality: "Brazil", position: "Forward" },
  { name: "Dejan Kulusevski", club: "Tottenham", nationality: "Sweden", position: "Forward" },
  { name: "Rodrigo Bentancur", club: "Tottenham", nationality: "Uruguay", position: "Midfielder" },
  { name: "Yves Bissouma", club: "Tottenham", nationality: "Mali", position: "Midfielder" },
  { name: "Pape Matar Sarr", club: "Tottenham", nationality: "Senegal", position: "Midfielder" },
  { name: "Malo Gusto", club: "Chelsea", nationality: "France", position: "Defender" },
  { name: "Wesley Fofana", club: "Chelsea", nationality: "France", position: "Defender" },
  { name: "Benoît Badiashile", club: "Chelsea", nationality: "France", position: "Defender" },
  { name: "Roméo Lavia", club: "Chelsea", nationality: "Belgium", position: "Midfielder" },
  { name: "Noni Madueke", club: "Chelsea", nationality: "England", position: "Forward" },
  { name: "Jadon Sancho", club: "Aston Villa", nationality: "England", position: "Forward" },
  { name: "Robert Sánchez", club: "Chelsea", nationality: "Spain", position: "Goalkeeper" },
  { name: "Manuel Ugarte", club: "Manchester United", nationality: "Uruguay", position: "Midfielder" },
  { name: "Casemiro", club: "Manchester United", nationality: "Brazil", position: "Midfielder" },
  { name: "Christian Eriksen", club: "Manchester United", nationality: "Denmark", position: "Midfielder" },
  { name: "Mason Mount", club: "Manchester United", nationality: "England", position: "Midfielder" },
  { name: "Joshua Zirkzee", club: "Manchester United", nationality: "Netherlands", position: "Forward" },
  { name: "Rasmus Højlund", club: "Manchester United", nationality: "Denmark", position: "Forward" },
  { name: "Amad Diallo", club: "Manchester United", nationality: "Ivory Coast", position: "Forward" },
  { name: "Leny Yoro", club: "Manchester United", nationality: "France", position: "Defender" },
  { name: "Nick Pope", club: "Newcastle United", nationality: "England", position: "Goalkeeper" },
  { name: "Kieran Trippier", club: "Newcastle United", nationality: "England", position: "Defender" },
  { name: "Sven Botman", club: "Newcastle United", nationality: "Netherlands", position: "Defender" },
  { name: "Tino Livramento", club: "Newcastle United", nationality: "England", position: "Defender" },
  { name: "Joelinton", club: "Newcastle United", nationality: "Brazil", position: "Midfielder" },
  { name: "Joe Willock", club: "Newcastle United", nationality: "England", position: "Midfielder" },
  { name: "Harvey Barnes", club: "Newcastle United", nationality: "England", position: "Forward" },
  { name: "Leon Bailey", club: "Aston Villa", nationality: "Jamaica", position: "Forward" },
  { name: "Ezri Konsa", club: "Aston Villa", nationality: "England", position: "Defender" },
  { name: "Pau Torres", club: "Aston Villa", nationality: "Spain", position: "Defender" },
  { name: "Ian Maatsen", club: "Aston Villa", nationality: "Netherlands", position: "Defender" },
  { name: "Boubacar Kamara", club: "Aston Villa", nationality: "France", position: "Midfielder" },
  { name: "Jacob Ramsey", club: "Aston Villa", nationality: "England", position: "Midfielder" },
  { name: "Adam Wharton", club: "Crystal Palace", nationality: "England", position: "Midfielder" },
  { name: "Yankuba Minteh", club: "Brighton", nationality: "Gambia", position: "Forward" },
  { name: "Harry Wilson", club: "Fulham", nationality: "England", position: "Forward" },
];

export const players: PLPlayer[] = BASE_PLAYERS.map((p) => ({
  ...p,
  free: false,
}));

// Convenience export for paywall/locks UI
export const items: Array<{ name: string; free: boolean }> = players.map(({ name, free }) => ({
  name,
  free,
}));

export const words: string[] = players.map((p) => p.name);

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function scoreSimilar(a: PLPlayer, b: PLPlayer): number {
  let s = 0;
  if (a.club === b.club) s += 3;
  if (a.position === b.position) s += 2;
  if (a.nationality === b.nationality) s += 1;
  return s;
}

export const similar: Record<string, string[]> = Object.fromEntries(
  players.map((p) => {
    const seed = hashString(p.name);

    const ranked = players
      .filter((o) => o.name !== p.name)
      .map((o, idx) => ({
        name: o.name,
        score: scoreSimilar(p, o),
        tie: hashString(`${seed}-${idx}-${o.name}`),
      }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.tie - b.tie;
      })
      .slice(0, 5)
      .map((o) => o.name);

    return [p.name, ranked];
  })
);

export default {
  items,
  words,
  similar,
  players,
};