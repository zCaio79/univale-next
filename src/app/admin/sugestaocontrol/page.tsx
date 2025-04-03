import MinimalHeader from "@/components/headers/minimalHeader";
import AllSugestionsControl from "@/components/sugestions/allSugestionsControl";
import { sugestionProps } from "@/components/sugestions/sugestion";

import { ArrowDown, ArrowRight, ScrollText } from "lucide-react";
import Link from "next/link";


export default function SugestaoControl() {

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
        },
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
        },
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

                <AllSugestionsControl sugestions={sugestions}/>

            </main>

        </div>
    )
}