import { Link, useNavigate } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";

function UserItem({ user }) {
  const { image, name, id } = user;
  const { deleteUser, setIsLoading } = useTodoContext();
  const navigate = useNavigate();

  function handleDeleteUser(e) {
    e.preventDefault();
    deleteUser(id);
  }

  return (
    <li>
      <Link to={`/app/todo/${id}`} className='item user-item'>
        <span>
          <img src={image} alt='img' />
        </span>
        <span>{name}</span>
        <button className='delete-btn' onClick={handleDeleteUser}>
          delete user
        </button>
      </Link>
    </li>
  );
}

export default UserItem;
