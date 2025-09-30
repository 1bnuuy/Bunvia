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