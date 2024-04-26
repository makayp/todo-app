import { useParams } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";
import { useState } from "react";
import InputForm from "./InputForm";

function TaskItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const { id: taskID, task, completed } = item;
  const { completeTask, deleteTask, updateTask } = useTodoContext();
  const { id: user } = useParams();
  const userID = Number(user);

  const [newTask, setNewTask] = useState(task);

  function handleEditTask(e) {
    e.preventDefault();
    updateTask(userID, taskID, newTask);
    setIsEditing(false);
  }

  function handleDeleteTask() {
    deleteTask(userID, taskID);
  }

  return (
    <li className='item todo-item'>
      {!isEditing ? (
        <>
          <input
            type='checkbox'
            checked={completed}
            onChange={() => {
              completeTask(taskID, userID);
            }}
          />
          <p>{task}</p>
          <span onClick={() => setIsEditing(true)}>edit</span>
          <span onClick={handleDeleteTask}>X</span>
        </>
      ) : (
        <InputForm
          type='form-edit-task'
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          buttonText={"✔️"}
          onSubmit={handleEditTask}
        />
      )}
    </li>
  );
}

export default TaskItem;
