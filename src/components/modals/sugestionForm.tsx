'use client'

import { ChevronLeft, ChevronRight, CircleAlert, LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabaseClient"
import ModalStatus from "./modalStatus"

export default function SugestionForm() {

    const { user } = useAuth()

    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [sucess, setSucess] = useState<boolean>(false)

    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [flag, setFlag] = useState<string>("educação")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")
        setIsLoading(true)

        if (!user) {
            setError("Usuário não está autenticado.");
            setIsLoading(false);
            return;
        }

        try {
            const { error: sugestionError } = await supabase
                .from('sugestions')
                .insert([{
                    title: title,
                    desc: desc,
                    flag: flag,
                    user_id: user.id
                }])

            if (sugestionError) {
                setError("Erro ao Criar Sugestão: ")
                console.log(sugestionError.message)
                setIsLoading(false)
                return
            }
        }
        catch (err) {
            setIsLoading(false)
            setError("Erro ao Criar Sugestão")
            console.log(""+err)
            return
        }
        finally{
            setIsLoading(false)
            setSucess(true)
        }
    }

    if (sucess) {
            return <ModalStatus variant="sucessSugestion" />
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col self-center gap-4 py-6 px-4 items-center w-full bg-zinc-50 rounded-lg md:w-[65%] md:gap-8">

            <span className="flex items-center gap-2 text-zinc-700 text-lg font-bold">

                <ChevronLeft />
                Nova Sugestão
                <ChevronRight />

            </span>

            <div className="flex flex-col gap-4 bg-zinc-200 p-6 rounded-md w-full h-fit md:w-[40vw]">

                <div className="flex justify-between flex-wrap flex-col gap-2 md:flex-row md:gap-6">
                    <label
                        htmlFor="title"
                        className="text-zinc-700 font-semibold">Titulo :</label>
                    <input
                        id="title"
                        type="text"
                        className="flex outline-0 text-sm rounded-md py-2 px-3 w-full md:w-[40vh] bg-zinc-50"
                        maxLength={100}
                        placeholder="qual o tema da sua sugestão?"
                        onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="flex justify-between flex-wrap flex-col gap-2 md:flex-row md:gap-6">
                    <label
                        htmlFor="desc"
                        className="text-zinc-700 font-semibold">Descrição :</label>
                    <textarea
                        id="desc"
                        required
                        className="flex outline-0 text-sm rounded-md text-wrap py-2 px-3 w-full md:w-[40vh] h-[20vh] bg-zinc-50"
                        maxLength={200}
                        placeholder="descreva a sua ideia com clareza..."
                        onChange={(e) => { setDesc(e.target.value) }} />
                </div>

            </div>

            <div className="flex flex-col gap-4 bg-zinc-200 p-6 rounded-md w-full h-fit md:w-[40vw]">

                <span className="flex self-center text-zinc-700 text-base font-bold">Categoria</span>

                <div className="flex justify-between flex-wrap gap-2 md:gap-4">
                    <button
                        type="button"
                        className={`flex gap-2 items-center text-sm
                        ${flag === 'educação' ? "bg-red-400 text-zinc-50 border-2 border-red-400" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                        rounded-md grow justify-center text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                        onClick={() => setFlag("educação")}
                    >
                        educação
                    </button>
                    <button
                        type="button"
                        className={`flex gap-2 items-center text-sm
                        ${flag === 'estrutura' ? "bg-blue-400 text-zinc-50 border-2 border-blue-400" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                        rounded-md grow justify-center text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                        onClick={() => setFlag("estrutura")}
                    >
                        estrutura
                    </button>
                    <button
                        type="button"
                        className={`flex gap-2 items-center text-sm
                        ${flag === 'inovação' ? "bg-emerald-400 text-zinc-50 border-2 border-emerald-400" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                        rounded-md grow justify-center text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                        onClick={() => setFlag("inovação")}
                    >
                        inovação
                    </button>
                </div>

            </div>

            {error != "" ?

                <div className="flex w-full gap-4 p-2 items-center border-2 border-red-200 justify-center md:w-[40vw]">
                    <CircleAlert className="text-red-400 size-5" />
                    <span className="flex items-center text-center text-red-400 text-xs font-semibold">
                        {error}
                    </span>
                </div>
                :
                <div className="flex w-full gap-4 p-2 items-center border-2 border-zinc-200 justify-center md:w-[40vw]">

                    <CircleAlert className="text-zinc-600 size-5" />

                    <span className="flex items-center text-center text-zinc-600 text-xs font-semibold">

                        Ao enviar uma sugestão apenas
                        <br />
                        a instituição poderá removê-la!

                    </span>

                </div>
            }

            {isLoading ?
                <div className="absolute top-0 flex w-full h-full rounded-lg justify-center items-center bg-zinc-50">
                    <LoaderCircle className="text-zinc-800 size-8 animate-spin" />
                </div>
                :
                <div className="flex w-full justify-center gap-4">
                    <Link
                        href="/sugestoes"
                        className="bg-zinc-500 text-zinc-50 font-bold rounded-md py-1.5 px-4 hover:bg-zinc-600"
                    >
                        Cancelar
                    </Link>
                    <button type="submit"
                        className="bg-amber-500 text-zinc-50 font-bold rounded-md py-1.5 px-4 hover:bg-amber-600"
                    >
                        Enviar
                    </button>
                </div>
            }


        </form>
    )

}