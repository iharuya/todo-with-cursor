'use client';

import { addTodo } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Sparkles } from 'lucide-react'
import { useFormStatus } from 'react-dom';

export function TodoInput() {
  const { pending } = useFormStatus()

  return (
    <form action={addTodo} className="flex gap-2 group">
      <div className="relative flex-1">
        <Input
          type="text"
          name="text"
          placeholder="新しいタスクを追加..."
          className="pl-10 pr-4 transition-all border-2 focus:border-purple-400 dark:focus:border-purple-500 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm"
          required
          disabled={pending}
        />
        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 transition-transform group-hover:rotate-12" />
      </div>
      <Button 
        type="submit" 
        disabled={pending}
        className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
      >
        <span className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">追加</span>
        </span>
        {pending && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </span>
        )}
      </Button>
    </form>
  )
} 