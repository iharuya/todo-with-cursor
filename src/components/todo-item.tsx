'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { type Todo } from '@/app/actions';
import { toggleTodoAction, deleteTodoAction } from '@/app/actions/todo';
import { useToast } from '@/hooks/use-toast';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toast } = useToast();

  const handleToggle = async () => {
    try {
      await toggleTodoAction(todo.id, !todo.completed);
    } catch (error) {
      toast({
        title: 'エラー',
        description: '更新に失敗しました。',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodoAction(todo.id);
      toast({
        title: '削除完了',
        description: 'Todoが削除されました。'
      });
    } catch (error) {
      toast({
        title: 'エラー',
        description: '削除に失敗しました。',
        variant: 'destructive'
      });
    }
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