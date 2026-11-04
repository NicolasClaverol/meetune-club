import type { Metadata } from "next";
import MusicianCard from "@/components/musicians/MusicianCard";
import { musicians } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Explorer les musiciens · Meetune Club",
};

export default function MusiciansPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Explorer les musiciens</h1>
      <p className="mt-2 text-muted">{musicians.length} musiciens inscrits</p>

      {/* Mobile d'abord : 1 colonne par défaut, 2 dès la tablette (md), 3 sur ordinateur (lg). */}
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {musicians.map((musician) => (
          <li key={musician.id}>
            <MusicianCard musician={musician} />
          </li>
        ))}
      </ul>
    </section>
  );
}
