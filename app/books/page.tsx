import { createClient } from "@/lib/supabase/server";
import BooksList from "./BooksList";
import { notFound } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  

  const { data: books } = await supabase
    .from("books")
    .select("id, title");

  if (!books) {
    notFound();
  }

  return (
      <BooksList books={books} />
  );
}