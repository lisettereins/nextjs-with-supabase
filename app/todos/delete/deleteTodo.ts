'use server'

import { createClient } from "@/lib/supabase/server";

export async function deleteTodo(todoId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoId);

  if (error) {
    throw new Error("Error deleting");
  }

  return { success: true };
}