import { Hero } from "@/components/sections/hero";
import { PopularTours } from "@/components/sections/popular-tours";
import { Fleet } from "@/components/sections/fleet";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularTours />
      <Fleet />
      <WhyChooseUs />
      <Testimonials />
      <CtaBand />
    </>
  );
}
