import LoginForm from "@/components/modals/loginForm";

export const dynamic = 'force-dynamic'

export default function Login(){
    return (
        <div className="flex w-full py-16 min-h-[89vh] flex-col bg-zinc-200 ">

            <main className="flex h-full w-full p-4 flex-col md:p-6">

                <LoginForm />

            </main>

        </div>
    )
}