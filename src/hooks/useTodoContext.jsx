import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("TodoContext was used outside TodoProvider");
  }
  return context;
}

export { useTodoContext };
