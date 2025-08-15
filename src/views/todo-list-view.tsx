"use client";

import { useTodoListViewModel } from "@/viewModels/use-todo-list-view-model";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListChecks, Plus, X } from "lucide-react";
import { MenuFilter } from "@/components/MenuFilter/menu-filter";
import { TodoItem } from "@/components/TodoItem/todo-item";
import { TodayField } from "@/components/TodayField/today-field";
import { Button } from "@/components/Button/button";
import { TodoListModel } from "@/models/todo-list-model";

export const TodoListView = () => {
  const todoModel = useMemo(() => new TodoListModel(), []);
  const {
    isPending,
    add,
    remove,
    toggle,
    updateTitle,
    clearCompleted,
    filter,
    stats,
    setFilter,
    filtered,
    todos,
  } = useTodoListViewModel(todoModel);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    add(input).then(() => setInput(""));
    inputRef.current?.focus();
  }

  return (
    <div className="py-3">
      <div className=" px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-300/30">
            <ListChecks className="size-6 text-pink-400" aria-hidden />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-800 white tracking-tight">
              Tarefas
            </h1>
            <TodayField />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[160px]">
            <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
              <motion.div
                className="h-full bg-pink-400"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={stats.pct}
                initial={{ width: 0 }}
                animate={{ width: `${stats.pct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-800/70">
              {stats.completed} de {stats.total} concluídas ({stats.pct}%)
            </p>
          </div>
          <MenuFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>

      <form onSubmit={onSubmit} className="px-6 pb-4">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Adicionar nova tarefa..."
            aria-label="Adicionar nova tarefa"
            className="w-full h-11 px-4 rounded-xl bg-slate-900/70 text-slate-100 placeholder:text-slate-400 outline-none border border-white/10 focus:border-pink-400/60 focus:ring-4 focus:ring-pink-500/10 transition"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isPending}
            className="h-11 px-4 rounded-xl inline-flex items-center gap-2 font-medium bg-pink-400/90 hover:bg-pink-400 text-white disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition"
            aria-label="Adicionar tarefa"
          >
            <Plus className="size-5" aria-hidden />
            <span className="hidden sm:inline">Adicionar</span>
          </Button>
        </div>
      </form>

      <div className="px-2 sm:px-4 pb-6">
        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {filtered.length === 0 && (
              <motion.li
                key="empty"
                className="mx-4 mt-2 rounded-xl border border-white/10 bg-slate-900/50 p-6 text-center text-slate-300"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {todos.length === 0
                  ? "Sem tarefas por aqui. Que tal criar a primeira?"
                  : "Nada por aqui com esse filtro."}
              </motion.li>
            )}

            {filtered.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 140, damping: 16 }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={toggle}
                  onUpdate={(id, title) =>
                    title.trim() ? updateTitle(id, title) : remove(id)
                  }
                  onRemove={remove}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
          <p className="text-xs text-slate-800">
            Dica: duplo clique na tarefa para editar.
          </p>
          <button
            onClick={clearCompleted}
            disabled={!todos.some((t) => t.done)}
            className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-white/10 bg-pink-900/40 hover:bg-pink-00/70 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <X className="size-4" aria-hidden />
            Limpar concluídas
          </button>
        </div>
      </div>
    </div>
  );
};
