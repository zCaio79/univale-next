import Link from "next/link";

export default function MinimalHeader() {
    return (
        <div className="flex w-full gap-4 justify-center py-2 bg-zinc-50 rounded-lg items-center md:hidden">
            <Link href="/sugestoes" className="text-sm text-zinc-800">Sugestões</Link>
            <span>|</span>
            <Link href="/enquetes" className="text-sm text-zinc-800">Enquestes</Link>
        </div>
    )
}