import AdmForm from "@/components/modals/admForm";


export default function AdmLogin(){
    return (
        <div className="flex w-full py-16 min-h-[89vh] flex-col bg-zinc-200 ">

            <main className="flex h-full w-full p-4 flex-col md:p-6">

                <AdmForm />

            </main>

        </div>
    )
}