"use client";

import { framerAnimProps, InitialTodo, TodoReducer } from "@/lib/variables";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AnimatePresence, Reorder } from "motion/react";
import { useEffect, useReducer } from "react";

import { TitleHandler } from "./title";
import { FormHandler } from "./form";

import { DeleteList, DoneList } from "@/lib/manageTodoList";

import { useUI } from "@/components/UI";
import { useToast } from "@/components/Toast";

export default function Todolist() {
  const { navOpen } = useUI();
  const { toastPopUp } = useToast();
  const [state, dispatch] = useReducer(TodoReducer, InitialTodo, () => ({
    isEditing: null,
    newTitle: localStorage.getItem("title") ?? "",
    newDesc: localStorage.getItem("desc") ?? "",
    openCreate: false,
    list: JSON.parse(localStorage.getItem("todo") ?? "[]"),
    isDragging: false,
  })); //() => ... sets the state only once on mount

  useEffect(() => {
    if (!state.newTitle && !state.newDesc && !state.list) return;

    const handler = setTimeout(() => {
      localStorage.setItem("title", state.newTitle);
      localStorage.setItem("desc", state.newDesc);
      localStorage.setItem("todo", JSON.stringify(state.list));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [state.newTitle, state.newDesc, state.list]);

  return (
    <section
      className={`flex justify-center pt-[80px] transition ${navOpen ? "max-lg:pb-25" : "max-lg:pb-3"} lg:px-25`}
    >
      <div className="relative flex h-full max-w-[1440px] flex-col items-center gap-4 px-4">
        <TitleHandler state={state} dispatch={dispatch} />

        <Reorder.Group
          axis="y"
          as="div"
          values={state.list}
          onReorder={(newOrder) =>
            dispatch({ type: "ARRANGE_LIST", payload: newOrder })
          }
          className="custom-scroll z-30 mb-10 flex w-[90vw] max-w-[550px] flex-col gap-3 overflow-x-hidden overflow-y-auto px-8"
        >
          <AnimatePresence mode="popLayout">
            {(Array.isArray(state.list) ? state.list : [state.list]).map(
              (li, index) => {
                return (
                  <Reorder.Item
                    layout
                    onDragStart={() => dispatch({ type: "SET_IS_DRAGGING" })}
                    onDragEnd={() => dispatch({ type: "SET_IS_DRAGGING" })}
                    key={li.id}
                    value={li}
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      loaded: (i: number) => ({
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: framerAnimProps.animDuration + i * 0.08,
                          type: "spring",
                          bounce: 0.5,
                          visualDuration: framerAnimProps.animDuration,
                        },
                      }),
                      exit: {
                        opacity: 0,
                        x: 50,
                        transition: {
                          duration: framerAnimProps.animDuration - 0.15,
                        },
                      },
                    }}
                    custom={index}
                    initial="hidden"
                    animate="loaded"
                    exit="exit"
                    className={`bg-secondary hover:bg-tertiary active:bg-tertiary dark:active:bg-tertiary-dark dark:hover:bg-tertiary-dark dark:bg-secondary-dark relative flex shrink-0 grow-0 items-start gap-2 overflow-hidden rounded-md border-1 px-2 py-2.5 ${li.done ? "border-subtext dark:border-subtext-dark scale-90" : "border-tertiary dark:border-tertiary-dark"}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-7 shrink-0 grow-0 cursor-pointer fill-none"
                    >
                      <path
                        d="M9 6H9.01M15 6H15.01M15 12H15.01M9 12H9.01M9 18H9.01M15 18H15.01M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6ZM16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6ZM10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12ZM16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12ZM10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18ZM16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z"
                        className="stroke-subtext dark:stroke-subtext-dark stroke-2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <input
                      type="checkbox"
                      disabled={state.isDragging}
                      checked={li.done}
                      onChange={() => DoneList(dispatch, li.id, toastPopUp)}
                      className="peer absolute top-0 left-0 size-full cursor-pointer appearance-none"
                    />

                    <span
                      className={`text-heading dark:text-heading-dark pointer-events-none text-lg break-all ${li.done ? "blur-[2px]" : "blur-none"}`}
                    >
                      {li.text}
                    </span>

                    <button
                      onClick={() => DeleteList(dispatch, li.id, toastPopUp)}
                      className="bg-error hover:bg-error-hovered active:bg-error-hovered z-30 ml-auto flex cursor-pointer items-center rounded-md p-1"
                    >
                      <FontAwesomeIcon
                        className="text-xl text-white"
                        icon={faXmark}
                      />
                    </button>
                  </Reorder.Item>
                );
              },
            )}
          </AnimatePresence>

          <FormHandler
            state={state}
            dispatch={dispatch}
            toastPopUp={toastPopUp}
          />
        </Reorder.Group>
      </div>
    </section>
  );
}
