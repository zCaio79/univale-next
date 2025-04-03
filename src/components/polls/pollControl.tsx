'use client'

import { CircleCheck, CircleHelp, Unlink2 } from "lucide-react";
import { pollProps } from "./poll";

const variants = {
    red: "border-red-200 bg-red-50",
    blue: "border-blue-200 bg-blue-50",
    emerald: "border-emerald-200 bg-green-50",
    amber: "border-amber-200 bg-amber-50",
};

export default function PollControl(props: pollProps) {
    const isPollActive = props.status


    if (isPollActive == "open") {

        return (

            <div
                className={`flex relative flex-col justify-center w-full gap-4 h-fit rounded-md border-2 p-4 ${variants[props.variant]} 
                md:w-[48%] xl:h-[40vh]`}
            >

                <div className="flex flex-col w-full h-fit gap-2">
                    <span className="flex w-full items-center gap-2 uppercase text-sm font-bold text-zinc-800 sm:text-lg">
                        <CircleHelp />
                        {props.title}
                    </span>
                    <span className="flex w-full text-xs font-medium text-zinc-700">
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
                            <div className="flex w-full rounded-xl bg-zinc-50 py-2 px-4 border-2 border-zinc-200">
                                <span className="text-xs sm:text-sm">{op}</span>
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
                className={`flex relative flex-col justify-center w-full gap-4 h-fit rounded-md border-2 p-4 ${variants[props.variant]} 
                md:w-[48%] xl:h-[40vh]`}
            >


                <div className="flex flex-col w-full h-fit gap-2">
                    <span className="flex w-full items-center gap-2 uppercase text-sm font-bold text-zinc-800 sm:text-lg">
                        <CircleCheck />
                        {props.title}
                    </span>
                    <span className="flex w-full text-xs font-medium text-zinc-700">
                        {props.description}
                    </span>
                </div>

                <div className="flex flex-col justify-around w-full h-full gap-2 text-zinc-800">
                    {props.options.map((op, index) => (
                        <div key={index} className="flex gap-2 items-center">

                            <div className="flex w-full justify-between rounded-xl bg-zinc-50 py-2 px-4 border-2 border-zinc-200">
                                <span className="text-xs sm:text-sm">{op}</span>
                                <span className="text-xs text-zinc-700 sm:text-sm">{props.votes[index]} votos</span>
                            </div>

                        </div>
                    ))}
                </div>

                
                <button
                    type="button"
                    className="bg-red-400 cursor-pointer w-full text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 md:w-fit hover:bg-red-500"
                >
                    Excluir
                </button>


            </div>

        );
    }

}
