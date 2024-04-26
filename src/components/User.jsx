import { Link } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";

function User() {
  const { currentUserID, users } = useTodoContext();

  const user = users.filter(user => currentUserID === user.id)[0];
  const image = user?.image || "guest.jpeg";
  const name = user?.name || "Guest";

  return (
    <>
      <div>
        <Link to={"users"}>
          <span>
            <img src={`/${image}`} alt='image'></img>
          </span>
          <span>Hello, {name}</span>
        </Link>
      </div>
    </>
  );
}

export default User;
