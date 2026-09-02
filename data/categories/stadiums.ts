// data/categories/stadiums.ts
// Stadiums – famous club stadiums only (game-ready)

export const words: string[] = [
  // England
  "Old Trafford",
  "Anfield",
  "Etihad Stadium",
  "Emirates Stadium",
  "Tottenham Hotspur Stadium",
  "Stamford Bridge",
  "Villa Park",
  "Goodison Park",
  "St James' Park",
  "London Stadium",

  // Spain
  "Santiago Bernabéu",
  "Camp Nou",
  "Metropolitano",
  "San Mamés",
  "Benito Villamarín",
  "Ramón Sánchez Pizjuán",
  "Mestalla",
  "RCDE Stadium",

  // Italy
  "San Siro",
  "Allianz Stadium",
  "Stadio Olimpico",
  "Diego Armando Maradona Stadium",
  "Stadio Artemio Franchi",

  // Germany
  "Signal Iduna Park",
  "Allianz Arena",
  "BayArena",
  "Veltins-Arena",
  "Red Bull Arena Leipzig",

  // France
  "Parc des Princes",
  "Stade Vélodrome",
  "Groupama Stadium",
  "Stade Pierre-Mauroy",

  // Portugal
  "Estádio da Luz",
  "Estádio do Dragão",
  "Estádio José Alvalade",

  // Netherlands
  "Johan Cruyff Arena",
  "De Kuip",

  // Turkey
  "Türk Telekom Stadium",
  "Şükrü Saracoğlu Stadium",

  // South America
  "La Bombonera",
  "El Monumental",
  "Maracanã",
  "Arena do Grêmio",

  // Global / Iconic
  "Wembley Stadium",
  "Estadio Azteca",
  "Rajko Mitić Stadium",
  "Stadion Poljud",

  // Balkans / Eastern Europe
  "Stadion Maksimir",

  // Nordics
  "Friends Arena",

  // Scotland
  "Celtic Park",
];

export const items: Array<{ name: string; free: boolean }> = words.map((name) => ({
  name,
  free: false,
}));

const stadiumClub: Record<string, string> = {
  // England
  "Old Trafford": "Manchester United",
  "Anfield": "Liverpool",
  "Etihad Stadium": "Manchester City",
  "Emirates Stadium": "Arsenal",
  "Tottenham Hotspur Stadium": "Tottenham Hotspur",
  "Stamford Bridge": "Chelsea",
  "Villa Park": "Aston Villa",
  "Goodison Park": "Everton",
  "St James' Park": "Newcastle United",
  "London Stadium": "West Ham United",

  // Spain
  "Santiago Bernabéu": "Real Madrid",
  "Camp Nou": "FC Barcelona",
  "Metropolitano": "Atlético de Madrid",
  "San Mamés": "Athletic Club",
  "Benito Villamarín": "Real Betis",
  "Ramón Sánchez Pizjuán": "Sevilla FC",
  "Mestalla": "Valencia CF",
  "RCDE Stadium": "Espanyol",

  // Italy
  "San Siro": "AC Milan / Inter",
  "Allianz Stadium": "Juventus",
  "Stadio Olimpico": "Roma / Lazio",
  "Diego Armando Maradona Stadium": "Napoli",
  "Stadio Artemio Franchi": "Fiorentina",

  // Germany
  "Signal Iduna Park": "Borussia Dortmund",
  "Allianz Arena": "Bayern Munich",
  "BayArena": "Bayer Leverkusen",
  "Veltins-Arena": "Schalke 04",
  "Red Bull Arena Leipzig": "RB Leipzig",

  // France
  "Parc des Princes": "Paris Saint-Germain",
  "Stade Vélodrome": "Olympique Marseille",
  "Groupama Stadium": "Olympique Lyonnais",
  "Stade Pierre-Mauroy": "Lille OSC",

  // Portugal
  "Estádio da Luz": "Benfica",
  "Estádio do Dragão": "Porto",
  "Estádio José Alvalade": "Sporting CP",

  // Netherlands
  "Johan Cruyff Arena": "Ajax",
  "De Kuip": "Feyenoord",

  // Turkey
  "Türk Telekom Stadium": "Galatasaray",
  "Şükrü Saracoğlu Stadium": "Fenerbahçe",

  // South America
  "La Bombonera": "Boca Juniors",
  "El Monumental": "River Plate",
  "Maracanã": "Flamengo / Brazil",
  "Arena do Grêmio": "Grêmio",

  // Iconic
  "Wembley Stadium": "England National Team",
  "Estadio Azteca": "Club América",
  "Rajko Mitić Stadium": "Red Star Belgrade",
  "Stadion Poljud": "Hajduk Split",

  // Balkans / Eastern Europe
  "Stadion Maksimir": "Dinamo Zagreb",

  // Nordics
  "Friends Arena": "AIK",

  // Scotland
  "Celtic Park": "Celtic",
};

