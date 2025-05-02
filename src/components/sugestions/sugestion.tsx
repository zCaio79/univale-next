'use client'

import { Heart, Lightbulb } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";


export type sugestionProps = {
    title: string,
    description: string,
    isLiked: boolean,
    likes_amounth: number,
    flag: 'educação' | 'estrutura' | 'inovação',
}

export default function Sugestion(props: sugestionProps) {

    const { user } = useAuth()

    const [likes, setLikes] = useState(props.likes_amounth)
    let flag = ""

    const [Like, setLike] = useState(props.isLiked)
    function handleLike() {
        setLike(!Like)
        if (Like) {
            setLikes(likes - 1)
            return
        }
        setLikes(likes + 1)
    }

    if (props.flag == "educação") {
        flag = 'bg-red-400'
    } else if (props.flag == "estrutura") {
        flag = 'bg-blue-400'
    } else {
        flag = 'bg-emerald-400'
    }

    return (
        <div className="flex flex-col justify-around w-full gap-4 min-h-[20vh] h-fit rounded-md border-2 border-zinc-200 py-4 px-4 md:min-h-[32vh] xl:w-[25vw]">

            <div className="flex items-center gap-2" >
                <p className="text-zinc-800 text-sm text-pretty w-[95%] font-semibold md:text-base">{props.title}</p>
                <Lightbulb className="size-5 text-amber-600" />
            </div>

            <div className="flex flex-col gap-3 w-full text-zinc-800">
                <p className="flex w-[85%] text-xs text-justify text-pretty sm:text-sm">{props.description}</p>
                <p>
                    <span className={`flex font-semibold text-zinc-50 text-xs w-fit rounded-md py-1 px-1.5
                        ${flag}`}>
                        {props.flag}
                    </span>
                </p>
                {user &&
                    <button className="flex self-end gap-1.5 mr-2 cursor-pointer"
                        onClick={handleLike}>
                        {Like ?
                            <>
                                <span className="text-sm font-semibold">{likes}</span>
                                <Heart className="text-rose-500 animate-[pulse_2s_linear_1] rounded size-5" />
                            </>
                            :
                            <>
                                <span className="text-sm font-semibold">{likes}</span>
                                <Heart className=" size-5" />
                            </>
                        }

                    </button>
                }
            </div>

        </div>
    )
}