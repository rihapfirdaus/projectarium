import type { Metadata } from "next";
import "./globals.css";
import LoadingProvider from "@/components/provider/LoadingProvider";
import ModalProvider from "@/components/provider/ModalProvider";
import TemplateNavChecker from "@/components/template/TemplateNavChecker";
import { Homemade_Apple } from "next/font/google";

const homemadeApple = Homemade_Apple({
  weight: "400",
  style: "normal",
  preload: true,
  subsets: ["latin"],
  variable: "--font-homemade-apple",
});

export const metadata: Metadata = {
  title: "Projectarium",
  description: "Showcase your project & Find project partner",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="in" translate="no">
      <body className={`${homemadeApple.variable}`}>
        <LoadingProvider>
          <ModalProvider>
            <TemplateNavChecker>{children}</TemplateNavChecker>
          </ModalProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
