'use client'

import { Heart, Lightbulb } from "lucide-react";
import { sugestionProps } from "./sugestion";

export default function SugestionControl(props: sugestionProps) {


    return (
        <div className="flex flex-col justify-around w-full gap-4 min-h-[20vh] h-fit rounded-md border-2 border-zinc-200 py-4 px-4 md:min-h-[30vh] xl:w-[25vw]">

            <div className="flex items-center gap-2" >
                <p className="text-zinc-900 text-sm text-pretty w-[95%] font-semibold md:text-base">{props.title}</p>
                <Lightbulb className="size-5 text-amber-600 " />
            </div>

            <div className="flex flex-col gap-3 w-full text-zinc-800">
                <p className="flex w-[85%] text-xs text-justify text-pretty sm:text-sm">{props.description}</p>
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
                type="button"
                className="bg-red-400 self-center cursor-pointer w-full text-zinc-50 text-sm font-bold rounded-md py-1.5 px-4 md:w-fit hover:bg-red-500"
            >
                Excluir
            </button>


        </div>
    )
}