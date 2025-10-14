"use client";

import { useState, useTransition } from "react";
import { updateNote } from "../actions/updateNote";

export default function EditNoteForm({ note }: { note: { id: string; title: string } }) {
  const [title, setTitle] = useState(note.title);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateNote(note.id, title);
      alert("Note updated!");
    });
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
        disabled={isPending}
        className="bg-blue-500 text-white rounded p-2"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}