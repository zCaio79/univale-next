
import { Frown } from "lucide-react";
import Sugestion, { sugestionProps } from "./sugestion";

type allSugestionsBoxProps = {
    sugestions: sugestionProps[]
}

export default function AllSugestionsBox(props: allSugestionsBoxProps) {

    if(props.sugestions.length === 0){
        return(
            <section
            id="sugestions"
            className="flex relative self-center items-center justify-center flex-wrap h-[50vh] w-full gap-8 p-6 rounded-lg bg-zinc-50 md:w-[65%]"
        >
            <span className="text-zinc-400 text-sm flex flex-col gap-4 justify-center items-center">
                Nenhuma sugestão encontrada... 
                <Frown className="size-6 text-amber-400 animate-bounce"/>
            </span>

        </section>
        )
    }

    return (


        <section
            id="sugestions"
            className="flex self-center justify-center flex-wrap w-full h-fit gap-8 p-6 rounded-lg bg-zinc-50 md:w-[65%]"
        >
            {props.sugestions.map((sug, index) => (
                <Sugestion key={index}
                    id={sug.id}
                    title={sug.title}
                    desc={sug.desc}
                    likes_amounth={sug.likes_amounth}
                    flag={sug.flag}
                />
            ))}

        </section>

    )

}