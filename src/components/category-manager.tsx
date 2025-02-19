'use client';

import { useState } from 'react';
import { Category } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCategory } from '@/app/actions/todo';
import { Label } from '@/components/ui/label';

interface CategoryManagerProps {
  categories: Category[];
}

export function CategoryManager({
  categories,
}: CategoryManagerProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#808080');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createCategory(name, color);
    setName('');
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">カテゴリ管理</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category-name">カテゴリ名</Label>
          <Input
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="新しいカテゴリ名"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category-color">カラー</Label>
          <Input
            id="category-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-20"
          />
        </div>
        <Button type="submit">追加</Button>
      </form>

      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">既存のカテゴリ</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-2 p-2 border rounded"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 