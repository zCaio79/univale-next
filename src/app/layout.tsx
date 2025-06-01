import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/headers/Header";
import { AuthProvider } from "@/context/AuthContext";
import { CodeXml } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Opina Univale",
  description: "by zCaio79",
  icons: {
    icon: '/opinalogo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen h-fit max-w-screen font-poppins"
      >
        <AuthProvider>

          <Header />
          {children}
          <footer className="flex gap-6 justify-center items-center w-full border-2 border-zinc-300 h-8 text-xs font bold text-zinc-400">
            <span>© Univale 2025</span>
            <Link href="https://github.com/zCaio79" target="_blank" className="flex items-center gap-1.5"><CodeXml className="size-4"/>zCaio79</Link>
          </footer>
          
        </AuthProvider>
      </body>
    </html>
  );
}
