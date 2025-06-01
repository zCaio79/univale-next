'use client'

import { BookmarkCheck, CircleCheck, CircleHelp, Dot, LoaderCircle, Unlink2 } from "lucide-react";
import { useEffect, useState } from "react";
import ModalStatus from "../modals/modalStatus";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export type pollProps = {
    id: string;
    title: string;
    description: string;
    variant: 'amber' | 'blue' | 'emerald' | 'red';
    status: 'open' | 'closed';
    options: {
        id: string;
        option_name: string;
        votes: number;
    }[];
};

const variants = {
    red: "border-red-200 bg-red-50",
    blue: "border-blue-200 bg-blue-50",
    emerald: "border-emerald-200 bg-emerald-50",
    amber: "border-amber-200 bg-amber-50",
};

export default function Poll(props: pollProps) {
    const { user } = useAuth()
    const [vote, setVote] = useState<string>("")
    const [error, setError] = useState("")
    const [isVoted, setIsVoted] = useState<boolean>(false)
    const [isPollActive, setIsPollActive] = useState<string>(props.status)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [localOptions, setLocalOptions] = useState(props.options)

    useEffect(() => {
        const checkIfVoted = async () => {
            if (!user?.email) {
                setIsLoading(false)
                return
            }
            const { data, error } = await supabase
                .from("poll_votes")
                .select("poll_id")
                .eq("poll_id", props.id)
                .like("email", user.email)

            if (error) {
                setError(error.message)
                setIsLoading(false)
                return
            }

            if (data && data.length > 0) {
                setIsVoted(true)
                setIsPollActive("closed")
            }

            setIsLoading(false)
        };

        checkIfVoted()
    }, [user, props.id])

    async function voting(optionId: string) {
        if (isPollActive === "open" && !isVoted) {
            if (!optionId || !user) {
                setError("Usuário ou opção inválida.")
                return
            }
            setIsLoading(true)

            try {
                const { error } = await supabase
                    .from("poll_votes")
                    .insert([
                        {
                            email: user.email,
                            poll_id: props.id,
                            option_id: optionId,
                        }
                    ]);

                if (error) {
                    setError("Não foi possível votar.")
                    console.log(error)
                    return
                }


                setLocalOptions((prev) =>
                    prev.map((op) =>
                        op.id === optionId
                            ? { ...op, votes: op.votes + 1 }
                            : op
                    )
                );

                setIsVoted(true)
                setIsPollActive("closed")
                setIsLoading(false)
            } catch (err) {
                console.error("Erro ao votar:", err)
                setError("Erro ao votar.")
            }
        }
    }

    function handleVote(optionId: string) {
        setVote(optionId)
    }

    if (isLoading) {
        return (
            <div className="flex relative flex-col justify-center items-center w-full h-[40vh] rounded-md border-zinc-300 bg-zinc-100 border-2 p-4 md:w-[48%] xl:h-[40vh]">
                <LoaderCircle className="text-zinc-800 size-5 animate-spin"/>
            </div>
        );
    }

    if (isPollActive === "closed" && !isLoading) {
        return (
            <div className={`flex relative flex-col justify-center w-full gap-4 h-fit rounded-lg border-4 p-4 transition-all duration-200 ease-in-out
                ${props.status === "closed" ? "bg-gray-200 border-zinc-300" : variants[props.variant]} 
                md:w-[48%] xl:h-[40vh]`}>

                <div className="flex flex-col w-full h-fit gap-4">
                    <span className="flex w-full items-center gap-4 text-sm font-semibold text-zinc-800 sm:text-lg">
                    {props.status == "closed" ? <BookmarkCheck className="size-5"/> : <CircleCheck className="size-5"/>}
                        {props.title}
                    </span>
                    <span className="flex w-full text-xs text-wrap font-medium text-zinc-700">
                        {props.description}
                    </span>
                </div>

                <div className="flex flex-col justify-center w-full h-full gap-4 text-zinc-800">
                    {localOptions.map((op, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <div className="flex w-full justify-between items-center rounded-xl bg-zinc-50 py-2 px-4 border-2 border-zinc-200">
                                <span className="flex gap-1.5 items-center text-xs sm:text-sm "><Dot className="text-zinc-400 size-5"/>{op.option_name}</span>
                                <span className="flex text-xs text-zinc-700 sm:text-sm">{op.votes} votos</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isPollActive === "open") {
        return (
            <div className={`flex relative flex-col justify-center w-full gap-4 h-fit rounded-lg border-4 p-4 transition-all duration-200 ease-in-out
                ${props.status === "closed" ? "bg-zinc-200 border-zinc-400" : variants[props.variant]} 
                md:w-[48%] xl:h-[40vh]`}>

                {error && <ModalStatus variant="errorpoll" />}

                <div className="flex flex-col w-full h-fit gap-4">
                    <span className="flex w-full items-center gap-4 text-sm font-semibold text-zinc-800 sm:text-lg">
                        <CircleHelp className="size-5"/>
                        {props.title}
                    </span>
                    <span className="flex w-full text-wrap text-xs font-medium text-zinc-700">
                        {props.description}
                    </span>
                </div>

                <div className="flex flex-col justify-around w-full h-full gap-2 text-zinc-800">
                    {localOptions.map((op, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <button
                                type="button"
                                onClick={() => handleVote(op.id)}
                                className={`flex justify-center items-center cursor-pointer size-8 rounded-full border-2 transition 
                                    ${vote === op.id ? "bg-zinc-300 border-zinc-500 animate-[spin_1s_linear_1]" : "bg-zinc-50 border-zinc-200"}`}
                            >
                                <Unlink2 className={`size-5 transition ${vote === op.id ? "text-zinc-600" : "text-zinc-300 hover:text-zinc-500"}`} />
                            </button>
                            <div className="flex w-full rounded-xl bg-zinc-50 py-2 px-4 border-2 border-zinc-200">
                                <span className="text-xs sm:text-sm">{op.option_name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {(user && isPollActive) &&
                    <button
                        type="button"
                        className={`rounded-md py-1.5 px-2.5 text-sm font-bold
                        ${vote ? "bg-zinc-700 text-zinc-50 hover:bg-zinc-800 cursor-pointer" : "bg-zinc-400 text-zinc-200"}`}
                        disabled={!vote || error !== "" || isVoted}
                        onClick={() => voting(vote)}
                    >
                        Votar
                    </button>
                }
            </div>
        );
    }
}
