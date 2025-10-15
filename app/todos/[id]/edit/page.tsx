import { createClient } from "@/lib/supabase/server";
import EditTodoForm from "./EditTodoForm";
import { notFound } from "next/navigation";

export default async function EditTodoPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: todo } = await supabase
    .from("todos")
    .select("id, name")
    .eq("id", id)
    .single();

  if (!todo) {
    notFound();
  }

  return (
    <div
      className="mx-auto flex-col max-w-sm items-center gap-x-4 rounded-xl 
        bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none 
        dark:-outline-offset-1 dark:outline-white/10"
    >
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
        Edit Task
      </h1>
      <EditTodoForm todo={todo} />
    </div>
  );
}
