//--------------Theme.tsx--------------//
export type ThemeContextTypes = {
  ThemeDark: boolean;
  ThemeToggle: () => void;
};

//--------------Toast.tsx--------------//
export type ToastContextTypes = {
  toastPopUp: (content: ToastContentTypes) => void
};

export type ToastComponentTypes = (id: number) => React.ReactNode;

export type ToastTypes = {
  id: number;
  component: React.ReactNode;
};

export type ToastContentTypes = {
  mode: boolean;
  msg: string;
  closeMsg: string;
};

//--------------Dictionary.tsx--------------//
export type WordTypes = {
  id: string;
  tag: string[];
  name: string;
  type: string[];
  date: string;
  favorite: boolean;
};
export type StateTypes = {
  words: WordTypes[];
  selectedTags: string[];
  selectedTypes: string[];
  dup: boolean;
  search: string;
  open: boolean;
  confirm: boolean;
  confirmTarget: { word: WordTypes; index: number } | null;
  adminAccess: boolean;
};

export type ActionTypes =
  | { type: "FETCH_WORD"; payload: WordTypes[] }
  | { type: "SELECT_TYPES"; payload: string }
  | { type: "SELECT_TAGS"; payload: string }
  | { type: "DELETE"; payload: string }
  | { type: "FAVORITE"; payload: string }
  | { type: "RESET_FORM" }
  | { type: "DUPLICATED"; payload: boolean }
  | { type: "SEARCH"; payload: string }
  | { type: "OPEN_FORM"; payload?: boolean }
  | {
      type: "CONFIRMATION";
      payload?: { word: WordTypes; index: number } | null;
    }
  | { type: "ROLLBACK"; index: number; payload: WordTypes }
  | { type: "ADMIN_ACCESS" };

export type TagTypes = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
