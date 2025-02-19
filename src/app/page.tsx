import { TodoInput } from '@/components/todo-input'
import { TodoList } from '@/components/todo-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <main className="container max-w-2xl mx-auto p-4 py-8 space-y-6">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          TODOリスト
        </h1>
        <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
      </div>
      
      <Card className="border-2 border-purple-200 dark:border-purple-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-gray-700 dark:text-gray-200">今日のタスク</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TodoInput />
          <TodoList />
        </CardContent>
      </Card>
    </main>
  )
}
