import { useParams } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";
import { useState } from "react";
import InputForm from "./InputForm";
import Button from "./Button";

function TaskItem({ item }) {
  const { id: taskID, task, completed } = item;
  const { completeTask, deleteTask, updateTask, isEditingID, setIsEditingID } =
    useTodoContext();
  const { id: user } = useParams();
  const userID = Number(user);

  const [newTask, setNewTask] = useState(task);

  function handleEditTask(e) {
    e.preventDefault();
    updateTask(taskID, newTask);
    setIsEditingID(null);
  }

  function handleDeleteTask() {
    deleteTask(taskID);
  }

  return (
    <li className='item todo-item'>
      {isEditingID !== taskID ? (
        <>
          <input
            type='checkbox'
            checked={completed}
            onChange={() => {
              completeTask(taskID, userID);
            }}
          />
          <p>{task}</p>
          <div className='task-actions'>
            <span
              onClick={() => {
                setNewTask(task), setIsEditingID(taskID);
              }}
            >
              edit
            </span>
            <span onClick={handleDeleteTask}>X</span>
          </div>
        </>
      ) : (
        <>
          <InputForm
            type='form-edit-task'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            buttonText={<>&#10003;</>}
            onSubmit={handleEditTask}
          />
          <Button type={"btn-cancel-edit"} onClick={() => setIsEditingID(null)}>
            X
          </Button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
