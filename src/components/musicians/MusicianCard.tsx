import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { LEVEL_LABELS, type Musician } from "@/lib/mock-data";

interface MusicianCardProps {
  musician: Musician;
}

export default function MusicianCard({ musician }: MusicianCardProps) {
  return (
    // h-full + flex-col : toutes les cartes d'une même ligne ont la même hauteur,
    // et mt-auto sur le bouton l'aligne en bas, quelle que soit la quantité de badges.
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-5">
      <div className="flex items-center gap-4">
        <Avatar name={musician.name} hue={musician.hue} />
        <div>
          <h2 className="text-lg font-bold">{musician.name}</h2>
          <p className="text-sm text-muted">{musician.city}</p>
        </div>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label="Instruments">
        {musician.instruments.map((instrument) => (
          <li key={instrument}>
            <Badge variant="primary">{instrument}</Badge>
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-2" aria-label="Genres">
        {musician.genres.map((genre) => (
          <li key={genre}>
            <Badge>{genre}</Badge>
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted">
        Niveau : <span className="text-foreground">{LEVEL_LABELS[musician.level]}</span>
      </p>

      <Link
        href={`/musiciens/${musician.id}`}
        // Sans ce label, un lecteur d'écran annoncerait 20 fois « Voir le profil »
        // sans dire de qui il s'agit.
        aria-label={`Voir le profil de ${musician.name}`}
        className="mt-auto flex min-h-11 items-center justify-center rounded-lg border border-primary/60 font-semibold text-violet-200 transition-colors hover:bg-primary/20"
      >
        Voir le profil
      </Link>
    </article>
  );
}
