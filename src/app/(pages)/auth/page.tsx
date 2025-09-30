"use client";

import { useToast } from "@/components/Toast";

import { AdminSignIn } from "@/lib/auth";
import { btnScale, framerAnimProps } from "@/lib/globalVar";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const MotionLink = motion.create(Link);

export default function Auth() {
  const router = useRouter();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const { toastPopUp } = useToast();

  async function SignInHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await AdminSignIn(
        email.current?.value ?? "",
        password.current?.value ?? "",
        toastPopUp,
        router,
      );
    } catch {
      toastPopUp({
        success: false,
        msg: "The garden door stayed shut. Something huge is block the way!",
      });
    }
  }

  return (
    <section className="flex h-dvh items-center justify-center transition">
      <div className="z-40 w-11/12 max-w-[650px] min-w-[200px]">
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: framerAnimProps.animDuration - 0.1,
              type: "spring",
              bounce: 0.5,
              visualDuration: framerAnimProps.animDuration,
              delay: framerAnimProps.animDelay,
            }}
            className="bg-secondary dark:bg-secondary-dark relative space-y-5 rounded-lg p-5 text-center"
          >
            <p className="text-heading dark:text-heading-dark text-3xl font-bold">
              Admin Access
            </p>

            <form
              autoComplete="off"
              className="space-y-5"
              onSubmit={SignInHandler}
            >
              <div className="bg-secondary dark:bg-secondary-dark border-accent dark:border-accent-dark flex w-full items-center gap-4 rounded-md border-2 px-3 py-2 text-xl">
                <input
                  autoComplete="off"
                  required
                  ref={email}
                  placeholder="Email"
                  type="email"
                  name="emailAdmin"
                  className={`placeholder:text-subtext dark:placeholder:text-subtext-dark text-heading dark:text-heading-dark w-full outline-none`}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-accent dark:text-accent-dark pointer-events-none"
                />
              </div>

              <div className="bg-secondary dark:bg-secondary-dark border-accent dark:border-accent-dark flex w-full items-center gap-4 rounded-md border-2 px-3 py-2 text-xl">
                <input
                  autoComplete="off"
                  required
                  ref={password}
                  placeholder="Password"
                  type="password"
                  name="passwordAdmin"
                  className={`placeholder:text-subtext dark:placeholder:text-subtext-dark text-heading dark:text-heading-dark w-full outline-none`}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-accent dark:text-accent-dark pointer-events-none"
                />
              </div>

              <div className="flex gap-5">
                <MotionLink
                  variants={btnScale}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-primary bg-error active:bg-error-hovered hover:bg-error-hovered w-full cursor-pointer rounded-md p-1 text-xl select-none"
                  href="/"
                >
                  Return
                </MotionLink>

                <motion.button
                  variants={btnScale}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-heading hover:text-primary active:bg-success hover:bg-success dark:text-heading-dark dark:bg-tertiary-dark bg-tertiary w-full cursor-pointer rounded-md p-1 text-xl select-none"
                >
                  Log in
                </motion.button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
