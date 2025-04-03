'use client'

import { ChevronLeft, ChevronRight, CircleAlert, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";


export default function AdmForm() {

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (

        <form onSubmit={handleSubmit}
            className="flex flex-col self-center gap-4 py-8 px-4 items-center w-full bg-zinc-50 rounded-lg md:w-[45%] md:gap-8">

            <span className="flex items-center gap-2 text-zinc-700 text-lg font-bold">

                <ChevronLeft />
                Admin Login
                <ChevronRight />

            </span>

            <div className="flex flex-col items-center gap-8 bg-zinc-200 p-6 rounded-md w-full h-fit md:w-[30vw] md:py-8">

                <div className="flex w-full justify-between flex-wrap flex-col gap-4">
                    <label htmlFor="email" 
                    className="text-zinc-700 font-semibold">Usuário :</label>
                    <input 
                    id="user"
                    type="text" 
                    className="flex outline-0 text-sm rounded-md py-2 px-3 w-full bg-zinc-50" 
                    placeholder="usuario administrador" 
                    required/>
                </div>
                <div className="flex w-full justify-between flex-wrap flex-col gap-4">
                    <label htmlFor="password" className="text-zinc-700 font-semibold">Senha :</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={!showPassword ? "password" : "text"}
                            required
                            className="flex outline-0 text-sm rounded-md text-wrap py-2 px-3 pr-8 w-full bg-zinc-50"
                            minLength={8}
                            placeholder="senha de administrador" />
                        {!showPassword ?
                            <EyeOffIcon onClick={() => setShowPassword(true)} className="absolute right-2 cursor-pointer text-zinc-600 top-1.5" />
                            :
                            <EyeIcon onClick={() => setShowPassword(false)} className="absolute right-2 cursor-pointer text-zinc-600 top-1.5" />}
                    </div>
                </div>

            </div>

            <div className="border-b-2 border-zinc-200 w-full md:w-[30vw]" />

            <button
                type="submit"
                className="bg-amber-500 cursor-pointer text-zinc-50 font-bold rounded-md py-1.5 px-4 hover:bg-amber-600"
            >
                Entrar
            </button>

        </form>

    )
}