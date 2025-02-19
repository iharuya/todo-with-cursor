import { TodoInput } from '@/components/todo-input'
import { TodoList } from '@/components/todo-list'
import { CategorySection } from '@/components/category-section'
import { getCategories, migrateToCategories } from './actions/todo'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  // デフォルトカテゴリの作成と既存TODOの移行
  await migrateToCategories()
  
  const categories = await getCategories()
  const todos = await prisma.todo.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">TODOアプリ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <TodoInput categories={categories} />
            <TodoList todos={todos} />
          </div>
        </div>
        
        <CategorySection categories={categories} />
      </div>
    </main>
  )
}
