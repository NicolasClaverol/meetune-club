import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// next/font télécharge les polices au moment du build et les sert depuis notre site :
// pas de requête vers Google côté visiteur, et pas de « saut » du texte au chargement.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meetune Club",
  description:
    "Trouvez des musiciens près de chez vous selon l'instrument, le style, le niveau et vos objectifs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      {/* flex-col + flex-1 sur <main> : le footer reste en bas même si la page est courte. */}
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
