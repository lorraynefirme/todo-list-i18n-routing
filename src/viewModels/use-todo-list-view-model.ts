import { ITodoModel, Todo } from "@/models/todo-list-model";
import { useEffect, useMemo, useState, useTransition } from "react";

export type FilterStatus = "all" | "active" | "done";
export const useTodoListViewModel = (todoModel: ITodoModel) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    todoModel.list().then(setTodos);
  }, []);

  const filtered = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((item) => !item.done);
      case "done":
        return todos.filter((item) => item.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((item) => item.done).length;
    const active = total - completed;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, pct };
  }, [todos]);

  const add = async (title: string) => {
    if (!title.trim()) return;
    const created = await todoModel.add(title);
    startTransition(() => setTodos((prev) => [created, ...prev]));
  };

  const toggle = async (id: string) => {
    await todoModel.toggle(id);
    startTransition(() =>
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        )
      )
    );
  };

  const updateTitle = async (id: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await todoModel.updateTitle(id, trimmed);
    startTransition(() =>
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, title: trimmed } : item
        )
      )
    );
  };

  const remove = async (id: string) => {
    await todoModel.remove(id);
    startTransition(() =>
      setTodos((prev) => prev.filter((item) => item.id !== id))
    );
  };

  const clearCompleted = async () => {
    await todoModel.clearCompleted();
    startTransition(() =>
      setTodos((prev) => prev.filter((item) => !item.done))
    );
  };

  return {
    todos,
    filtered,
    filter,
    stats,
    isPending,
    setFilter,
    add,
    toggle,
    updateTitle,
    remove,
    clearCompleted,
  };
};
