"use client";

import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { mergeClassNames } from "@/utils/merge-class-names";
import { ChevronDown } from "lucide-react";

interface LocaleSwitcherSelectProps {
  children: ReactNode;
  defaultValue: string;
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div
      className={mergeClassNames(
        "relative flex flex-row justify-center items-center w-full bg-blue-300/30 rounded-xl appearance-none  text-gray-700",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <select
        className="appearance-none  bg-transparent border-0 cursor-pointer px-9 mr-2.5 py-1.5 focus:outline-none hover:bg-gray-300"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <ChevronDown
        className={"absolute pointer-events-none  right-5"}
        size={15}
      />
    </div>
  );
}
