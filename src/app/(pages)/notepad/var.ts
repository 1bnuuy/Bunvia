import { InitToolbarTypes, ToolbarActionTypes } from "@/lib/types";
import {
  faA,
  faCopy,
  faPaste,
  faRedo,
  faSave,
  faScissors,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

export const ToolBarButtons = [
  {
    id: "save",
    icon: faSave,
  },

  {
    id: "undo",
    icon: faUndo,
  },

  {
    id: "redo",
    icon: faRedo,
  },

  {
    id: "bold",
    icon: faA
  },

  {
    id: "cut",
    icon: faScissors,
  },

  {
    id: "copy",
    icon: faCopy,
  },

  {
    id: "paste",
    icon: faPaste,
  },
];

export const InitialToolbar: InitToolbarTypes = {
  text: "",
  undo: [],
  redo: [],
};

export const ToolbarReducer: (
  state: InitToolbarTypes,
  action: ToolbarActionTypes,
) => InitToolbarTypes = (state, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload ?? "",
        undo: [...state.undo, state.text],
        redo: [],
      };

    case "UNDO":
      if (state.undo.length === 0) return state;

      return {
        ...state,
        text: state.undo[state.undo.length - 1],
        undo: state.undo.slice(0, -1),
        redo: [...state.redo, state.text],
      };

    case "REDO":
      if (state.redo.length === 0) return state;

      return {
        ...state,
        text: state.redo[state.redo.length - 1],
        undo: [...state.undo, state.text],
        redo: state.redo.slice(0, -1),
      };

      case "BOLD":
      return {
        ...state,
        text: state.text,
      };

    default:
      return state;
  }
};
