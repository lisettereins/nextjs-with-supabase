"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateTodo(todoId: string, name: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("todos")
    .update({ name })
    .eq("id", todoId);

  if (error) {
    throw new Error("update failed");
  }
  return { success: true };
}
