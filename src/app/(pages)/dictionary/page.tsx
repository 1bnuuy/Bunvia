"use client";

import { useEffect, useMemo, useReducer, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrash,
  faStar,
  faLink,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import { useToast } from "@/components/Toast";
import { btnScale } from "@/components/Theme";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Favorite, Fetch, initialState, reducer } from "@/lib/manageWords";
import { TagTypes } from "@/lib/types";
import { tagColor } from "@/lib/variables";

import { Modal } from "./modal";

const MotionLink = motion.create(Link);

export default function Dictionary() {
  const isAdminPanel = usePathname().startsWith("/bnuuyPanel");
  const { toastPopUp } = useToast();

  const [state, dispatch] = useReducer(reducer, initialState);

  const AdminPassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const DelayTransition = setTimeout(() => {
      const unsub = Fetch(dispatch, toastPopUp);

      return () => unsub();
    }, 600);

    return () => clearTimeout(DelayTransition);
  }, []);

  const filteredWords = useMemo(() => {
    return state.words.filter((item) => {
      return item.name?.toLowerCase().includes(state.search.toLowerCase());
    });
  }, [state.words, state.search]);

  const AdminAccessCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validPasswords = process.env.ADMIN_PASSWORDS?.split(",") || [];
    const isValidPassword = (password: string) =>
      validPasswords.includes(password);

    if (isValidPassword(AdminPassword.current?.value || "")) {
      //If current is null, it passes an empty string.
      dispatch({ type: "ADMIN_ACCESS" });
      toastPopUp({
        mode: true,
        msg: "Access granted, the carrot vault awaits.",
        closeMsg: "Bnuuy",
      });
    } else {
      toastPopUp({
        mode: false,
        msg: "Oops, this area is for admins only!",
        closeMsg: "Sorry",
      });
    }
  };

  return (
    <>
      <Modal state={state} dispatch={dispatch} />

      {isAdminPanel && !state.adminAccess && (
        <div className="fixed top-1/2 left-1/2 z-40 w-11/12 max-w-[650px] min-w-[200px] -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-secondary dark:bg-secondary-dark relative space-y-5 rounded-lg p-5 text-center"
            >
              <p className="text-heading dark:text-heading-dark text-3xl font-bold">
                Admin Access
              </p>

              <form
                autoComplete="off"
                className="space-y-5"
                onSubmit={(e) => AdminAccessCheck(e)}
              >
                <div className="bg-secondary dark:bg-secondary-dark border-accent dark:border-accent-dark flex w-full items-center gap-4 rounded-md border-2 px-3 py-2 text-2xl">
                  <input
                    autoComplete="new-password"
                    required
                    ref={AdminPassword}
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
      )}

      <section className="dark:bg-primary-dark grid-background bg-primary h-dvh w-screen overflow-hidden pt-8 transition max-lg:pb-25 md:pt-15 lg:px-30">
        <div
          className={`relative flex h-full flex-col items-center justify-center gap-8 px-4 ${(state.open || state.confirm || (isAdminPanel && !state.adminAccess)) && "pointer-events-none opacity-30"}`}
        >
          {state.words.length > 0 && (
            <div className="bg-secondary dark:bg-secondary-dark border-accent dark:border-accent-dark flex w-full max-w-[450px] min-w-[200px] items-center gap-4 rounded-md border-2 p-2.5 text-2xl">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-accent dark:text-accent-dark pointer-events-none ml-1"
              />
              <input
                placeholder="Search..."
                value={state.search}
                onChange={(e) =>
                  dispatch({ type: "SEARCH", payload: e.target.value })
                }
                type="text"
                className="placeholder:text-subtext dark:placeholder:text-subtext-dark text-heading dark:text-heading-dark w-full outline-none"
              />

              <motion.button
                variants={btnScale}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => dispatch({ type: "OPEN_FORM" })}
                className="text-primary active:bg-accent-hovered dark:active:bg-accent-hovered-dark bg-accent dark:bg-accent-dark hover:bg-accent-hovered dark:hover:bg-accent-hovered-dark cursor-pointer rounded-md px-5 text-2xl select-none"
              >
                +
              </motion.button>
            </div>
          )}

          <div className="z-30 mb-10 grid max-h-[calc(100vh_-_250px)] min-w-[300px] auto-rows-min grid-cols-1 gap-5 overflow-x-hidden overflow-y-auto px-3 pb-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {state.words.length === 0 ? (
                <div className="absolute left-1/2 flex w-70 -translate-x-1/2 justify-between text-4xl select-none">
                  <span className="rotate-y-180">🐇</span>
                  <span className="animate-carrot absolute">🥕</span>
                  <span>🐇</span>
                </div>
              ) : (
                filteredWords
                  .sort((a, b) => {
                    const fav = (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
                    if (fav !== 0) return fav;

                    return a.name.localeCompare(b.name);
                  })
                  .map((word, index) => {
                    return (
                      <motion.div
                        variants={{
                          hidden: { scale: 0 },
                          loaded: (i) => ({
                            scale: 1,
                            transition: {
                              delay: i * 0.08,
                              type: "spring",
                              stiffness: 150,
                            },
                          }),
                        }}
                        custom={index}
                        initial="hidden"
                        animate="loaded"
                        exit="hidden"
                        key={word.name}
                        className={`bg-secondary dark:bg-secondary-dark ${word.favorite ? "border-yellow-600 dark:border-amber-200" : "border-accent dark:border-accent-dark"} relative flex h-60 w-71 flex-col justify-between border-b-4 p-4`}
                      >
                        <div className="flex gap-2">
                          {(Array.isArray(word.tag) && word.tag.length > 0
                            ? word.tag
                            : ["N/A"]
                          )
                            .filter(Boolean) //removes null/undefined/empty strings
                            .sort((a, b) => a.localeCompare(b))
                            .map((t, i) => {
                              const ColorClass =
                                t in tagColor
                                  ? tagColor[t as TagTypes]
                                  : "bg-gray-300";
                              return (
                                <span
                                  className={`${ColorClass} text-heading rounded-sm px-2 font-semibold select-none`}
                                  key={i}
                                >
                                  {t || "N/A"}
                                </span>
                              );
                            })}
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                          <p
                            className={`text-heading dark:text-heading-dark line-clamp-2 py-1 font-semibold text-balance capitalize ${word.name.length <= 12 ? "text-[2rem]" : word.name.length <= 25 ? "text-[1.8rem]" : word.name.length <= 40 ? "text-2xl" : "text-xl"}`}
                          >
                            {word.name}
                          </p>

                          <div className="flex flex-wrap">
                            {(Array.isArray(word.type)
                              ? word.type
                              : [word.type]
                            ).map((t, i, arr) => {
                              return (
                                <span
                                  className={`text-subtext dark:text-subtext-dark px-1 text-sm font-semibold`}
                                  key={i}
                                >
                                  {t}
                                  {i < arr.length - 1 && ","}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <span className="text-subtext dark:text-subtext-dark">
                            {word.date}
                          </span>
                          <div className="flex gap-2">
                            <motion.a
                              variants={btnScale}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              target="_blank"
                              href={`https://dictionary.cambridge.org/dictionary/english/${word.name}`}
                              className="group ml-auto flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faLink}
                                className="text-heading dark:text-heading-dark cursor-pointer text-xl group-hover:text-blue-500 group-active:text-blue-500"
                              />
                            </motion.a>

                            <>
                              <motion.button
                                variants={btnScale}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                type="button"
                                onClick={() => {
                                  dispatch({
                                    type: "CONFIRMATION",
                                    payload: { word, index },
                                  });

                                  dispatch({
                                    type: "OPEN_FORM",
                                  });
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="text-heading active:text-error dark:text-heading-dark hover:text-error cursor-pointer text-xl"
                                />
                              </motion.button>
                            </>

                            <motion.button
                              variants={btnScale}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              type="button"
                              onClick={() =>
                                Favorite(word, dispatch, toastPopUp)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faStar}
                                className={`cursor-pointer text-xl ${word.favorite ? "text-yellow-600 dark:text-amber-200" : "text-heading dark:text-heading-dark hover:text-yellow-300 active:text-yellow-300"}`}
                              />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
