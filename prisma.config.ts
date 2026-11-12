// Configuration du CLI Prisma (migrate, generate, studio).
// Ce fichier n'est utilisé que par les commandes `npx prisma ...`, pas par le site.

// Le CLI Prisma 7 ne lit plus le fichier .env tout seul : dotenv le charge ici.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Connexion directe (non poolée) : les migrations modifient la structure
    // de la base et ne passent pas bien par le pooler de Neon.
    // env() arrête la commande avec un message clair si la variable manque.
    url: env("DATABASE_URL_UNPOOLED"),
  },
});
