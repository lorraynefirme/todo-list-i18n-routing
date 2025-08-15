import { TodoListView } from "@/views/todo-list-view";

export default function Home() {
  return (
    <div className="min-h-[100vh] w-full grid place-items-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          <TodoListView />
        </div>
      </div>
    </div>
  );
}