const similar: Record<string, string[]> = {
  // England
  "Old Trafford": ["Anfield", "Etihad Stadium", "Emirates Stadium", "Tottenham Hotspur Stadium", "Wembley Stadium"],
  "Anfield": ["Old Trafford", "Etihad Stadium", "Emirates Stadium", "Tottenham Hotspur Stadium", "Wembley Stadium"],
  "Etihad Stadium": ["Old Trafford", "Anfield", "Emirates Stadium", "Tottenham Hotspur Stadium", "Wembley Stadium"],
  "Emirates Stadium": ["Tottenham Hotspur Stadium", "Stamford Bridge", "Old Trafford", "Anfield", "Wembley Stadium"],
  "Tottenham Hotspur Stadium": ["Emirates Stadium", "Stamford Bridge", "Old Trafford", "Anfield", "Wembley Stadium"],
  "Stamford Bridge": ["Emirates Stadium", "Tottenham Hotspur Stadium", "Old Trafford", "Anfield", "Wembley Stadium"],
  "Villa Park": ["Goodison Park", "St James' Park", "London Stadium", "Emirates Stadium", "Anfield"],
  "Goodison Park": ["Villa Park", "St James' Park", "Anfield", "Old Trafford", "London Stadium"],
  "St James' Park": ["Villa Park", "Goodison Park", "Anfield", "Old Trafford", "London Stadium"],
  "London Stadium": ["Emirates Stadium", "Tottenham Hotspur Stadium", "Stamford Bridge", "Villa Park", "Wembley Stadium"],

  // Spain
  "Santiago Bernabéu": ["Camp Nou", "Metropolitano", "San Mamés", "Mestalla", "Ramón Sánchez Pizjuán"],
  "Camp Nou": ["Santiago Bernabéu", "Metropolitano", "San Mamés", "Mestalla", "Ramón Sánchez Pizjuán"],
  "Metropolitano": ["Santiago Bernabéu", "Camp Nou", "San Mamés", "Mestalla", "Benito Villamarín"],
  "San Mamés": ["Santiago Bernabéu", "Camp Nou", "Mestalla", "Ramón Sánchez Pizjuán", "Benito Villamarín"],
  "Benito Villamarín": ["Ramón Sánchez Pizjuán", "San Mamés", "Mestalla", "Camp Nou", "Metropolitano"],
  "Ramón Sánchez Pizjuán": ["Benito Villamarín", "San Mamés", "Mestalla", "Camp Nou", "Santiago Bernabéu"],
  "Mestalla": ["Benito Villamarín", "Ramón Sánchez Pizjuán", "San Mamés", "Camp Nou", "Metropolitano"],
  "RCDE Stadium": ["Camp Nou", "Santiago Bernabéu", "Metropolitano", "Mestalla", "San Mamés"],

  // Italy
  "San Siro": ["Allianz Stadium", "Stadio Olimpico", "Diego Armando Maradona Stadium", "Allianz Arena", "Parc des Princes"],
  "Allianz Stadium": ["San Siro", "Stadio Olimpico", "Diego Armando Maradona Stadium", "Allianz Arena", "Signal Iduna Park"],
  "Stadio Olimpico": ["San Siro", "Allianz Stadium", "Diego Armando Maradona Stadium", "Parc des Princes", "Groupama Stadium"],
  "Diego Armando Maradona Stadium": ["San Siro", "Stadio Olimpico", "Allianz Stadium", "Parc des Princes", "Stade Vélodrome"],
  "Stadio Artemio Franchi": ["San Siro", "Stadio Olimpico", "Allianz Stadium", "Diego Armando Maradona Stadium", "Parc des Princes"],

  // Germany
  "Signal Iduna Park": ["Allianz Arena", "BayArena", "Veltins-Arena", "Allianz Stadium", "San Siro"],
  "Allianz Arena": ["Signal Iduna Park", "BayArena", "Veltins-Arena", "Allianz Stadium", "San Siro"],
  "BayArena": ["Signal Iduna Park", "Allianz Arena", "Veltins-Arena", "Groupama Stadium", "Parc des Princes"],
  "Veltins-Arena": ["Signal Iduna Park", "Allianz Arena", "BayArena", "Allianz Stadium", "San Siro"],
  "Red Bull Arena Leipzig": ["Allianz Arena", "Signal Iduna Park", "BayArena", "Veltins-Arena", "San Siro"],

  // France
  "Parc des Princes": ["Stade Vélodrome", "Groupama Stadium", "San Siro", "Allianz Stadium", "Diego Armando Maradona Stadium"],
  "Stade Vélodrome": ["Parc des Princes", "Groupama Stadium", "San Siro", "Diego Armando Maradona Stadium", "Camp Nou"],
  "Groupama Stadium": ["Parc des Princes", "Stade Vélodrome", "Allianz Arena", "BayArena", "San Siro"],
  "Stade Pierre-Mauroy": ["Parc des Princes", "Groupama Stadium", "Stade Vélodrome", "San Siro", "Allianz Stadium"],

  // Portugal
  "Estádio da Luz": ["Estádio do Dragão", "San Siro", "Parc des Princes", "Allianz Arena", "Camp Nou"],
  "Estádio do Dragão": ["Estádio da Luz", "San Siro", "Parc des Princes", "Allianz Arena", "Signal Iduna Park"],
  "Estádio José Alvalade": ["Estádio da Luz", "Estádio do Dragão", "San Siro", "Parc des Princes", "Allianz Arena"],

  // Netherlands
  "Johan Cruyff Arena": ["De Kuip", "Allianz Arena", "Signal Iduna Park", "Camp Nou", "San Siro"],
  "De Kuip": ["Johan Cruyff Arena", "Anfield", "Signal Iduna Park", "Parc des Princes", "San Siro"],

  // Turkey / Balkans
  "Türk Telekom Stadium": ["Şükrü Saracoğlu Stadium", "Rajko Mitić Stadium", "Stadion Poljud", "Parc des Princes", "Stade Vélodrome"],
  "Şükrü Saracoğlu Stadium": ["Türk Telekom Stadium", "Rajko Mitić Stadium", "Stadion Poljud", "San Siro", "Parc des Princes"],

  // South America
  "La Bombonera": ["El Monumental", "Maracanã", "Diego Armando Maradona Stadium", "San Siro", "Camp Nou"],
  "El Monumental": ["La Bombonera", "Maracanã", "Diego Armando Maradona Stadium", "San Siro", "Camp Nou"],
  "Maracanã": ["La Bombonera", "El Monumental", "Camp Nou", "San Siro", "Stade Vélodrome"],
  "Arena do Grêmio": ["Maracanã", "La Bombonera", "El Monumental", "Camp Nou", "San Siro"],

  // Iconic
  "Wembley Stadium": ["Old Trafford", "Emirates Stadium", "Tottenham Hotspur Stadium", "Camp Nou", "San Siro"],
  "Estadio Azteca": ["Maracanã", "La Bombonera", "El Monumental", "Camp Nou", "San Siro"],
  "Rajko Mitić Stadium": ["Stadion Poljud", "Türk Telekom Stadium", "Şükrü Saracoğlu Stadium", "Parc des Princes", "San Siro"],
  "Stadion Poljud": ["Rajko Mitić Stadium", "Şükrü Saracoğlu Stadium", "Türk Telekom Stadium", "San Siro", "Stade Vélodrome"],

  // Balkans / Eastern Europe
  "Stadion Maksimir": ["Rajko Mitić Stadium", "Stadion Poljud", "Türk Telekom Stadium", "Şükrü Saracoğlu Stadium", "San Siro"],

  // Nordics
  "Friends Arena": ["Johan Cruyff Arena", "De Kuip", "Allianz Arena", "Signal Iduna Park", "San Siro"],

  // Scotland
  "Celtic Park": ["Anfield", "Old Trafford", "Wembley Stadium", "San Siro", "Parc des Princes"],
};

export default {
  items,
  words,
  similar,
  stadiumClub,
};