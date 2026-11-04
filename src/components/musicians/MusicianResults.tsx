import Link from "next/link";
import MusicianCard from "@/components/musicians/MusicianCard";
import {
  filterMusicians,
  GOAL_LABELS,
  LEVEL_LABELS,
  musicians,
  type Goal,
  type Level,
} from "@/lib/mock-data";

type SearchParams = { [key: string]: string | string[] | undefined };

interface MusicianResultsProps {
  searchParams: Promise<SearchParams>;
}

// Un paramètre répété (?genre=Rock&genre=Jazz) arrive sous forme de tableau :
// on garde seulement la première valeur.
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

// Une URL peut être modifiée à la main : on vérifie que la valeur fait bien
// partie des niveaux et objectifs connus. Sinon, le filtre est ignoré.
function isLevel(value: string | undefined): value is Level {
  return value !== undefined && Object.hasOwn(LEVEL_LABELS, value);
}

function isGoal(value: string | undefined): value is Goal {
  return value !== undefined && Object.hasOwn(GOAL_LABELS, value);
}

export default async function MusicianResults({ searchParams }: MusicianResultsProps) {
  const params = await searchParams;
  const niveau = first(params.niveau);
  const objectif = first(params.objectif);

  // Traduction des noms français de l'URL vers les noms attendus par filterMusicians.
  const results = filterMusicians(musicians, {
    instrument: first(params.instrument),
    genre: first(params.genre),
    city: first(params.ville),
    level: isLevel(niveau) ? niveau : undefined,
    goal: isGoal(objectif) ? objectif : undefined,
  });

  if (results.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-surface px-6 py-12 text-center">
        <h2 className="text-xl font-bold">Aucun musicien trouvé</h2>
        <p className="mt-2 text-muted">
          Aucun profil ne correspond à tous ces critères. Essayez d&apos;en retirer un.
        </p>
        <Link
          href="/musiciens"
          className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-primary/60 px-4 font-semibold text-violet-200 transition-colors hover:bg-primary/20"
        >
          Voir tous les musiciens
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* role="status" : un lecteur d'écran annonce le nouveau nombre quand les filtres changent. */}
      <p role="status" className="mt-2 text-muted">
        {results.length} {results.length === 1 ? "musicien trouvé" : "musiciens trouvés"}
      </p>

      {/* Mobile d'abord : 1 colonne par défaut, 2 dès la tablette (md), 3 sur ordinateur (lg). */}
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((musician) => (
          <li key={musician.id}>
            <MusicianCard musician={musician} />
          </li>
        ))}
      </ul>
    </>
  );
}
