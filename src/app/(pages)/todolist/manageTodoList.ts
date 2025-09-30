import { TodoListActionTypes } from "./types";
import { ToastContextTypes } from "@/lib/globalTypes";

export const AppendList = (
  dispatch: React.Dispatch<TodoListActionTypes>,
  text: React.RefObject<HTMLTextAreaElement | null>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) => {
  if (!text.current?.value)
    return toastPopUp({
      success: false,
      msg: "You shouldn't leave your text field blank!",
    });

  const newTodo = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text: text.current?.value,
    done: false,
  };

  try {
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
    dispatch({ type: "OPEN_CREATE" });
    text.current.value = "";
  } catch {
    toastPopUp({
      success: false,
      msg: "Poo dropped the task, it couldn't be added!",
    });
  }
};

export const DeleteList = (
  dispatch: React.Dispatch<TodoListActionTypes>,
  id: string,
  toastPopUp: ToastContextTypes["toastPopUp"],
) => {
  try {
    dispatch({ type: "DELETE_TODO", payload: id });
  } catch {
    toastPopUp({
      success: false,
      msg: "Pee couldn't remove that tangled task!",
    });
  }
};

export const DoneList = (
  dispatch: React.Dispatch<TodoListActionTypes>,
  id: string,
  toastPopUp: ToastContextTypes["toastPopUp"],
) => {
  try {
    dispatch({ type: "DONE_TODO", payload: id });
  } catch {
    toastPopUp({
      success: false,
      msg: "Pee couldn't remove that tangled task!",
    });
  }
};
