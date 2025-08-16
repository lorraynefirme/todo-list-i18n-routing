import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./local-switcher-select";

const languages = {
  "pt-BR": "Português (Brasil)",
  en: "English",
};
export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {routing.locales.map((cur) => (
        <option
          key={cur}
          value={cur}
          className="text-gray-700 bg-gray-200 checked:bg-gray-400"
        >
          {languages[cur]}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
