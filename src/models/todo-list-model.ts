const STORAGE_KEY = "todo-list";
const uid = () => Math.random().toString(36).slice(2, 10);

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export interface ITodoModel {
  list(): Promise<Todo[]>;
  add(title: string): Promise<Todo>;
  toggle(id: string): Promise<void>;
  updateTitle(id: string, title: string): Promise<void>;
  remove(id: string): Promise<void>;
  clearCompleted(): Promise<void>;
}

export class TodoListModel implements ITodoModel {
  private cache: Todo[] = [];

  async list(): Promise<Todo[]> {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.cache = raw ? (JSON.parse(raw) as Todo[]) : [];
      } catch {
        this.cache = [];
      }
    }
    return [...this.cache];
  }

  private save(next: Todo[]) {
    this.cache = next;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
      } catch {}
    }
  }

  async add(title: string): Promise<Todo> {
    const item: Todo = {
      id: uid(),
      title: title.trim(),
      done: false,
      createdAt: Date.now(),
    };
    const next = [item, ...this.cache];
    this.save(next);
    return item;
  }

  async toggle(id: string): Promise<void> {
    const next = this.cache.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    this.save(next);
  }

  async updateTitle(id: string, title: string): Promise<void> {
    const trimmed = title.trim();
    const next = this.cache.map((item) =>
      item.id === id ? { ...item, title: trimmed } : item
    );
    this.save(next);
  }

  async remove(id: string): Promise<void> {
    const next = this.cache.filter((item) => item.id !== id);
    this.save(next);
  }

  async clearCompleted(): Promise<void> {
    const next = this.cache.filter((item) => !item.done);
    this.save(next);
  }
}
