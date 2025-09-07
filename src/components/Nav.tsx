"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faListCheck,
  faBook,
  faMoon,
  faEnvelope,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import { btnScale, useTheme } from "@/components/Theme";

const links = [
  {
    name: "Home",
    icon: faHouse,
    path: "/",
  },

  {
    name: "Tasks",
    icon: faListCheck,
    path: "/todolist",
  },

  {
    name: "Wordbook",
    icon: faBook,
    path: "/dictionary",
  },

  {
    name: "Contact",
    icon: faEnvelope,
    path: "/contact",
  },
];

export default function Nav() {
  const [NextPage, setNextPage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { ThemeDark, ThemeToggle } = useTheme();
  const pathname = usePathname();

  const availablePaths = ["/", "/todolist", "/dictionary", "/contact"];
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
          className={`bg-secondary dark:bg-secondary-dark max-xs:gap-2 fixed left-4 z-40 flex items-start justify-between gap-8 rounded-md px-4 text-nowrap transition ease-in-out select-none max-lg:bottom-4 max-lg:left-1/2 max-lg:h-18 max-lg:min-w-[260px] max-lg:-translate-x-1/2 max-lg:items-center max-lg:px-8 lg:top-1/2 lg:w-20 lg:-translate-y-1/2 lg:flex-col lg:py-8`}
        >
          <motion.button
            variants={btnScale}
            whileHover="hover"
            whileTap="tap"
            initial="initial"
            key="loginButton"
            className={`ring-offset-secondary relative ${NextPage ? "max-xs:block" : "max-xs:hidden"} hover:ring-accent dark:hover:ring-accent-dark active:ring-accent dark:active:ring-accent-dark ring-tertiary dark:ring-offset-secondary-dark dark:ring-tertiary-dark aspect-square min-w-[48px] basis-[48px] cursor-pointer overflow-hidden rounded-md hover:ring-2 hover:ring-offset-3 active:ring-2 active:ring-offset-3`}
          >
            <Image
              src={ThemeDark ? "/badlogo.webp" : "/goodlogo.webp"}
              alt="bnuuy"
              fill
              sizes="48px"
              className="object-cover"
            />
          </motion.button>

          <span className="bg-subtext dark:bg-subtext-dark hidden h-0.75 w-12 lg:block"></span>

          <div
            className={`max-xs:gap-3 flex gap-4 max-lg:w-full max-lg:justify-center max-lg:rounded-md lg:flex-col ${NextPage && "hidden"}`}
          >
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
                        {/* pointer-events-none disabled hover for span */}
                        {link.name}
                      </motion.span>
                    }
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <span className="bg-subtext dark:bg-subtext-dark hidden h-0.75 w-12 lg:block"></span>

          <div
            className={`${NextPage ? "max-xs:block" : "max-xs:hidden"} xs:flex-col flex gap-6`}
          >
            <AnimatePresence>
              <motion.div
                whileHover="hover"
                whileTap="hover"
                initial="initial"
                key="themeButton"
                className="border-accent dark:border-accent-dark relative flex cursor-pointer items-center justify-center rounded-md border-3"
                onClick={ThemeToggle}
              >
                <span
                  className={`bg-accent dark:bg-accent-dark absolute top-2/3 left-5/6 h-full w-1 origin-top -translate-1/2 scale-y-100 rotate-45 transition select-none dark:scale-y-0`}
                ></span>

                <FontAwesomeIcon
                  icon={faMoon}
                  className={`text-heading dark:text-accent-dark px-[7px] py-2.5 text-2xl`}
                />

                <motion.span
                  variants={{
                    initial: { opacity: 0, x: 0, y: 0 },
                    hover: {
                      opacity: 1,
                      x: isMobile ? 0 : -22,
                      y: isMobile ? -22 : 0,
                    },
                  }}
                  key="label"
                  className={`text-primary bg-accent dark:bg-accent-dark pointer-events-none absolute z-40 rounded-md px-3 py-1 max-lg:mb-30 lg:ml-65`}
                >
                  Theme
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="max-xs:block text-accent dark:text-accent-dark bg-secondary dark:bg-secondary-dark absolute -top-8 left-0 hidden w-full cursor-pointer rounded-md"
            onClick={() => setNextPage(!NextPage)}
          >
            <FontAwesomeIcon
              icon={faAnglesDown}
              className={`${NextPage && "rotate-180"} transition`}
            />
          </button>
        </nav>
      )}
    </>
  );
}
