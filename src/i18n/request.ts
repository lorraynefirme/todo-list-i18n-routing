import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "pt-BR";

  return {
    locale,
    messages: (await import(`@/i18n/locales/${locale}/common.json`)).default,
  };
});
