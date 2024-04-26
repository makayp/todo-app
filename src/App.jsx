import TodoApp from "./pages/App/TodoApp.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Users from "./pages/Users/Users.jsx";
import { useTodoContext } from "./hooks/useTodoContext.jsx";

function App() {
  const { currentUserID } = useTodoContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Navigate replace to={"users"} />} />
          <Route path='users' element={<Users />} />
          <Route
            path='app/todo/:id'
            element={
              currentUserID ? <TodoApp /> : <Navigate replace to={"users"} />
            }
          />
        </Route>

        <Route path='*' element={<Navigate replace to='users' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
