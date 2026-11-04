// Accueil provisoire : sert à vérifier le thème. Le vrai contenu (recherche rapide,
// profils à la une) arrivera avec les cartes de musiciens.
export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <h1 className="max-w-2xl text-4xl font-bold sm:text-5xl">
        Trouvez les musiciens <span className="text-primary">avec qui jouer</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Guitariste, batteuse, chanteur ou pianiste : créez votre profil et rencontrez
        des musiciens près de chez vous.
      </p>
    </section>
  );
}
