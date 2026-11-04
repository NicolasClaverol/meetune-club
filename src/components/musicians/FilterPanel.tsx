import Link from "next/link";
import { GENRES, GOAL_LABELS, INSTRUMENTS, LEVEL_LABELS } from "@/lib/mock-data";
import { first, type SearchParams } from "@/lib/search-params";

interface FilterPanelProps {
  searchParams: Promise<SearchParams>;
}

interface Option {
  value: string; // ce qui part dans l'URL
  label: string; // ce qui s'affiche à l'écran
}

// Instruments et genres : la valeur et le libellé sont identiques.
const instrumentOptions = INSTRUMENTS.map((name) => ({ value: name, label: name }));
const genreOptions = GENRES.map((name) => ({ value: name, label: name }));
// Niveaux et objectifs : la clé (ex. "confirme") va dans l'URL, le libellé (« Confirmé ») à l'écran.
const levelOptions = Object.entries(LEVEL_LABELS).map(([value, label]) => ({ value, label }));
const goalOptions = Object.entries(GOAL_LABELS).map(([value, label]) => ({ value, label }));

const fieldClasses =
  "min-h-11 w-full rounded-lg border border-white/10 bg-background px-3 text-foreground";

interface SelectFieldProps {
  name: string;
  label: string;
  /** Texte de la première option, vide = pas de filtre (ex. « Tous les genres »). */
  allLabel: string;
  options: Option[];
  defaultValue: string;
}

function SelectField({ name, label, allLabel, options, defaultValue }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`filtre-${name}`} className="text-sm text-muted">
        {label}
      </label>
      <select
        id={`filtre-${name}`}
        name={name}
        defaultValue={defaultValue}
        className={fieldClasses}
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default async function FilterPanel({ searchParams }: FilterPanelProps) {
  const params = await searchParams;
  // Valeurs actuelles de l'URL, pour pré-remplir le formulaire ("" = aucun filtre).
  const instrument = first(params.instrument) ?? "";
  const genre = first(params.genre) ?? "";
  const ville = first(params.ville) ?? "";
  const niveau = first(params.niveau) ?? "";
  const objectif = first(params.objectif) ?? "";

  return (
    // <details> est un bloc repliable natif : le navigateur l'ouvre et le ferme
    // quand on touche <summary>, sans JavaScript. Sur ordinateur (lg), le titre est
    // masqué et le contenu forcé visible, même si le bloc est « fermé ».
    <details className="rounded-2xl border border-white/10 bg-surface lg:details-content:[content-visibility:visible]">
      <summary className="flex min-h-11 cursor-pointer items-center px-4 font-semibold lg:hidden">
        Filtres
      </summary>

      {/*
        Formulaire GET : au clic sur « Filtrer », le navigateur construit lui-même
        l'URL à partir du name de chaque champ (/musiciens?genre=Rock&ville=Lyon…).
        Le filtrage est ensuite fait par MusicianResults.
        La key change avec l'URL : React recrée alors le formulaire, sinon il
        garderait les anciennes valeurs après un clic sur « Réinitialiser ».
      */}
      <form
        key={[instrument, genre, ville, niveau, objectif].join("|")}
        method="get"
        action="/musiciens"
        className="flex flex-col gap-4 px-4 pb-4 lg:pt-4"
      >
        <SelectField
          name="instrument"
          label="Instrument"
          allLabel="Tous les instruments"
          options={instrumentOptions}
          defaultValue={instrument}
        />
        <SelectField
          name="genre"
          label="Genre"
          allLabel="Tous les genres"
          options={genreOptions}
          defaultValue={genre}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="filtre-ville" className="text-sm text-muted">
            Ville
          </label>
          <input
            id="filtre-ville"
            name="ville"
            type="text"
            placeholder="Ex. : Lyon"
            defaultValue={ville}
            className={`${fieldClasses} placeholder:text-muted`}
          />
        </div>

        <SelectField
          name="niveau"
          label="Niveau"
          allLabel="Tous les niveaux"
          options={levelOptions}
          defaultValue={niveau}
        />
        <SelectField
          name="objectif"
          label="Objectif"
          allLabel="Tous les objectifs"
          options={goalOptions}
          defaultValue={objectif}
        />

        <button
          type="submit"
          className="min-h-11 rounded-lg bg-accent font-semibold text-background transition-colors hover:bg-amber-400"
        >
          Filtrer
        </button>
        <Link
          href="/musiciens"
          className="flex min-h-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
        >
          Réinitialiser
        </Link>
      </form>
    </details>
  );
}
