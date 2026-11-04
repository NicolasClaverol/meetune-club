interface BadgeProps {
  children: React.ReactNode;
  /** "primary" (violet) pour les instruments, "neutral" (gris) pour les genres. */
  variant?: "primary" | "neutral";
}

const variantClasses = {
  primary: "bg-primary/15 text-violet-200",
  neutral: "bg-white/5 text-muted",
};

export default function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
