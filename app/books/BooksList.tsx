"use client";

import { useState } from "react";
import { deleteBook } from "./actions";

export default function BooksList({
  books:initialBooks,
}: {
  books: { id: string; title: string }[];
}) {
 
  const [books, setBooks] = useState(initialBooks);
  
  const handleDelete = async (bookId: string) => {
    if (!confirm("Are you sure?")) {
      return;
    }

    await deleteBook(bookId);
    setBooks(books?.filter((b) => b.id !== bookId));
  };

  return (
    <div className="mx-auto flex-col max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-black dark:text-white">Books</h2>
        <a href="./books/create">
          <button className=" w-12 h-12 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
            +
          </button>
        </a>
      </div>
      <ul>
        {books?.map((b) => (
          <li key={b.id}>
            {b.title}{" "}
            <button onClick={() => handleDelete(b.id)}>🗑️</button>
            <a href={`/books/${b.id}/edit`}>
              <button>Edit</button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}