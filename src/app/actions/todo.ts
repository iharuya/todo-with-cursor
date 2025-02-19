'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleTodoAction(id: string, completed: boolean) {
  if (typeof id !== 'string' || typeof completed !== 'boolean') {
    throw new Error('Invalid input')
  }

  await prisma.todo.update({
    where: { id },
    data: { completed }
  })
  revalidatePath('/')
}

export async function deleteTodoAction(id: string) {
  if (typeof id !== 'string') {
    throw new Error('Invalid input')
  }

  await prisma.todo.delete({
    where: { id }
  })
  revalidatePath('/')
} 