import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import { Link } from "react-router-dom";

async function getAllUsers() {
  const res = await fetch("/api/users/all");
  const allUsers = res.data;
  console.log(allUsers);
  return allUsers;
}

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    setUsers(await getAllUsers());
  }, []);

  return (
    <ul>
      {users[0] &&
        users.map((user) => {
          return (
            <Link to={`/chat/users/${user.id}`}>
              <li>{user.username}</li>
            </Link>
          );
        })}
    </ul>
  );
}

export default UserList;
