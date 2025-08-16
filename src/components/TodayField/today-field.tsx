import { useLocale } from "next-intl";

export const TodayField = () => {
  const locale = useLocale();

  const today = new Date();
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatted = formatter.format(today);
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return (
    <div className="text-slate-800 text-sm font-medium">{capitalized}</div>
  );
};
