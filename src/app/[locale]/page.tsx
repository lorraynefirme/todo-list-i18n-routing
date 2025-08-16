import LocaleSwitcher from "@/components/Switcher/locale-switcher";
import { TodoListView } from "@/views/todo-list-view";

export default function Home() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center w-full  place-items-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col jus gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <div className="self-end mt-3 mr-2">
            <LocaleSwitcher />
          </div>
          <TodoListView />
        </div>
      </div>
    </div>
  );
}
