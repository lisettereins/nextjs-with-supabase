"use server";

import { createClient } from "@/lib/supabase/server";

export async function getBook(title: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("books")
    .select("*")
    .eq("title", title)
    .single();
    

  if (error) {
    throw new Error("get failed");
  }
  return { success: true };
}

export async function createBook(title: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("books")
    .insert({ title })
    .select();
    

  if (error) {
    throw new Error("create failed");
  }
  return { success: true };
}

export async function updateBook(bookId: string, title: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("books")
    .update({ title })
    .eq("id", bookId)
    .select();

  if (error) {
    throw new Error("update failed");
  }
  return { success: true };
}

export async function deleteBook(bookId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("books")
    .delete()
    .eq("id", bookId)
    .select();

  if (error) {
    throw new Error("delete failed");
  }

  return { success: true };
}