import { Todo } from "@/models/todo-list-model";
import { Check, ListChecks, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { EditField } from "../TodoItemEdit/todo-item-edit";
import { mergeClassNames } from "@/utils/merge-class-names";
import { Button } from "../Button/button";

export const TodoItem = ({
  todo,
  onToggle,
  onUpdate,
  onRemove,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onRemove: (id: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  return (
    <li className="mx-2 sm:mx-2 rounded-xl bg-slate-900/70 border border-white/10 hover:border-pink-400/40 focus-within:border-pink-400/60 shadow-sm">
      <div className="flex items-center gap-3 p-3">
        <Button
          onClick={() => onToggle(todo.id)}
          className={mergeClassNames(
            "grid place-items-center size-6 rounded-md border transition",
            todo.done
              ? "bg-emerald-500/20 border-emerald-400/60"
              : "bg-slate-950/60 border-white/10 hover:border-slate-400/40"
          )}
          aria-checked={todo.done}
          role="checkbox"
          aria-label={
            todo.done ? "Marcar como não concluída" : "Marcar como concluída"
          }
        >
          {todo.done && (
            <Check className="size-4 text-emerald-300" aria-hidden />
          )}
        </Button>

        {editing ? (
          <EditField
            initial={todo.title}
            onCommit={(val) => {
              onUpdate(todo.id, val);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <Button
            onDoubleClick={() => setEditing(true)}
            className="group text-left flex-1"
            aria-label="Editar tarefa"
          >
            <p
              className={mergeClassNames(
                "select-text break-words text-slate-100 group-hover:text-white/95",
                todo.done && "line-through text-slate-400"
              )}
            >
              {todo.title}
            </p>
          </Button>
        )}

        {!editing && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditing(true)}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition"
              aria-label="Editar tarefa"
            >
              <Pencil className="size-4" aria-hidden />
            </button>
            <button
              onClick={() => onRemove(todo.id)}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-rose-200 transition"
              aria-label="Remover tarefa"
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};
