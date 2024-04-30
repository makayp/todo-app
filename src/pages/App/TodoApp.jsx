import TaskList from "../../components/TaskList";
import { useTodoContext } from "../../hooks/useTodoContext";
import { useState } from "react";
import Loader from "../../components/Loader";
import InputForm from "../../components/InputForm";

function TodoApp() {
  const {
    isLoading,
    addTask,
    clearList,
    users,
    sortItems,
    currentUserID,
    setIsEditingID,
  } = useTodoContext();

  const [taskTitle, setTaskTitle] = useState("");
  const [sortBy, setSortBy] = useState("completed");
  const { todoList } = users.filter(user => currentUserID === user.id)[0];
  const sortedTodoList = sortItems(todoList, sortBy);

  function handleAddTask(e) {
    e.preventDefault();
    const newTask = {
      id: new Date().getTime(),
      task: taskTitle,
      completed: false,
    };
    console.log(newTask);

    addTask(newTask);
    setTaskTitle("");
  }

  function handleClearList() {
    clearList();
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='todo-app'>
          <div className='task-add-filter'>
            <InputForm
              type='form-add-task'
              placeholder='new item'
              onSubmit={handleAddTask}
              onChange={e => {
                setIsEditingID(null), setTaskTitle(e.target.value);
              }}
              value={taskTitle}
            />

            <div className='task-sort-clear'>
              <div className='task-sortby'>
                <label htmlFor='sort'>Sort by: </label>
                <select
                  value={sortBy}
                  id='sort'
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value='completed'>completed</option>
                  <option value='name'>name</option>
                  <option value='most recent'>most recent</option>
                </select>
              </div>
              {todoList.length > 0 && (
                <span onClick={handleClearList}>clear list 🗑️</span>
              )}
            </div>
          </div>

          <TaskList sortedTodoList={sortedTodoList} />
        </div>
      )}
    </>
  );
}

export default TodoApp;
