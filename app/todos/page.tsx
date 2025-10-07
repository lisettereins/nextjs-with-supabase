'use client'

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [todos, setTodos] = useState<any[] | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const {data} = await supabase.from('todo').select()
            setTodos(data)
        }
        getData()
    }, [supabase]);

    return (
        <div>{todos?.map((todo) => (
            <div key={todo.id}>{todo.name}</div>
        ))}</div>
    );
}