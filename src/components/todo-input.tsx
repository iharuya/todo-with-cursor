'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTodo } from '@/app/actions/todo';
import { Category } from '@prisma/client';
import { CategorySelect } from './category-select';
import { PlusCircle, Sparkles } from 'lucide-react';

interface TodoInputProps {
  categories: Category[];
  defaultCategoryId?: string;
}

export function TodoInput({ categories, defaultCategoryId }: TodoInputProps) {
  const [text, setText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(defaultCategoryId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await createTodo(text, selectedCategoryId);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 group">
      <div className="relative flex-1">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを追加..."
          className="pl-10 pr-4 transition-all border-2 focus:border-purple-400 dark:focus:border-purple-500 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm"
        />
        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 transition-transform group-hover:rotate-12" />
      </div>
      <CategorySelect
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelect={setSelectedCategoryId}
      />
      <Button 
        type="submit"
        className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
      >
        <span className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">追加</span>
        </span>
      </Button>
    </form>
  );
} 