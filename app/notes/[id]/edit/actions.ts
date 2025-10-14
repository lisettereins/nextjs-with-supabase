"use server";

import { createClient } from "@/lib/supabase/client";


export async function page(noteId: string, title: string) {
    const supabase = await createClient();

    const {error} = await supabase.from("notes").update({title}).eq("id", noteId);

    if(error) {
        throw new Error("update failed");
    }
    return {success: true}
}