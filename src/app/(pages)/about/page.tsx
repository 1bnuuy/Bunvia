"use client";

import Footer from "@/components/Footer";

import {
  FadeInTop,
  framerAnimProps,
  Offers,
  Opacity,
  SlideInLeft,
  SlideInRight,
} from "@/lib/variables";

import { AnimatePresence, motion } from "motion/react";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-start pt-[80px] transition lg:px-15">
      <div className="text-heading dark:text-heading-dark relative z-10 mb-[125px] flex max-w-[1440px] flex-col items-center justify-center gap-5 px-3">
        <AnimatePresence>
          <div className="relative">
            <motion.span
              key="b1"
              variants={SlideInLeft}
              initial="initial"
              animate="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
              className="text-accent dark:text-accent-dark absolute top-0 left-0 text-6xl select-none"
            >
              &#8988;
            </motion.span>

            <motion.h2
              key="s1"
              variants={Opacity}
              initial="initial"
              animate="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay * 2,
              }}
              className="z-10 p-5 text-center text-4xl leading-tight font-bold tracking-widest"
            >
              Bunvia
            </motion.h2>

            <motion.span
              key="b2"
              variants={SlideInRight}
              initial="initial"
              animate="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
              className="text-accent dark:text-accent-dark absolute right-0 bottom-0 text-6xl select-none"
            >
              &#8991;
            </motion.span>
          </div>
        </AnimatePresence>

        <div className="flex flex-col items-start justify-center gap-5 px-2 text-center text-xl">
          <AnimatePresence>
            <motion.p
              key="about"
              variants={SlideInLeft}
              initial="initial"
              animate="animate"
              transition={{duration: framerAnimProps.animDuration, delay: framerAnimProps.animDelay * 2.25}}
              className="text-subtext dark:text-subtext-dark relative w-full"
            >
              Bunvia is my{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                2nd project
              </span>{" "}
              and also my{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                very first
              </span>{" "}
              NextJS project. It originated from my need to keep track of my
              English words, which paves the way for clearer goals and enhances
              my study efficiency.
            </motion.p>

            <motion.p
              key="about2"
              variants={SlideInRight}
              initial="initial"
              animate="animate"
              transition={{duration: framerAnimProps.animDuration, delay: framerAnimProps.animDelay * 2.5}}
              className="text-subtext dark:text-subtext-dark relative w-full"
            >
              Bunvia enables people to access easier ways of organizing
              workload, retaining complex english words.
            </motion.p>

            <div className="grid w-full place-items-center gap-5 md:grid-cols-3">
              {Offers.map((o, index) => {
                return (
                  <motion.div
                    variants={FadeInTop}
                    initial="initial"
                    animate="animate"
                    transition={{
                      duration: framerAnimProps.animDuration,
                      delay: framerAnimProps.animDelay * 3.25 + index * 0.15,
                    }}
                    key={index}
                    className="border-tertiary dark:border-tertiary-dark w-[300px] rounded-md border-2 px-3 py-1.5"
                  >
                    <p>{o.name}</p>
                    <span className="text-subtext dark:text-subtext-dark text-sm">
                      {o.desc}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </div>

      <div className="text-heading dark:text-heading-dark relative z-10 mb-[125px] flex max-w-[1440px] flex-col items-center justify-center gap-5 px-10">
        <AnimatePresence>
          <div className="relative">
            <motion.span
              key="b1"
              variants={SlideInLeft}
              initial="initial"
              whileInView="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
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
                delay: framerAnimProps.animDelay * 2,
              }}
              viewport={{ once: true, amount: framerAnimProps.viewPercent }}
              className="z-10 p-5 text-center text-4xl leading-tight font-bold tracking-widest"
            >
              Why does it matter?
            </motion.h2>

            <motion.span
              key="b2"
              variants={SlideInRight}
              initial="initial"
              whileInView="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
              viewport={{ once: true }}
              className="text-accent dark:text-accent-dark absolute right-0 bottom-0 text-6xl select-none"
            >
              &#8991;
            </motion.span>
          </div>
        </AnimatePresence>

        <div className="flex flex-col items-start justify-center gap-10 px-3 text-center text-xl">
          <AnimatePresence>
            <motion.p
              key="about"
              variants={FadeInTop}
              initial="initial"
              whileInView="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay,
              }}
              viewport={{ once: true, amount: framerAnimProps.viewPercent }}
              className="text-subtext dark:text-subtext-dark relative"
            >
              Bunvia solved my problems of having to store numerous complex C1,
              C2 level words. Before Bunvia, I had to save them in{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                screenshots
              </span>
              ,
              <span className="text-accent dark:text-accent-dark uppercase">
                browser bookmarks
              </span>{" "}
              and even in{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                word files
              </span>
              . Over time, they eventually accumulated to the point where I dreaded scrolling back saved words and checking duplicated
              words. However, Bunvia simplified the process, it became an <span className="text-accent dark:text-accent-dark uppercase">indispensable tool</span> for me to organize my goals. I hope this also does the same to you!
            </motion.p>

            <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
              {Offers.map((o, index) => {
                return (
                  <motion.div
                    variants={FadeInTop}
                    initial="initial"
                    whileInView="animate"
                    transition={{
                      duration: framerAnimProps.animDuration,
                      delay: framerAnimProps.animDelay * 3 + index * 0.15,
                    }}
                    viewport={{
                      once: true,
                      amount: framerAnimProps.viewPercent,
                    }}
                    key={index}
                    className="border-tertiary dark:border-tertiary-dark rounded-md border-2 px-3 py-1.5"
                  >
                    <p>{o.name}</p>
                    <span className="text-subtext dark:text-subtext-dark text-sm">
                      {o.desc}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </section>
  );
}
