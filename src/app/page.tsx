import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TodoList } from '@/components/todo-list';

export default function TodoApp() {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">TODOアプリ</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <TodoList />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
