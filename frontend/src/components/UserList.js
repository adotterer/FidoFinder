import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

async function createChatRoom(sessionUser, user) {
  const res = await fetch(
    `/api/chatroom/add?sessionUserId=${sessionUser.id}&&otherUserId=${user.id}&&sessionUsername=${sessionUser.username}&&otherUsername=${user.username}`
  );
  return res;
}

function UserList(optionalUsers) {
  const [users, setUsers] = useState(optionalUsers);

  useEffect(() => {
    if (!!optionalUsers) {
      fetch("/api/users/all").then((res) => {
        return setUsers(res.data);
      });
    }
  }, []);

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {users[0] &&
        sessionUser &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <Link key={user.id} to={`/user/${user.id}`}>
                {user.username}
              </Link>
            </div>
          );
        })}
    </>
  );
}

export default UserList;
