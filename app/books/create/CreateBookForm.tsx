'use client'

//import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBook } from "../actions";

export default function CreateBookForm({
  book,
}: {
  book: { id: string; title: string };
}) {
  const [title, setTitle] = useState(book.title);
  const router = useRouter();
 // const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBook(title);
    router.push("/books");
    router.refresh();
  };

  return (
    <div
      className="mx-auto flex-col max-w-sm items-center gap-x-4 rounded-xl 
    bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none 
    dark:-outline-offset-1 dark:outline-white/10"
    >
      <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
        Add book
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 rounded border dark:bg-slate-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-gray-50 text-black p-2 rounded hover:bg-gray-200"
        >
          Save
        </button>
      </form>
    </div>
  );
}