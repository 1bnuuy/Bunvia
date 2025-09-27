"use client";

import { useUI } from "@/components/UI";

import { useEffect, useReducer } from "react";
import { Toolbar } from "./toolbar";
import { InitialToolbar, ToolbarReducer } from "./var";

export default function Notepad() {
  const { navOpen } = useUI();
  const [state, dispatch] = useReducer(ToolbarReducer, InitialToolbar, () => ({
    text: localStorage.getItem("notepad") ?? "",
    undo: [],
    redo: [],
  }));

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("notepad", state.text);
    }, 500);

    return () => clearTimeout(handler);
  }, [state.text]);

  return (
    <section
      className={`h-dvh px-3 pt-[80px] pb-5 transition ${navOpen ? "max-lg:pb-35" : "max-lg:pb-12"}`}
    >
      <div className="text-heading dark:text-heading-dark bg-secondary dark:bg-secondary-dark relative left-1/2 z-10 flex h-full max-w-[940px] -translate-x-1/2 flex-col gap-3 overflow-hidden rounded-md p-3">
        <Toolbar state={state} dispatch={dispatch} />

        <textarea
          name="textarea"
          placeholder="Write something..."
          value={state.text}
          onChange={(e) =>
            dispatch({ type: "SET_TEXT", payload: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.ctrlKey || e.metaKey) {
              if (e.key === "z" || e.key === "Z") {
                e.preventDefault();
                dispatch({ type: "UNDO" });
              } else if (e.key === "y" || e.key === "Y") {
                e.preventDefault();
                dispatch({ type: "REDO" });
              }
            }
          }}
          className="custom-scroll w-full flex-1 resize-none px-2 leading-snug outline-none"
        />
      </div>
    </section>
  );
}
