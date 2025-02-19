'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function addTodo(text: string) {
  await prisma.todo.create({
    data: {
      text
    }
  })
  revalidatePath('/')
}

export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({
    where: { id }
  })
  if (todo) {
    await prisma.todo.update({
      where: { id },
      data: {
        completed: !todo.completed
      }
    })
    revalidatePath('/')
  }
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id }
  })
  revalidatePath('/')
} 