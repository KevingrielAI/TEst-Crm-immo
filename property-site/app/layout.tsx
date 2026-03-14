import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ImmoPrestige - Créateur de Mini-Sites Immobiliers",
  description: "Créez des mini-sites de présentation percutants pour vos biens immobiliers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
