
import { sugestionProps } from "@/components/sugestions/sugestion";
import PollsBox from "@/components/polls/pollsBox";
import SugestionsBox from "@/components/sugestions/sugestionsBox";
import MinimalHeader from "@/components/headers/minimalHeader";
import { supabase } from "@/lib/supabaseClient";


export default async function Home() {
  
  const sugestions: sugestionProps[] = [
    {
      title: "Melhoria no Wi-Fi da Biblioteca",
      description: "A conexão está instável e lenta, dificultando os estudos. Um upgrade ajudaria todos os alunos.",
      isLiked: false,
      likes_amounth: 12,
      flag: "educação"
    },
    {
      title: "Criação de Espaço de Estudo Colaborativo",
      description: "Faltam salas adequadas para trabalhos em grupo. Um espaço com mesas, tomadas e isolamento acústico seria muito útil.",
      isLiked: false,
      likes_amounth: 8,
      flag: "estrutura"
    },
    
  ];

  const { data: polls, error: pollsError } = await supabase.from("polls").select("*").order("created_at", { ascending: false }).limit(4);

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
          .eq("poll_id", poll.id)

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
    <div className="flex w-full h-full flex-col bg-zinc-200">
      <main className="flex gap-6 h-full w-full p-4 flex-col md:px-6 xl:flex-row">
        <MinimalHeader />
        <SugestionsBox sugestions={sugestions} />
        <PollsBox polls={pollsWithOptions} />
      </main>
    </div>
  );
}
