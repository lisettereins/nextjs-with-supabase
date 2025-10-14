"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNote } from "./actions";

export default function EditNoteForm({
  note,
}: {
  note: { id: string; title: string };
}) {
  const [title, setTitle] = useState(note.title);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateNote(note.id, title);
    router.push("/notes");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        placeholder="Edit title..."
      />
      <button
        type="submit"
        
        className="bg-gray-50 text-black p-2 rounded hover:bg-gray-200"
      >
        Save changes
      </button>
    </form>
  );
}
