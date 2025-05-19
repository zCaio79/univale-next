import MinimalHeader from "@/components/headers/minimalHeader";
import AllSugestionsControl from "@/components/sugestions/allSugestionsControl";
import { supabase } from "@/lib/supabaseClient";
import { ArrowDown, ArrowRight, ScrollText } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default async function SugestaoControl() {

  const { data: sugestions, error: sugestionsError } = await supabase.from("sugestions").select("*").order("created_at", { ascending: false });

  if (sugestionsError) {
    console.error("Erro ao buscar sugestões:", sugestionsError);
  }

  return (
    <div className="flex w-full min-h-[88vh] flex-col bg-zinc-200 ">

      <main className="flex gap-6 h-full w-full py-6 px-4 flex-col md:px-6">

        <MinimalHeader />

        <article className="flex flex-col w-full self-center justify-center items-center gap-6 py-8 px-6 bg-zinc-50 rounded-lg md:flex-row md:w-[65%]">

          <p className="w-full font-semibold text-base text-center text-zinc-700 md:w-[24vw] md:text-lg">
            Bem vinda
            <span className="ml-2 text-blue-500">
              Univale
            </span>
            , apoie as sugestões dos alunos !
          </p>

          <ArrowRight className="size-6 text-zinc-700 hidden md:flex" />
          <ArrowDown className="size-6 text-zinc-700 md:hidden" />

          <Link href="/sugestoes"
            className="flex  gap-2 items-center bg-blue-500 rounded-md text-sm text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-blue-600
                        md:text-base"
          >
            <ScrollText className="size-5" />
            Sugestões
          </Link>

        </article>

        <AllSugestionsControl sugestions={sugestions || []} />

      </main>

    </div>
  )
}