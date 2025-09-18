"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import { motion } from "motion/react";

import { useTheme } from "@/components/Theme";

import { availablePaths, btnScale } from "@/lib/variables";

const MotionLink = motion.create(Link);

export default function Header() {
  const { ThemeDark, ThemeToggle } = useTheme();
  const pathname = usePathname();

  const isAvailable = availablePaths.includes(pathname);

  return (
    <>
      {isAvailable && (
        <header
          className={`bg-primary dark:bg-primary-dark border-tertiary dark:border-tertiary-dark fixed z-40 flex h-[65px] w-screen items-center justify-between border-b-2 px-7 transition select-none lg:px-45`}
        >
          <div className="flex items-center gap-5">
            <MotionLink
              variants={btnScale}
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              key="home"
              href="/"
              className={`ring-offset-secondary hover:ring-accent dark:hover:ring-accent-dark active:ring-accent dark:active:ring-accent-dark ring-tertiary dark:ring-offset-secondary-dark dark:ring-tertiary-dark relative aspect-square min-w-[44px] basis-[44px] cursor-pointer overflow-hidden rounded-md hover:ring-2 hover:ring-offset-3 active:ring-2 active:ring-offset-3`}
            >
              <Image
                src={ThemeDark ? "/badlogo.webp" : "/goodlogo.webp"}
                alt="bnuuy"
                fill
                sizes="48px"
                className="object-cover"
              />
            </MotionLink>

            <h1 className="text-heading xs:block dark:text-heading-dark hidden text-3xl font-semibold">
              <span className="text-accent dark:text-accent-dark">Bun</span>via
            </h1>
          </div>

            <div
              className="hover:bg-tertiary dark:hover:bg-tertiary-dark active:bg-tertiary dark:active:bg-tertiary-dark relative flex cursor-pointer items-center justify-center rounded-md transition"
              onClick={ThemeToggle}
            >
              <span
                className={`bg-accent dark:bg-accent-dark absolute top-2/3 left-5/6 h-full w-1 origin-top -translate-1/2 scale-y-100 rotate-45 transition select-none dark:scale-y-0`}
              ></span>

              <FontAwesomeIcon
                icon={faMoon}
                className={`text-heading dark:text-accent-dark px-[7px] py-2.5 text-2xl`}
              />
          </div>
        </header>
      )}
    </>
  );
}
