import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const translate = useTranslations("NotFoundPage");

  return <h1 className="max-w-[460px]">({translate("title")})</h1>;
}
