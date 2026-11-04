import type { Metadata } from "next";
import { Suspense } from "react";
import FilterPanel from "@/components/musicians/FilterPanel";
import MusicianResults from "@/components/musicians/MusicianResults";

export const metadata: Metadata = {
  title: "Explorer les musiciens · Meetune Club",
};

// La page n'attend pas searchParams elle-même : le titre ne dépend pas de l'URL,
// Next peut donc le préparer à l'avance. Le panneau de filtres et les résultats,
// qui dépendent de l'URL, sont calculés à chaque visite, chacun dans son Suspense.
export default function MusiciansPage({ searchParams }: PageProps<"/musiciens">) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Explorer les musiciens</h1>

      {/* Mobile : panneau au-dessus des résultats. Ordinateur (lg) : colonne de 16rem à gauche. */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr] lg:items-start">
        <aside aria-label="Filtres de recherche">
          <Suspense
            fallback={<div className="min-h-11 rounded-2xl border border-white/10 bg-surface" />}
          >
            <FilterPanel searchParams={searchParams} />
          </Suspense>
        </aside>

        <div>
          <Suspense
            fallback={
              <p role="status" className="text-muted">
                Chargement des musiciens…
              </p>
            }
          >
            <MusicianResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
