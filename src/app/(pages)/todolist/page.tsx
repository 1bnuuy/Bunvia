"use client";

import { btnRelocate, btnScale } from "@/components/Theme";

import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AnimatePresence, motion } from "motion/react";

export default function Todolist() {
  return (
    <section className="dark:bg-primary-dark grid-background bg-primary h-dvh w-screen overflow-hidden pt-8 transition-all max-lg:pb-25 md:pt-15 lg:px-25">
      <div className="relative flex h-full flex-col items-center gap-4 px-4">
        <p className="text-subtext dark:text-subtext-dark text-lg text-balance">
          Let&apos;s see what we&apos;ve got to do today.
        </p>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            <motion.div
              key="yes"
              variants={btnRelocate}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="bg-secondary border-subtext dark:border-subtext-dark dark:bg-secondary-dark relative flex w-[90vw] max-w-[550px] items-center gap-4 overflow-hidden rounded-md border-1 px-3 py-2.5"
            >
              <input
                type="checkbox"
                className="peer absolute left-0 size-full cursor-pointer appearance-none"
              />
              <span className="text-heading peer-checked:text-accent dark:text-heading-dark text-lg">
                Walk the dog
              </span>
              <div className="z-40 ml-auto flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="bg-accent-hovered max-w-[28px] rounded-md p-1 text-xl"
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  className="bg-error-hovered text-error max-w-[28px] rounded-md p-1 text-xl"
                />
              </div>
            </motion.div>

            <button
              type="button"
              className="bg-secondary transition hover:bg-subtext dark:bg-secondary-dark border-1 border-heading dark:border-heading-dark w-full rounded-full py-3 cursor-pointer flex justify-center"
            >
              <FontAwesomeIcon icon={faPlus} className="text-heading dark:text-heading-dark"/>
            </button>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
