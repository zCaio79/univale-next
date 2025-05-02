import { HeartHandshake } from "lucide-react";
import Sugestion, { sugestionProps } from "./sugestion";

type sugestionsBoxProps = {
    sugestions: sugestionProps[]
}

export default function SugestionsBox(props: sugestionsBoxProps) {  

    return (
        <section
            id="sugestions"
            className="flex justify-between flex-col overflow-y-scroll scrollbar-custom overflow-x-hidden w-full h-fit gap-2 p-4 rounded-lg bg-zinc-50 xl:w-[40%] xl:h-[86vh]"
        >
            <span className="flex gap-2 py-2 px-2 self-center text-lg font-bold text-zinc-600">
                Mais Apoiados
                <HeartHandshake />
            </span>
            {props.sugestions.map((sug, index) => (
                <Sugestion key={index}
                    title={sug.title}
                    description={sug.description}
                    isLiked={sug.isLiked}
                    likes_amounth={sug.likes_amounth}
                    flag={sug.flag}
                />
            ))}

            <p className="text-zinc-500 text-sm font-semibold self-center py-2">Apoie as sugestões dos seus colegas</p>

        </section>
    )

}