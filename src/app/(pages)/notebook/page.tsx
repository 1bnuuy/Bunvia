"use client";

import { useUI } from "@/components/UI";

export default function Notebook() {
  const { navOpen } = useUI();

  return (
    <section
      className={`h-dvh pt-[80px] transition ${navOpen ? "max-lg:pb-25" : "max-lg:pb-3"}`}
    >
      <div className="text-heading left-1/2 -translate-x-1/2 dark:text-heading-dark relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-5 px-3"><p className="text-heading-dark">Notebook</p></div>
    </section>
  );
}
