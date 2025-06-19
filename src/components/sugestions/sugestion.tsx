'use client'

import { Heart, HeartHandshake, Lightbulb, LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type sugestionProps = {
    id: string,
    title: string,
    desc: string,
    likes_amounth: number,
    flag: 'educação' | 'estrutura' | 'inovação',
}

export default function Sugestion(props: sugestionProps) {

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    let flag = ""

    const [likes, setLikes] = useState(props.likes_amounth)

    if (props.flag == "educação") {
        flag = 'bg-red-400'
    } else if (props.flag == "estrutura") {
        flag = 'bg-blue-400'
    } else {
        flag = 'bg-emerald-400'
    }

    useEffect(() => {
        const checkIfLiked = async () => {
            if (!user?.id) {
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("sugestion_likes")
                .select("id")
                .eq("id_sugestion", props.id)
                .eq("user_id", user.id);

            if (error) {
                console.error("Erro ao verificar like:", error);
                setIsLoading(false);
                return;
            }

            setIsLiked(data.length > 0);
            setIsLoading(false);
        };

        checkIfLiked();
    }, [user, props.id]);


    const handleLikeSugestion = async () => {
        if (!user) return;

        try {
            const { error: likeError } = await supabase
                .from("sugestion_likes")
                .insert([{ id_sugestion: props.id, user_id: user.id }]);

            if (likeError) throw likeError;

            setIsLiked(true);
            setLikes(likes + 1)
        } catch (error) {
            console.error("Erro ao adicionar like:" + error);
        }
    };

    const handleDeslikeSugestion = async () => {
    if (!user) return;

    try {
        
        const { error: deslikeError } = await supabase
            .from("sugestion_likes")
            .delete()
            .eq("id_sugestion", props.id)
            .eq("user_id", user.id);

        if (deslikeError) throw deslikeError;

        setIsLiked(false);
        setLikes(likes - 1);
    } catch (error) {
        console.error("Erro ao remover like:", error);
    }
};


    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-[30vh] rounded-md border-2 border-zinc-200 py-4 px-4 xl:w-[25vw]">
                <LoaderCircle className="text-zinc-800 size-6 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-around bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 w-full gap-4 min-h-[20vh] h-fit rounded-md border-2 border-zinc-200 py-4 px-6 md:min-h-[32vh] xl:w-[25vw] hover: transition-all duration-300 ease-in-out">

            <div className="flex items-center gap-2" >
                <p className="text-zinc-800 text-sm text-pretty w-[95%] font-semibold md:text-base">{props.title}</p>
                <Lightbulb className="size-5 text-amber-600" />
            </div>

            <div className="flex flex-col gap-3 w-full text-zinc-800">
                <p className="flex w-[85%] text-xs text-justify text-pretty sm:text-sm">{props.desc}</p>
                <p>
                    <span className={`flex font-semibold text-zinc-50 text-xs w-fit rounded-md py-1 px-1.5 ${flag}`}>
                        {props.flag}
                    </span>
                </p>

                {(isLiked && user) &&
                    <button className="flex self-end gap-1.5 mr-2 cursor-pointer"
                    onClick={handleDeslikeSugestion}
                    >
                        <span className="text-sm font-semibold">{likes}</span>
                        <HeartHandshake className="text-rose-500 cursor-pointer animate-[pulse_1s_linear_1] rounded size-5" />

                    </button>
                }
                {(!isLiked && user) &&
                    
                    <button className="flex self-end gap-1.5 mr-2 cursor-pointer animate-[pulse_1s_linear_1]"
                    onClick={handleLikeSugestion}
                    >
                        <span className="text-sm font-semibold cursor-pointer">{likes}</span>
                        <Heart className=" size-5" />
                    </button>

                }

            </div>
        </div>
    )
}
