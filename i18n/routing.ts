import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cnr", "en", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});
