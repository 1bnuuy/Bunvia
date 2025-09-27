"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faLink,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";

import {
  DictionaryActionTypes,
  InitDictionaryTypes,
  TagTypes,
} from "@/lib/types";
import { btnScale } from "@/lib/variables";
import { UserCreate, UserDelete } from "@/lib/manageWordsUser";

import { useToast } from "@/components/Toast";

import { tagColor, wordClass } from "./var";

export const UserModal = ({
  state,
  dispatch,
}: {
  state: InitDictionaryTypes;
  dispatch: React.Dispatch<DictionaryActionTypes>;
}) => {
  const Name = useRef<HTMLInputElement>(null);
  const { toastPopUp } = useToast();

  return (
    <div className="fixed top-1/2 left-1/2 z-40 w-11/12 max-w-[650px] min-w-[200px] -translate-x-1/2 -translate-y-1/2">
      <AnimatePresence mode="wait">
        {state.open && (
          <motion.div
            key="form"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-secondary dark:bg-secondary-dark flex flex-col gap-8 rounded-md rounded-tl-none p-6"
          >
            <FontAwesomeIcon
              icon={faPen}
              className={`text-accent dark:text-accent-dark absolute left-0 rounded-t-md ${state.confirm ? "text-subtext dark:text-subtext-dark bg-tertiary dark:bg-tertiary-dark" : "bg-inherit"} -top-12 left-0 z-10 px-4 py-3 text-2xl`}
            />

            <FontAwesomeIcon
              icon={faTrash}
              className={`text-accent dark:text-accent-dark absolute left-[4.125rem] rounded-t-md ${!state.confirm ? "text-subtext dark:text-subtext-dark bg-tertiary dark:bg-tertiary-dark" : "bg-inherit"} -top-12 left-0 z-10 px-4 py-3 text-2xl`}
            />

            {!state.confirm && (
              <form
                onSubmit={(e) =>
                  UserCreate(e, Name, state, dispatch, toastPopUp)
                }
                className="flex flex-col gap-8"
              >
                <div className="relative flex flex-wrap gap-3">
                  {Object.entries(tagColor).map(([tag, color]) => (
                    <motion.div
                      variants={btnScale}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      key={tag}
                      className={`text-heading relative w-12 text-center font-semibold select-none`}
                    >
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          dispatch({
                            type: "SELECT_TAGS",
                            payload: e.target.value,
                          })
                        }
                        checked={state.selectedTags.includes(tag)}
                        value={tag}
                        className="peer absolute top-1/2 left-0 z-50 size-full -translate-y-1/2 cursor-pointer appearance-none"
                      />
                      <span
                        className={`peer-checked:opacity-30 ${color} inline-block size-full rounded-sm px-2 py-0.5`}
                      >
                        {tag}
                      </span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-accent dark:text-accent-dark absolute left-1/2 z-10 -translate-x-1/2 text-2xl opacity-0 peer-checked:opacity-100"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="relative">
                  <input
                    required
                    ref={Name}
                    onChange={() => {
                      dispatch({ type: "DUPLICATED", payload: false });
                    }}
                    placeholder="Bnuuy"
                    type="text"
                    className={`placeholder:text-subtext dark:placeholder:text-subtext-dark text-heading dark:text-heading-dark w-full rounded-md border-2 px-4 pt-4 pb-3 text-xl outline-none ${state.dup ? "border-red-500" : "border-accent dark:border-accent-dark"}`}
                  />

                  <span
                    className={`${state.dup ? "block" : "hidden"} px-3 py-1 text-lg text-red-500`}
                  >
                    ⚠︎ This word already exists!
                  </span>

                  <span
                    className={`bg-secondary dark:bg-secondary-dark absolute -top-3 left-5 px-2.5 select-none ${state.dup ? "text-red-500" : "text-heading dark:text-heading-dark"}`}
                  >
                    Name
                  </span>
                </div>

                <div className="relative flex flex-wrap gap-2">
                  {wordClass.map((type, index) => (
                    <motion.div
                      variants={btnScale}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      key={index}
                      className={`relative flex items-center font-semibold text-nowrap select-none`}
                    >
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          dispatch({
                            type: "SELECT_TYPES",
                            payload: e.target.value,
                          })
                        }
                        checked={state.selectedTypes.includes(type)}
                        value={type}
                        className="peer absolute top-1/2 left-0 size-full -translate-y-1/2 cursor-pointer appearance-none"
                      />
                      <span className="peer-checked:bg-accent peer-checked:text-primary dark:peer-checked:bg-accent-dark bg-subtext dark:bg-subtext-dark rounded-sm px-2 py-0.5">
                        {type}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="ml-auto space-x-3">
                  <motion.button
                    variants={btnScale}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="text-heading hover:text-primary active:bg-error hover:bg-error dark:text-heading-dark dark:bg-tertiary-dark bg-tertiary cursor-pointer rounded-md px-4 py-1 text-xl font-semibold select-none"
                    type="button"
                    aria-label="Cancel"
                    onClick={() => dispatch({ type: "OPEN_FORM" })}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    variants={btnScale}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    aria-label="Create"
                    disabled={state.btnLoading}
                    className="text-primary disabled:bg-tertiary disabled:text-heading dark:disabled:text-heading-dark dark:disabled:bg-tertiary-dark hover:bg-accent-hovered dark:hover:bg-accent-hovered-dark active:bg-accent-hovered dark:active:bg-accent-hovered-dark bg-accent dark:bg-accent-dark cursor-pointer rounded-md px-4 py-1 text-xl font-semibold select-none disabled:cursor-not-allowed"
                  >
                    {state.btnLoading ? "..." : "Create"}
                  </motion.button>
                </div>
              </form>
            )}

            {state.confirm && (
              <div className="flex flex-col gap-5">
                <p className="text-heading dark:text-heading-dark text-2xl font-bold">
                  Are you sure, bun?
                </p>
                <p className="text-subtext dark:text-subtext-dark">
                  Double-check! Once deleted,{" "}
                  <span className="text-accent dark:text-accent-dark text-xl font-bold">
                    {state.confirmTarget?.word.name.toUpperCase()}
                    <motion.a
                      variants={btnScale}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      target="_blank"
                      href={`https://dictionary.cambridge.org/dictionary/english/${state.confirmTarget?.word.name}`}
                      className="group"
                    >
                      <FontAwesomeIcon
                        icon={faLink}
                        className="text-heading dark:text-heading-dark ml-1 cursor-pointer text-xl group-hover:text-blue-500 group-active:text-blue-500"
                      />
                    </motion.a>
                  </span>{" "}
                  will hop away for good and cannot be recovered.
                </p>

                <div
                  className={`border-heading dark:border-heading-dark relative w-full rounded-md border-2 px-4 py-5`}
                >
                  <div className="bg-secondary dark:bg-secondary-dark absolute -top-3 flex gap-2 px-2">
                    {(Array.isArray(state.confirmTarget?.word.tag) &&
                    state.confirmTarget?.word.tag.length > 0
                      ? state.confirmTarget?.word.tag
                      : ["N/A"]
                    )
                      .filter(Boolean)
                      .sort((a, b) => a.localeCompare(b))
                      .map((t, i) => {
                        const ColorClass =
                          t in tagColor
                            ? tagColor[t as TagTypes]
                            : "bg-gray-300";
                        return (
                          <span
                            className={`${ColorClass} text-heading rounded-sm px-2 text-sm font-semibold select-none`}
                            key={i}
                          >
                            {t || "N/A"}
                          </span>
                        );
                      })}
                  </div>

                  <p
                    className={`text-heading dark:text-heading-dark line-clamp-1 text-2xl font-semibold text-balance capitalize`}
                  >
                    {state.confirmTarget?.word.name}
                  </p>

                  <div className="bg-secondary dark:bg-secondary-dark absolute right-4 -bottom-3 flex px-2">
                    {(Array.isArray(state.confirmTarget?.word.type)
                      ? state.confirmTarget?.word.type
                      : [state.confirmTarget?.word.type]
                    ).map((t, i, arr) => {
                      return (
                        <span
                          className={`text-subtext dark:text-subtext-dark px-1 text-sm font-semibold text-nowrap`}
                          key={i}
                        >
                          {t}
                          <span className="text-heading dark:text-heading-dark">
                            {i < arr.length - 1 && " —"}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-end gap-3">
                  <motion.button
                    variants={btnScale}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="text-heading hover:text-primary active:bg-accent dark:active:bg-accent-dark hover:bg-accent dark:hover:bg-accent-dark dark:text-heading-dark dark:bg-tertiary-dark bg-tertiary cursor-pointer self-center rounded-md px-4 py-1 text-xl font-semibold select-none"
                    type="button"
                    aria-label="Cancel"
                    onClick={() => {
                      dispatch({ type: "CONFIRMATION" });
                      dispatch({ type: "OPEN_FORM" });
                    }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    variants={btnScale}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="text-primary bg-error active:bg-error-hovered hover:bg-error-hovered cursor-pointer rounded-md px-4 py-1 text-xl font-semibold select-none"
                    type="button"
                    aria-label="Delete"
                    onClick={() => {
                      if (state.confirmTarget) {
                        UserDelete(
                          state.confirmTarget.word,
                          dispatch,
                          toastPopUp,
                        );
                        dispatch({ type: "CONFIRMATION" });
                        dispatch({ type: "OPEN_FORM" });
                      }
                    }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
