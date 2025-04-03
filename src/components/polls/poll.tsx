'use client'

import { CircleCheck, CircleHelp, Unlink2 } from "lucide-react";
import { useState } from "react";
import VotingStatus from "../modals/votingStatus";

export type pollProps = {
    title: string
    description: string
    options: string[]
    variant: 'amber' | 'blue' | 'emerald' | 'red'
    status: 'open' | 'closed'
    votes: number[],

};

const variants = {
    red: "border-red-200 bg-red-50",
    blue: "border-blue-200 bg-blue-50",
    emerald: "border-emerald-200 bg-green-50",
    amber: "border-amber-200 bg-amber-50",
};

export default function Poll(props: pollProps) {
    const [vote, setVote] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [isVoted, setIsVoted] = useState<boolean>(false)
    const [isPollActive, setIsPollActive] = useState<string>(props.status)

    function voting(option: string) {
        if (!option || !props.options.includes(option)) {
            setError(true)
            return;
        }

        setError(false)
        setIsVoted(true)
        setIsPollActive("closed")

    }

    function handleVote(option: string) {
        setVote(option)
    }

    if(isPollActive == "open"){

        return (

            <div
                className={`flex relative flex-col justify-center w-full gap-4 h-fit rounded-md border-2 p-4 ${variants[props.variant]} 
                md:w-[48%] xl:h-[40vh]`}
            >
    
                {error && <VotingStatus variant="error"/>}
                {isVoted && <VotingStatus variant="sucess"/>}
                
    
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
                                onClick={() => handleVote(op)}
                                className={`flex justify-center items-center cursor-pointer size-8 rounded-full border-2 transition 
                                    ${vote === op ? "bg-zinc-300 border-zinc-500" : "bg-zinc-50 border-zinc-200"}`}
                            >
                                <Unlink2 className={`size-5 transition ${vote === op ? "text-zinc-600" : "text-zinc-300 hover:text-zinc-500"}`} />
                            </button>
                            <div className="flex w-full rounded-xl bg-zinc-50 py-2 px-4 border-2 border-zinc-200">
                                <span className="text-xs sm:text-sm">{op}</span>
                            </div>
                        </div>
                    ))}
                </div>
    
                <button
                    type="button"
                    className={`rounded-md py-1.5 px-2.5 text-sm font-bold
                    ${vote ? "bg-zinc-700 text-zinc-50 hover:bg-zinc-800 cursor-pointer" : "bg-zinc-400 text-zinc-200"}`}
                    disabled={!vote || error || isVoted}
                    onClick={() => voting(vote)}
                >
                    Votar
                </button>
            </div>
    
        );
    }
    if(isPollActive == "closed"){
        
        return (

            <div
                className={`flex relative flex-col justify-center w-full gap-4 h-fit rounded-md border-2 p-4 ${variants[props.variant]} 
                md:w-[48%] xl:h-[40vh]`}
            >
    
                {error && <VotingStatus variant="error"/>}
                {isVoted == true && <VotingStatus variant="sucess"/>}
    
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
    
            </div>
    
        );
    }
    
}
