import {
  ActionTypes,
  StateTypes,
  ToastContextTypes,
  WordTypes,
} from "@/lib/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const DateCreated = new Date().toLocaleDateString("en-GB", {
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
  adminAccess: false,
};

export const reducer: (state: StateTypes, action: ActionTypes) => StateTypes = (
  state,
  action,
) => {
  switch (action.type) {
    case "FETCH_WORD":
      return { ...state, words: action.payload }; //...state keeps everything else unrelated to action.payload's target

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

    case "ADMIN_ACCESS":
      return { ...state, adminAccess: !state.adminAccess };

    default:
      return state;
  }
};

//--------------FAVORITE--------------//
export async function Favorite(
  word: WordTypes,
  dispatch: React.Dispatch<ActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  dispatch({ type: "FAVORITE", payload: word.id });

  try {
    const wordRef = doc(db, "words", word.id);
    await updateDoc(wordRef, {
      favorite: !word.favorite,
    });

    if (!word.favorite) {
      toastPopUp({
        mode: true,
        msg: `Favorited! Poo put a bow on ${word.name.toUpperCase()}.`,
        closeMsg: "Done",
      });
    } else {
      toastPopUp({
        mode: true,
        msg: `${word.name.toUpperCase()} is no longer a favorite, but still adorable!`,
        closeMsg: "Done",
      });
    }
  } catch (_error) {
    toastPopUp({
      mode: false,
      msg: `Star sticker fell off ${word.name.toUpperCase()}...`,
      closeMsg: "Burrow",
    });
    setTimeout(() => {
      dispatch({ type: "FAVORITE", payload: word.id });
    }, 300);
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
    await deleteDoc(doc(db, "words", word.id));
    toastPopUp({
      mode: true,
      msg: `Poo made ${word.name.toUpperCase()} vanish!`,
      closeMsg: "Bye",
    });
  } catch (_error) {
    toastPopUp({
      mode: false,
      msg: "The word refused to leave, Pee is chasing it around!",
      closeMsg: "Retry",
    });
    setTimeout(() => {
      dispatch({ type: "ROLLBACK", payload: word, index });
    }, 300);
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

  const newWord = {
    tag: state.selectedTags,
    name: Name.current?.value.trim().toLowerCase(),
    type: state.selectedTypes,
    date: DateCreated,
    favorite: false,
  };

  const blankFields = [];

  if (!Name.current?.value) blankFields.push("Name");
  if (!state.selectedTypes.length) blankFields.push("Class");

  if (Name.current?.value && state.selectedTypes.length) {
    const wordsRef = collection(db, "words");
    const q = query(
      wordsRef,
      where("name", "==", newWord.name?.trim().toLowerCase()),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      dispatch({ type: "DUPLICATED", payload: true });
      toastPopUp({
        mode: false,
        msg: "This word already exists! Pee and Poo won't let it in!",
        closeMsg: "Okay",
      });
      return;
    }

    try {
      await addDoc(collection(db, "words"), newWord);
      toastPopUp({
        mode: true,
        msg: "New word created, Pee hugs it tight!",
        closeMsg: "Hop",
      });

      dispatch({ type: "RESET_FORM" });
      Name.current.value = "";

      document
        .querySelectorAll<HTMLInputElement>("input[type=checkbox]")
        .forEach((el) => {
          el.checked = false;
        });
    } catch (_error) {
      toastPopUp({
        mode: false,
        msg: "The word ran away before Pee could catch it...",
        closeMsg: "Oops",
      });
    }
  } else {
    toastPopUp({
      mode: false,
      msg: `Hoppy mistake! ${blankFields.join(", ")} ${blankFields.length > 1 ? "fields are" : "field is"} still blank!`,
      closeMsg: "On it",
    });
  }
}

//--------------FETCH--------------//
export function Fetch(
  dispatch: React.Dispatch<ActionTypes>,
  toastPopUp: ToastContextTypes["toastPopUp"],
  firstLoad: boolean,
) {
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
          mode: true,
          msg: `Poo returned with a basket containing ${wordList.length} carrots!`,
          closeMsg: "Thanks",
        });
        firstLoad = false;
      }
    },
    () => {
      toastPopUp({
        mode: false,
        msg: "Oops, Poo stepped on the cable… connection lost!",
        closeMsg: "Dismiss",
      });
    },
  );

  return unsubscribe;
}
