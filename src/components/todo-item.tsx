'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.text}
        </span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(todo.id)}
      >
        削除
      </Button>
    </div>
  );
} 