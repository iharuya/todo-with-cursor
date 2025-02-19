'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getTodos(): Promise<Todo[]> {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function addTodo(formData: FormData) {
  const text = formData.get('text')
  if (!text || typeof text !== 'string') return

  await prisma.todo.create({
    data: { text }
  })
  revalidatePath('/')
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed }
  })
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id }
  })
  revalidatePath('/')
} 