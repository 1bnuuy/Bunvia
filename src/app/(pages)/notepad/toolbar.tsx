"use client";

import { ToastContextTypes } from "@/lib/globalTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BottomToolbarButtons, TopToolbarButtons } from "./var";
import { BtnFunc } from "./manageNotepad";
import { useSlate } from "slate-react";
import { Node } from "slate";
import { RefObject } from "react";

export const ToolbarTop = ({
  toastPopUp,
  PrintContent,
}: {
  PrintContent: RefObject<HTMLDivElement | null>;
  toastPopUp: ToastContextTypes["toastPopUp"];
}) => {
  const editor = useSlate(); //Can't use editor from page.tsx as it uses useMemo() istg

  return (
    <div className="bg-tertiary dark:bg-tertiary-dark flex w-full items-center overflow-hidden gap-1 rounded-md px-3 py-1">
      {TopToolbarButtons.map((t) => {
        return (
          <button
            key={t.id}
            onMouseDown={(e) => {
              e.preventDefault(); //Prevent focus loss
              BtnFunc(toastPopUp, t.id, editor, PrintContent);
            }}
            className={`group relative flex ${(editor.history.undos.length === 0 && t.id === "undo") || (editor.history.redos.length === 0 && t.id === "redo") ? "cursor-default" : "cursor-pointer"} items-center gap-1`}
          >
            <span
              className={`group-hover:text-accent group-active:text-accent dark:group-active:text-accent-dark dark:group-hover:text-accent-dark flex aspect-square w-[30px] cursor-pointer items-center justify-center text-xl transition`}
            >
              <FontAwesomeIcon icon={t.icon} />
            </span>
            <span
              className={`group-hover:text-accent max-xs:hidden group-active:text-accent dark:group-active:text-accent-dark dark:group-hover:text-accent-dark z-10 max-w-0 cursor-pointer overflow-hidden text-xl font-semibold uppercase opacity-0 transition-all duration-300 group-hover:max-w-[125px] group-hover:opacity-100 group-active:max-w-[125px] group-active:opacity-100`}
            >
              {t.id}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const ToolbarBottom = ({
  toastPopUp,
  PrintContent,
}: {
  toastPopUp: ToastContextTypes["toastPopUp"];
  PrintContent: RefObject<HTMLDivElement | null>;
}) => {
  const editor = useSlate();

  return (
    <div className="bg-tertiary dark:bg-tertiary-dark flex w-full items-center justify-between rounded-md px-3 py-1">
      <div className="flex gap-1">
        {BottomToolbarButtons.map((t) => {
          return (
            <button
              key={t.id}
              onMouseDown={(e) => {
                e.preventDefault();
                BtnFunc(toastPopUp, t.id, editor, PrintContent);
              }}
              className={`group relative flex ${(editor.history.undos.length === 0 && t.id === "undo") || (editor.history.redos.length === 0 && t.id === "redo") ? "cursor-default" : "cursor-pointer"} items-center overflow-hidden gap-1`}
            >
              <span
                className={`${(editor.history.undos.length === 0 && t.id === "undo") || (editor.history.redos.length === 0 && t.id === "redo") ? "text-subtext dark:text-subtext-dark cursor-default" : "group-hover:text-accent group-active:text-accent dark:group-active:text-accent-dark dark:group-hover:text-accent-dark cursor-pointer"} flex aspect-square w-[30px] items-center justify-center text-xl transition`}
              >
                <FontAwesomeIcon icon={t.icon} />
              </span>
              <span
                className={`${(editor.history.undos.length === 0 && t.id === "undo") || (editor.history.redos.length === 0 && t.id === "redo") ? "text-subtext dark:text-subtext-dark cursor-default group-hover:opacity-100 group-active:opacity-100" : "group-hover:text-accent group-active:text-accent dark:group-active:text-accent-dark dark:group-hover:text-accent-dark cursor-pointer group-hover:opacity-100 group-active:opacity-100"} z-10 max-w-0 overflow-hidden text-xl max-xs:hidden font-semibold uppercase opacity-0 transition-all duration-300 group-hover:max-w-[125px] group-active:max-w-[125px]`}
              >
                {t.id}
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-nowrap">
        Words: {Node.string(editor).trim().split(/\s+/).filter(Boolean).length}
      </span>
    </div>
  );
};
