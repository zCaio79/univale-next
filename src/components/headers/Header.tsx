'use client'

import { Megaphone, Wifi } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "../buttons/logoutButton";

export default function Header() {

  const { user } = useAuth()

  const pathName = usePathname()

  return (
    <header className="flex w-full py-4 px-8 h-fit border-b border-zinc-100
       bg-zinc-50">
      <div className="flex w-full items-center justify-between">

        <span className="flex gap-1 text-base items-center md:text-xl">
          <Link href="/" className="text-amber-600 font-bold hover:text-amber-700">
            Opina
          </Link>
          <Link
            href={"https://univale.com.br/"}
            target="_blank"
            className="text-blue-500 font-bold cursor-pointer hover:animate-bounce ease-in-out">
            Univale
          </Link>
          <p className="flex items-center">
            <Megaphone className="size-6 ml-1" />
            <Wifi className="size-6 rotate-90" />
          </p>
        </span>

        <nav className="flex gap-4 items-center">

          <div className="hidden gap-4 items-center md:flex">
            <Link href="/sugestoes" className="text-sm text-zinc-800 hover:text-zinc-900">Sugestões</Link>
            <span>|</span>
            <Link href="/enquetes" className="text-sm text-zinc-800 hover:text-zinc-900">Enquetes</Link>
          </div>

          {!user && pathName !== "/login" && ( 
          <Link href="/login"
            className="font-semibold text-xs py-1.5 px-4 rounded-md text-zinc-50 shadow-md cursor-pointer bg-amber-500 hover:bg-amber-600 md:text-sm">
            Login
          </Link>
          )}

          {user && <LogoutButton/>}
          
        </nav>

      </div>
    </header>
  )
}