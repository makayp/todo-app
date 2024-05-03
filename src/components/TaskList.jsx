import TaskItem from "./TaskItem";

function TaskList({ sortedTodoList }) {
  const completedTask = sortedTodoList.filter(item => item.completed).length;

  let allCompleted = false;
  if (sortedTodoList.length) {
    allCompleted = sortedTodoList.length === completedTask;
  }

  return (
    <>
      {allCompleted && (
        <p className='message-completed'>
          Great job, you completed all tasks 🏆
        </p>
      )}

      {sortedTodoList.length ? (
        <ul className='items'>
          {sortedTodoList?.map(item => (
            <TaskItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <p className='message-add-items'>Start by adding a new task! 📋</p>
      )}
    </>
  );
}

export default TaskList;
