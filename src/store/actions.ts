import { Schema$Todo } from "../typings";
import { createCRUDActions, UnionCRUDActions } from "@pong420/redux-crud";

export const [todoActions, TodoActionTypes] = createCRUDActions<
  Schema$Todo,
  "uniqueID"
>()({
  createTodo: ["CREATE", "CREATE_TODO"],
  deleteTodo: ["DELETE", "DELETE_TODO"],
  updateTodo: ["UPDATE", "UPDATE_TODO"]
});
