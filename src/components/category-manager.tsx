'use client';

import { useState } from 'react';
import { Category } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCategory, deleteCategory } from '@/app/actions/todo';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Plus, FolderKanban, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CategoryManagerProps {
  categories: Category[];
}

export function CategoryManager({
  categories,
}: CategoryManagerProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#808080');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory(name, color);
      setName('');
      toast({
        title: "カテゴリを作成しました",
        description: `"${name}"を作成しました。`,
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "カテゴリの作成に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (category: Category) => {
    if (category.name === 'デフォルト') {
      toast({
        title: "削除できません",
        description: "デフォルトカテゴリは削除できません。",
        variant: "destructive",
      });
      return;
    }

    if (!confirm(`カテゴリ"${category.name}"を削除しますか？\n※このカテゴリに属する全てのTODOも削除されます。`)) {
      return;
    }

    try {
      await deleteCategory(category.id);
      toast({
        title: "カテゴリを削除しました",
        description: `"${category.name}"を削除しました。`,
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "カテゴリの削除に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-900">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-purple-500" />
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            カテゴリ管理
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name" className="text-purple-700 dark:text-purple-300">
              カテゴリ名
            </Label>
            <div className="relative">
              <Input
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="新しいカテゴリ名"
                className="pl-10 border-2 focus:border-purple-400 dark:focus:border-purple-500"
              />
              <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-color" className="text-purple-700 dark:text-purple-300">
              テーマカラー
            </Label>
            <div className="relative">
              <Input
                id="category-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-full cursor-pointer border-2 focus:border-purple-400 dark:focus:border-purple-500"
              />
              <Palette className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            </div>
          </div>
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            カテゴリを追加
          </Button>
        </form>

        <div className="pt-4 border-t border-purple-100 dark:border-purple-800">
          <h4 className="text-sm font-semibold mb-3 text-purple-700 dark:text-purple-300">
            既存のカテゴリ
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-2 p-3 rounded-lg transition-all duration-200
                         hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm
                         border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800"
              >
                <div
                  className="w-4 h-4 rounded-full ring-2 ring-purple-200 dark:ring-purple-800"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium text-gray-700 dark:text-gray-300 flex-1">
                  {category.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(category)}
                  className={`h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 
                           ${category.name === 'デフォルト' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={category.name === 'デフォルト'}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 