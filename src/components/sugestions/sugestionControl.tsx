'use client'

import { Heart, Lightbulb, LoaderCircle, TriangleAlert } from "lucide-react";
import { sugestionProps } from "./sugestion";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function SugestionControl(props: sugestionProps) {

    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDeleteSugestion = async () => {
        setIsLoading(true)
        const { error } = await supabase
            .from("sugestions")
            .delete()
            .eq("id", props.id);

        if (error) {
            console.error("Erro ao excluir a sugestão:", error);
            setIsLoading(false)
        } else {
            window.location.reload();
        }
    };

    const handleDeleteConfirm = () => {
        if (!deleteModal) {
            setDeleteModal(true)
        } else {
            setDeleteModal(false)
        }
    }

    if (deleteModal) {
        return (
            <div className="absolute z-50 top-0 flex flex-col w-full min-h-[50vh] h-full p-4 rounded-lg justify-center items-center gap-6 bg-zinc-100" >
                <p className="flex border-2 py-2 px-3 border-zinc-400 rounded flex-wrap gap-3 justify-center items-center text-center text-sm">
                    <TriangleAlert className="size-5 text-red-500" /> Deseja realmente excluir a sugestão?
                    <span className="text-zinc-50 bg-zinc-400 rounded py-1.5 px-3 text-sm">{props.title}</span>
                </p>
                <div className="flex gap-4">

                    {isLoading ? <LoaderCircle className="text-zinc-800 size-6 animate-spin" />
                        :
                        <>
                            <button
                                onClick={handleDeleteConfirm}
                                type="button"
                                className="bg-red-400 cursor-pointer text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-red-500"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteSugestion}
                                className="bg-blue-500 cursor-pointer text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-blue-600"
                            >
                                Excluir
                            </button>
                        </>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-around w-full gap-4 min-h-[20vh] h-fit rounded-md border-2 border-zinc-200 py-4 px-6 md:min-h-[30vh] xl:w-[25vw]">

            <div className="flex items-center gap-2" >
                <p className="text-zinc-900 text-sm text-pretty w-[95%] font-semibold md:text-base">{props.title}</p>
                <Lightbulb className="size-5 text-amber-600 " />
            </div>

            <div className="flex flex-col gap-3 w-full text-zinc-800">
                <p className="flex w-[85%] text-xs text-justify text-pretty sm:text-sm">{props.desc}</p>
                <p>
                    <span className="flex font-semibold text-zinc-50 text-xs w-fit rounded-md bg-zinc-500 py-1 px-1.5">
                        {props.flag}
                    </span>
                </p>
                <button className="flex self-end gap-1.5 mr-2">

                    <span className="text-sm font-semibold">{props.likes_amounth}</span>
                    <Heart className=" size-5" />

                </button>
            </div>

            <div className="border-b-2 border-zinc-200 w-full" />
            <button
                onClick={handleDeleteConfirm}
                type="button"
                className="bg-red-400 self-center cursor-pointer w-full text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 md:w-fit hover:bg-red-500"
            >
                Excluir
            </button>


        </div>
    )
}