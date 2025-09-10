import {
  ActionTypes,
  ApiResponseTypes,
  StateTypes,
  ToastContextTypes,
  WordTypes,
} from "@/lib/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

//--------------FAVORITE--------------//
export async function Favorite(
  word: WordTypes,
  dispatch: React.Dispatch<ActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  dispatch({ type: "FAVORITE", payload: word.id });

  try {
    const res = await fetch(`/api/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: word.id,
        name: word.name,
        favorite: word.favorite,
      }),
    });

    const result: ApiResponseTypes = await res.json().catch(() => null);

    if (result?.success) {
      toastPopUp({
        success: result.success,
        msg: result.msg,
      });
    } else {
      toastPopUp({
        success: result.success,
        msg: result.msg,
      });
      dispatch({ type: "FAVORITE", payload: word.id });
    }
  } catch {
    toastPopUp({
      success: false,
      msg: `Star sticker fell off ${word.name.toUpperCase()}...`,
    });
    dispatch({ type: "FAVORITE", payload: word.id });
  }
}

//--------------DELETE--------------//
export async function Delete(
  word: WordTypes,
  index: number,
  dispatch: React.Dispatch<ActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  dispatch({ type: "DELETE", payload: word.id });

  try {
    const res = await fetch(`/api/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: word.name,
        id: word.id,
      }),
    });

    const result: ApiResponseTypes = await res.json().catch(() => null);

    if (result?.success) {
      toastPopUp({
        success: result.success,
        msg: result.msg,
      });
    } else {
      //Runs if words/[id]/route.ts fails
      toastPopUp({
        success: result.success,
        msg: result.msg,
      });
      dispatch({ type: "ROLLBACK", payload: word, index });
    }
  } catch {
    //Runs if res = await fetch fails
    toastPopUp({
      success: false,
      msg: `${word.name ? word.name.toUpperCase() : "The word"} refused to leave, Pee is chasing it around!`,
    });
    dispatch({ type: "ROLLBACK", payload: word, index });
  }
}

//--------------CREATE--------------//
export async function Create(
  e: React.FormEvent<HTMLFormElement>,
  Name: React.RefObject<HTMLInputElement | null>,
  state: StateTypes,
  dispatch: React.Dispatch<ActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  e.preventDefault();

  try {
    dispatch({ type: "BUTTON_LOADING" });

    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //Pass name, type, tag values to POST()
        name: Name.current?.value,
        type: state.selectedTypes,
        tag: state.selectedTags,
      }),
    });

    //Check HTTP status
    const result: ApiResponseTypes = await res.json().catch(() => null);

    if (result?.success) {
      toastPopUp({ success: result.success, msg: result.msg });

      dispatch({ type: "RESET_FORM" });
      Name.current!.value = "";
    } else {
      toastPopUp({ success: result.success, msg: result.msg });
    }
  } catch {
    toastPopUp({
      success: false,
      msg: `Pee couldn't create ${Name.current?.value.toUpperCase()}...`,
    });
    dispatch({ type: "BUTTON_LOADING" });
  } finally {
    dispatch({ type: "BUTTON_LOADING" });
  }
}

//--------------FETCH--------------//
export function Fetch(
  dispatch: React.Dispatch<ActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  let firstLoad = true;

  const unsubscribe = onSnapshot(
    collection(db, "words"),
    (snapshot) => {
      const wordList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<WordTypes, "id">),
      }));
      dispatch({ type: "FETCH_WORD", payload: wordList });

      if (firstLoad) {
        toastPopUp({
          success: true,
          msg: `Poo returned with a basket containing ${wordList.length} carrots!`,
        });
        firstLoad = false;
      }
    },
    () => {
      toastPopUp({
        success: false,
        msg: "Oops, Poo stepped on the cable… connection lost!",
      });
    },
  );

  return unsubscribe;
}
