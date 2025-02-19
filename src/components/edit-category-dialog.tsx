'use client';

import { useState } from 'react';
import { Category } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Palette } from 'lucide-react';
import { updateCategory } from '@/app/actions/todo';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EditCategoryDialogProps {
  category: Category;
}

export function EditCategoryDialog({ category }: EditCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const { toast } = useToast();
  const isDefault = category.name === 'デフォルト';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await updateCategory(category.id, { name, color });
      setOpen(false);
      toast({
        title: "カテゴリを更新しました",
        description: `"${category.name}"を更新しました。`,
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "カテゴリの更新に失敗しました。",
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
          disabled={isDefault}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            カテゴリを編集
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-purple-700 dark:text-purple-300">
              カテゴリ名
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="カテゴリ名"
              className="border-2 focus:border-purple-400 dark:focus:border-purple-500"
              disabled={isDefault}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-color" className="text-purple-700 dark:text-purple-300">
              テーマカラー
            </Label>
            <div className="relative">
              <Input
                id="edit-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-full cursor-pointer border-2 focus:border-purple-400 dark:focus:border-purple-500"
              />
              <Palette className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            </div>
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