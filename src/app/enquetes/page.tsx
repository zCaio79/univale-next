import MinimalHeader from "@/components/headers/minimalHeader";
import AllPollsBox from "@/components/polls/allPollsBox";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = 'force-dynamic'

export default async function Enquetes() {

  const { data: polls, error: pollsError } = await supabase.from("polls").select("*").order("created_at", { ascending: false });
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

      <main className="flex gap-4 h-full w-full py-6 px-4 flex-col md:px-6 md:gap-6">
        
        <MinimalHeader />

        <AllPollsBox polls={pollsWithOptions} />


      </main>

    </div>
  )
}