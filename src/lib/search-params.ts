// Objet des paramètres d'URL tel que Next.js le donne à une page.
export type SearchParams = { [key: string]: string | string[] | undefined };

// Un paramètre répété (?genre=Rock&genre=Jazz) arrive sous forme de tableau :
// on garde seulement la première valeur.
export function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
