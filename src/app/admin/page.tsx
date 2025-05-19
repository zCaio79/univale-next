import MinimalHeader from "@/components/headers/minimalHeader";
import NewUserForm from "@/components/modals/newuserForm";
import { ArrowDown, ArrowRight, PencilLine } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default function Admin(){
    return(

        <div className="flex w-full min-h-[88vh] flex-col bg-zinc-200 ">
        
              <main className="flex gap-4 h-full w-full py-6 px-4 flex-col md:px-6 md:gap-6">
                
                <MinimalHeader />
        
                <article className="flex w-full self-center justify-center items-center py-8 px-6 bg-zinc-50 rounded-lg md:w-[65%]">

                    <p className="w-full font-semibold text-base text-center text-zinc-700 md:w-[24vw] md:text-lg">
                        Bem vindo a pagina de administração do
                        <span className="ml-2 text-amber-500">
                            Opina
                        </span>
                        <span className="ml-2 text-blue-500">
                            Univale
                        </span>
                        !
                    </p>

                </article>

                <article className="flex flex-col w-full self-center justify-center items-center gap-6 py-8 px-6 bg-zinc-50 rounded-lg md:flex-row md:w-[65%]">

                    <p className="w-full font-semibold text-base text-center text-zinc-700 md:w-[24vw] md:text-lg">
                        É possivel controlar todas as 
                        <span className="ml-2 text-blue-500">
                            enquetes
                        </span> criadas pela instituição!
                    </p>

                    <ArrowRight className="size-6 text-zinc-700 hidden md:flex" />
                    <ArrowDown className="size-6 text-zinc-700 md:hidden" />

                    <Link href="/admin/enquetescontrol"
                        className="flex  gap-2 items-center bg-blue-500 rounded-md text-sm text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-blue-600
                        md:text-base"
                    >
                        <PencilLine className="size-5" />
                        Gerenciar
                    </Link>

                </article>

                <article className="flex flex-col w-full self-center justify-center items-center gap-6 py-8 px-6 bg-zinc-50 rounded-lg md:flex-row md:w-[65%]">

                    <p className="w-full font-semibold text-base text-center text-zinc-700 md:w-[24vw] md:text-lg">
                        É possivel controlar todas as 
                        <span className="ml-2 text-amber-500">
                            sugestões
                        </span> criadas pelos alunos!
                    </p>

                    <ArrowRight className="size-6 text-zinc-700 hidden md:flex" />
                    <ArrowDown className="size-6 text-zinc-700 md:hidden" />

                    <Link href="/admin/sugestaocontrol"
                        className="flex  gap-2 items-center bg-amber-500 rounded-md text-sm text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-amber-600
                        md:text-base"
                    >
                        <PencilLine className="size-5" />
                        Gerenciar
                    </Link>

                </article>

                <NewUserForm/>
        
              </main>
        
            </div>

    )
}