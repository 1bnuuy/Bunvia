import { InitTodoListTypes, TodoListActionTypes } from "@/lib/types";
import { framerAnimProps } from "@/lib/variables";
import { motion } from "motion/react";

export const TitleHandler = ({
  state,
  dispatch,
}: {
  state: InitTodoListTypes;
  dispatch: React.Dispatch<TodoListActionTypes>;
}) => {
  return (
    <>
      {state.isEditing === "title" ? (
        <input
          autoFocus
          onChange={(e) => {
            dispatch({ type: "SET_TITLE", payload: e.target.value });
          }}
          onBlur={() => dispatch({ type: "ENABLE_EDITING", payload: null })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch({ type: "ENABLE_EDITING", payload: null });
            }
          }}
          placeholder=""
          value={state.newTitle}
          className="caret-heading text-heading dark:text-heading-dark dark:caret-heading-dark w-full max-w-[800px] min-w-[200px] text-center text-5xl outline-none"
        />
      ) : (
        <motion.button
          key="title"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.3 }}
          whileTap={{ opacity: 0.3 }}
          transition={{ duration: framerAnimProps.animDuration - 0.15 }}
          onClick={() => dispatch({ type: "ENABLE_EDITING", payload: "title" })}
          className="text-heading dark:text-heading-dark cursor-pointer text-center text-4xl max-sm:text-2xl text-balance break-all"
        >
          {state.newTitle || "Untitled"}
        </motion.button>
      )}

      {state.isEditing === "desc" ? (
        <textarea
          autoFocus
          onChange={(e) => {
            dispatch({ type: "SET_DESC", payload: e.target.value });
          }}
          onBlur={() => dispatch({ type: "ENABLE_EDITING", payload: null })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch({ type: "ENABLE_EDITING", payload: null });
            }
          }}
          placeholder=""
          value={state.newDesc}
          className="caret-heading dark:caret-heading-dark text-heading dark:text-heading-dark w-full max-w-[800px] min-w-[200px] resize-none overflow-hidden text-center text-lg leading-tight outline-none"
        />
      ) : (
        <motion.button
          key="desc"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.3 }}
          whileTap={{ opacity: 0.3 }}
          transition={{ duration: framerAnimProps.animDuration - 0.15 }}
          onClick={() => dispatch({ type: "ENABLE_EDITING", payload: "desc" })}
          className="text-subtext dark:text-subtext-dark cursor-pointer text-center text-lg text-balance break-all hyphens-auto"
        >
          {state.newDesc || "Description..."}
        </motion.button>
      )}
    </>
  );
};
