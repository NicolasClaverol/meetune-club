// Client Prisma partagé : tout le site importe `prisma` depuis ce fichier
// pour lire et écrire dans la base (ex. : prisma.profile.findMany()).
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

function createPrismaClient() {
  // Depuis Prisma 7, la connexion passe par un adaptateur : ici le pilote
  // PostgreSQL « pg », avec l'URL poolée de Neon (adaptée au site en ligne).
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

// En développement, Next.js recharge les fichiers modifiés à chaque sauvegarde.
// Sans précaution, chaque rechargement créerait un nouveau client, donc de
// nouvelles connexions, jusqu'à saturer la base. On range le client dans
// `globalThis`, un objet qui survit aux rechargements, pour le réutiliser.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// En production, le code n'est chargé qu'une fois : pas besoin de le ranger.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
