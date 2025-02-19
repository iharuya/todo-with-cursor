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

async function getOrCreateDefaultCategory() {
  const defaultCategory = await prisma.category.upsert({
    where: { name: 'デフォルト' },
    update: {},
    create: {
      name: 'デフォルト',
      color: '#808080',
    },
  });
  return defaultCategory;
}

export async function createTodo(text: string, categoryId?: string) {
  // カテゴリIDが指定されていない場合、デフォルトカテゴリを取得または作成
  if (!categoryId) {
    const defaultCategory = await getOrCreateDefaultCategory();
    categoryId = defaultCategory.id;
  }

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

export async function deleteCategory(id: string) {
  if (id === undefined) {
    throw new Error('Invalid input');
  }

  // デフォルトカテゴリは削除できないようにする
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (category?.name === 'デフォルト') {
    throw new Error('デフォルトカテゴリは削除できません');
  }

  // トランザクションを使用して、カテゴリとそれに属するTODOを削除
  await prisma.$transaction([
    // このカテゴリに属するTODOを削除
    prisma.todo.deleteMany({
      where: { categoryId: id },
    }),
    // カテゴリを削除
    prisma.category.delete({
      where: { id },
    }),
  ]);

  revalidatePath('/');
}

export async function updateCategory(id: string, data: { name: string; color: string }) {
  if (id === undefined) {
    throw new Error('Invalid input');
  }

  // デフォルトカテゴリの名前は変更できないようにする
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (category?.name === 'デフォルト' && data.name !== 'デフォルト') {
    throw new Error('デフォルトカテゴリの名前は変更できません');
  }

  const updated = await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      color: data.color,
    },
  });

  revalidatePath('/');
  return updated;
} 