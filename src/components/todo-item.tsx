'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { type Todo, type Category } from '@prisma/client';
import { toggleTodoAction, deleteTodoAction } from '@/app/actions/todo';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { EditTodoDialog } from '@/components/edit-todo-dialog';

interface TodoItemProps {
  todo: Todo & { category: Category | null };
  categories: Category[];
}

export function TodoItem({ todo, categories }: TodoItemProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

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
      setIsDeleting(true);
      await deleteTodoAction(todo.id);
      toast({
        title: '削除完了',
        description: 'タスクを削除しました'
      });
    } catch (error) {
      toast({
        title: 'エラー',
        description: '削除に失敗しました。',
        variant: 'destructive'
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn(
      "group flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
      "hover:bg-white/30 dark:hover:bg-gray-800/30 backdrop-blur-sm",
      "border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
      isDeleting && "opacity-50 pointer-events-none",
      todo.completed && "bg-gray-50/50 dark:bg-gray-900/50"
    )}>
      <div 
        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
        onClick={handleToggle}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <Checkbox 
          checked={todo.completed} 
          onCheckedChange={handleToggle}
          className="transition-all data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
          onClick={(e) => e.stopPropagation()}
        />
        <span className={cn(
          "flex-1 truncate transition-all duration-300",
          todo.completed && "line-through text-gray-500",
          "group-hover:text-purple-700 dark:group-hover:text-purple-300"
        )}>
          {todo.text}
        </span>
        {todo.category && (
          <div
            className="px-2 py-1 rounded text-sm"
            style={{
              backgroundColor: `${todo.category.color}20`,
              color: todo.category.color,
            }}
          >
            {todo.category.name}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        <EditTodoDialog todo={todo} categories={categories} />
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
          aria-label="タスクを削除"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
} 