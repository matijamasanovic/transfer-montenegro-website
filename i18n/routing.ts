import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cnr", "en", "ru"],
  defaultLocale: "cnr",
  localePrefix: "as-needed",
  localeDetection: false,
});
