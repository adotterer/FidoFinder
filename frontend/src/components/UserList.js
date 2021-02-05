import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

async function getAllUsers() {
  const res = await fetch("/api/users/all");
  const allUsers = res.data;
  console.log(allUsers);
  return allUsers;
}

async function createChatRoom(sessionUser, user) {
  const res = await fetch(
    `/api/chatroom/add?user1=${sessionUser.id}&&user2=${user.id}`
  );
  console.log(res);
  return res;
}

function UserList() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    setUsers(await getAllUsers());
  }, []);

  return (
    <ul>
      {users[0] &&
        sessionUser &&
        users.map((user) => {
          return (
            <Link
              key={user.id}
              onClick={async (e) => {
                const res = await createChatRoom(sessionUser, user);
              }}
              to="/"
            >
              <li>{user.username}</li>
            </Link>
          );
        })}
    </ul>
  );
}

export default UserList;
