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
  Journey,
  Opacity,
} from "@/lib/variables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

import { Carousel, Star, StarDouble, StarOutline } from "./addOn";
import Footer from "@/components/Footer";
import { Article } from "./gridSection";

const MotionLink = motion.create(Link);

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-start gap-[150px] pt-[80px] transition">
      {/* 1st Section */}
      <div className="text-heading dark:text-heading-dark relative z-10 flex h-[475px] w-full max-w-[1440px] flex-col items-center justify-center gap-3 px-5">
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
            GATEWAY TO
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
              bounce: 0.5,
              visualDuration: framerAnimProps.animDuration,
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
          <Star size={40} t={10} l={30} abs={true} />
          <Star size={25} t={90} l={65} abs={true} />
          <Star size={30} t={25} l={10} abs={true} />
          <Star size={20} t={110} l={25} abs={true} />
          <Star size={50} t={75} l={90} abs={true} />

          <StarDouble size={50} t={20} l={75} abs={true} />
          <StarDouble size={35} t={95} l={45} abs={true} />
          <StarDouble size={30} t={0} l={50} abs={true} />
          <StarDouble size={40} t={80} l={15} abs={true} />
        </div>
        <span className="bg-heading dark:bg-heading-dark pointer-events-none absolute -bottom-1/6 -z-10 size-[350px] blur-[250px]" />
      </div>

      {/* 2nd Section */}
      <div className="relative z-10 flex max-w-[1440px] flex-col items-center justify-center px-5">
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
      <div className="text-heading dark:text-heading-dark relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-15 px-10">
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
              variants={Opacity}
              initial="initial"
              whileInView="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
              viewport={{ once: true }}
              className="z-10 p-5 text-center text-4xl leading-tight font-bold tracking-widest"
            >
              Organize goals
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

        <div className="flex items-start justify-center gap-15 px-3 max-md:flex-wrap">
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
      <div className="relative z-10 grid max-w-[1440px] grid-rows-1 gap-3 px-8 sm:grid-cols-6 lg:grid-cols-10">
        <AnimatePresence>
          <Article
            key="lg"
            gridType="lg"
            variants={FadeInTop}
            title="Manage ideas efficiently."
            description="Carefully designed to aid you in prioritizing goals, tracking deadlines."
          />
          <Article
            key="sm-1"
            gridType="sm-1"
            variants={SlideInRight}
            svg="wordbook"
            title="Simplified word book"
            description="Build and manage your own collection of precious english words with ease."
          />
          <Article
            key="sm-2"
            gridType="sm-2"
            variants={SlideInLeft}
            svg="progress"
            title="Progress tracks"
            description="Sync your tasks seamlessly across devices and carry your progress wherever you go."
          />
          <Article
            key="md-1"
            gridType="md-1"
            variants={FadeInBottom}
            svg="notebook"
            title="Catch inspiration, plant your thoughts."
            description="Simple yet powerful companion for creative and professional work."
          />
          <Article
            key="md-2"
            gridType="md-2"
            variants={FadeInTop}
            svg="world"
            title="Your world, your rules."
            description="With Bunvia's fast and user-friendly tools, your goals are at hand."
          />
        </AnimatePresence>
      </div>

      {/* 5th Section */}
      <div className="text-heading dark:text-heading-dark relative z-10 flex w-full flex-col items-center justify-center gap-5 overflow-hidden">
        <Carousel attribute={true} />
        <Carousel attribute={false} />
      </div>

      {/* 6th Section */}
      <div className="relative z-10 max-w-[700px] px-5 text-center">
        <AnimatePresence>
          <motion.div
            key="noLimit"
            variants={FadeInTop}
            initial="initial"
            whileInView="animate"
            transition={{
              duration: framerAnimProps.animDuration,
            }}
            viewport={{ once: true, amount: framerAnimProps.viewPercent }}
            className="bg-secondary dark:bg-secondary-dark relative z-10 flex flex-col items-center gap-3 overflow-hidden rounded-md px-5 py-15 text-wrap sm:px-10"
          >
            <h3 className="text-heading dark:text-heading-dark z-10 text-2xl font-semibold">
              No limitation, infinite possibilities.
            </h3>
            <p className="text-subtext dark:text-subtext-dark z-10">
              Finish your tasks, each step leads to success!
            </p>

            <Link
              href="todolist"
              className="bg-heading hover:bg-tertiary-dark dark:text-primary-dark dark:hover:bg-tertiary dark:active:bg-tertiary active:bg-tertiary-dark dark:bg-heading-dark text-primary z-10 flex items-center justify-center gap-2 rounded-md px-5 py-2 text-xl transition select-none"
            >
              <span>Try it</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>

            <Link
              href="about"
              className="text-accent dark:text-accent-dark z-10 mt-1 rounded-md opacity-70 transition"
            >
              What is Bunvia?
            </Link>

            <StarOutline size={125} t={-15} l={0} abs={true} />
            <StarOutline size={75} t={80} l={60} abs={true} />
            <StarOutline size={50} t={5} l={85} abs={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      <span className="from-primary dark:from-primary-dark pointer-events-none fixed bottom-0 z-30 h-1/8 w-full bg-linear-to-t from-5% to-transparent" />
      <Footer />
    </section>
  );
}
