import {
  faBook,
  faChartSimple,
  faHouse,
  faListCheck,
  faPen,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { ActionTypes, StateTypes, TagTypes } from "./types";

export const availablePaths = [
  "/",
  "/todolist",
  "/dictionary",
  "/analytics",
  "/auth",
];

export const links = [
  {
    name: "Home",
    icon: faHouse,
    path: "/",
  },

  {
    name: "Tasks",
    icon: faListCheck,
    path: "/todolist",
  },

  {
    name: "Wordbook",
    icon: faBook,
    path: "/dictionary",
  },

  {
    name: "Analytics",
    icon: faChartSimple,
    path: "/analytics",
  },
];

export const btnScale = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

export const btnRelocate = {
  initial: { scale: 1, x: 0 },
  hover: { x: -20 },
  tap: { scale: 0.95, x: -20 },
};

export const onView = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
};

export const Features = [
  {
    name: "To-do List",
    icon: faPen,
    desc: "Stay on track by ticking off tasks, one at a time.",
  },

  {
    name: "Notebook",
    icon: faStickyNote,
    desc: "Capture notes and ideas in a professional, organized space.",
  },

  {
    name: "Dictionary",
    icon: faBook,
    desc: "Your pocket-sized dictionary for learning on the go.",
  },

  {
    name: "Analytics",
    icon: faChartSimple,
    desc: "See progress in simple charts and celebrate milestones.",
  },
];

export const DateCreated = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const initialState: StateTypes = {
  words: [],
  selectedTags: [],
  selectedTypes: [],
  dup: false,
  search: "",
  open: false,
  confirm: false,
  confirmTarget: null,
  btnLoading: false,
};

export const reducer: (state: StateTypes, action: ActionTypes) => StateTypes = (
  state,
  action,
) => {
  switch (action.type) {
    case "FETCH_WORD":
      return { ...state, words: action.payload };

    case "SELECT_TYPES":
      return {
        ...state,
        selectedTypes: state.selectedTypes.includes(action.payload)
          ? state.selectedTypes.filter((tag) => tag !== action.payload)
          : [...state.selectedTypes, action.payload],
      };

    case "SELECT_TAGS":
      return {
        ...state,
        selectedTags: state.selectedTags.includes(action.payload)
          ? state.selectedTags.filter((tag) => tag !== action.payload)
          : [...state.selectedTags, action.payload],
      };

    case "DELETE":
      return {
        ...state,
        words: state.words.filter((w) => w.id !== action.payload),
      };

    case "FAVORITE":
      return {
        ...state,
        words: state.words.map((w) =>
          w.id === action.payload ? { ...w, favorite: !w.favorite } : w,
        ),
      };

    case "BUTTON_LOADING":
      return {
        ...state,
        btnLoading: !state.btnLoading,
      };

    case "RESET_FORM":
      return { ...state, selectedTags: [], selectedTypes: [], dup: false };

    case "DUPLICATED":
      return { ...state, dup: action.payload };

    case "SEARCH":
      return { ...state, search: action.payload };

    case "OPEN_FORM":
      return { ...state, open: !state.open };

    case "CONFIRMATION":
      return {
        ...state,
        confirm: !state.confirm,
        confirmTarget: action.payload ?? null,
      };

    case "ROLLBACK":
      const rw = [...state.words];
      rw.splice(action.index, 0, action.payload);

      return { ...state, words: rw };

    default:
      return state;
  }
};

export const tagColor: Record<TagTypes, string> = {
  A1: "bg-green-200",
  A2: "bg-green-500",
  B1: "bg-pink-200",
  B2: "bg-pink-500",
  C1: "bg-indigo-400",
  C2: "bg-purple-600",
};

export const wordClass = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
  "phrase",
  "idiom",
  "phrasal verb",
];
