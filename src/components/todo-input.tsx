'use client';

import { addTodo } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function TodoInput() {
  return (
    <form action={addTodo} className="flex gap-2">
      <Input
        type="text"
        name="text"
        placeholder="新しいTodoを入力..."
        className="flex-1"
        required
      />
      <Button type="submit">追加</Button>
    </form>
  )
} 