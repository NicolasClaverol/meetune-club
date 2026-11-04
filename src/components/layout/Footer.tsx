export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-bold text-foreground">Meetune Club</span>{" "}
          · Trouvez les musiciens avec qui jouer.
        </p>
        <p>Projet de formation · Believemy</p>
      </div>
    </footer>
  );
}
