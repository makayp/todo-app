import { Link } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";
import Button from "./Button";
import InputForm from "./InputForm";
import { useState } from "react";

function UserItem({ user }) {
  const { image, name, id } = user;
  const [newUserName, setNewUserName] = useState("");
  const [addNew, setAddNew] = useState(false);

  const { deleteUser, setIsLoading, setCurrentUser, addUser, setIsEditingID } =
    useTodoContext();

  function handleAddUser(e) {
    e.preventDefault();
    if (newUserName) {
      addUser(newUserName);
      setNewUserName("");
      setAddNew(false);
    }
  }
  function handleDeleteUser(e) {
    e.preventDefault();
    deleteUser(id);
  }

  function handleClick(e) {
    if (e.target.id !== "delete-btn") {
      setCurrentUser(id);
      setIsLoading(true);
      setIsEditingID(null);
    }
  }

  return (
    <>
      <li className='user-item'>
        <Link to={`/app/todo/${id}`} onClick={handleClick} className='item'>
          <img src={image} alt='img' />
          <span>{name}</span>
          {id !== 1 && (
            <div className='delete-btn'>
              <button id='delete-btn' onClick={handleDeleteUser}>
                delete user
              </button>
            </div>
          )}
        </Link>
      </li>
      {id === 1 && (
        <div className='users-add-section'>
          {addNew ? (
            <div className='add-new'>
              <InputForm
                value={newUserName}
                type='form-add-user'
                placeholder='new user'
                onSubmit={handleAddUser}
                onChange={e => setNewUserName(e.target.value)}
              />
              <div className='user-add-cancel'>
                <Button
                  onClick={() => {
                    setAddNew(false);
                    setNewUserName("");
                  }}
                  type='cancel-add-user'
                >
                  Cancel
                </Button>
                <Button onClick={handleAddUser} type='btn-add-user'>
                  Add
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setAddNew(true)} type={"btn-add-new-user"}>
              Add new user
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default UserItem;
