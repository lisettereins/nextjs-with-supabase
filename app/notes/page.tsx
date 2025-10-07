import { createClient } from "@/lib/supabase/client";

export default async function Page() {
  const supabase = createClient();

  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="mx-auto flex-col max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-black dark:text-white">Notes</h2>
        <a href="./notes/create">
          <button className=" w-12 h-12 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
            +
          </button>
        </a>
      </div>
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
