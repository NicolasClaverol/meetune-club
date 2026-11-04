# CLAUDE.md — Plateforme de mise en relation de musiciens

## Contexte

Projet-passerelle 4 (dernier projet de ma formation de développeur web chez Believemy). Il est évalué sur 13 critères, tous à valider : code disponible, technologies demandées (Next.js + Tailwind), idée claire et utile, fonctionnalités annoncées présentes et démontrées, interface propre, responsive, aucune erreur visible, choix techniques expliqués, améliorations futures annoncées, Git utilisé, documentation technique, vidéo de démonstration, section « Mon activité ».

Je suis en formation : le but est que j'apprenne et que je sache expliquer chaque partie du code dans ma vidéo de démonstration.

## Le projet

Nom : Meetune Club (retenu pour l'instant, à revérifier avant un lancement réel : un autre site, meetune.com, existe déjà ; le suffixe « Club » permet de s'en distinguer). Plateforme où les musiciens et jeunes musiciens créent un profil (instruments, genres, ville, niveau, objectifs, bio) et trouvent d'autres musiciens grâce à une recherche par filtres et une prise de contact simple.

Concurrent identifié : bandmatch.ch (annonces textuelles, pas de vrais profils, interface datée). Notre différence : profils riches, interface moderne en thème sombre, filtres avancés, parcours d'inscription guidé.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Phase 1 : données fictives dans `src/lib/mock-data.ts`
- Phase 2 : Prisma + PostgreSQL (Supabase ou Neon) et NextAuth

## Documents de référence

- `docs/ARCHITECTURE.md` : pages, modèle de données, structure des dossiers, choix techniques, direction visuelle, ordre de développement. À suivre et à mettre à jour si une décision change.
- `README.md` : doc publique ; contient la section « Mon activité » (simulation de ma future activité de développeur web, à compléter plus tard).

## Règles de travail

1. **Expliquer avant ou après chaque étape** : pourquoi ce choix, comment ça marche, en français et simplement. Je dois pouvoir le réexpliquer moi-même.
2. **Avancer par petites étapes** : une fonctionnalité à la fois, que je peux relire et tester avant de passer à la suivante.
3. **Un commit par fonctionnalité**, en français, message clair (ex. : « Ajout des cartes de musiciens et de la liste »). Pas de gros commit fourre-tout.
4. **Rester sur le MVP** : inscription, profil, exploration, filtres, contact, responsive. Tout le reste (carte, audio, messagerie temps réel, paiement) va dans « Améliorations futures » du README, sans le coder.
5. **Pas de code mort ni de dépendances inutiles.** Si on ajoute un paquet, dire pourquoi.
6. **Code simple et lisible**, commentaires utiles en français aux endroits non évidents (notamment les filtres et la logique de contact).
7. **Zéro erreur visible** : gérer les états vides (aucun résultat), les erreurs de formulaire et le chargement. Aucune erreur dans la console du navigateur.
8. **Responsive d'abord sur mobile** : tester les largeurs mobile, tablette et ordinateur à chaque nouvelle page.
9. Ne pas inventer de fonctionnalités ou de contenus dans le README : n'y annoncer que ce qui est réellement fait et démontrable.

## Direction visuelle

- Thème sombre : fond `#0B0B12`, cartes `#15151F`
- Accent principal : violet `#8B5CF6` ; accent secondaire : ambre `#F59E0B` (appels à l'action)
- Texte `#F4F4F8`, texte secondaire `#9A9AB0`
- Titres : Space Grotesk ; texte : Inter
- Cartes de musiciens : avatar rond coloré avec initiales, nom, ville, badges d'instruments et de genres, niveau, bouton « Voir le profil »
- Contrastes suffisants, focus visibles, boutons faciles à toucher sur mobile

## Commandes

- `npm run dev` : lancer le site sur http://localhost:3000
- `npm run build` : vérifier que tout compile avant un commit important
- `npm run lint` : vérifier le code

## Ordre de développement

1. Initialisation du projet, dépôt Git, README
2. Interface avec données fictives : accueil, liste de cartes, filtres
3. Page de profil détaillé, responsive
4. Base de données, authentification, onboarding
5. Contact entre musiciens
6. Finitions, README final, section « Mon activité »
7. Vidéo de démonstration
