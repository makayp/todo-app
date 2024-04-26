import TaskList from "../../components/TaskList";
import { useTodoContext } from "../../hooks/useTodoContext";
import { useState } from "react";
import Loader from "../../components/Loader";
import InputForm from "../../components/InputForm";

function TodoApp() {
  const { isLoading, addTask, stopLoading } = useTodoContext();
  const [task, setTask] = useState("");

  stopLoading();

  function handleAddTask(e) {
    e.preventDefault();
    const newTask = {
      id: new Date().getTime(),
      task,
      completed: false,
    };

    addTask(newTask);
    setTask("");
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='todo-app'>
          <InputForm
            type='form-add-task'
            placeholder='new item'
            onSubmit={handleAddTask}
            onChange={e => setTask(e.target.value)}
            value={task}
            buttonText={"+"}
          />
          <TaskList />
        </div>
      )}
    </>
  );
}

export default TodoApp;
