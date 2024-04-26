import { useParams } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";
import TaskItem from "./TaskItem";
import { useState } from "react";
import User from "./User";

function TaskList() {
  const { users } = useTodoContext();
  const [sortBy, setSortBy] = useState("completed");

  const { id } = useParams();
  const { todoList } = users.filter(user => Number(id) === user.id)[0];
  const completedTask = todoList.filter(item => item.completed).length;

  let allCompleted = false;
  if (todoList.length) {
    allCompleted = todoList.length === completedTask;
  }

  function sortItems(sortBy) {
    switch (sortBy) {
      case "completed":
        return todoList.slice().sort((a, b) => a.completed - b.completed);
      case "most recent":
        return todoList.slice().sort((a, b) => b.id - a.id);
      case "name":
        return todoList.slice().sort((a, b) => {
          let x = a.task.toLowerCase();
          let y = b.task.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      default:
        return todoList;
    }
  }
  const sortedTodoList = sortItems(sortBy);

  return (
    <>
      {allCompleted && (
        <p className='task-completed'>Great job, you completed all task 🏆</p>
      )}

      <div>
        <label htmlFor='sort'>Sort by: </label>
        <select
          name='sort'
          value={sortBy}
          id='sort'
          onChange={e => setSortBy(e.target.value)}
        >
          <option value='completed'>completed</option>
          <option value='name'>name</option>
          <option value='most recent'>most recent</option>
        </select>
      </div>

      {todoList.length ? (
        <ul className='items'>
          {sortedTodoList?.map(item => (
            <TaskItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <p>Start by adding some items to your list</p>
      )}
    </>
  );
}

export default TaskList;
