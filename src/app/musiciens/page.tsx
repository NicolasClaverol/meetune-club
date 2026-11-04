import type { Metadata } from "next";
import { Suspense } from "react";
import MusicianResults from "@/components/musicians/MusicianResults";

export const metadata: Metadata = {
  title: "Explorer les musiciens · Meetune Club",
};

// La page n'attend pas searchParams elle-même : le titre ne dépend pas de l'URL,
// Next peut donc le préparer à l'avance. Seuls les résultats, qui dépendent des
// filtres de l'URL, sont calculés à chaque visite, à l'intérieur du Suspense.
export default function MusiciansPage({ searchParams }: PageProps<"/musiciens">) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Explorer les musiciens</h1>

      <Suspense
        fallback={
          <p role="status" className="mt-2 text-muted">
            Chargement des musiciens…
          </p>
        }
      >
        <MusicianResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
