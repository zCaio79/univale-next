'use client'

import { CircleCheck, CircleHelp, Unlink2, BookmarkCheck, TriangleAlert, LoaderCircle, Trash2 } from "lucide-react";
import { pollProps } from "./poll";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function PollControl(props: pollProps) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isPollActive = props.status

    const handleClosePoll = async () => {
        const { error } = await supabase
            .from("polls")
            .update({ status: "closed" })
            .eq("id", props.id);

        if (error) {
            console.error("Erro ao finalizar a enquete:", error);
        } else {
            window.location.reload();
        }
    };

    const handleReopenPoll = async () => {
        const { error } = await supabase
            .from("polls")
            .update({ status: "open" })
            .eq("id", props.id);

        if (error) {
            console.error("Erro ao reabrir a enquete:", error);
        } else {
            window.location.reload();
        }
    };

    const handleDeletePoll = async () => {
        setIsLoading(true)
        const { error } = await supabase
            .from("polls")
            .delete()
            .eq("id", props.id);

        if (error) {
            console.error("Erro ao excluir a enquete:", error);
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
                <p className="flex border-2 py-2 px-3 border-zinc-400 rounded flex-wrap gap-3 justify-center items-center text-center text-sm"><TriangleAlert className="size-5 text-red-500" /> Deseja realmente excluir a enquete?
                    <span className="text-zinc-50 bg-zinc-400 rounded py-1.5 px-3 text-sm">{props.title}</span></p>
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
                                onClick={handleDeletePoll}
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


    if (isPollActive == "open") {

        return (


            <div
                className="flex relative flex-col justify-center w-full gap-4 h-fit rounded-md border-4 p-4 bg-zinc-200 border-zinc-400 
                md:w-[48%] xl:h-[40vh]"
            >

                <div className="flex flex-col w-full h-fit gap-2">
                    <span className="flex w-full items-center gap-2 text-sm font-bold text-zinc-800 sm:text-lg">
                        <CircleHelp className="size-5" />
                        {props.title}
                    </span>
                    <span className="flex w-full text-xs text-wrap font-medium text-zinc-700">
                        {props.description}
                    </span>
                </div>

                <div className="flex flex-col justify-around w-full h-full gap-2 text-zinc-800">
                    {props.options.map((op, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <button
                                type="button"
                                className="flex justify-center items-center size-8 rounded-full border-2 transition 
                                bg-zinc-50 border-zinc-200"
                            >
                                <Unlink2 className="size-5 transition text-zinc-300" />
                            </button>
                            <div className="flex w-full justify-between rounded-xl bg-zinc-50 py-2 px-4 border-2 border-zinc-200">
                                <span className="text-xs sm:text-sm">{op.option_name}</span>
                                <span className="text-xs text-zinc-700 sm:text-sm">{op.votes} votos</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between w-full gap-4">
                    <button
                        onClick={handleDeleteConfirm}
                        type="button"
                        className="bg-red-400 cursor-pointer text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-red-500"
                    >
                        <Trash2 className="size-5"/>
                    </button>

                    <button
                        type="button"
                        onClick={handleClosePoll}
                        className="bg-zinc-500 cursor-pointer flex-grow text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-zinc-600"
                    >
                        Finalizar
                    </button>
                </div>

            </div>

        );
    }
    if (isPollActive == "closed") {

        return (

            <div
                className="flex relative flex-col justify-center w-full gap-4 h-fit rounded-md border-4 p-4 bg-zinc-200 border-zinc-400 
                md:w-[48%] xl:h-[40vh]"
            >


                <div className="flex flex-col w-full h-fit gap-4">
                    <span className="flex w-full items-center gap-4 text-sm font-bold text-zinc-800 sm:text-lg">
                        {props.status == "closed" ? <BookmarkCheck /> : <CircleCheck />}
                        {props.title}
                    </span>
                    <span className="flex w-full text-xs text-wrap font-medium text-zinc-700">
                        {props.description}
                    </span>
                </div>

                <div className="flex flex-col justify-around w-full h-full gap-2 text-zinc-800">
                    {props.options.map((op, index) => (
                        <div key={index} className="flex gap-2 items-center">

                            <div className="flex w-full justify-between rounded-xl bg-zinc-50 py-2 px-4 border-2 border-zinc-200">
                                <span className="text-xs sm:text-sm">{op.option_name}</span>
                                <span className="text-xs text-zinc-700 sm:text-sm">{op.votes} votos</span>
                            </div>

                        </div>
                    ))}
                </div>


                <div className="flex justify-between w-full gap-4">
                    <button
                        onClick={handleDeletePoll}
                        type="button"
                        className="bg-red-400 cursor-pointer flex- justify-center text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-red-500"
                    >
                        <Trash2 className="size-5"/>
                    </button>

                    <button
                        type="button"
                        onClick={handleReopenPoll}
                        className="bg-blue-500 cursor-pointer flex-grow text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-blue-600"
                    >
                        Reabrir Votação
                    </button>
                </div>




            </div>

        );
    }

}
