import { createContext, useEffect, useReducer, useState } from "react";

const users = [
  {
    id: 1,
    name: "Jack",
    image: "1.jpeg",
    todoList: [
      { id: 1, task: "eat", completed: true },
      { id: 2, task: "Hit the gym", completed: false },
      { id: 3, task: "Study", completed: false },
    ],
  },
  {
    id: 2,
    name: "Ana",
    image: "3.jpeg",
    todoList: [
      { id: 1, task: "Wash dishes", completed: true },
      { id: 2, task: "Hangout with friends", completed: false },
      { id: 3, task: "Call mom", completed: false },
    ],
  },
];

function randomImage() {
  const rand = Math.floor(Math.random() * 4) + 1;
  return `${rand}.jpeg`;
}

const initialState = {
  users,
  currentUserID: null,
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
    case "todo/addTask":
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.userID) {
            console.log("yyaaaa");
            // if (user.todoList.length > 0) {
            return {
              ...user,
              todoList: [action.payload.newTask, ...user.todoList],
            };
            // }
            // else {
            //   return {
            //     ...user,
            //     todoList: [action.payload.newTask],
            //   };
            // }
          } else {
            return user;
          }
        }),
      };
    case "todo/deleteTask":
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.userID) {
            return {
              ...user,
              todoList: user.todoList.filter(
                item => item.id !== action.payload.taskID
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
          if (user.id === action.payload.userID) {
            return {
              ...user,
              todoList: user.todoList.map(item => {
                if (item.id === action.payload.taskID) {
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
          if (user.id === action.payload.userID) {
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
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

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
  function addTask(userID, newTask) {
    dispatch({
      type: "todo/addTask",
      payload: { userID: Number(userID), newTask },
    });
  }
  function deleteTask(userID, taskID) {
    dispatch({ type: "todo/deleteTask", payload: { userID, taskID } });
  }
  function updateTask(userID, taskID, taskUpdate) {
    dispatch({
      type: "todo/updateTask",
      payload: { userID, taskID, taskUpdate },
    });
  }
  function completeTask(taskID, userID) {
    dispatch({
      type: "todo/completeTask",
      payload: { taskID, userID: Number(userID) },
    });
  }

  return (
    <TodoContext.Provider
      value={{
        users: state.users,
        currentUserID: state.currentUserID,
        setCurrentUser,
        addUser,
        deleteUser,
        addTask,
        deleteTask,
        updateTask,
        completeTask,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider };
