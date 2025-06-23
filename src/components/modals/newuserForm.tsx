'use client'

import { supabase } from "@/lib/supabaseClient";
import { ChevronLeft, ChevronRight, CircleAlert, Crown, EyeIcon, EyeOffIcon, GraduationCap, UserCheck2} from "lucide-react";
import { useState } from "react";
import bcrypt from "bcryptjs";

export default function NewUserForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [sucess, setSucess] = useState(false)

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [roleValue, setRoleValue] = useState("student");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSucess(false)
        setIsLoading(true);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt)

        try {

            const { error: insertError } = await supabase
                .from("profiles")
                .insert([
                    {
                        email: userName,
                        password: hashedPassword,
                        role: roleValue,
                    },
                ]);

            if (insertError) {
                if (insertError.message.includes("duplicate key value") || insertError.message.includes("violates unique constraint")) {
                    setError("Esse e-mail já foi pré-registrado.");
                } else {
                    setError("Erro ao registrar aluno: " + insertError.message);
                }
                return;
            }

            alert("Pré-registro criado com sucesso!");
            setSucess(true)


            setPassword("");
            setRoleValue("student");

        } catch (err) {
            console.error(err);
            setError("Erro inesperado ao cadastrar.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}
            className="flex flex-col self-center gap-4 py-8 px-4 items-center w-full bg-zinc-50 rounded-lg md:w-[65%] md:gap-8">

            <span className="flex items-center gap-2 text-zinc-700 text-lg font-bold">

                <ChevronLeft />
                Cadastrar Aluno
                <ChevronRight />

            </span>

            <div className="flex flex-col items-center gap-8 bg-zinc-200 p-6 rounded-md w-full h-fit md:w-[30vw] md:py-8">

                <div className="flex w-full justify-between flex-wrap flex-col gap-4">
                    <label htmlFor="email"
                        className="text-zinc-700 font-semibold">Email institucional :</label>
                    <input
                        id="email"
                        type="email"
                        className="flex outline-0 text-sm rounded-md py-2 px-3 w-full bg-zinc-50"
                        placeholder="tad-email@ucpparana.edu.br"
                        required
                        onChange={(event) => setUserName(event.target.value)} />
                </div>

                <div className="flex w-full justify-between flex-wrap flex-col gap-4">
                    <label htmlFor="RA" className="text-zinc-700 font-semibold">RA (senha caso seja admin) :</label>
                    <div className="relative">
                        <input
                            id="RA"
                            type={!showPassword ? "password" : "text"}
                            required
                            className="flex outline-0 text-sm rounded-md text-wrap py-2 px-3 pr-8 w-full bg-zinc-50"
                            maxLength={10}
                            minLength={6}
                            placeholder="RA ou senha"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {!showPassword ?
                            <EyeOffIcon onClick={() => setShowPassword(true)} className="absolute right-2 cursor-pointer text-zinc-600 top-1.5" />
                            :
                            <EyeIcon onClick={() => setShowPassword(false)} className="absolute right-2 cursor-pointer text-zinc-600 top-1.5" />}
                    </div>
                </div>

                <div className="flex w-full justify-center text-sm font-semibold items-center gap-4">

                    <input name="role" className=" saturate-0" type="radio" required
                        onChange={() => setRoleValue("student")} />
                    <label htmlFor="role" className="text-blue-600 flex gap-2 items-center" >
                        
                        <GraduationCap className="size-5" />
                        Aluno</label>
                    
                    <input name="role" className=" saturate-0" type="radio"
                        onChange={() => setRoleValue("admin")} />
                    <label htmlFor="role" className="text-amber-600 flex gap-2 items-center">
                        <Crown className="size-5"/>
                        Admin</label>
                </div>

            </div>

            <div className="border-b-2 border-zinc-200 w-full md:w-[30vw]" />

            {error !== "" &&
                <div className="flex w-full gap-4 p-2 items-center border-2 border-zinc-200 justify-center md:w-[30vw]">

                    <CircleAlert className="text-red-400 size-5" />

                    <span className="flex items-center text-center text-red-400 text-xs font-semibold">

                        {error}

                    </span>

                </div>
            }

            {sucess &&
                <div className="flex w-full gap-4 p-2 items-center bg-emerald-400 rounded-sm justify-center md:w-[30vw]">

                    <UserCheck2 className="text-zinc-50 size-5" />

                    <span className="flex items-center text-center text-zinc-50 text-sm font-semibold">

                        Usuário Registrado com Sucesso!

                    </span>

                </div>
            }

            {isLoading ?
                <div className="flex w-full justify-center items-center">

                    <div className="size-8 rounded-full border-4 border-dashed text-zinc-800 animate-spin"></div>

                </div>
                :
                <button
                    type="submit"
                    className="bg-amber-500 cursor-pointer text-zinc-50 font-bold rounded-md py-1.5 px-4 hover:bg-amber-600"
                >
                    Cadastrar
                </button>
            }

        </form>
    )
}
