"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faPlus } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import { availablePaths, btnScale } from "@/lib/variables";
import { links } from "@/lib/variables";
import { useUI } from "./UI";

const MotionLink = motion.create(Link);

export default function Nav() {
  const { navOpen, navToggle } = useUI();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const isAvailable = availablePaths.includes(pathname);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      {isAvailable && (
        <nav
          className={`bg-secondary border-accent flex ${navOpen ? "left-4 max-lg:bottom-4" : "-left-21 max-lg:-bottom-18"} dark:border-accent-dark dark:bg-secondary-dark max-xs:gap-2 fixed z-40 items-start justify-between gap-8 rounded-md border-1 px-4 text-nowrap transition-all select-none max-lg:left-1/2 max-lg:h-18 max-lg:min-w-[260px] max-lg:-translate-x-1/2 max-lg:items-center max-lg:px-8 lg:top-1/2 lg:w-20 lg:-translate-y-1/2 lg:flex-col lg:py-8`}
        >
          <MotionLink
            variants={btnScale}
            whileHover="hover"
            whileTap="tap"
            initial="initial"
            key="loginButton"
            href="/auth"
            className="ring-offset-secondary xs:flex hover:ring-accent dark:hover:ring-accent-dark active:ring-accent dark:active:ring-accent-dark ring-tertiary dark:ring-offset-secondary-dark dark:ring-tertiary-dark bg-tertiary dark:bg-tertiary-dark relative hidden aspect-square min-w-[48px] basis-[48px] cursor-pointer items-center justify-center overflow-hidden rounded-full hover:ring-2 hover:ring-offset-3 active:ring-2 active:ring-offset-3"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-heading dark:text-heading-dark text-2xl"
            />
          </MotionLink>

          <div className="max-xs:gap-3 flex gap-4 max-lg:w-full max-lg:justify-center max-lg:rounded-md lg:flex-col">
            <AnimatePresence>
              {links.map((link, index) => {
                return (
                  <motion.div
                    whileHover="hover"
                    whileTap="hover"
                    initial="initial"
                    key={index}
                    className="relative flex items-center gap-6 max-lg:justify-center"
                  >
                    <Link
                      className={`text-2xl ${link.path === pathname ? "text-accent dark:text-accent-dark" : "hover:text-subtext dark:hover:text-subtext-dark text-heading dark:text-heading-dark"}`}
                      href={link.path}
                    >
                      {link.icon && (
                        <div className="relative flex">
                          <span
                            className={`absolute ${link.path === pathname ? "block" : "hidden"} bg-accent dark:bg-accent-dark -top-3 h-1.25 w-full max-lg:rounded-b-full lg:top-0 lg:-left-4 lg:h-full lg:w-1.25 lg:rounded-r-full`}
                          ></span>
                          <motion.button
                            variants={btnScale}
                            whileHover="hover"
                            whileTap="tap"
                            initial="initial"
                            className={`size-[48px] cursor-pointer rounded-md ${link.path === pathname && "bg-tertiary dark:bg-tertiary-dark"}`}
                          >
                            <FontAwesomeIcon
                              icon={link.icon}
                              className="px-[9px] py-3"
                            />
                          </motion.button>
                        </div>
                      )}
                    </Link>

                    {
                      <motion.span
                        variants={{
                          initial: { opacity: 0, x: 0, y: 0 },
                          hover: {
                            opacity: 1,
                            x: isMobile ? 0 : -22,
                            y: isMobile ? -22 : 0,
                          },
                        }}
                        className={`pointer-events-none absolute z-40 rounded-md px-3 py-1 max-lg:mb-30 lg:ml-30 ${link.path === pathname ? "text-primary bg-accent dark:bg-accent-dark" : "text-heading dark:text-heading-dark bg-secondary dark:bg-secondary-dark"}`}
                      >
                        {link.name}
                      </motion.span>
                    }
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            className="text-accent border-heading dark:border-heading-dark dark:text-accent-dark bg-secondary dark:bg-secondary-dark absolute top-0 left-22 cursor-pointer rounded-md border-1 max-lg:-top-8 max-lg:left-0 max-lg:w-full lg:h-20"
            onClick={navToggle}
          >
            <FontAwesomeIcon
              icon={faAnglesDown}
              className={`${!navOpen && "rotate-180 lg:rotate-270"} transition lg:rotate-90`}
            />
          </button>
        </nav>
      )}
    </>
  );
}
