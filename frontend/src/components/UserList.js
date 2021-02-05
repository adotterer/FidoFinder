import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";

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
      {users.length && console.log("user has length")}
      {users[0] &&
        users.map((user) => {
          return <li>{user.username}</li>;
        })}
    </ul>
  );
}

export default UserList;
