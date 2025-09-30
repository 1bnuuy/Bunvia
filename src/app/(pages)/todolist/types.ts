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