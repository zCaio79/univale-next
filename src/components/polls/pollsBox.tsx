import Link from "next/link";
import Poll from "./poll";
import { pollProps } from "./poll";

type pollsBoxProps = {
  polls: pollProps[]
};

export default function PollsBox({ polls }: pollsBoxProps) { 
  
  if (!polls || polls.length === 0) { 
    return (
      <div className=" text-gray-500 h-[86vh] flex flex-col w-full min-h-fit  justify-center items-center flex-wrap gap-4 p-4 rounded-lg bg-zinc-50 md:flex-row">
        <p>
          Nenhuma enquete disponível.
          <br />
          Visite
          <Link href={"https://univale.com.br/"} className="text-blue-500 font-medium underline mx-2 text-sm">
            Univale
          </Link>
          para saber mais.
        </p>
      </div>
    );
  }

  return (
    <section
      id="polls"
      className="flex flex-col w-full min-h-fit  justify-center items-center flex-wrap gap-4 p-4 rounded-lg bg-zinc-50 md:flex-row md:h-[86vh]"
    >
      {polls.map((poll) => (
        <Poll
          key={poll.id}
          id={poll.id}
          title={poll.title}
          description={poll.description}
          variant={poll.variant}
          options={poll.options}
          status={poll.status}
        />
      ))}
    </section>
  );
}
