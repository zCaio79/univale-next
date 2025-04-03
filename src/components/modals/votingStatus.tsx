import { Check, X } from "lucide-react"
import { useState } from "react"

type votingStatusProps = {
    variant: 'sucess' | 'error'
}

const variants = {
    sucess: "text-emerald-400",
    error: "text-red-400"
}

export default function VotingStatus(props: votingStatusProps) {

    const [showModal, setShowModal] = useState<boolean>(true)

    if(!showModal) return null;

    if (props.variant == 'error') {
        return (
            <div className="absolute bg-zinc-50 flex flex-col text-sm self-center rounded-md gap-2 p-2 h-[92%] w-[95%] justify-center items-center 
                    md:h-[36vh]">
                <span className="flex items-center text-center gap-2 bg-zinc-50 border-2 p-4 border-zinc-200">
                    <X className={`size-5 ${variants[props.variant]}`} />
                    Não foi possivel votar, tente Novamente!
                </span>
                <button
                    onClick={() => (setShowModal(false))}
                    className="flex bg-red-400 rounded-md text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-red-500"
                >
                    ok
                </button>
            </div>
        )
    } 
    if (props.variant == 'sucess') {
        return (
            <div className="absolute bg-zinc-50 flex flex-col text-sm self-center rounded-md gap-2 p-2 h-[92%] w-[95%] justify-center items-center 
                    md:h-[36vh]">
                <span className="flex items-center text-center gap-2 bg-zinc-50 border-2 p-4 border-zinc-200">
                    <Check className={`size-5 ${variants[props.variant]}`} />
                    Voto enviado com sucesso
                </span>
                <button
                    onClick={() => (setShowModal(false))}
                    className="flex bg-emerald-400 rounded-md text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-emerald-500"
                >
                    ok
                </button>
            </div>
        )
    }

}