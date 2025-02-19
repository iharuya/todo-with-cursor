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

export async function createCategory(name: string, color: string) {
  const category = await prisma.category.create({
    data: {
      name,
      color,
    },
  });
  revalidatePath('/');
  return category;
}

export async function getCategories() {
  return await prisma.category.findMany({
    include: {
      todos: true,
    },
  });
}

export async function createTodo(text: string, categoryId?: string) {
  const todo = await prisma.todo.create({
    data: {
      text,
      categoryId,
    },
    include: {
      category: true,
    },
  });
  revalidatePath('/');
  return todo;
}

// デフォルトカテゴリの作成と既存TODOの移行
export async function migrateToCategories() {
  const defaultCategory = await prisma.category.upsert({
    where: { name: 'デフォルト' },
    update: {},
    create: {
      name: 'デフォルト',
      color: '#808080', // グレー
    },
  });

  // カテゴリが設定されていない全てのTODOを更新
  await prisma.todo.updateMany({
    where: {
      categoryId: null,
    },
    data: {
      categoryId: defaultCategory.id,
    },
  });

  return defaultCategory;
} 