'use client'
import { useState } from "react";
import { updateTodo } from "./action";
import { useRouter } from "next/navigation";

export default function EditTodoForm({todo}: {todo: {id: string; name: string}}){
    const [name, setName] = useState(todo.name);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await updateTodo(todo.id, name);
        router.push("/todos");
        
    }

    return(
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        placeholder="Edit title..."
      />
      <button
        type="submit"
        
        className="bg-gray-50 text-black p-2 rounded hover:bg-gray-200"
      >
        Save changes
      </button>
    </form>
    )

}