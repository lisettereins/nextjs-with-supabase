"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { deleteNote } from "./actions/deleteNote";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("notes").select();
      setNotes(data);
    };
    getData();
  }, [supabase]);

  const handleDelete = async (noteId: string) => {
    if (!confirm("Are you sure?")) {
      return;
    }

    await deleteNote(noteId);
    setNotes(notes?.filter((note) => note.id !== noteId) || null);
  };

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
          <li key={note.id}>
            {note.title}{" "}
            <button onClick={() => handleDelete(note.id)}>🗑️</button>
             <a href={`/notes/${note.id}/edit`}>
              <button>Edit</button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
