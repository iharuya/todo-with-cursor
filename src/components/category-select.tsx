'use client';

import { Category } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategorySelectProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelect: (categoryId: string) => void;
}

export function CategorySelect({
  categories,
  selectedCategoryId,
  onSelect,
}: CategorySelectProps) {
  return (
    <Select value={selectedCategoryId} onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="カテゴリを選択" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
            className="flex items-center gap-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 