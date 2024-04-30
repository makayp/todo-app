import { Link } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";
import Button from "./Button";

function User() {
  const { currentUserID, setCurrentUser, users, setIsLoading, setIsEditingID } =
    useTodoContext();

  const user = users.filter(user => currentUserID === user.id)[0];
  const image = user?.image;
  const name = user?.name;

  function handleClick() {
    if (currentUserID) {
      setIsLoading(true);
      setCurrentUser(null);
      setIsEditingID(null);
    }
  }

  return (
    <div className='user'>
      {currentUserID && (
        <Link to={"users"} onClick={handleClick}>
          <div className='active-user'>
            <img src={`/${image}`} alt='image'></img>
            <span>Hi, {name} 👋🏼</span>
          </div>
        </Link>
      )}
      {!currentUserID && (
        <Link to={"app/todo/1"} className={"user-guest"}>
          <Button
            onClick={() => {
              setCurrentUser(1);
              setIsLoading(true);
            }}
          >
            <span>Continue as guest</span> <span>→</span>
          </Button>
        </Link>
      )}
    </div>
  );
}

export default User;
