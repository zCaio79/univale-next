import MinimalHeader from "@/components/headers/minimalHeader";
import AllPollsControl from "@/components/polls/allPollsControl";
import { pollProps } from "@/components/polls/poll";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";


export default function EnquetesControl() {

    const polls: pollProps[] = [
        {
            title: "Qual deve ser a prioridade da faculdade?",
            description: "Escolha a área que você acha que precisa de mais melhorias.",
            options: ["Infraestrutura", "Tecnologia", "Biblioteca"],
            variant: "blue",
            status: 'closed',
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
            status: 'closed',
            votes: [35, 77, 45]
        },
        {
            title: "Qual novo benefício deveria ser implementado?",
            description: "Sugira qual benefício ajudaria mais os alunos no dia a dia.",
            options: ["Vale-transporte", "Desconto em livros", "Apoio psicológico"],
            variant: "red",
            status: 'open',
            votes: [9, 12, 78]
        },
        {
            title: "Qual novo espaço deveria ser criado na faculdade?",
            description: "Escolha um novo espaço que tornaria o campus mais acolhedor.",
            options: ["Área de descanso", "Coworking", "Sala de jogos"],
            variant: "amber",
            status: 'open',
            votes: [33, 47, 28]
        },
        {
            title: "Qual serviço estudantil precisa de melhorias?",
            description: "Dê sua opinião sobre qual serviço precisa de mais atenção.",
            options: ["Atendimento psicológico", "Suporte acadêmico", "Atividades extracurriculares"],
            variant: "red",
            status: 'closed',
            votes: [40, 29, 51]
        },
        {
            title: "Qual tecnologia deveria ser implementada nas salas de aula?",
            description: "Ajude a decidir qual tecnologia pode melhorar a experiência de aprendizado.",
            options: ["Lousa digital", "Computadores melhores", "Software educacional"],
            variant: "emerald",
            status: 'open',
            votes: [25, 33, 42]
        },
        {
            title: "O que deveria ser prioridade no próximo semestre?",
            description: "Vote na iniciativa que a faculdade deveria priorizar.",
            options: ["Mais eventos acadêmicos", "Aprimoramento do Wi-Fi", "Reformas estruturais"],
            variant: "blue",
            status: 'closed',
            votes: [39, 54, 27]
        },
        {
            title: "Qual tipo de parceria a faculdade deveria buscar?",
            description: "Ajude a escolher qual tipo de parceria traria mais benefícios aos alunos.",
            options: ["Empresas para estágios", "Intercâmbios internacionais", "Cursos profissionalizantes"],
            variant: "amber",
            status: 'open',
            votes: [60, 45, 33]
        },
        {
            title: "O que poderia melhorar a experiência dos alunos?",
            description: "Escolha um fator que tornaria a vida universitária mais agradável.",
            options: ["Aulas híbridas", "Flexibilidade nos horários", "Mais espaços de estudo"],
            variant: "red",
            status: 'closed',
            votes: [38, 49, 40]
        }
    ]


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

                    <Link href="/enquetescontrol/novaenquete"
                        className="flex  gap-2 items-center bg-blue-500 rounded-md text-sm text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-blue-600
                        md:text-base"
                    >
                        <Plus className="size-5" />
                        Enquete
                    </Link>

                </article>

                <AllPollsControl polls={polls} />

            </main>

        </div>
    )
}