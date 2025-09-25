import {
  faBook,
  faCircleInfo,
  faEye,
  faLightbulb,
  faListCheck,
  faMagnifyingGlass,
  faMedal,
  faPen,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import {
  DictionaryActionTypes,
  InitDictionaryTypes,
  InitTodoListTypes,
  TagTypes,
  TodoListActionTypes,
} from "./types";

//--------------Navigation--------------//
export const availablePaths = [
  "/",
  "/about",
  "/todolist",
  "/dictionary",
  "/notebook",
];

export const links = [
  {
    name: "About",
    icon: faCircleInfo,
    path: "/about",
  },

  {
    name: "Tasks",
    icon: faListCheck,
    path: "/todolist",
  },

  {
    name: "Dictionary",
    icon: faBook,
    path: "/dictionary",
  },

  {
    name: "Notebook",
    icon: faStickyNote,
    path: "/notebook",
  },
];

//--------------Theme--------------//
export const framerAnimProps = {
  animDelay: 0.25,
  animDuration: 0.3,
  viewPercent: 0.3,
};

export const btnScale = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

export const btnRelocateLeft = {
  initial: { scale: 1, x: 0 },
  hover: { x: -20 },
  tap: { scale: 0.95, x: -20 },
};

export const btnRelocateRight = {
  initial: { scale: 1, x: 0 },
  hover: { x: 20 },
  tap: { scale: 0.95, x: 20 },
};

export const Pop = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

export const Opacity = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FadeInBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export const FadeInTop = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
};

export const SlideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

export const SlideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

//--------------Home--------------//
export const Features = [
  {
    name: "Tasks & Priorities",
    icon: faPen,
    desc: "Stay on track by ticking off tasks, one at a time.",
  },

  {
    name: "Vocabulary Builder",
    icon: faBook,
    desc: "Your pocket-sized dictionary for learning on the go.",
  },

  {
    name: "Ideas & Insights",
    icon: faStickyNote,
    desc: "Capture notes and ideas in a professional, organized space.",
  },
];

export const Journey = [
  "Discover",
  "Organize",
  "Plan",
  "Learn",
  "Practice",
  "Focus",
  "Reflect",
  "Share",
  "Achieve",
  "Grow",
];

//--------------About--------------//
export const Offers = [
  {
    name: "Responsiveness",
    desc: "across all devices.",
  },

  {
    name: "Animation",
    desc: "enhances user experience.",
  },

  {
    name: "User-friendly",
    desc: "and with no limitation.",
  },

  {
    name: "No Sign-up",
    desc: "Start writing immediately.",
  },
];

//--------------To-do List--------------//
export const InitialTodo: InitTodoListTypes = {
  isEditing: null,
  newTitle: "",
  newDesc: "",
  openCreate: false,
  list: [],
  isDragging: false,
};

export const TodoReducer: (
  state: InitTodoListTypes,
  action: TodoListActionTypes,
) => InitTodoListTypes = (state, action) => {
  switch (action.type) {
    case "ENABLE_EDITING":
      return { ...state, isEditing: action.payload };

    case "SET_TITLE":
      return { ...state, newTitle: action.payload };

    case "SET_DESC":
      return { ...state, newDesc: action.payload };

    case "OPEN_CREATE":
      return { ...state, openCreate: !state.openCreate };

    case "ADD_TODO":
      return { ...state, list: [...state.list, action.payload] };

    case "ARRANGE_LIST":
      return { ...state, list: action.payload };

    case "DELETE_TODO":
      return {
        ...state,
        list: state.list.filter((l) => l.id !== action.payload),
      };

    case "DONE_TODO":
      return {
        ...state,
        list: state.list.map((l) =>
          l.id === action.payload ? { ...l, done: !l.done } : l,
        ),
      };

    case "SET_IS_DRAGGING":
      return { ...state, isDragging: !state.isDragging };

    default:
      return state;
  }
};

//--------------Dictionary--------------//
export const DateCreated = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const InitialDictionary: InitDictionaryTypes = {
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

export const DictionaryReducer: (
  state: InitDictionaryTypes,
  action: DictionaryActionTypes,
) => InitDictionaryTypes = (state, action) => {
  switch (action.type) {
    case "FETCH_WORD":
      return { ...state, words: action.payload };

    case "ADD_WORD":
      return { ...state, words: [...state.words, action.payload] };

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

//--------------Footer--------------//
export const socialMedia = [
  {
    name: "Facebook",
    path: "https://web.facebook.com/iiOwl",
  },

  {
    name: "Reddit",
    path: "https://www.reddit.com/user/Budget-Apartment9943",
  },

  {
    name: "Github",
    path: "https://github.com/1bnuuy",
  },

  {
    name: "Youtube",
    path: "https://www.youtube.com/channel/UCHJ8C76GhJ9vXZ0uUxd9xPg",
  },
];
