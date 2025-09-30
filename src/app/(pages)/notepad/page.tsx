"use client";

import { useMemo, useRef, useState } from "react";

import { useUI } from "@/components/UI";
import { useToast } from "@/components/Toast";

import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor } from "slate";

import { KeyboardFunc } from "./manageNotepad";
import { EditorTypes } from "./types";
import { ToolbarBottom, ToolbarTop } from "./toolbar";
import { Leaf } from "./decoration";

export default function Notepad() {
  const { navOpen } = useUI();
  const { toastPopUp } = useToast();
  const PrintContent = useRef<HTMLDivElement | null>(null);
  const editor = useMemo<EditorTypes>(
    () => withHistory(withReact(createEditor())),
    [],
  );

  const fallbackValue = [
    {
      type: "paragraph",
      children: [{ text: "Hello from Pee and Poo :3" }],
    },
  ];

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("NotePadContent") ?? "null") ??
      fallbackValue,
    //Fallback for JSON can't be "" or it will freak out, has to be "null" tho
    [],
  );

  return (
    <section
      className={`h-dvh px-3 pt-[80px] pb-5 transition ${navOpen ? "max-lg:pb-35" : "max-lg:pb-12"}`}
    >
      <div className="text-heading dark:text-heading-dark bg-secondary dark:bg-secondary-dark relative left-1/2 z-10 flex h-full max-w-[940px] -translate-x-1/2 flex-col gap-3 overflow-hidden rounded-md p-3">
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(value) => {
            const isTextChange = editor.operations.some(
              (op) => "set_selection" !== op.type,
            ); //Check if user actually types something, not moving caret/cursor

            const content = JSON.stringify(value);

            if (isTextChange) {
              if (value.length > 0)
                localStorage.setItem("NotePadContent", content);
            } else {
              localStorage.setItem("NotePadContent", content);
            }
          }}
        >
          <ToolbarTop toastPopUp={toastPopUp} PrintContent={PrintContent} />
          <Editable
            spellCheck={false}
            ref={PrintContent}
            renderLeaf={(props) => <Leaf {...props} />}
            onKeyDown={(e) => KeyboardFunc(e, toastPopUp, editor)}
            placeholder="Type something..."
            className={`custom-scroll w-full flex-1 overflow-auto px-2 pb-2 leading-relaxed outline-none`}
          />
          <ToolbarBottom toastPopUp={toastPopUp} PrintContent={PrintContent} />
        </Slate>
      </div>
    </section>
  );
}
