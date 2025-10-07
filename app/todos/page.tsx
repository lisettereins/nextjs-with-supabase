'use client'

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { deleteTodo } from "./delete/deleteTodo";

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

    const handleDelete = async (todoId: string) => {
        if (!confirm("Are you sure?")) {
          return
        }
    
       await deleteTodo(todoId)
        setTodos(todos?.filter(todo => todo.id !== todoId) || null)
        
      }

    return (
        <div>{todos?.map((todo) => (
            <div key={todo.id}>{todo.name} <button onClick={() => handleDelete(todo.id)}>🗑️</button></div>
        ))}</div>
    );
}