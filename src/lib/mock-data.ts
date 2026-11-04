// Jeu de données fictif pour construire l'interface avant la vraie base de données.
// Tous les profils sont inventés. À remplacer par des requêtes Prisma à l'étape 4.

export type Level = "debutant" | "intermediaire" | "confirme" | "pro";
export type Goal = "groupe" | "jam" | "projet" | "cours" | "studio";

export interface Musician {
  id: string;
  name: string;
  city: string;
  instruments: string[];
  genres: string[];
  level: Level;
  goals: Goal[];
  bio: string;
  /** Teinte (0-360) utilisée pour générer l'avatar à initiales. */
  hue: number;
  youtube?: string;
}

export const INSTRUMENTS = [
  "Guitare",
  "Basse",
  "Batterie",
  "Chant",
  "Piano / Clavier",
  "Violon",
  "Saxophone",
  "Trompette",
  "Flûte",
  "Percussions",
  "DJ / Machines",
] as const;

export const GENRES = [
  "Rock",
  "Metal",
  "Pop",
  "Jazz",
  "Blues",
  "Funk",
  "Reggae",
  "Hip-hop",
  "Électro",
  "Folk",
  "Chanson française",
  "Classique",
] as const;

export const LEVEL_LABELS: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  confirme: "Confirmé",
  pro: "Professionnel",
};

export const GOAL_LABELS: Record<Goal, string> = {
  groupe: "Cherche un groupe",
  jam: "Jam sessions",
  projet: "Projet de compo",
  cours: "Échange / cours",
  studio: "Enregistrement studio",
};

