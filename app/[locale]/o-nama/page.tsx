import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/anim/reveal";
import { Users, MapPinned, ThumbsUp, Languages } from "lucide-react";
import { getTranslations } from "next-intl/server";

const VALUE_ICONS = [Users, MapPinned, Languages, ThumbsUp];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return {
    title: `${t("eyebrow")} — Montenegro Transfer Group`,
    description: t("subtitle"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const stats = t.raw("stats") as { value: string; label: string }[];
  const values = t.raw("values") as { title: string; desc: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-[#0A1A3E] mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/images/about-driver.png"
                alt={t("imgAlt")}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                {t("storyTitle1")}{" "}
                <span className="text-[#00C2E8]">{t("storyHighlight")}</span>
              </h2>
              <p className="mt-4 leading-relaxed text-white/60">
                {t("storyP1")}
              </p>
              <p className="mt-4 leading-relaxed text-white/60">
                {t("storyP2")}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/10 bg-[#0D1F4E] p-4 text-center"
                  >
                    <div className="font-heading text-2xl font-bold text-[#00C2E8]">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0D1F4E] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-bold text-white sm:text-4xl">
              {t("valuesTitle1")}{" "}
              <span className="text-[#00C2E8]">{t("valuesHighlight")}</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#0A1A3E] p-7 transition hover:border-[#00C2E8]/30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#00C2E8]/10">
                      <Icon className="h-7 w-7 text-[#00C2E8]" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
