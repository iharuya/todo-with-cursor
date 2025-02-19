'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { deleteTodo, toggleTodo } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toast } = useToast();

  const handleToggle = async () => {
    await toggleTodo(todo.id);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    toast({
      title: '削除完了',
      description: 'Todoが削除されました。'
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={todo.completed} onCheckedChange={handleToggle} />
      <span className={todo.completed ? 'line-through text-gray-500' : ''}>
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        className="ml-auto text-red-500 hover:text-red-700"
      >
        削除
      </button>
    </div>
  );
} 