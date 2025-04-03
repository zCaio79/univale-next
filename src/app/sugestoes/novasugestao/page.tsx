import SugestionForm from "@/components/modals/sugestionForm";



export default function NovaSugestão() {
    return (
        <div className="flex w-full min-h-[88vh] flex-col bg-zinc-200 ">

            <main className="flex h-full w-full p-4 flex-col md:p-6">

            <SugestionForm/>

            </main>

        </div>
    )
}