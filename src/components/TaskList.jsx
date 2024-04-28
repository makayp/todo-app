import { useTodoContext } from "../hooks/useTodoContext";
import TaskItem from "./TaskItem";
import { useState } from "react";

function TaskList() {
  const { users, sortItems, currentUserID, clearList } = useTodoContext();
  const [sortBy, setSortBy] = useState("completed");

  const { todoList } = users.filter(user => currentUserID === user.id)[0];
  const completedTask = todoList.filter(item => item.completed).length;

  let allCompleted = false;
  if (todoList.length) {
    allCompleted = todoList.length === completedTask;
  }

  const sortedTodoList = sortItems(todoList, sortBy);

  function handleClearList() {
    clearList();
  }
  return (
    <>
      <div className='task-actions'>
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

      {allCompleted && (
        <p className='message-completed'>
          Great job, you completed all task 🏆
        </p>
      )}

      {todoList.length ? (
        <ul className='items'>
          {sortedTodoList?.map(item => (
            <TaskItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <p className='message-add-items'>Start by adding new task! 📋</p>
      )}
    </>
  );
}

export default TaskList;
