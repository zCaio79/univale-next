
import Sugestion, { sugestionProps } from "./sugestion";

type allSugestionsBoxProps = {
    sugestions: sugestionProps[]
}

export default function AllSugestionsBox(props: allSugestionsBoxProps) {

    return (


        <section
            id="sugestions"
            className="flex self-center justify-center flex-wrap w-full h-[65vh] overflow-y-scroll overflow-x-hidden gap-8 p-6 rounded-lg bg-zinc-50 md:w-[65%]"
        >
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