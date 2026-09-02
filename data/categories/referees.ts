// data/categories/referees.ts
// Referees – most iconic & well-known (game-ready)

export const words: string[] = [
  // ICONIC / LEGENDARY
  "Pierluigi Collina",
  "Howard Webb",
  "Massimo Busacca",
  "Urs Meier",
  "Graham Poll",

  // TOP UEFA ERA (2000s–2010s)
  "Mark Clattenburg",
  "Björn Kuipers",
  "Nicola Rizzoli",
  "Felix Brych",
  "Damir Skomina",

  // CURRENT ELITE
  "Szymon Marciniak",
  "Daniele Orsato",
  "Danny Makkelie",
  "Clement Turpin",
  "Michael Oliver",
  "Stéphanie Frappart",

  // ENGLAND (PREMIER LEAGUE ERA)
  "Mike Dean",
  "Martin Atkinson",
  "Anthony Taylor",

  // SPAIN
  "Antonio Mateu Lahoz",
  "Carlos del Cerro Grande",
  "Jesús Gil Manzano",

  // INTERNATIONAL / NON‑EUROPE
  "Néstor Pitana",
  "Wilmar Roldán",
  "Alireza Faghani",
  "Ravshan Irmatov",

  // OTHER WELL‑KNOWN UEFA
  "Gianluca Rocchi",
  "Pedro Proença",
  "Frank De Bleeckere",
  "Viktor Kassai",
];

export const items: Array<{ name: string; free: boolean }> = words.map((name) => ({
  name,
  free: false,
}));

export const similar: Record<string, string[]> = {
  // LEGENDS
  "Pierluigi Collina": ["Howard Webb", "Massimo Busacca", "Urs Meier", "Graham Poll", "Nicola Rizzoli"],
  "Howard Webb": ["Pierluigi Collina", "Mark Clattenburg", "Mike Dean", "Nicola Rizzoli", "Felix Brych"],
  "Massimo Busacca": ["Pierluigi Collina", "Urs Meier", "Frank De Bleeckere", "Gianluca Rocchi", "Björn Kuipers"],
  "Urs Meier": ["Pierluigi Collina", "Massimo Busacca", "Graham Poll", "Frank De Bleeckere", "Viktor Kassai"],
  "Graham Poll": ["Urs Meier", "Howard Webb", "Mike Dean", "Frank De Bleeckere", "Viktor Kassai"],

  // TOP UEFA (2000s–2010s)
  "Mark Clattenburg": ["Howard Webb", "Björn Kuipers", "Nicola Rizzoli", "Felix Brych", "Daniele Orsato"],
  "Björn Kuipers": ["Mark Clattenburg", "Daniele Orsato", "Felix Brych", "Danny Makkelie", "Clement Turpin"],
  "Nicola Rizzoli": ["Mark Clattenburg", "Pierluigi Collina", "Felix Brych", "Damir Skomina", "Daniele Orsato"],
  "Felix Brych": ["Nicola Rizzoli", "Daniele Orsato", "Björn Kuipers", "Szymon Marciniak", "Danny Makkelie"],
  "Damir Skomina": ["Nicola Rizzoli", "Felix Brych", "Daniele Orsato", "Björn Kuipers", "Szymon Marciniak"],

  // CURRENT ELITE
  "Szymon Marciniak": ["Daniele Orsato", "Felix Brych", "Danny Makkelie", "Clement Turpin", "Michael Oliver"],
  "Daniele Orsato": ["Szymon Marciniak", "Felix Brych", "Björn Kuipers", "Nicola Rizzoli", "Clement Turpin"],
  "Danny Makkelie": ["Björn Kuipers", "Szymon Marciniak", "Felix Brych", "Clement Turpin", "Michael Oliver"],
  "Clement Turpin": ["Daniele Orsato", "Björn Kuipers", "Danny Makkelie", "Michael Oliver", "Szymon Marciniak"],
  "Michael Oliver": ["Anthony Taylor", "Clement Turpin", "Danny Makkelie", "Szymon Marciniak", "Mike Dean"],
  "Stéphanie Frappart": ["Clement Turpin", "Daniele Orsato", "Danny Makkelie", "Szymon Marciniak", "Michael Oliver"],

  // ENGLAND
  "Mike Dean": ["Howard Webb", "Michael Oliver", "Anthony Taylor", "Mark Clattenburg", "Graham Poll"],
  "Martin Atkinson": ["Mike Dean", "Anthony Taylor", "Michael Oliver", "Howard Webb", "Mark Clattenburg"],
  "Anthony Taylor": ["Michael Oliver", "Mike Dean", "Martin Atkinson", "Daniele Orsato", "Clement Turpin"],

  // SPAIN
  "Antonio Mateu Lahoz": ["Jesús Gil Manzano", "Carlos del Cerro Grande", "Daniele Orsato", "Mark Clattenburg", "Björn Kuipers"],
  "Carlos del Cerro Grande": ["Jesús Gil Manzano", "Antonio Mateu Lahoz", "Clement Turpin", "Felix Brych", "Danny Makkelie"],
  "Jesús Gil Manzano": ["Antonio Mateu Lahoz", "Carlos del Cerro Grande", "Clement Turpin", "Björn Kuipers", "Daniele Orsato"],

  // INTERNATIONAL / NON‑EUROPE
  "Néstor Pitana": ["Wilmar Roldán", "Alireza Faghani", "Ravshan Irmatov", "Szymon Marciniak", "Daniele Orsato"],
  "Wilmar Roldán": ["Néstor Pitana", "Alireza Faghani", "Ravshan Irmatov", "Felix Brych", "Danny Makkelie"],
  "Alireza Faghani": ["Ravshan Irmatov", "Néstor Pitana", "Wilmar Roldán", "Szymon Marciniak", "Clement Turpin"],
  "Ravshan Irmatov": ["Alireza Faghani", "Néstor Pitana", "Wilmar Roldán", "Felix Brych", "Daniele Orsato"],

  // OTHER UEFA
  "Gianluca Rocchi": ["Massimo Busacca", "Nicola Rizzoli", "Felix Brych", "Björn Kuipers", "Daniele Orsato"],
  "Pedro Proença": ["Frank De Bleeckere", "Viktor Kassai", "Urs Meier", "Björn Kuipers", "Nicola Rizzoli"],
  "Frank De Bleeckere": ["Urs Meier", "Massimo Busacca", "Graham Poll", "Viktor Kassai", "Pedro Proença"],
  "Viktor Kassai": ["Urs Meier", "Graham Poll", "Frank De Bleeckere", "Pedro Proença", "Nicola Rizzoli"],
};

export default {
  items,
  words,
  similar,
};