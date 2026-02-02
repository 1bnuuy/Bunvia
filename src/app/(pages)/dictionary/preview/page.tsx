"use client";

import { useEffect, useMemo, useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faLink } from "@fortawesome/free-solid-svg-icons";

import { useToast } from "@/components/Toast";
import { useUI } from "@/components/UI";

import { Fetch } from "@/app/(pages)/dictionary/manageWords";

import { btnScale, framerAnimProps } from "@/lib/globalVar";

import { DictionaryReducer, InitialDictionary, tagColor } from "../var";
import { TagTypes } from "../types";

export default function Preview() {
  const { navOpen } = useUI();
  const { toastPopUp } = useToast();

  const [state, dispatch] = useReducer(DictionaryReducer, InitialDictionary);

  useEffect(() => {
    const DelayTransition = setTimeout(() => {
      const unsub = Fetch(dispatch, toastPopUp);

      return () => unsub();
    }, 600);

    return () => clearTimeout(DelayTransition);
  }, [toastPopUp, dispatch]);

  const filteredWords = useMemo(() => {
    return state.words.filter((item) => {
      return item.name?.toLowerCase().includes(state.search.toLowerCase());
    });
  }, [state.words, state.search]);

  return (
    <>
      <section
        className={`h-dvh pt-[80px] transition ${navOpen ? "max-lg:pb-25" : "max-lg:pb-3"}`}
      >
        <div
          className={`relative left-1/2 flex h-full max-w-[1440px] -translate-x-1/2 flex-col items-center justify-center gap-8 px-4 ${(state.open || state.confirm) && "pointer-events-none opacity-30"}`}
        >
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
          </div>

          <div
            className={`custom-scroll z-30 mb-10 grid max-h-screen min-w-[300px] gap-5 overflow-x-hidden overflow-y-auto px-3 pb-5 ${filteredWords.length === 1 ? "grid-cols-1" : filteredWords.length === 2 ? "sm:grid-cols-2" : filteredWords.length >= 3 && "sm:grid-cols-2 xl:grid-cols-3"}`}
          >
            <AnimatePresence mode="popLayout">
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
                    const relativeIndex = index % 10; //Resets to 1 every 10th item

                    return (
                      <motion.div
                        layout
                        variants={{
                          hidden: { opacity: 0, y: -50 },
                          loaded: (index) => ({
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: Math.pow(index, 0.7) * 0.05,
                              type: "spring",
                              visualDuration: framerAnimProps.animDuration,
                              bounce: 0.5,
                            },
                          }),
                        }}
                        custom={relativeIndex}
                        initial="hidden"
                        whileInView="loaded"
                        viewport={{ once: true, amount: 0.2 }}
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
                            className={`text-heading dark:text-heading-dark line-clamp-2 truncate py-1 font-semibold text-balance capitalize ${word.name.length <= 12 ? "text-[2rem]" : word.name.length <= 25 ? "text-[1.8rem]" : word.name.length <= 40 ? "text-2xl" : "text-xl"}`}
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

                          <motion.a
                            variants={btnScale}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            target="_blank"
                            aria-label="Link to word"
                            href={`https://dictionary.cambridge.org/dictionary/english/${word.name}`}
                            className="group ml-auto flex items-center"
                          >
                            <FontAwesomeIcon
                              icon={faLink}
                              className="text-heading dark:text-heading-dark cursor-pointer text-xl group-hover:text-blue-500 group-active:text-blue-500"
                            />
                          </motion.a>
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
