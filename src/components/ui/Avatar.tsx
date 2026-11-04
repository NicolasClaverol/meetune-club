import { getInitials } from "@/lib/mock-data";

interface AvatarProps {
  name: string;
  /** Teinte de 0 à 360 (roue des couleurs) qui donne la couleur du fond. */
  hue: number;
  /** "md" pour les cartes, "lg" pour la page profil. */
  size?: "md" | "lg";
}

const sizeClasses = {
  md: "size-14 text-lg",
  lg: "size-24 text-3xl",
};

export default function Avatar({ name, hue, size = "md" }: AvatarProps) {
  return (
    <div
      // Tailwind crée ses classes au moment du build : il ne peut pas deviner une
      // couleur calculée à partir d'une donnée. On passe donc par l'attribut style.
      // Saturation et luminosité fixes (fond clair, texte foncé) : le contraste
      // reste bon quelle que soit la teinte, même pour les jaunes.
      style={{ backgroundColor: `hsl(${hue} 70% 72%)` }}
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-bold text-background ${sizeClasses[size]}`}
      // Le nom est déjà écrit à côté : inutile que le lecteur d'écran lise aussi les initiales.
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
