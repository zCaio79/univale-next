'use client'

import { CircleCheck, CircleHelp, Unlink2, BookmarkCheck } from "lucide-react";
import { pollProps } from "./poll";
import { supabase } from "@/lib/supabaseClient";

export default function PollControl(props: pollProps) {
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
    


    if (isPollActive == "open") {

        return (

            <div
                className="flex relative flex-col justify-center w-full gap-4 h-fit rounded-md border-4 p-4 bg-zinc-200 border-zinc-400 
                md:w-[48%] xl:h-[40vh]"
            >

                <div className="flex flex-col w-full h-fit gap-2">
                    <span className="flex w-full items-center gap-2 uppercase text-sm font-bold text-zinc-800 sm:text-lg">
                        <CircleHelp className="size-5"/>
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
                    type="button"
                    className="bg-red-400 cursor-pointer text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-red-500"
                >
                    Excluir
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
                    <span className="flex w-full items-center gap-4 uppercase text-sm font-bold text-zinc-800 sm:text-lg">
                        {props.status == "closed" ? <BookmarkCheck/> : <CircleCheck />}
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
                    type="button"
                    className="bg-red-400 cursor-pointer text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 hover:bg-red-500"
                >
                    Excluir
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
