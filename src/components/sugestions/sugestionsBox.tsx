import { HeartHandshake } from "lucide-react";
import Sugestion, { sugestionProps } from "./sugestion";

type sugestionsBoxProps = {
    sugestions: sugestionProps[]
}

export default function SugestionsBox(props: sugestionsBoxProps) {  

    return (
        <section
            id="sugestions"
            className="flex flex-col overflow-y-scroll scrollbar-custom overflow-x-hidden w-full h-fit gap-3 p-4 rounded-lg bg-zinc-50 xl:w-[40%] xl:h-[86vh]"
        >
            <span className="flex gap-2 py-1 px-2 self-center text-lg font-bold text-zinc-600">
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

        </section>
    )

}