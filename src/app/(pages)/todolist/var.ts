import { InitTodoListTypes, TodoListActionTypes } from "./types";

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
