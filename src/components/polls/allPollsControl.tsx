'use client'


import { pollProps } from "./poll"
import { useEffect, useState } from "react"
import PollControl from "./pollControl"
import { Frown, LoaderCircle } from "lucide-react"

type allPollsControl = {
    polls: pollProps[]
}

export default function AllPollsControl(props: allPollsControl) {
    const [filter, setFilter] = useState("all");
        const [filteredPolls, setFilteredPolls] = useState<pollProps[]>([]);
    
        useEffect(() => {
            if (filter === "all") {
                setFilteredPolls(props.polls);
            } else {
                setFilteredPolls(props.polls.filter(poll => poll.status === filter));
            }
        }, [filter, props.polls]);
    
        function handleFilterChange(selectedFilter: string) {
            setFilter(selectedFilter);
        }

    return (
        <>
            <div className="flex self-center flex-wrap gap-2 p-4 justify-center w-full bg-zinc-50 rounded-lg md:w-[65%] md:gap-4">
                <button
                    className={`flex gap-2 items-center justify-center text-sm flex-grow md:flex-grow-0
                    ${filter === 'all' ? "bg-amber-500 text-zinc-50 border-2 border-amber-500" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                    rounded-md text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                    onClick={() => handleFilterChange("all")}
                >
                    Todas
                </button>
                <button
                    className={`flex gap-2 items-center justify-center text-sm flex-grow md:flex-grow-0
                    ${filter === 'open' ? "bg-amber-500 text-zinc-50 border-2 border-amber-500" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                    rounded-md text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                    onClick={() => handleFilterChange("open")}
                >
                    Abertas
                </button>
                <button
                    className={`flex gap-2 items-center justify-center text-sm flex-grow md:flex-grow-0
                    ${filter === 'closed' ? "bg-amber-500 text-zinc-50 border-2 border-amber-500" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                    rounded-md text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                    onClick={() => handleFilterChange("closed")}
                >
                    Fechadas
                </button>
            </div>

            {!filteredPolls && 
                <div className="flex self-center w-full md:w-[65%] h-[70vh] justify-center items-center text-gray-500 rounded-lg bg-zinc-50">
                    <LoaderCircle className="text-zinc-800 size-8 animate-spin"/>
                </div>
            }
            
            {filteredPolls.length === 0 ? (
                <div className="flex self-center w-full md:w-[65%] h-[70vh] justify-center items-center text-gray-500 rounded-lg bg-zinc-50">
                    <p className="flex items-center flex-col gap-6">Nenhuma Enquete Disponivel ... <Frown className="size-6 text-blue-400 animate-bounce"/></p>
                </div>
            ) : (
                <section id="polls" key={filter}
                    className="flex relative self-center flex-col w-full h-fit items-center justify-center flex-wrap gap-4 p-4 rounded-lg bg-zinc-50 lg:w-[65%] lg:flex-row">
                    {filteredPolls.map((poll) => (
                        <PollControl
                            key={poll.id}
                            id={poll.id}
                            title={poll.title}
                            description={poll.description}
                            variant={poll.variant}
                            options={poll.options}
                            status={poll.status}
                        />
                    ))}
                </section>
            )}
        </>
    );
}
