import MinimalHeader from "@/components/headers/minimalHeader";
import AllSugestionsBox from "@/components/sugestions/allSugestionsBox";
import { supabase } from "@/lib/supabaseClient";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default async function Sugestoes() {

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
            Tem uma
            <span className="mx-2 text-amber-600">
              Sugestão
            </span>
            pra compartilhar com a gente?
          </p>

          <ArrowRight className="size-6 text-zinc-700 hidden md:flex" />
          <ArrowDown className="size-6 text-zinc-700 md:hidden" />

          <Link href="sugestoes/novasugestao"
            className="flex  gap-2 items-center bg-amber-500 rounded-md text-sm text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-amber-600
                        md:text-base"
          >
            <Plus className="size-5" />
            Sugerir
          </Link>

        </article>

        <AllSugestionsBox sugestions={sugestions || []} />


      </main>

    </div>
  )
}