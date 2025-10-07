'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

type Note = {
  id: number
  title: string
}

export default function Page() {
  const [notes, setNotes] = useState<Note[] | null>(null)
  

  useEffect(() => {
    const supabase = createClient()

    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return (
    <div className='mx-auto flex-col max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'>
      <h2 className='text-3xl font-bold text-black dark:text-white'>Notes</h2>
      <ul>
        {notes?.map(note => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
    
  );
}