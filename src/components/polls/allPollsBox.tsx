'use client'

import Poll from "./poll"
import { pollProps } from "./poll"
import { useState } from "react"

type allPollsBoxProps = {
    polls: pollProps[]
}

export default function AllPollsBox(props: allPollsBoxProps) {
    const [filter, setFilter] = useState("all");
    const [filteredPolls, setFilteredPolls] = useState<pollProps[]>(props.polls);

    function handleFilterChange(selectedFilter: string) {
        setFilter(selectedFilter);

        if (selectedFilter == "all") {
            setFilteredPolls(props.polls);
        } else {
            setFilteredPolls(props.polls.filter(poll => poll.status == selectedFilter));
        }
    }

    return (
        <>
            <div className="flex self-center gap-2 p-4 justify-center w-full bg-zinc-50 rounded-lg md:w-[65%] md:gap-4">
                <button
                    className={`flex gap-2 items-center text-sm
                    ${filter === 'all' ? "bg-amber-500 text-zinc-50 border-2 border-amber-500" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                    rounded-md text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                    onClick={() => handleFilterChange("all")}
                >
                    Todas
                </button>
                <button
                    className={`flex gap-2 items-center text-sm
                    ${filter === 'open' ? "bg-amber-500 text-zinc-50 border-2 border-amber-500" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                    rounded-md text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                    onClick={() => handleFilterChange("open")}
                >
                    Abertas
                </button>
                <button
                    className={`flex gap-2 items-center text-sm
                    ${filter === 'closed' ? "bg-amber-500 text-zinc-50 border-2 border-amber-500" : "border-2 border-zinc-600 text-zinc-800 hover:bg-zinc-600"}
                    rounded-md text-sm py-1.5 px-4 font-bold cursor-pointer hover:text-zinc-50`}
                    onClick={() => handleFilterChange("closed")}
                >
                    Fechadas
                </button>
            </div>

            {filteredPolls.length === 0 ? (
                <div className="flex self-center w-full md:w-[65%] h-[70vh] justify-center items-center text-gray-500 rounded-lg bg-zinc-50">
                    <p>Nenhuma enquete disponível.</p>
                </div>
            ) : (
                <section id="polls" key={filter}
                    className="flex self-center flex-col w-full h-fit items-center flex-wrap gap-4 p-4 rounded-lg bg-zinc-50 lg:w-[65%] lg:flex-row">
                    {filteredPolls.map((poll, index) => (
                        <Poll key={index}
                            title={poll.title}
                            description={poll.description}
                            variant={poll.variant}
                            options={poll.options}
                            status={poll.status}
                            votes={poll.votes}
                        />
                    ))}
                </section>
            )}
        </>
    );
}
