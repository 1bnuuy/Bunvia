import { DateCreated } from "@/app/(pages)/dictionary/var";
import {
  DictionaryActionTypes,
  InitDictionaryTypes,
  ToastContextTypes,
  WordTypes,
} from "@/lib/types";

//--------------FAVORITE--------------//
export function UserFavorite(
  word: WordTypes,
  dispatch: React.Dispatch<DictionaryActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  dispatch({ type: "FAVORITE", payload: word.id });
  toastPopUp({
    success: true,
    msg: `${word.name ? word.name.toUpperCase() : "The word"} shines brightly!`,
  });
}

//--------------DELETE--------------//
export function UserDelete(
  word: WordTypes,
  dispatch: React.Dispatch<DictionaryActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  dispatch({ type: "DELETE", payload: word.id });
  toastPopUp({
    success: true,
    msg: `${word.name ? word.name.toUpperCase() : "The word"} disappeared into thin air.`,
  });
}

//--------------CREATE--------------//
export function UserCreate(
  e: React.FormEvent<HTMLFormElement>,
  Name: React.RefObject<HTMLInputElement | null>,
  state: InitDictionaryTypes,
  dispatch: React.Dispatch<DictionaryActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  e.preventDefault();

  const blankFields: string[] = [];
  const type = state.selectedTypes || "";

  if (
    !Name.current?.value ||
    typeof Name.current?.value !== "string" ||
    !Name.current?.value.trim()
  )
    blankFields.push("Name");
  if (!type || (Array.isArray(type) && type.length === 0))
    blankFields.push("Class");

  if (blankFields.length) {
    return toastPopUp({
      success: false,
      msg: `Hoppy mistake! ${blankFields.join(", ")} ${blankFields.length > 1 ? "fields are" : "field is"} still blank!`,
    });
  }

  const formattedName = Name.current?.value.trim();
  const newWord = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    tag: state.selectedTags,
    name: formattedName?.toLowerCase() || "",
    type: state.selectedTypes,
    date: DateCreated,
    favorite: false,
  };
  dispatch({ type: "ADD_WORD", payload: newWord });

  dispatch({ type: "RESET_FORM" });
  Name.current!.value = "";

  toastPopUp({
    success: true,
    msg: `${formattedName?.toUpperCase()} has been created!`,
  });
}
