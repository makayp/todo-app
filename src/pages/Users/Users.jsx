import { useState } from "react";
import UserList from "../../components/UserList";
import Button from "../../components/Button";
import { useTodoContext } from "../../hooks/useTodoContext";
import InputForm from "../../components/InputForm";
import Loader from "../../components/Loader";

function Users() {
  const [name, setName] = useState("");
  const { addUser, isLoading, stopLoading } = useTodoContext();
  const [addNew, setAddNew] = useState(false);

  function handleAddUser(e) {
    e.preventDefault();

    addUser(name);
    setName("");
    setAddNew(false);
  }
  stopLoading();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className='users'>
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
        </>
      )}
    </>
  );
}

export default Users;
