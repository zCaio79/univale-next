import MinimalHeader from "@/components/headers/minimalHeader";
import PollForm from "@/components/modals/pollForm";

export const dynamic = 'force-dynamic'


export default function NovaEnquete() {


    return (
        <div className="flex w-full min-h-[89vh] flex-col bg-zinc-200 ">

            <main className="flex gap-4 h-full w-full p-4 flex-col md:p-6">

                <MinimalHeader />

                <PollForm />

            </main>

        </div>
    )
}