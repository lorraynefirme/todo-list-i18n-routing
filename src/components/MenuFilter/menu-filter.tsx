import { FilterStatus } from "@/viewModels/use-todo-list-view-model";

const statusOptions: { key: FilterStatus; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "active", label: "Ativas" },
  { key: "done", label: "Concluídas" },
];
export const MenuFilter = ({
  filter,
  setFilter,
}: {
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
}) => {
  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-slate-900/60 p-1">
      {statusOptions.map(({ key: statusFilter, label }) => (
        <button
          key={statusFilter}
          onClick={() => setFilter(statusFilter)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            filter === statusFilter
              ? "bg-white/10 text-white"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
