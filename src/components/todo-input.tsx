'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [newTodo, setNewTodo] = useState('');
  const { toast } = useToast();

  const handleAdd = () => {
    if (!newTodo.trim()) {
      toast({
        title: 'エラー',
        description: 'タスクを入力してください。',
        variant: 'destructive',
      });
      return;
    }

    onAdd(newTodo);
    setNewTodo('');
    toast({
      title: '追加完了',
      description: 'タスクを追加しました。',
    });
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="新しいタスクを入力..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <Button onClick={handleAdd}>追加</Button>
    </div>
  );
} 