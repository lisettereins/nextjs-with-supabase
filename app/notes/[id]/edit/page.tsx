import { createClient } from "@/lib/supabase/server";
import EditNoteForm from "./EditNoteForm";
import { notFound } from "next/navigation";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: note } = await supabase
    .from("notes")
    .select("id, title")
    .eq("id", id)
    .single();

  if (!note) {
    notFound();
  }

  return (
    <div
      className="mx-auto flex-col max-w-sm items-center gap-x-4 rounded-xl 
    bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none 
    dark:-outline-offset-1 dark:outline-white/10"
    >
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
        Edit Note
      </h1>
      <EditNoteForm note={note} />
    </div>
  );
}
