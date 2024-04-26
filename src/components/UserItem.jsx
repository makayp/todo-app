import { Link } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";

function UserItem({ user }) {
  const { image, name, id } = user;
  const { deleteUser, setIsLoading, setCurrentUser } = useTodoContext();

  function handleDeleteUser(e) {
    e.preventDefault();
    deleteUser(id);
  }

  function handleClick(e) {
    if (e.target.id !== "delete-btn") {
      setCurrentUser(id);
      setIsLoading(true);
    }
  }

  return (
    <li>
      <Link
        to={`/app/todo/${id}`}
        onClick={handleClick}
        className='item user-item'
      >
        <img src={image} alt='img' />
        <span>{name}</span>
        {id !== 1 && (
          <button
            id='delete-btn'
            className='delete-btn'
            onClick={handleDeleteUser}
          >
            delete user
          </button>
        )}
      </Link>
    </li>
  );
}

export default UserItem;
