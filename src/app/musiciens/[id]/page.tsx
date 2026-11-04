import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { getMusicianById, GOAL_LABELS, LEVEL_LABELS, musicians } from "@/lib/mock-data";

// Liste des identifiants connus au moment du build : Next génère à l'avance
// une page HTML par musicien. Un identifiant absent de cette liste
// (ex. /musiciens/999) est calculé à la visite et aboutit à notFound().
export function generateStaticParams() {
  return musicians.map((musician) => ({ id: musician.id }));
}

// Titre d'onglet propre à chaque profil : « Léa Fontaine (Chant, Guitare) — Meetune Club ».
export async function generateMetadata({
  params,
}: PageProps<"/musiciens/[id]">): Promise<Metadata> {
  const { id } = await params;
  const musician = getMusicianById(id);
  if (!musician) return {};

  return {
    title: `${musician.name} (${musician.instruments.join(", ")}) — Meetune Club`,
    description: musician.bio,
  };
}

export default async function MusicianProfilePage({ params }: PageProps<"/musiciens/[id]">) {
  const { id } = await params;
  const musician = getMusicianById(id);

  // Identifiant inconnu : on arrête le rendu et Next affiche sa page « introuvable »
  // (code HTTP 404), au lieu de planter plus bas sur musician.name.
  if (!musician) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/musiciens"
        className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-foreground"
      >
        ← Retour aux musiciens
      </Link>

      <article className="mt-4 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
        {/* Mobile : avatar au-dessus du nom. Dès sm : avatar à côté. */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Avatar name={musician.name} hue={musician.hue} size="lg" />
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{musician.name}</h1>
            <p className="mt-1 text-muted">
              {musician.city} · Niveau{" "}
              <span className="text-foreground">{LEVEL_LABELS[musician.level]}</span>
            </p>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Instruments</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {musician.instruments.map((instrument) => (
              <li key={instrument}>
                <Badge variant="primary">{instrument}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold">Genres</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {musician.genres.map((genre) => (
              <li key={genre}>
                <Badge>{genre}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold">Objectifs</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-muted marker:text-primary">
            {musician.goals.map((goal) => (
              <li key={goal}>{GOAL_LABELS[goal]}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold">Présentation</h2>
          <p className="mt-3 leading-relaxed text-muted">{musician.bio}</p>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Le contact demande d'être connecté : il sera activé avec l'authentification (étape 5). */}
          <button
            type="button"
            disabled
            aria-describedby="contact-info"
            className="min-h-11 cursor-not-allowed rounded-lg bg-accent px-6 font-semibold text-background opacity-50"
          >
            Contacter
          </button>

          {/* Affiché seulement si le profil a un lien YouTube (champ facultatif). */}
          {musician.youtube && (
            <a
              href={musician.youtube}
              target="_blank"
              // noopener : la page YouTube ne peut pas contrôler notre onglet.
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center rounded-lg border border-primary/60 px-6 font-semibold text-violet-200 transition-colors hover:bg-primary/20"
            >
              Voir sur YouTube
              <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
            </a>
          )}

          <p id="contact-info" className="text-sm text-muted sm:basis-full">
            Le contact sera disponible une fois connecté.
          </p>
        </div>
      </article>
    </div>
  );
}
