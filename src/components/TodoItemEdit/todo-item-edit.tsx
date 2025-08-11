import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/button";

export const EditField = ({
  initial,
  onCommit,
  onCancel,
}: {
  initial: string;
  onCommit: (v: string) => void;
  onCancel: () => void;
}) => {
  const [value, setValue] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  const onKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onCommit(value);
    if (event.key === "Escape") onCancel();
  };

  return (
    <div className="flex-1 flex items-center gap-2">
      <input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKey}
        aria-label="Editar título da tarefa"
        className="w-full h-10 px-3 rounded-lg bg-slate-950/60 text-slate-100 placeholder:text-slate-400 outline-none border border-white/10 focus:border-pink-400/60 focus:ring-4 focus:ring-pink-500/10 transition"
      />
      <Button
        onClick={() => onCommit(value)}
        className="p-2 rounded-lg hover:bg-white/5 text-emerald-200 transition"
        aria-label="Salvar edição"
      >
        <Check className="size-4" aria-hidden />
      </Button>
      <Button
        onClick={onCancel}
        className="p-2 rounded-lg hover:bg-white/5 text-rose-200 transition"
        aria-label="Cancelar edição"
      >
        <X className="size-4" aria-hidden />
      </Button>
    </div>
  );
};
