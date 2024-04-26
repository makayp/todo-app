import { useTodoContext } from "../hooks/useTodoContext";
import UserItem from "./UserItem";

function UserList() {
  const { users } = useTodoContext();

  return (
    <ul className='list list-users'>
      {users.map(user => (
        <UserItem user={user} key={user.id} />
      ))}
    </ul>
  );
}

export default UserList;
