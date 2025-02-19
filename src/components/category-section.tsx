'use client';

import { Category } from '@prisma/client';
import { CategoryManager } from './category-manager';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <div className="md:col-span-1">
      <CategoryManager categories={categories} />
    </div>
  );
} 