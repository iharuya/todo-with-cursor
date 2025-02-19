import { getTodos } from '@/app/actions'
import { TodoItem } from './todo-item'

export async function TodoList() {
  const todos = await getTodos()

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
} 