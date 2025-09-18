"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import {
  Features,
  FadeInTop,
  SlideInLeft,
  SlideInRight,
  Pop,
  FadeInBottom,
  framerAnimProps,
} from "@/lib/variables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

import { Star, StarDouble, StarOutline, Svg_TodoList } from "./addOn";
import Footer from "@/components/Footer";

const MotionLink = motion.create(Link);

export default function Home() {
  return (
    <section className="dark:bg-primary-dark grid-background bg-primary flex min-h-dvh w-screen flex-col items-center justify-start overflow-x-hidden pt-[100px] transition lg:px-15">
      {/* 1st Section */}
      <div className="text-heading dark:text-heading-dark relative z-10 mb-[150px] flex h-[600px] w-full max-w-[1440px] flex-col items-center justify-center gap-3 px-5">
        <AnimatePresence>
          <motion.p
            key="subtitle"
            variants={FadeInTop}
            initial="initial"
            animate="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay * 2,
            }}
            className="text-xl"
          >
            YOUR GATEWAY TO
          </motion.p>

          <motion.h1
            key="title"
            variants={FadeInTop}
            initial="initial"
            animate="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay * 3,
            }}
            className="text-accent dark:text-accent-dark z-10 text-center text-5xl leading-tight font-bold tracking-widest md:text-7xl"
          >
            LIMITLESS
            <br />
            LEARNING
          </motion.h1>

          <motion.p
            key="desc"
            variants={FadeInTop}
            initial="initial"
            animate="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay * 4,
            }}
            className="text-subtext dark:text-subtext-dark z-10 text-center text-xl max-sm:text-lg"
          >
            Step into a world where education meets creativity.
          </motion.p>

          <MotionLink
            key="link"
            variants={Pop}
            initial="initial"
            animate="animate"
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay * 6,
              type: "spring",
              stiffness: 250,
            }}
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            href="todolist"
            className="bg-heading hover:bg-tertiary-dark dark:text-primary-dark dark:hover:bg-tertiary dark:active:bg-tertiary active:bg-tertiary-dark dark:bg-heading-dark text-primary z-10 flex items-center gap-2 rounded-md px-5 py-2 text-xl select-none"
          >
            <span>Get started</span>
            <FontAwesomeIcon icon={faWandMagicSparkles} />
          </MotionLink>
        </AnimatePresence>

        <div className="absolute size-full">
          <Star size={40} t={10} l={30} />
          <Star size={25} t={90} l={65} />
          <Star size={30} t={25} l={10} />
          <Star size={20} t={110} l={25} />
          <Star size={50} t={75} l={90} />

          <StarDouble size={50} t={20} l={75} />
          <StarDouble size={35} t={95} l={45} />
          <StarDouble size={30} t={0} l={50} />
          <StarDouble size={40} t={80} l={15} />
        </div>
        <span className="bg-heading dark:bg-heading-dark pointer-events-none absolute -bottom-1/6 -z-10 size-[350px] blur-[250px]" />
      </div>

      {/* 2nd Section */}
      <div className="relative z-10 mb-[125px] flex max-w-[1440px] flex-col items-center justify-center px-5">
        <AnimatePresence>
          <motion.p
            key="text"
            variants={FadeInTop}
            initial="initial"
            animate="animate"
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay * 8,
            }}
            className="text-heading dark:text-heading-dark my-5 text-center text-xl leading-relaxed"
          >
            Designed to keep learning light, fun, and organized.
          </motion.p>
          <motion.span
            key="decor1"
            variants={FadeInTop}
            initial="initial"
            animate="animate"
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay * 9,
            }}
            className="bg-heading dark:bg-heading-dark h-50 w-1 rounded-t-md"
          />
          <motion.span
            key="decor2"
            variants={FadeInTop}
            initial="initial"
            animate="animate"
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay * 10,
            }}
            className="border-heading dark:border-heading-dark size-5 rounded-full border-3"
          />
        </AnimatePresence>
      </div>

      {/* 3rd Section */}
      <div className="text-heading dark:text-heading-dark relative z-10 mb-[175px] flex max-w-[1440px] flex-col items-center justify-center gap-15 px-5">
        <AnimatePresence>
          <div className="relative">
            <motion.span
              key="b1"
              variants={SlideInLeft}
              initial="initial"
              whileInView="animate"
              transition={{ duration: framerAnimProps.animDuration }}
              viewport={{ once: true }}
              className="text-accent dark:text-accent-dark absolute top-0 left-0 text-6xl select-none"
            >
              &#8988;
            </motion.span>

            <motion.h2
              key="s1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
              viewport={{ once: true, amount: framerAnimProps.viewPercent }}
              className="z-10 p-5 text-center text-4xl leading-tight font-bold tracking-widest"
            >
              Organize your goals
            </motion.h2>

            <motion.span
              key="b2"
              variants={SlideInRight}
              initial="initial"
              whileInView="animate"
              transition={{ duration: framerAnimProps.animDuration }}
              viewport={{ once: true }}
              className="text-accent dark:text-accent-dark absolute right-0 bottom-0 text-6xl select-none"
            >
              &#8991;
            </motion.span>
          </div>
        </AnimatePresence>

        <div className="grid grid-cols-1 items-start gap-15 px-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {Features.map((feat, index) => {
              return (
                <motion.div
                  key={index}
                  variants={FadeInTop}
                  initial="initial"
                  whileInView="animate"
                  transition={{
                    duration: framerAnimProps.animDuration,
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true, amount: framerAnimProps.viewPercent }}
                  className="flex flex-col items-center justify-center gap-3 text-center"
                >
                  <div className="bg-tertiary dark:bg-tertiary-dark flex aspect-square w-[65px] items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={feat.icon}
                      className="text-accent dark:text-accent-dark text-3xl"
                    />
                  </div>
                  <p className="text-2xl font-semibold">{feat.name}</p>
                  <p className="text-subtext dark:text-subtext-dark text-balance">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 4th Section */}
      <div className="relative z-10 mb-[125px] grid w-full max-w-[1440px] grid-rows-3 gap-4 px-8 sm:grid-cols-6 lg:grid-cols-10">
        <AnimatePresence>
          <motion.div
            key="lg"
            variants={FadeInTop}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{ duration: framerAnimProps.animDuration }}
            className="bg-secondary dark:bg-secondary-dark relative z-10 row-span-2 flex flex-col gap-2 overflow-hidden rounded-t-lg px-4 py-5 sm:col-span-6 lg:col-span-6"
          >
            <h2 className="text-heading dark:text-heading-dark z-10 text-2xl leading-snug font-semibold">
              Effortless strategy & planning management.
            </h2>

            <p className="text-subtext dark:text-subtext-dark z-10">
              Carefully designed to aid you in prioritizing goals, tracking
              deadlines.
            </p>

            <div className="text-accent z-10 mt-8">A good visualized demo</div>

            <span className="absolute top-0 left-0 size-full" />
          </motion.div>

          <motion.div
            key="sm"
            variants={SlideInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{ duration: framerAnimProps.animDuration }}
            className="bg-secondary dark:bg-secondary-dark relative flex flex-col gap-2 overflow-hidden px-4 py-5 sm:col-span-3 lg:col-span-4 lg:rounded-t-lg"
          >
            <h2 className="text-heading dark:text-heading-dark text-2xl leading-snug font-semibold">
              Manage ideas efficiently.
            </h2>

            <p className="text-subtext dark:text-subtext-dark">
              Carefully designed to aid you in prioritizing goals, tracking
              deadlines.
            </p>

            <div className="text-accent mt-8">A good visualized demo</div>
            <span className="absolute top-0 left-0 size-full" />
          </motion.div>

          <motion.div
            key="sm2"
            variants={SlideInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{ duration: framerAnimProps.animDuration }}
            className="bg-secondary dark:bg-secondary-dark relative flex flex-col gap-2 overflow-hidden px-4 py-5 sm:col-span-3 lg:col-span-4"
          >
            <h2 className="text-heading dark:text-heading-dark text-2xl leading-snug font-semibold">
              Manage ideas{" "}
              <span className="text-accent dark:text-accent-dark">
                efficiently
              </span>
            </h2>

            <p className="text-subtext dark:text-subtext-dark">
              Carefully designed to aid you in prioritizing goals, tracking
              deadlines.
            </p>

            <div className="text-accent mt-8">A good visualized demo</div>
            <span className="absolute top-0 left-0 size-full" />
          </motion.div>

          <motion.div
            key="md"
            variants={FadeInBottom}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{ duration: framerAnimProps.animDuration }}
            className="bg-secondary dark:bg-secondary-dark relative flex flex-col gap-2 overflow-hidden px-4 py-5 sm:col-span-3 sm:rounded-b-lg lg:col-span-5"
          >
            <h2 className="text-heading dark:text-heading-dark text-2xl leading-snug font-semibold">
              Manage ideas{" "}
              <span className="text-accent dark:text-accent-dark">
                efficiently
              </span>
            </h2>

            <p className="text-subtext dark:text-subtext-dark">
              Carefully designed to aid you in prioritizing goals, tracking
              deadlines.
            </p>

            <div className="text-accent mt-8">A good visualized demo</div>
            <span className="absolute top-0 left-0 size-full" />
          </motion.div>

          <motion.div
            key="md2"
            variants={FadeInTop}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            transition={{ duration: framerAnimProps.animDuration }}
            className="bg-secondary dark:bg-secondary-dark relative flex flex-col gap-2 overflow-hidden rounded-b-lg px-4 py-5 sm:col-span-3 lg:col-span-5"
          >
            <h2 className="text-heading dark:text-heading-dark text-2xl leading-snug font-semibold">
              Manage ideas{" "}
              <span className="text-accent dark:text-accent-dark">
                efficiently
              </span>
            </h2>

            <p className="text-subtext dark:text-subtext-dark">
              Carefully designed to aid you in prioritizing goals, tracking
              deadlines.
            </p>

            <div className="text-accent mt-8">A good visualized demo</div>
            <span className="absolute top-0 left-0 size-full" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5th Section */}
      <div className="text-heading dark:text-heading-dark relative z-10 mb-[175px] flex max-w-[1440px] flex-col items-center justify-center gap-15 px-5">
        <AnimatePresence>
          <div className="relative">
            <motion.span
              key="b1"
              variants={SlideInLeft}
              initial="initial"
              whileInView="animate"
              transition={{ duration: framerAnimProps.animDuration }}
              viewport={{ once: true }}
              className="text-accent dark:text-accent-dark absolute top-0 left-0 text-6xl select-none"
            >
              &#8988;
            </motion.span>

            <motion.h2
              key="s1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
              viewport={{ once: true, amount: framerAnimProps.viewPercent }}
              className="z-10 p-5 text-center text-4xl leading-tight font-bold tracking-widest"
            >
              Learn and Reference
            </motion.h2>

            <motion.span
              key="b2"
              variants={SlideInRight}
              initial="initial"
              whileInView="animate"
              transition={{ duration: framerAnimProps.animDuration }}
              viewport={{ once: true }}
              className="text-accent dark:text-accent-dark absolute right-0 bottom-0 text-6xl select-none"
            >
              &#8991;
            </motion.span>
          </div>
        </AnimatePresence>

        <div className="px-5">
          <AnimatePresence>
            <div className="bg-secondary border-accent dark:border-accent-dark dark:bg-secondary-dark relative grid items-end gap-15 rounded-md border-b-5 p-5 md:grid-cols-2">
              <motion.div
                variants={FadeInTop}
                initial="initial"
                whileInView="animate"
                transition={{
                  duration: framerAnimProps.animDuration,
                }}
                viewport={{ once: true, amount: framerAnimProps.viewPercent }}
                className="bg-tertiary dark:bg-tertiary-dark absolute flex w-full flex-col gap-3 px-3"
              >
                <div>
                  <p className="text-3xl font-semibold">
                    Let{" "}
                    <span className="text-accent dark:text-accent-dark uppercase">
                      curiosity
                    </span>{" "}
                    guide you
                  </p>
                  <p className="text-subtext dark:text-subtext-dark text-balance">
                    Uncover new ideas, explore fresh paths.
                  </p>
                </div>
              </motion.div>

              <Svg_TodoList />
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* 6th Section */}
      <div className="relative z-10 mb-[125px] max-w-[700px] px-5 text-center">
        <AnimatePresence>
          <motion.div
            key="no limit"
            variants={FadeInTop}
            initial="initial"
            whileInView="animate"
            transition={{
              duration: framerAnimProps.animDuration,
            }}
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            className="bg-secondary dark:bg-secondary-dark relative z-10 flex flex-col items-center gap-3 overflow-hidden rounded-md px-5 py-15 text-balance"
          >
            <h3 className="text-heading dark:text-heading-dark z-10 text-2xl font-semibold">
              No limitation, infinite possibilities.
            </h3>
            <p className="text-subtext dark:text-subtext-dark z-10">
              Finish your tasks and see your day brighten up!
            </p>
            <Link
              href="todolist"
              className="bg-heading hover:bg-tertiary-dark dark:text-primary-dark dark:hover:bg-tertiary dark:active:bg-tertiary active:bg-tertiary-dark dark:bg-heading-dark text-primary z-10 flex items-center justify-center gap-2 rounded-md px-5 py-2 text-xl transition select-none"
            >
              <span>Try it</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>

            <StarOutline size={125} t={-15} l={0} />
            <StarOutline size={75} t={80} l={60} />
            <StarOutline size={50} t={5} l={85} />
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </section>
  );
}
