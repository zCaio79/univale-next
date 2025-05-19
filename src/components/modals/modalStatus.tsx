import { Check, X } from "lucide-react"
import { useState } from "react"

type votingStatusProps = {
    variant: 'sucesspoll' | 'errorpoll' | 'sucessSugestion'
}

const variants = {
    sucesspoll: "text-emerald-400",
    errorpoll: "text-red-400",
    sucessSugestion: "text-emerald-400",
}

export default function ModalStatus(props: votingStatusProps) {

    const [showModal, setShowModal] = useState<boolean>(true)

    if(!showModal) return null;

    if (props.variant == 'errorpoll') {
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
    if (props.variant == 'sucesspoll') {
        return (
            <div className="absolute bg-zinc-50 flex flex-col text-sm self-center rounded-md gap-2 p-2 h-full w-full justify-center items-center ">
                <span className="flex items-center text-center gap-2 bg-zinc-50 border-2 p-4 border-zinc-200">
                    <Check className={`size-5 ${variants[props.variant]}`} />
                    Enquete Criada com Sucesso!
                </span>
                <button
                    onClick={() => (setShowModal(false), window.location.href = "/admin/novaenquete")}
                    className="flex bg-emerald-400 rounded-md text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-emerald-500"
                >
                    ok
                </button>
            </div>
        )
    }
    if (props.variant == 'sucessSugestion') {
        return (
            <div className="absolute bg-zinc-50 flex flex-col text-sm self-center rounded-md gap-2 p-2 h-full w-full justify-center items-center ">
                <span className="flex items-center text-center gap-2 bg-zinc-50 border-2 p-4 border-zinc-200">
                    <Check className={`size-5 ${variants[props.variant]}`} />
                    Sugestão Enviada com Sucesso!
                </span>
                <button
                    onClick={() => (setShowModal(false), window.location.href = "/sugestoes")}
                    className="flex bg-emerald-400 rounded-md text-zinc-50 py-1.5 px-4 font-bold cursor-pointer hover:bg-emerald-500"
                >
                    ok
                </button>
            </div>
        )
    }

}