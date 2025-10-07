'use server'

import { createClient } from "@/lib/supabase/server";

export async function deleteNote(noteId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    throw new Error("Kustutamine ebaõnnestus");
  }

  return { success: true };
}