"use server";

import { createClient } from "@/lib/supabase/server";


export async function updateNote(noteId: string, title: string) {
    const supabase = await createClient();

    const {error} = await supabase.from("notes").update({title}).eq("id", noteId);

    if(error) {
        throw new Error("update failed");
    }
    return {success: true}
}