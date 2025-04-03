
import { sugestionProps } from "./sugestion";
import SugestionControl from "./sugestionControl";

type allSugestionsBoxProps = {
    sugestions: sugestionProps[]
}

export default function AllSugestionsControl(props: allSugestionsBoxProps) {

    return (


        <section
            id="sugestions"
            className="flex self-center justify-center flex-wrap w-full h-[65vh] overflow-scroll gap-8 p-6 rounded-lg bg-zinc-50 md:w-[65%]"
        >
            {props.sugestions.map((sug, index) => (
                <SugestionControl key={index}
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