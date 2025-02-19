'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTodo } from '@/app/actions/todo';
import { Category } from '@prisma/client';
import { CategorySelect } from './category-select';

interface TodoInputProps {
  categories: Category[];
}

export function TodoInput({ categories }: TodoInputProps) {
  const [text, setText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await createTodo(text, selectedCategoryId);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいTODOを入力..."
        className="flex-1"
      />
      <CategorySelect
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelect={setSelectedCategoryId}
      />
      <Button type="submit">追加</Button>
    </form>
  );
} 