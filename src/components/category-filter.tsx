'use client';

import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FolderKanban } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get('category');

  const handleCategoryClick = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant="ghost"
        onClick={() => handleCategoryClick(null)}
        className={`flex items-center gap-2 h-9 px-4 transition-all
                   ${!currentCategoryId ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300' : ''}`}
      >
        <FolderKanban className="w-4 h-4" />
        全て
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          onClick={() => handleCategoryClick(category.id)}
          className={`flex items-center gap-2 h-9 px-4 transition-all
                     ${currentCategoryId === category.id ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300' : ''}`}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          {category.name}
        </Button>
      ))}
    </div>
  );
} 