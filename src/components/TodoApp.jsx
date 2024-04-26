import TaskList from "./TaskList";
import { useTodoContext } from "../hooks/useTodoContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import InputForm from "./InputForm";
import User from "./User";

function TodoApp() {
  const { isLoading, setIsLoading, addTask, users, setCurrentUser } =
    useTodoContext();
  const [task, setTask] = useState("");
  const { id } = useParams();
  const userID = Number(id);

  useEffect(
    function () {
      setCurrentUser(userID);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    },
    [setIsLoading]
  );

  function handleAddTask(e) {
    e.preventDefault();
    const newTask = {
      id: new Date().getTime(),
      task,
      completed: false,
    };

    addTask(userID, newTask);
    setTask("");
  }

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {!isLoading && (
        <>
          <InputForm
            type='form-add-task'
            placeholder='new item'
            onSubmit={handleAddTask}
            onChange={e => setTask(e.target.value)}
            value={task}
            buttonText={"+"}
          />
          <TaskList />
        </>
      )}
    </>
  );
}

export default TodoApp;
