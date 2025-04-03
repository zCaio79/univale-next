'use client'

import { Braces, ChevronLeft, ChevronRight, Droplet, Unlink2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PollForm() {


    const [title, setTitle] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const [variant, setVariant] = useState("amber")
    const [op, setOp] = useState<Array<string>>([])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleOptionChange = (index: number, value: string) => {
        setOp((prevOp) => {
            const newOp = [...prevOp];
            newOp[index] = value;
            return newOp;
        });
    };

    return (

        <form onSubmit={handleSubmit} className="flex self-center flex-col gap-4 py-6 px-4 items-center w-full bg-zinc-50 rounded-lg md:w-[45%] md:gap-8">

            <span className="flex items-center gap-2 text-zinc-700 text-lg font-bold">

                <ChevronLeft />
                Nova Enquete
                <ChevronRight />

            </span>

            <div className="flex flex-col gap-4 bg-zinc-200 p-6 rounded-md w-full h-fit md:w-[40vw]">

                <div className="flex justify-between flex-wrap flex-col gap-2 md:flex-row md:gap-6">
                    <label
                        htmlFor="title"
                        className="text-zinc-700 font-semibold">Pergunta :</label>
                    <input
                        id="title"
                        type="text"
                        className="flex outline-0 text-sm rounded-md py-2 px-3 w-full md:w-[40vh] bg-zinc-50"
                        maxLength={50}
                        placeholder="titulo da enquete"
                        required 
                        onChange={(e)=> setTitle(e.target.value)}/>
                </div>
                <div className="flex justify-between flex-wrap flex-col gap-2 md:flex-row md:gap-6">
                    <label
                        htmlFor="desc"
                        className="text-zinc-700 font-semibold">Breve descrição :</label>
                    <textarea
                        id="desc"
                        required
                        className="flex outline-0 text-sm rounded-md text-wrap py-2 px-3 w-full md:w-[40vh] h-[10vh] bg-zinc-50"
                        maxLength={100}
                        placeholder="descreva brevemente..."
                        onChange={(e)=> setDesc(e.target.value)}
                    />
                </div>

            </div>

            <div className="flex flex-col gap-4 bg-zinc-200 p-6 rounded-md w-full h-fit md:w-[40vw]">

                <span className="flex gap-2 mb-2 items-center self-center text-zinc-700 text-base font-bold">
                    Opções
                    <Braces className="size-5" />
                </span>

                <div className="flex justify-between flex-wrap flex-col gap-2 md:flex-row md:gap-6">
                    <label
                        htmlFor="op1"
                        className="flex items-center gap-2 text-zinc-700 font-semibold">
                        <Unlink2 className="text-zinc-400" />
                        Opção 1 :
                    </label>
                    <input
                        id="op1"
                        type="text"
                        className="flex outline-0 text-sm rounded-md py-2 px-3 w-full md:w-[40vh] bg-zinc-50"
                        maxLength={30}
                        placeholder="..."
                        required
                        onChange={(e) => handleOptionChange(0, e.target.value)}
                    />
                </div>

                <div className="flex justify-between flex-wrap flex-col gap-2 md:flex-row md:gap-6">
                    <label
                        htmlFor="op2"
                        className="flex items-center gap-2 text-zinc-700 font-semibold">
                        <Unlink2 className="text-zinc-400" />
                        Opção 2 :
                    </label>
                    <input
                        id="op2"
                        type="text"
                        className="flex outline-0 text-sm rounded-md py-2 px-3 w-full md:w-[40vh] bg-zinc-50"
                        maxLength={30}
                        placeholder="..."
                        required
                        onChange={(e) => handleOptionChange(1, e.target.value)}
                    />
                </div>

                <div className="flex justify-between flex-wrap flex-col gap-2 md:flex-row md:gap-6">
                    <label
                        htmlFor="op3"
                        className="flex items-center gap-2 text-zinc-700 font-semibold">
                        <Unlink2 className="text-zinc-400" />
                        Opção 3 :
                    </label>
                    <input
                        id="op3"
                        type="text"
                        className="flex outline-0 text-sm rounded-md py-2 px-3 w-full md:w-[40vh] bg-zinc-50"
                        maxLength={30}
                        placeholder="opicional..."
                        onChange={(e) => handleOptionChange(2, e.target.value)} />
                </div>

            </div>

            <div className="flex flex-col gap-4 bg-zinc-200 p-6 rounded-md w-full h-[50vh] overflow-scroll md:w-[40vw] md:h-fit">

                <span className="flex gap-2 items-center self-center text-zinc-700 text-base font-bold">
                    Variantes
                    <Droplet className="size-5" />
                </span>

                <div className="flex flex-col justify-center gap-4 w-full h-fit md:flex-row md:gap-6 md:flex-wrap">
                    <div className={`p-1 ${variant == "amber" ? "border-amber-400 border-4" : "border-0"} rounded-lg`}>
                        <button
                            type="button"
                            onClick={() => setVariant("amber")}
                            className="flex flex-col justify-center gap-2 p-2 bg-amber-50 rounded-md h-[20vh] w-full md:w-[15vw] cursor-pointer">
                            <div className="flex h-4 rounded w-[70%] bg-zinc-200" />
                            <div className="flex h-6 rounded w-full bg-zinc-200" />
                            <div className="flex flex-col gap-2 p-2 pl-4 h-fit w-[100%]">

                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>

                            </div>
                        </button>
                    </div>
                    <div className={`p-1 ${variant == "blue" ? "border-blue-400 border-4" : "border-0"} rounded-lg`}>
                        <button
                            type="button"
                            onClick={() => setVariant("blue")}
                            className="flex flex-col justify-center gap-2 p-2 bg-blue-50 rounded-md h-[20vh] w-full md:w-[15vw] cursor-pointer">
                            <div className="flex h-4 rounded w-[70%] bg-zinc-200" />
                            <div className="flex h-6 rounded w-full bg-zinc-200" />
                            <div className="flex flex-col gap-2 p-2 pl-4 h-fit w-[100%]">

                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>

                            </div>
                        </button>
                    </div>

                    <div className={`p-1 ${variant == "red" ? "border-red-400 border-4" : "border-0"} rounded-lg`}>
                        <button
                            type="button"
                            onClick={() => setVariant("red")}
                            className="flex flex-col justify-center gap-2 p-2 bg-red-50 rounded-md h-[20vh] w-full md:w-[15vw] cursor-pointer">
                            <div className="flex h-4 rounded w-[70%] bg-zinc-200" />
                            <div className="flex h-6 rounded w-full bg-zinc-200" />
                            <div className="flex flex-col gap-2 p-2 pl-4 h-fit w-[100%]">

                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>

                            </div>
                        </button>
                    </div>
                    <div className={`p-1 ${variant == "emerald" ? "border-emerald-400 border-4" : "border-0"} rounded-lg`}>
                        <button
                            type="button"
                            onClick={() => setVariant("emerald")}
                            className="flex flex-col justify-center gap-2 p-2 bg-emerald-50 rounded-md h-[20vh] w-full md:w-[15vw] cursor-pointer">
                            <div className="flex h-4 rounded w-[70%] bg-zinc-200" />
                            <div className="flex h-6 rounded w-full bg-zinc-200" />
                            <div className="flex flex-col gap-2 p-2 pl-4 h-fit w-[100%]">

                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>
                                <div className="flex w-full h-fit gap-2">
                                    <div className="flex size-4 rounded-full bg-zinc-200"></div>
                                    <div className="flex h-4 rounded w-[80%] bg-zinc-200" />
                                </div>

                            </div>
                        </button>
                    </div>
                </div>

            </div>

            <div className="border-b-2 border-zinc-200 w-full md:w-[40vw]" />
            <div className="flex w-full justify-center gap-4">
                <Link
                    href="/admin"
                    className="bg-zinc-500 text-zinc-50 font-bold rounded-md py-1.5 px-4 hover:bg-zinc-600"
                >
                    Cancelar
                </Link>
                <button type="submit"
                    className="bg-amber-500 text-zinc-50 font-bold rounded-md py-1.5 px-4 hover:bg-amber-600"
                >
                    Enviar
                </button>
            </div>

        </form>
    )
}