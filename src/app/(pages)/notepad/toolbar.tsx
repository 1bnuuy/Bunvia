import { InitToolbarTypes, ToolbarActionTypes } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolBarButtons } from "./var";

export const Toolbar = ({
  state,
  dispatch,
}: {
  state: InitToolbarTypes;
  dispatch: React.Dispatch<ToolbarActionTypes>;
}) => {
  return (
    <div className="bg-tertiary dark:bg-tertiary-dark sticky top-0 flex w-full items-center gap-1 rounded-md px-3 py-1">
      {ToolBarButtons.map((t) => {
        return (
          <button
            key={t.id}
            onClick={() =>
              dispatch({
                type: t.id.toUpperCase() as ToolbarActionTypes["type"],
              })
            }
            className="group relative cursor-pointer flex gap-1"
          >
            <span
              className={`${(state.undo.length === 0 && t.id === "undo") || (state.redo.length === 0 && t.id === "redo") ? "text-subtext dark:text-subtext-dark cursor-default" : "group-hover:text-accent group-active:text-accent dark:group-active:text-accent-dark dark:group-hover:text-accent-dark cursor-pointer"} flex aspect-square w-[30px] items-center justify-center text-xl transition`}
            >
              <FontAwesomeIcon icon={t.icon} />
            </span>
            <span
              className={`${(state.undo.length === 0 && t.id === "undo") || (state.redo.length === 0 && t.id === "redo") ? "text-subtext dark:text-subtext-dark cursor-default" : "group-hover:text-accent group-active:text-accent dark:group-active:text-accent-dark dark:group-hover:text-accent-dark cursor-pointer"} z-10 max-w-0 overflow-hidden text-xl font-semibold uppercase transition-[max-width] group-hover:max-w-[70px] group-active:max-w-[70px]`}
            >
              {t.id}
            </span>
          </button>
        );
      })}
    </div>
  );
};
