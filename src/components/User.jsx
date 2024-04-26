import { Link } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";
import Button from "./Button";

function User() {
  const { currentUserID, setCurrentUser, users, setIsLoading } =
    useTodoContext();

  const user = users.filter(user => currentUserID === user.id)[0];
  const image = user?.image || "guest.jpeg";
  const name = user?.name || "Guest";

  function handleClick() {
    if (currentUserID) {
      setIsLoading(true);
      setCurrentUser(null);
    }
  }

  return (
    <div className='active-user'>
      {currentUserID && (
        <Link to={"users"} onClick={handleClick}>
          <div>
            <img src={`/${image}`} alt='image'></img>
            <span>Hello, {name}</span>
          </div>
        </Link>
      )}
      {!currentUserID && (
        <Link to={"app/todo/1"}>
          <Button onClick={() => setCurrentUser(1)} type={"user-guest"}>
            Guest
          </Button>
        </Link>
      )}
    </div>
  );
}

export default User;
