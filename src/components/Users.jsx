import { useState } from "react";
import UserList from "./UserList";
import Button from "./Button";
import { useTodoContext } from "../hooks/useTodoContext";
import InputForm from "./InputForm";

function Users() {
  const [name, setName] = useState("");
  const { addUser, isLoading } = useTodoContext();
  const [addNew, setAddNew] = useState(false);

  function handleAddUser(e) {
    e.preventDefault();

    addUser(name);
    setName("");
    setAddNew(false);
  }
  return (
    <div>
      {addNew ? (
        <InputForm
          value={name}
          type='form-add-user'
          placeholder='new user'
          onSubmit={handleAddUser}
          onChange={e => setName(e.target.value)}
        />
      ) : (
        <Button onClick={() => setAddNew(true)}>Add new user</Button>
      )}

      <UserList />
    </div>
  );
}

export default Users;
