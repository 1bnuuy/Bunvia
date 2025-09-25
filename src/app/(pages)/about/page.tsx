"use client";

import { StarOutline } from "@/app/addOn";
import Footer from "@/components/Footer";

import {
  FadeInTop,
  framerAnimProps,
  Offers,
  Opacity,
  SlideInLeft,
  SlideInRight,
} from "@/lib/variables";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-start gap-[100px] pt-[80px] transition">
      <div className="text-heading dark:text-heading-dark relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-5 px-3">
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
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay * 2.25,
              }}
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
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay * 2.5,
              }}
              className="text-subtext dark:text-subtext-dark relative w-full"
            >
              Bunvia enables people to access easier ways of organizing
              workload, retaining complex english words.
            </motion.p>

            <div className="grid w-full place-items-center gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {Offers.map((o, index) => {
                return (
                  <motion.div
                    variants={FadeInTop}
                    initial="initial"
                    animate="animate"
                    transition={{
                      duration: framerAnimProps.animDuration,
                      delay: framerAnimProps.animDelay * 3.25 + index * 0.08,
                    }}
                    key={index}
                    className="border-tertiary dark:border-tertiary-dark w-[275px] rounded-md border-2 px-3 py-1.5"
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

      <AnimatePresence>
        <motion.span
          key="decor1"
          variants={FadeInTop}
          initial="initial"
          animate="animate"
          transition={{
            duration: framerAnimProps.animDuration,
            delay: framerAnimProps.animDelay * 4.5,
          }}
          className="border-heading dark:border-heading-dark size-6 animate-bounce rounded-full border-3"
        />
      </AnimatePresence>

      <div className="text-heading dark:text-heading-dark relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-5 px-10">
        <AnimatePresence>
          <div className="relative">
            <motion.span
              key="b1"
              variants={SlideInLeft}
              initial="initial"
              animate="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay * 5.5,
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
                delay: framerAnimProps.animDelay * 6.5,
              }}
              className="z-10 p-5 text-center text-4xl leading-tight font-bold tracking-widest"
            >
              Why does it matter?
            </motion.h2>

            <motion.span
              key="b2"
              variants={SlideInRight}
              initial="initial"
              animate="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay * 5.5,
              }}
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
              variants={SlideInLeft}
              initial="initial"
              animate="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay * 7.5,
              }}
              className="text-subtext dark:text-subtext-dark relative"
            >
              Bunvia solved my problems of having to store numerous complex C1,
              C2 level words. Before Bunvia, I had to store them in{" "}
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
              .
            </motion.p>

            <motion.p
              key="about-2"
              variants={SlideInRight}
              initial="initial"
              animate="animate"
              transition={{
                duration: framerAnimProps.animDuration,
                delay: framerAnimProps.animDelay * 7.5,
              }}
              className="text-subtext dark:text-subtext-dark relative"
            >
              Over time, they eventually accumulated to the point where I
              dreaded scrolling back saved words and checking duplicated words.
              However, Bunvia simplified the process, it became an{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                indispensable tool
              </span>{" "}
              for me to organize my goals. I hope this also does the same to
              you!
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        <motion.span
          key="decor1"
          variants={FadeInTop}
          initial="initial"
          whileInView="animate"
          transition={{
            duration: framerAnimProps.animDuration,
          }}
          className="border-heading dark:border-heading-dark size-6 animate-bounce rounded-full border-3"
        />
      </AnimatePresence>

      <div className="text-heading dark:text-heading-dark relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-5 px-10">
        <AnimatePresence>
          <div className="relative">
            <motion.span
              key="b1"
              variants={SlideInLeft}
              initial="initial"
              whileInView="animate"
              transition={{
                duration: framerAnimProps.animDuration,
              }}
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
              className="z-10 p-5 text-center text-4xl leading-tight font-bold tracking-widest"
            >
              Privacy & Security
            </motion.h2>

            <motion.span
              key="b2"
              variants={SlideInRight}
              initial="initial"
              whileInView="animate"
              transition={{
                duration: framerAnimProps.animDuration,
              }}
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
              }}
              className="text-subtext dark:text-subtext-dark relative"
            >
              We value your privacy. As all data is stored securely in your
              browser using{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                local storage
              </span>
              , everything remain{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                private
              </span>{" "}
              and{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                secure
              </span>
              . None of your data is transmitted to or stored on our servers,
              ensuring full control and confidentiality. This makes it perfect
              for sensitive information. For extra peace of mind, we recommend
              creating{" "}
              <span className="text-accent dark:text-accent-dark uppercase">
                backups of important notes
              </span>{" "}
              on your device.
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 max-w-[700px] px-5 text-center">
        <AnimatePresence>
          <motion.div
            key="noLimit"
            variants={FadeInTop}
            initial="initial"
            whileInView="animate"
            transition={{
              duration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay,
            }}
            className="bg-secondary dark:bg-secondary-dark relative z-10 flex flex-col items-center gap-3 overflow-hidden rounded-md px-5 py-15 text-wrap sm:px-10"
          >
            <h3 className="text-heading dark:text-heading-dark z-10 text-2xl font-semibold">
              Ready to create your own world?
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
