"use client";

import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useBooking } from "@/components/booking/booking-provider";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "cnr", label: "MNE" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const NAV = [
    { href: "/", label: t("home") },
    { href: "/ture", label: t("tours") },
    { href: "/o-nama", label: t("about") },
    { href: "/kontakt", label: t("contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0A1A3E]/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <img
            src="/mtg-logo.png"
            alt="Montenegro Transfer Group"
            className="h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#00C2E8]/15 text-[#00C2E8]"
                  : scrolled
                  ? "text-white/70 hover:text-white"
                  : "text-white/80 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-xl border border-white/20 px-3 py-2 text-sm font-medium text-white transition hover:border-[#00C2E8]/50 hover:text-[#00C2E8]"
            >
              <Globe className="h-4 w-4" />
              {LOCALES.find((l) => l.code === locale)?.label ?? "MNE"}
            </button>

            {langOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setLangOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-2 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0D1F4E] shadow-xl">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => switchLocale(l.code)}
                      className={cn(
                        "px-5 py-2.5 text-left text-sm font-medium transition hover:bg-[#00C2E8]/10 hover:text-[#00C2E8]",
                        locale === l.code ? "text-[#00C2E8]" : "text-white/70"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => openBooking()}
            className="hidden items-center gap-2 rounded-xl bg-[#00C2E8] px-5 py-2.5 text-sm font-semibold text-[#0A1A3E] shadow-sm transition hover:bg-[#00D4FF] active:scale-95 lg:flex"
          >
            {t("bookRide")}
          </button>

          <button
            type="button"
            aria-label="Meni"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition hover:border-[#00C2E8]/50 hover:text-[#00C2E8] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0A1A3E] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-[#00C2E8]/15 text-[#00C2E8]"
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex gap-2">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    switchLocale(l.code);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "flex-1 rounded-xl border py-2.5 text-sm font-medium transition",
                    locale === l.code
                      ? "border-[#00C2E8] bg-[#00C2E8]/10 text-[#00C2E8]"
                      : "border-white/20 text-white/70 hover:text-white"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openBooking();
              }}
              className="mt-2 rounded-xl bg-[#00C2E8] px-4 py-3 text-sm font-semibold text-[#0A1A3E] transition hover:bg-[#00D4FF]"
            >
              {t("bookRide")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
