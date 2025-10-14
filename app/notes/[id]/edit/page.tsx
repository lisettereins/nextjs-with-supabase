import { createClient } from "@/lib/supabase/client";
import EditNoteForm from "./EditNoteForm";
import { notFound } from "next/navigation";

export default async function EditNotePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: note } = await supabase
    .from("notes")
    .select("id, title")
    .eq("id", params.id)
    .single();

  if (!note) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <EditNoteForm note={note} />
    </div>
  );
}