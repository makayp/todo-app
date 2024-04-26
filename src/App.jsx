import TodoApp from "./components/TodoApp.jsx";
import { TodoProvider } from "./contexts/TodoContext.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Users from "./components/Users.jsx";

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Navigate replace to={"users"} />} />
            <Route path='users' element={<Users />} />
            <Route path='app/todo/:id' element={<TodoApp />} />
          </Route>

          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;
