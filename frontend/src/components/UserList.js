import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserList(optionalUsers) {
  const [users, setUsers] = useState(optionalUsers);

  useEffect(() => {
    if (!!optionalUsers) {
      fetch("/api/users/all").then((res) => {
        return setUsers(res.data);
      });
    }
  }, [optionalUsers]);

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
