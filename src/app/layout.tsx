import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/headers/Header";
import { AuthProvider } from "@/context/AuthContext";

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
          <footer className="flex justify-center items-center w-full border-2 border-zinc-300 h-8 text-xs font bold text-zinc-400">
            © Univale 2025
          </footer>
          
        </AuthProvider>
      </body>
    </html>
  );
}
