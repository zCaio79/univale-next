'use client'

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import { ChevronLeft, ChevronRight, CircleAlert, EyeIcon, EyeOffIcon, Fingerprint, GraduationCap, LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {

    const { setUser } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")
        setIsLoading(true)

        try {
            const { data: userData, error: signInError } = await supabase.auth.signInWithPassword({
                email: userName,
                password: password,
            })

            if (signInError || !userData) {
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('email, password, role')
                    .eq('email', userName)
                    .limit(1)
                    .maybeSingle();

                if (profileError || !profileData) {
                    setError("Email não encontrado. Verifique o email.");
                    return;
                }

                const isPasswordValid = await bcrypt.compare(password, profileData.password);
                if (!isPasswordValid) {
                    setError("Senha incorreta.");
                    return;
                }

                const { data: newUser, error: authError } = await supabase.auth.signUp({
                    email: userName,
                    password: password,
                });

                if (authError) {
                    setError("Erro ao registrar usuário. Tente novamente!");
                    return;
                }

                setUser(newUser.user);
    
            } else {
                setUser(userData.user);
            }

            window.location.href = '/';
            return;

        } catch (err) {
            console.log(err);
            setError('Erro ao fazer login, tente novamente!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}
            className="flex flex-col self-center gap-4 py-8 px-4 items-center w-full bg-zinc-50 rounded-lg md:w-[45%] md:gap-8">

            <span className="flex items-center gap-2 text-zinc-700 text-lg font-bold">
                <ChevronLeft />
                Login
                <ChevronRight />
            </span>

            <div className="flex flex-col items-center gap-8 bg-zinc-200 p-6 rounded-md w-full h-fit md:w-[30vw] md:py-8">

                <div className="flex w-full justify-between flex-wrap flex-col gap-4">
                    <label htmlFor="email"
                        className="text-zinc-700 font-semibold flex gap-4 items-center">
                            <GraduationCap className="size-5"/>
                            Email institucional :</label>
                    <input
                        id="email"
                        type="email"
                        className="flex outline-0 text-sm rounded-md py-2 px-3 w-full bg-zinc-50"
                        placeholder="tad-email@ucpparana.edu.br"
                        required
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="flex w-full justify-between flex-wrap flex-col gap-4">
                    <label htmlFor="RA" className="text-zinc-700 font-semibold flex gap-4 items-center">
                        <Fingerprint className="size-5"/>
                        Senha :</label>
                    <div className="relative">
                        <input
                            id="RA"
                            type={!showPassword ? "password" : "text"}
                            required
                            className="flex outline-0 text-sm rounded-md text-wrap py-2 px-3 pr-8 w-full bg-zinc-50"
                            maxLength={10}
                            placeholder="RA ou chave de administrador"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {!showPassword ?
                            <EyeOffIcon onClick={() => setShowPassword(true)} className="absolute right-2 cursor-pointer text-zinc-600 top-1.5" />
                            :
                            <EyeIcon onClick={() => setShowPassword(false)} className="absolute right-2 cursor-pointer text-zinc-600 top-1.5" />}
                    </div>
                </div>

            </div>

            {error != "" ?
                <div className="flex w-full gap-4 p-2 items-center border-2 border-zinc-200 justify-center md:w-[30vw]">
                    <CircleAlert className="text-red-400 size-5" />
                    <span className="flex items-center text-center text-red-400 text-xs font-semibold">
                        {error}
                    </span>
                </div>
                :
                <div className="flex w-full gap-4 p-2 items-center border-2 border-zinc-200 justify-center md:w-[30vw]">
                    <CircleAlert className="text-zinc-600 size-5" />
                    <span className="flex items-center text-center text-zinc-600 text-xs font-semibold">
                        caso você não esteja registrado
                        <br />
                        solicite o cadastro na instituição
                    </span>
                </div>
            }

            {isLoading ?
                <div className="absolute top-0 flex w-full h-screen justify-center items-center bg-zinc-50">
                    <LoaderCircle className="text-zinc-800 size-8 animate-spin"/>
                </div>
                :
                <button
                    type="submit"
                    className="bg-amber-500 cursor-pointer text-zinc-50 font-bold rounded-md py-1.5 px-4 hover:bg-amber-600"
                >
                    Entrar
                </button>
            }

        </form>
    )
}
