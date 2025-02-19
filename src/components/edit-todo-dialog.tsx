'use client';

import { useState } from 'react';
import { Category, Todo } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { updateTodo } from '@/app/actions/todo';
import { useToast } from '@/hooks/use-toast';
import { CategorySelect } from './category-select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EditTodoDialogProps {
  todo: Todo & { category: Category | null };
  categories: Category[];
}

export function EditTodoDialog({ todo, categories }: EditTodoDialogProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(todo.text);
  const [categoryId, setCategoryId] = useState<string | undefined>(todo.categoryId ?? undefined);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await updateTodo(todo.id, { text, categoryId });
      setOpen(false);
      toast({
        title: "TODOを更新しました",
        description: `"${todo.text}"を更新しました。`,
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "TODOの更新に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {todo.category && (
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: todo.category.color }}
              />
            )}
            TODOを編集
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-text" className="text-purple-700 dark:text-purple-300">
              TODO内容
            </Label>
            <Input
              id="edit-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="TODO内容"
              className="border-2 focus:border-purple-400 dark:focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category" className="text-purple-700 dark:text-purple-300">
              カテゴリ
            </Label>
            <CategorySelect
              categories={categories}
              selectedCategoryId={categoryId}
              onSelect={setCategoryId}
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              更新
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 