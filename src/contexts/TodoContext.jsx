import { createContext, useEffect, useReducer, useState } from "react";

const users = [
  {
    id: 1,
    name: "Guest",
    image: "guest.jpeg",
    todoList: [],
  },
  {
    id: 2,
    name: "Jack",
    image: "1.jpeg",
    todoList: [
      { id: 1, task: "eat", completed: true },
      { id: 2, task: "Hit the gym", completed: false },
      { id: 3, task: "Study", completed: false },
    ],
  },
  {
    id: 3,
    name: "Ana",
    image: "2.jpeg",
    todoList: [
      { id: 1, task: "Wash dishes", completed: true },
      { id: 2, task: "Hangout with friends", completed: false },
      { id: 3, task: "Call mom", completed: false },
    ],
  },
];

function sortItems(array, sortBy) {
  switch (sortBy) {
    case "completed":
      return array.slice().sort((a, b) => a.completed - b.completed);
    case "most recent":
      return array.slice().sort((a, b) => b.id - a.id);
    case "name":
      return array.slice().sort((a, b) => {
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
      return array;
  }
}

function randomImage() {
  const rand = Math.floor(Math.random() * 4) + 1;
  return `${rand}.jpeg`;
}

const initialState = {
  users,
  currentUserID: null,
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "users/setUserID":
      return { ...state, currentUserID: action.payload };
    case "users/addUser":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "users/deleteUser":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case "todo/clearList":
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === state.currentUserID) {
            return {
              ...user,
              todoList: [],
            };
          } else {
            return user;
          }
        }),
      };
    case "todo/addTask":
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === state.currentUserID) {
            return {
              ...user,
              todoList: [action.payload, ...user.todoList],
            };
          } else {
            return user;
          }
        }),
      };
    case "todo/deleteTask":
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === state.currentUserID) {
            return {
              ...user,
              todoList: user.todoList.filter(
                item => item.id !== action.payload
              ),
            };
          } else {
            return user;
          }
        }),
      };
    case "todo/completeTask":
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === state.currentUserID) {
            return {
              ...user,
              todoList: user.todoList.map(item => {
                if (item.id === action.payload) {
                  return { ...item, completed: !item.completed };
                } else {
                  return item;
                }
              }),
            };
          } else {
            return user;
          }
        }),
      };

    case "todo/updateTask":
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === state.currentUserID) {
            return {
              ...user,
              todoList: user.todoList.map(item => {
                if (item.id === action.payload.taskID) {
                  return { ...item, task: action.payload.taskUpdate };
                } else return item;
              }),
            };
          } else {
            return user;
          }
        }),
      };
    default:
      return state;
  }
}

export const TodoContext = createContext();

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      if (isLoading) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    },
    [isLoading]
  );

  function addUser(name) {
    const newUser = {
      id: new Date().getTime(),
      name,
      image: randomImage(),
      todoList: [],
    };
    dispatch({ type: "users/addUser", payload: newUser });
  }
  function setCurrentUser(userID) {
    dispatch({ type: "users/setUserID", payload: userID });
  }
  function deleteUser(userID) {
    dispatch({ type: "users/deleteUser", payload: userID });
  }
  function clearList() {
    dispatch({ type: "todo/clearList" });
  }

  function addTask(newTask) {
    dispatch({
      type: "todo/addTask",
      payload: newTask,
    });
  }
  function deleteTask(taskID) {
    dispatch({ type: "todo/deleteTask", payload: taskID });
  }
  function updateTask(taskID, taskUpdate) {
    dispatch({
      type: "todo/updateTask",
      payload: { taskID, taskUpdate },
    });
  }
  function completeTask(taskID) {
    dispatch({
      type: "todo/completeTask",
      payload: taskID,
    });
  }

  return (
    <TodoContext.Provider
      value={{
        users: state.users,
        currentUserID: state.currentUserID,
        isLoading,
        setCurrentUser,
        addUser,
        deleteUser,
        addTask,
        deleteTask,
        updateTask,
        completeTask,
        setIsLoading,
        sortItems,
        clearList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider };
