import { Variants } from "motion";

//--------------Auth--------------//
export type AuthTypes = {
  email: string;
  password: string;
  onChange: (user: import("firebase/auth").User | null) => void;
};

//--------------Theme--------------//
export type ThemeContextTypes = {
  ThemeDark: boolean;
  ThemeToggle: () => void;
};

//--------------Toast--------------//
export type ToastContextTypes = {
  toastPopUp: (content: ToastContentTypes) => void;
};

export type ToastComponentTypes = (id: number) => React.ReactNode;

export type ToastTypes = {
  id: number;
  component: React.ReactNode;
};

export type ToastContentTypes = {
  success: boolean;
  msg: string;
};

//--------------UI--------------//
export type UIContextTypes = {
  navOpen: boolean;
  navToggle: () => void;
};

//--------------AddOn--------------//
export type AddOnTypes = {
  size?: number;
  h?: number;
  w?: number;
  t?: number;
  l?: number;
};

//--------------Home--------------//
export type ArticleTypes = {
  gridType: string;
  variants: Variants;
  src: string;
  title: string;
  description: string;
};

//--------------To-do List--------------//
export type TodoTypes = {
  id: string;
  text: string;
  done: boolean;
};

export type InitTodoListTypes = {
  isEditing: null | "title" | "desc";
  newTitle: string;
  newDesc: string;
  openCreate: boolean;
  list: TodoTypes[];
  isDragging: boolean;
};

export type TodoListActionTypes =
  | { type: "ENABLE_EDITING"; payload: null | "title" | "desc" }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESC"; payload: string }
  | { type: "OPEN_CREATE" }
  | { type: "ADD_TODO"; payload: TodoTypes }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "ARRANGE_LIST"; payload: TodoTypes[] }
  | { type: "DONE_TODO"; payload: string }
  | { type: "SET_IS_DRAGGING" };

//--------------Dictionary--------------//
export type WordTypes = {
  id: string;
  tag: string[];
  name: string;
  type: string[];
  date: string;
  favorite: boolean;
};

export type InitDictionaryTypes = {
  words: WordTypes[];
  selectedTags: string[];
  selectedTypes: string[];
  dup: boolean;
  search: string;
  open: boolean;
  confirm: boolean;
  confirmTarget: { word: WordTypes; index: number } | null;
  btnLoading: boolean;
};

export type DictionaryActionTypes =
  | { type: "FETCH_WORD"; payload: WordTypes[] }
  | { type: "ADD_WORD"; payload: WordTypes }
  | { type: "SELECT_TYPES"; payload: string }
  | { type: "SELECT_TAGS"; payload: string }
  | { type: "DELETE"; payload: string }
  | { type: "FAVORITE"; payload: string }
  | { type: "BUTTON_LOADING" }
  | { type: "RESET_FORM" }
  | { type: "DUPLICATED"; payload: boolean }
  | { type: "SEARCH"; payload: string }
  | { type: "OPEN_FORM" }
  | {
      type: "CONFIRMATION";
      payload?: { word: WordTypes; index: number } | null;
    }
  | { type: "ROLLBACK"; index: number; payload: WordTypes };

export type TagTypes = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

//--------------API--------------//
export type ApiResponseTypes = {
  success: boolean;
  msg: string;
};
