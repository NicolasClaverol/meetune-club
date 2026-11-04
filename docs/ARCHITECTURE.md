# Architecture et choix techniques

Document technique du projet (nom provisoire : Meetune Club). Il décrit les pages, le modèle de données, l'organisation du code, les choix techniques et la direction visuelle.

## 1. Pages

| Route | Rôle | Accès |
|---|---|---|
| `/` | Page d'accueil : accroche, recherche rapide, profils à la une | Public |
| `/musiciens` | Exploration : cartes de musiciens + filtres (instrument, genre, ville, niveau, objectif) | Public |
| `/musiciens/[id]` | Profil détaillé + bouton « Contacter » | Public (contact : connecté) |
| `/inscription` | Création de compte | Public |
| `/connexion` | Connexion | Public |
| `/onboarding` | Création du profil en étapes (instruments → genres → ville et niveau → bio) | Connecté |
| `/profil` | Édition de son propre profil | Connecté |
| `/messages` | Demandes de contact reçues et envoyées | Connecté |

## 2. Fonctionnalités du MVP

1. Inscription et connexion
2. Création et édition du profil musicien
3. Exploration sous forme de cartes
4. Recherche par filtres (priorité : c'est ce que le formateur veut voir travaillé)
5. Prise de contact entre musiciens
6. Interface responsive

## 3. Modèle de données (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // hash bcrypt
  createdAt DateTime @default(now())
  profile   Profile?
  sent      ContactRequest[] @relation("sent")
  received  ContactRequest[] @relation("received")
}

model Profile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  name        String
  city        String
  level       Level
  bio         String
  youtubeUrl  String?
  hue         Int      @default(200)
  instruments Instrument[]
  genres      Genre[]
  goals       Goal[]
}

model Instrument { id Int @id @default(autoincrement())  name String @unique  profiles Profile[] }
model Genre      { id Int @id @default(autoincrement())  name String @unique  profiles Profile[] }
model Goal       { id Int @id @default(autoincrement())  name String @unique  profiles Profile[] }

model ContactRequest {
  id         String   @id @default(cuid())
  fromId     String
  toId       String
  from       User     @relation("sent", fields: [fromId], references: [id])
  to         User     @relation("received", fields: [toId], references: [id])
  message    String
  status     RequestStatus @default(PENDING)
  createdAt  DateTime @default(now())

  @@unique([fromId, toId]) // pas de doublon de demande
}

enum Level { DEBUTANT INTERMEDIAIRE CONFIRME PRO }
enum RequestStatus { PENDING ACCEPTED DECLINED }
```

Relations plusieurs-à-plusieurs (instruments, genres, objectifs) : un musicien peut jouer de plusieurs instruments et un instrument a plusieurs musiciens.

## 4. Organisation du code

```
src/
├── app/
│   ├── page.tsx                  # accueil
│   ├── musiciens/
│   │   ├── page.tsx              # liste + filtres
│   │   └── [id]/page.tsx         # profil détaillé
│   ├── inscription/ connexion/ onboarding/ profil/ messages/
│   └── api/                      # routes API (auth, contact)
├── components/
│   ├── layout/                   # Header, Footer
│   ├── musicians/                # MusicianCard, FilterSidebar, TagList
│   └── ui/                       # Button, Input, Badge, Avatar
└── lib/
    ├── mock-data.ts              # données fictives (phase 1)
    ├── db.ts                     # client Prisma (phase 2)
    └── auth.ts                   # configuration NextAuth
prisma/
└── schema.prisma
docs/
└── ARCHITECTURE.md
```

## 5. Choix techniques et justifications

| Choix | Pourquoi |
|---|---|
| **Next.js (App Router)** | Imposé. Rendu côté serveur : bon pour le référencement des profils et chargement rapide. |
| **TypeScript** | Les types `Musician`, `Level`, etc. évitent des erreurs de données et documentent le code. |
| **Tailwind CSS** | Imposé. Composants cohérents, responsive rapide avec les préfixes `sm:` `md:` `lg:`. |
| **Filtres dans l'URL** (`/musiciens?genre=Rock&ville=Lyon`) | Recherche partageable, bouton retour fonctionnel, rendu serveur simple. |
| **Données fictives d'abord** | Permet de construire et valider l'interface avant la base de données, puis de remplacer `mock-data.ts` par des requêtes Prisma. |
| **Prisma + PostgreSQL** | Schéma lisible, types générés, relations claires. Hébergement gratuit possible (Supabase ou Neon). |
| **NextAuth** | Solution d'authentification éprouvée, évite de gérer soi-même les sessions. |
| **Contrainte d'unicité sur ContactRequest** | Empêche les doublons au niveau de la base, pas seulement dans l'interface. |
| **Avatars à initiales colorées** | Pas d'hébergement d'images au départ ; l'upload de photo devient une amélioration future. |

## 6. Direction visuelle

- **Thème** : sombre, inspiré des plateformes musicales
- **Fond** : `#0B0B12` (presque noir, légère teinte violette) ; cartes `#15151F`
- **Accent principal** : violet électrique `#8B5CF6` ; accent secondaire : ambre `#F59E0B` (appels à l'action)
- **Texte** : `#F4F4F8` ; texte secondaire `#9A9AB0`
- **Typographie** : titres en police géométrique (ex. Space Grotesk), texte en Inter
- **Carte musicien** : avatar rond coloré, nom, ville, badges d'instruments, badges de genres, niveau, bouton « Voir le profil »
- **Accessibilité** : contraste suffisant, focus visibles, boutons de taille tactile sur mobile

## 7. Ordre de développement

1. Initialiser le projet, le dépôt Git et le README
2. Composants d'interface avec `mock-data.ts` (accueil, cartes, filtres)
3. Page profil détaillé et responsive
4. Base de données, authentification, onboarding
5. Contact entre musiciens
6. Finitions : gestion d'erreurs, états vides, responsive, README final, section « Mon activité »
7. Vidéo de démonstration

## 8. Améliorations futures

- Carte interactive des musiciens autour de soi
- Extrait audio sur le profil
- Messagerie intégrée en temps réel
- Notifications par e-mail
- Photos de profil (Cloudinary)
- Profils de groupes qui recrutent
- Offre Premium et offre pro (écoles de musique, salles)
