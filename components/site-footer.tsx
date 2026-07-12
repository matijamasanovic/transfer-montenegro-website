import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const NAV = [
    { href: "/", label: nav("home") },
    { href: "/ture", label: nav("tours") },
    { href: "/o-nama", label: nav("about") },
    { href: "/kontakt", label: nav("contact") },
  ];

  return (
    <footer className="bg-[#060E24] text-white">
      <div className="h-1 w-full bg-[#00C2E8]" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/">
              <img
                src="/mtg-logo.png"
                alt="Montenegro Transfer Group"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
              {t("navTitle")}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-[#00C2E8]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
              {t("contactTitle")}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#00C2E8]" /> + 382 68 861 538
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#00C2E8]" />{" "}
                montenegrotransfergroup@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#00C2E8]" /> Podgorica, Crna
                Gora
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
              {t("socialTitle")}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mtgtransfergroup/"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:border-[#00C2E8] hover:text-[#00C2E8]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
