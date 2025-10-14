"use client";

import { useState, useTransition } from "react";
import { page } from "./actions";

export default function EditNoteForm({
  note,
}: {
  note: { id: string; title: string };
}) {
  const [title, setTitle] = useState(note.title);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await page(note.id, title);
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
        className="bg-gray-50 text-black p-2 rounded hover:bg-gray-200"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
