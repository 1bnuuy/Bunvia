"use client";

import { useUI } from "@/components/UI";

export default function Analytics() {
  const { navOpen } = useUI();

  return (
    <section
      className={`h-dvh pt-[80px] transition ${navOpen ? "max-lg:pb-25" : "max-lg:pb-3"} lg:px-30`}
    >
      <p className="text-heading-dark">Analytics</p>
    </section>
  );
}
