// Remplit la base avec les données de démonstration de seed-data.ts.
// Lancement : npx prisma db seed
// Le script peut être relancé autant de fois qu'on veut : il ne crée jamais
// de doublons (upsert = « crée si absent, sinon mets à jour »).

// Charge le .env AVANT d'importer db.ts, qui lit DATABASE_URL dès son chargement.
import "dotenv/config";
import { prisma } from "../src/lib/db";
import { GENRES, GOALS, INSTRUMENTS, MUSICIANS } from "./seed-data";

// Mot de passe des comptes fictifs : "!" n'est pas un hash bcrypt (qui fait
// toujours 60 caractères et commence par "$2"). Aucun mot de passe tapé à la
// connexion ne peut donc y correspondre : ces comptes sont verrouillés.
// ("!" est la convention Unix pour un compte sans connexion possible.)
const LOCKED_PASSWORD = "!";

// Transforme ["Rock", "Jazz"] en [{ name: "Rock" }, { name: "Jazz" }] :
// le format attendu par Prisma pour relier des lignes par leur nom unique.
const byName = (names: readonly string[]) => names.map((name) => ({ name }));

async function main() {
  // 1. Listes de référence : on les crée seulement si elles n'existent pas.
  for (const name of INSTRUMENTS) {
    await prisma.instrument.upsert({ where: { name }, update: {}, create: { name } });
  }
  for (const name of GENRES) {
    await prisma.genre.upsert({ where: { name }, update: {}, create: { name } });
  }
  for (const name of GOALS) {
    await prisma.goal.upsert({ where: { name }, update: {}, create: { name } });
  }

  // 2. Musiciens : un compte (User) puis son profil (Profile).
  for (const musician of MUSICIANS) {
    const user = await prisma.user.upsert({
      where: { email: musician.email },
      update: { password: LOCKED_PASSWORD },
      create: { email: musician.email, password: LOCKED_PASSWORD },
    });

    const fields = {
      name: musician.name,
      city: musician.city,
      level: musician.level,
      bio: musician.bio,
      hue: musician.hue,
      youtubeUrl: musician.youtubeUrl ?? null,
    };

    await prisma.profile.upsert({
      where: { userId: user.id },
      // Premier passage : on crée le profil et on le relie (connect) aux listes.
      create: {
        ...fields,
        user: { connect: { id: user.id } },
        instruments: { connect: byName(musician.instruments) },
        genres: { connect: byName(musician.genres) },
        goals: { connect: byName(musician.goals) },
      },
      // Passages suivants : « set » REMPLACE les liens existants au lieu de
      // les ajouter, ce qui évite les doublons dans les tables de liaison.
      update: {
        ...fields,
        instruments: { set: byName(musician.instruments) },
        genres: { set: byName(musician.genres) },
        goals: { set: byName(musician.goals) },
      },
    });
  }

  console.log(`Seed terminé : ${MUSICIANS.length} musiciens fictifs à jour.`);
}

main()
  .catch((error) => {
    console.error("Erreur pendant le seed :", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
