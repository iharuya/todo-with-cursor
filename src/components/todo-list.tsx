import { getTodos } from '@/app/actions'
import { TodoItem } from './todo-item'
import { ClipboardList } from 'lucide-react'

export async function TodoList() {
  const todos = await getTodos()

  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border-2 border-dashed border-purple-200 dark:border-purple-800">
          <ClipboardList className="w-12 h-12 text-purple-400 animate-pulse" />
          <div className="space-y-1">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300">タスクがありません</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">新しいタスクを追加してみましょう！</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
} 