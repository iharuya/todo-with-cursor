import { TodoInput } from '@/components/todo-input'
import { TodoList } from '@/components/todo-list'
import { CategorySection } from '@/components/category-section'
import { CategoryFilter } from '@/components/category-filter'
import { getCategories } from './actions/todo'
import { prisma } from '@/lib/prisma'
import { ListTodo, Sparkles } from 'lucide-react'

interface HomeProps {
  searchParams: Promise<{ category?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams
  const categories = await getCategories()
  
  // カテゴリでフィルタリングされたTODOを取得
  const todos = await prisma.todo.findMany({
    where: category ? {
      categoryId: category
    } : undefined,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="max-w-6xl mx-auto p-4 py-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <ListTodo className="w-8 h-8 text-purple-500" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          TODOリスト
        </h1>
        <Sparkles className="w-8 h-8 text-purple-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800">
            <TodoInput 
              categories={categories} 
              defaultCategoryId={category}
            />
          </div>
          <CategoryFilter categories={categories} />
          <TodoList todos={todos} />
        </div>
        
        <div className="hidden md:block">
          <div className="sticky top-4">
            <CategorySection categories={categories} />
          </div>
        </div>
      </div>
    </main>
  )
}
