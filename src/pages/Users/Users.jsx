import { useState } from "react";
import UserList from "../../components/UserList";
import Button from "../../components/Button";
import { useTodoContext } from "../../hooks/useTodoContext";
import InputForm from "../../components/InputForm";
import Loader from "../../components/Loader";

function Users() {
  const { addUser, isLoading } = useTodoContext();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className='users'>
            <UserList />
          </div>
        </>
      )}
    </>
  );
}

export default Users;
