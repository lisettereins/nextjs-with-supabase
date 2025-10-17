"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBook } from "../../actions";

export default function EditBookForm({
  book,
}: {
  book: { id: string; title: string };
}) {
  const [title, setTitle] = useState(book.title);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateBook(book.id, title);
    router.push("/books");
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
