
import { sugestionProps } from "@/components/sugestions/sugestion";
import PollsBox from "@/components/polls/pollsBox";

import { pollProps } from "@/components/polls/poll";
import SugestionsBox from "@/components/sugestions/sugestionsBox";
import MinimalHeader from "@/components/headers/minimalHeader";




export default function Home() {

  const sugestions: sugestionProps[] = [
    {
      title: "Melhoria no Wi-Fi da Biblioteca",
      description: "A conexão está instável e lenta, dificultando os estudos. Um upgrade ajudaria todos os alunos.",
      isLiked: false,
      likes_amounth: 12,
      flag: "estrutura"
    },
    {
      title: "Mais tomadas nas salas de aula",
      description: "Muitos alunos precisam carregar notebooks e celulares, mas há poucas tomadas disponíveis.",
      isLiked: false,
      likes_amounth: 8,
      flag: "inovação"
    },
    {
      title: "Criação de um espaço de convivência",
      description: "Um ambiente para descanso e socialização ajudaria no bem-estar dos alunos durante os intervalos.",
      isLiked: false,
      likes_amounth: 15,
      flag: "estrutura"
    },
    {
      title: "Horário estendido no laboratório de informática",
      description: "Muitos alunos precisam do laboratório após o horário das aulas para projetos e estudos.",
      isLiked: false,
      likes_amounth: 10,
      flag: "educação"
    }
  ];


  const polls: pollProps[] = [
    {
      title: "Qual deve ser a prioridade da faculdade?",
      description: "Escolha a área que você acha que precisa de mais melhorias.",
      options: ["Infraestrutura", "Tecnologia", "Biblioteca"],
      variant: "blue",
      status: 'open',
      votes: [10, 20, 32]
    },
    {
      title: "Qual novo curso deveria ser oferecido?",
      description: "A faculdade está considerando expandir sua grade. Qual curso você gostaria de ver?",
      options: ["Engenharia de Software", "Marketing Digital", "Gestão de Projetos"],
      variant: "amber",
      status: 'open',
      votes: [78, 24, 55]
    },
    {
      title: "Qual evento você gostaria de participar?",
      description: "Ajude a decidir o próximo evento organizado pela faculdade.",
      options: ["Hackathon", "Palestra sobre IA", "Workshop de UX/UI"],
      variant: "emerald",
      status: 'open',
      votes: [35, 77, 45]
    },
    {
      title: "Qual novo benefício deveria ser implementado?",
      description: "Sugira qual benefício ajudaria mais os alunos no dia a dia.",
      options: ["Vale-transporte", "Desconto em livros", "Apoio psicológico"],
      variant: "red",
      status: 'open',
      votes: [9, 12, 78]
    }
  ];

  return (
    <div className="flex w-full h-full flex-col bg-zinc-200">

      <main className="flex gap-6 h-full w-full p-4 flex-col 
      md:px-6 xl:flex-row">

        <MinimalHeader />

        <SugestionsBox sugestions={sugestions} />
        <PollsBox polls={polls} />

      </main>

    </div>
  );
}
