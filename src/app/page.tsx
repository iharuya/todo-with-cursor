import { TodoInput } from '@/components/todo-input'
import { TodoList } from '@/components/todo-list'

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Todoリスト</h1>
      <TodoInput />
      <TodoList />
    </main>
  )
}
