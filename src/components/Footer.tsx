import { btnScale, framerAnimProps, links, socialMedia } from "@/lib/variables";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

const MotionLink = motion.create(Link);
export default function Footer() {
  return (
    <>
      <footer className="bg-primary dark:bg-primary-dark border-tertiary dark:border-tertiary-dark z-30 flex w-full justify-around gap-15 border-t-2 px-8 py-15 transition max-sm:flex-col max-sm:items-center">
        <div className="text-center">
          <p className="text-heading dark:text-heading-dark text-2xl font-semibold">
            Success belongs to those <br /> who dare to pursue it
          </p>
          <p className="text-subtext dark:text-subtext-dark">
            Made with ❤️ from Vietnam
          </p>
          <p className="text-subtext dark:text-subtext-dark">© Bunvia 2025</p>
        </div>

        <div className="flex gap-20">
          <div className="flex flex-col items-center gap-3">
            <p className="text-heading dark:text-heading-dark text-xl font-semibold">
              Quick links
            </p>

            <AnimatePresence>
              {links.map((l) => {
                return (
                  <MotionLink
                    variants={btnScale}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{
                      duration: framerAnimProps.animDuration - 0.2,
                    }}
                    href={l.path}
                    key={l.path}
                    className="text-subtext dark:text-subtext-dark hover:text-heading dark:hover:text-heading-dark active:text-heading dark:active:text-heading-dark"
                  >
                    {l.name}
                  </MotionLink>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-heading dark:text-heading-dark text-xl font-semibold">
              Contact
            </p>

            <AnimatePresence>
              {socialMedia.map((sM) => {
                return (
                  <motion.a
                    variants={btnScale}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{
                      duration: framerAnimProps.animDuration - 0.2,
                    }}
                    href={sM.path}
                    key={sM.path}
                    aria-label={sM.name}
                    target="_blank"
                    className="text-subtext dark:text-subtext-dark hover:text-heading dark:hover:text-heading-dark active:text-heading dark:active:text-heading-dark"
                  >
                    {sM.name}
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </footer>
    </>
  );
}
