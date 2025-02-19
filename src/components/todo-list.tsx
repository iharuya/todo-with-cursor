'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Todo } from '@/types/todo';
import { TodoItem } from '@/components/todo-item';
import { TodoInput } from '@/components/todo-input';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text: string) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([...todos, todo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast({
      title: '削除完了',
      description: 'タスクを削除しました。',
    });
  };

  return (
    <div>
      <TodoInput onAdd={handleAddTodo} />
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
} 