export const musicians: Musician[] = [
  {
    id: "1",
    name: "Léa Fontaine",
    city: "Montpellier",
    instruments: ["Chant", "Guitare"],
    genres: ["Pop", "Folk"],
    level: "intermediaire",
    goals: ["groupe", "projet"],
    bio: "Je chante depuis le lycée et j'écris mes propres morceaux. Je cherche une section rythmique pour monter un projet pop-folk et jouer dans des bars.",
    hue: 280,
  },
  {
    id: "2",
    name: "Karim Benali",
    city: "Toulouse",
    instruments: ["Batterie"],
    genres: ["Rock", "Funk"],
    level: "confirme",
    goals: ["groupe", "jam"],
    bio: "Batteur depuis 12 ans, ancien d'un groupe de reprises. Dispo en semaine le soir, local de répétition à disposition.",
    hue: 20,
  },
  {
    id: "3",
    name: "Camille Roux",
    city: "Lyon",
    instruments: ["Piano / Clavier"],
    genres: ["Jazz", "Blues"],
    level: "pro",
    goals: ["projet", "studio"],
    bio: "Pianiste de formation conservatoire, je joue en trio jazz et j'accompagne des chanteurs en studio. Ouverte aux projets originaux.",
    hue: 200,
  },
  {
    id: "4",
    name: "Théo Martin",
    city: "Paris",
    instruments: ["Guitare"],
    genres: ["Metal", "Rock"],
    level: "confirme",
    goals: ["groupe"],
    bio: "Guitariste lead, influences metal progressif. Je cherche un groupe motivé qui compose et qui veut faire des concerts.",
    hue: 0,
  },
  {
    id: "5",
    name: "Inès Garcia",
    city: "Marseille",
    instruments: ["Basse"],
    genres: ["Reggae", "Funk"],
    level: "intermediaire",
    goals: ["groupe", "jam"],
    bio: "Bassiste groove, j'adore les lignes de basse qui font danser. Je cherche un groupe reggae ou funk dans le sud.",
    hue: 140,
  },
  {
    id: "6",
    name: "Lucas Moreau",
    city: "Nantes",
    instruments: ["Chant"],
    genres: ["Rock", "Chanson française"],
    level: "debutant",
    goals: ["groupe", "cours"],
    bio: "Je commence à chanter et j'ai besoin de jouer avec d'autres pour progresser. Pas de prétention, beaucoup de motivation.",
    hue: 320,
  },
  {
    id: "7",
    name: "Sarah Lefèvre",
    city: "Bordeaux",
    instruments: ["Violon"],
    genres: ["Classique", "Folk"],
    level: "pro",
    goals: ["projet", "studio"],
    bio: "Violoniste, j'ajoute des arrangements à cordes sur des projets pop, folk et électro. Disponible pour des enregistrements.",
    hue: 40,
  },
  {
    id: "8",
    name: "Maxime Petit",
    city: "Lille",
    instruments: ["Batterie", "Percussions"],
    genres: ["Hip-hop", "Électro"],
    level: "intermediaire",
    goals: ["projet", "jam"],
    bio: "Je mélange batterie acoustique et pads électroniques. Je cherche un beatmaker ou un MC pour un projet hybride.",
    hue: 170,
  },
  {
    id: "9",
    name: "Nora Haddad",
    city: "Montpellier",
    instruments: ["Saxophone"],
    genres: ["Jazz", "Funk"],
    level: "confirme",
    goals: ["jam", "groupe"],
    bio: "Saxophoniste alto, je participe aux jams de la ville et je cherche un groupe funk avec des cuivres.",
    hue: 50,
  },
  {
    id: "10",
    name: "Hugo Lambert",
    city: "Rennes",
    instruments: ["Guitare", "Basse"],
    genres: ["Rock", "Blues"],
    level: "intermediaire",
    goals: ["groupe", "jam"],
    bio: "Je joue de la guitare et de la basse selon les besoins. Plutôt rock blues, j'aime les ambiances brutes et simples.",
    hue: 10,
  },
  {
    id: "11",
    name: "Eva Girard",
    city: "Strasbourg",
    instruments: ["Chant", "Piano / Clavier"],
    genres: ["Pop", "Électro"],
    level: "confirme",
    goals: ["projet", "studio"],
    bio: "Auteure-compositrice, je produis mes morceaux à la maison. Je cherche un guitariste et un batteur pour passer sur scène.",
    hue: 300,
  },
  {
    id: "12",
    name: "Yanis Chevalier",
    city: "Nîmes",
    instruments: ["Trompette"],
    genres: ["Reggae", "Jazz"],
    level: "intermediaire",
    goals: ["groupe", "jam"],
    bio: "Trompettiste, je cherche un groupe avec une section cuivres. Dispo les week-ends pour répéter et jouer.",
    hue: 60,
  },
  {
    id: "13",
    name: "Manon Dubois",
    city: "Grenoble",
    instruments: ["Flûte"],
    genres: ["Folk", "Classique"],
    level: "confirme",
    goals: ["projet", "cours"],
    bio: "Flûtiste traversière, j'aimerais explorer le folk et les musiques de film avec d'autres instruments acoustiques.",
    hue: 160,
  },
  {
    id: "14",
    name: "Antoine Faure",
    city: "Paris",
    instruments: ["DJ / Machines"],
    genres: ["Électro", "Hip-hop"],
    level: "confirme",
    goals: ["projet", "studio"],
    bio: "Producteur et DJ, je cherche des instrumentistes live (guitare, basse, voix) pour un set électro hybride.",
    hue: 260,
  },
  {
    id: "15",
    name: "Julie Mercier",
    city: "Toulouse",
    instruments: ["Chant"],
    genres: ["Chanson française", "Jazz"],
    level: "intermediaire",
    goals: ["groupe", "projet"],
    bio: "Chanteuse avec un répertoire de chanson française et de jazz vocal. Je cherche un pianiste ou un guitariste.",
    hue: 340,
  },
  {
    id: "16",
    name: "Romain Blanc",
    city: "Lyon",
    instruments: ["Basse"],
    genres: ["Metal", "Rock"],
    level: "debutant",
    goals: ["groupe", "cours"],
    bio: "Je viens d'acheter ma première basse et je veux apprendre en jouant. Je cherche un groupe patient et sympa.",
    hue: 220,
  },
  {
    id: "17",
    name: "Chloé Vidal",
    city: "Béziers",
    instruments: ["Guitare"],
    genres: ["Folk", "Pop"],
    level: "debutant",
    goals: ["jam", "cours"],
    bio: "Guitariste débutante, j'aime jouer à plusieurs. Je cherche des jams amicales près de chez moi pour prendre confiance.",
    hue: 100,
  },
  {
    id: "18",
    name: "Paul Rousseau",
    city: "Marseille",
    instruments: ["Piano / Clavier", "DJ / Machines"],
    genres: ["Électro", "Pop"],
    level: "intermediaire",
    goals: ["projet"],
    bio: "Claviériste et sound designer, je compose des ambiances synthétiques. Je cherche un chanteur ou une chanteuse.",
    hue: 240,
  },
  {
    id: "19",
    name: "Sofia Navarro",
    city: "Perpignan",
    instruments: ["Percussions"],
    genres: ["Reggae", "Folk"],
    level: "confirme",
    goals: ["groupe", "jam"],
    bio: "Percussionniste (congas, cajón, djembé). J'apporte du rythme et de la couleur aux groupes acoustiques et reggae.",
    hue: 30,
  },
  {
    id: "20",
    name: "Adrien Perrin",
    city: "Nantes",
    instruments: ["Guitare", "Chant"],
    genres: ["Rock", "Blues"],
    level: "pro",
    goals: ["groupe", "studio"],
    bio: "Guitariste-chanteur, plusieurs albums enregistrés. Je monte un nouveau groupe rock blues et je cherche rythmique et clavier.",
    hue: 350,
  },
];

export interface MusicianFilters {
  q?: string;
  instrument?: string;
  genre?: string;
  city?: string;
  level?: Level;
  goal?: Goal;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Filtre la liste selon les critères choisis (tous sont facultatifs). */
export function filterMusicians(
  list: Musician[],
  filters: MusicianFilters,
): Musician[] {
  const q = filters.q ? normalize(filters.q) : "";
  const city = filters.city ? normalize(filters.city) : "";

  return list.filter((m) => {
    if (filters.instrument && !m.instruments.includes(filters.instrument)) {
      return false;
    }
    if (filters.genre && !m.genres.includes(filters.genre)) return false;
    if (filters.level && m.level !== filters.level) return false;
    if (filters.goal && !m.goals.includes(filters.goal)) return false;
    if (city && !normalize(m.city).includes(city)) return false;
    if (q && !normalize(`${m.name} ${m.bio}`).includes(q)) return false;
    return true;
  });
}

/** Initiales pour l'avatar : "Léa Fontaine" -> "LF". */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getMusicianById(id: string): Musician | undefined {
  return musicians.find((m) => m.id === id);
}
