import MinimalHeader from "@/components/headers/minimalHeader";
import AllPollsControl from "@/components/polls/allPollsControl";
import { supabase } from "@/lib/supabaseClient";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";


export default async function EnquetesControl() {

    const { data: polls, error: pollsError } = await supabase.from("polls").select("*");
      if (pollsError) {
        console.error("Erro ao buscar enquetes:", pollsError);
      }
    
      let pollsWithOptions = [];
    
      if (polls && polls.length > 0) {
      
        const pollsOptions = await Promise.all(
          polls.map(async (poll) => {
            const { data: options, error: optionsError } = await supabase
              .from("poll_options")
              .select("id, option_name, votes")
              .eq("poll_id", poll.id);
    
            if (optionsError) {
              console.error(`Erro ao buscar opções para a enquete ${poll.id}:`, optionsError);
              return null
            }
    
            return {
              ...poll,
              options: options.map((option: { id: number; option_name: string; votes: number }) => ({
                id: option.id,
                option_name: option.option_name,
                votes: option.votes,
              })),
            }
          })
        )
    
        pollsWithOptions = pollsOptions.filter((poll) => poll !== null);
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
                        , inicie uma nova enquete com seus alunos !
                    </p>

                    <ArrowRight className="size-6 text-zinc-700 hidden md:flex" />
                    <ArrowDown className="size-6 text-zinc-700 md:hidden" />

                    <Link href="/admin/novaenquete"
                        className="flex  gap-2 items-center bg-blue-500 rounded-md text-sm text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-blue-600
                        md:text-base"
                    >
                        <Plus className="size-5" />
                        Enquete
                    </Link>

                </article>

                <AllPollsControl polls={pollsWithOptions} />

            </main>

        </div>
    )
}