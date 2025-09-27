"use client";

import { AppendList } from "@/lib/manageTodoList";
import { InitTodoListTypes, ToastContextTypes, TodoListActionTypes } from "@/lib/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

export const FormHandler = ({
  state,
  dispatch,
  toastPopUp
}: {
  state: InitTodoListTypes;
  dispatch: React.Dispatch<TodoListActionTypes>;
  toastPopUp: ToastContextTypes["toastPopUp"]
}) => {
  const text = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      {state.openCreate && (
        <div className="bg-secondary border-accent dark:border-heading-dark dark:bg-secondary-dark box-border flex origin-top flex-col gap-4 rounded-md border-1 p-5">
          <textarea
            ref={text}
            placeholder="What is on your mind today?"
            className="caret-heading dark:caret-heading-dark text-heading dark:text-heading-dark size-full h-[200px] resize-none overflow-y-auto overflow-x-hidden custom-scroll text-lg outline-none"
          />

          <button
            onClick={() => AppendList(dispatch, text, toastPopUp)}
            className="bg-accent text-primary hover:bg-accent-hovered dark:hover:bg-accent-hovered-dark active:bg-accent-hovered dark:active:bg-accent-hovered-dark dark:bg-accent-dark ml-auto cursor-pointer rounded-md px-4 py-1 text-lg font-semibold"
          >
            Submit
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => dispatch({ type: "OPEN_CREATE" })}
        className={`bg-secondary hover:bg-tertiary dark:hover:bg-tertiary-dark dark:bg-secondary-dark flex w-full cursor-pointer justify-center rounded-md border-1 py-3 ${state.openCreate ? "border-error" : "border-heading dark:border-heading-dark"} `}
      >
        <FontAwesomeIcon
          icon={faPlus}
          className={
            state.openCreate
              ? "text-error rotate-45"
              : "text-heading dark:text-heading-dark"
          }
        />
      </button>
    </>
  );
};
