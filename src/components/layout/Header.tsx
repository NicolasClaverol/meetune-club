import Link from "next/link";

// Liens de navigation. Les pages correspondantes seront créées aux étapes suivantes.
const navLinks = [
  { href: "/musiciens", label: "Explorer" },
  { href: "/connexion", label: "Connexion" },
];

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-surface">
      {/* Sur mobile, flex-wrap fait passer la navigation sous le logo ; dès sm, tout tient sur une ligne. */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4">
        <Link href="/" className="font-display text-xl font-bold">
          Meetune <span className="text-primary">Club</span>
        </Link>

        <nav aria-label="Navigation principale" className="w-full sm:w-auto">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                {/* min-h-11 = 44 px : taille minimale conseillée pour toucher un lien au doigt. */}
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center rounded-lg px-3 text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-auto sm:ml-2">
              <Link
                href="/inscription"
                className="flex min-h-11 items-center rounded-lg bg-accent px-4 font-semibold text-background transition-colors hover:bg-amber-400"
              >
                S&apos;inscrire
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
