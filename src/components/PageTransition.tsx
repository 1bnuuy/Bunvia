"use client";

import { framerAnimProps } from "@/lib/variables";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location}>
        {[
          Array.from({ length: 5 }).map((_, index: number) => {
            const top = index * 20;
            const delay = index * 0.08;
            const origin = index % 2 === 0 ? "left" : "right";

            return (
              <motion.span
                key={index}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 1 }}
                transition={{
                  duration: framerAnimProps.animDuration - 0.1,
                  delay: delay,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                style={{ top: `${top}vh`, transformOrigin: `${origin}` }}
                className="bg-accent dark:bg-accent-dark fixed z-50 h-[21vh] w-screen"
              />
            );
          }),
        ]}
        <motion.div
          key="content"
          initial={{ opacity: 0, transition: { duration: 0 } }}
          animate={{
            opacity: 1,
            transition: { delay: framerAnimProps.animDelay - 0.05 },
          }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
