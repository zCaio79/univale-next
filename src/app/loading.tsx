import { LoaderCircle } from "lucide-react";

export default function Loading(){
    return(
        <div className="absolute flex w-screen h-screen justify-center items-center bg-zinc-50">

            <LoaderCircle className="text-zinc-800 size-8 animate-spin"/>

        </div>
    )
}