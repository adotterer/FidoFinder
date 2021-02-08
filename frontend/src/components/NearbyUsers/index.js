import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";
import UserList from "../UserList";

async function getNearbyUsers(sessionUser) {
  const res = await fetch(`/api/users/nearby?userId=${sessionUser.id}`);
  const nearbyUsers = res.data;
  console.log(nearbyUsers);
  // return nearbyUsers;
}

function NearbyUsers() {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(async () => {
    setUsers(await getNearbyUsers(sessionUser));
  }, [sessionUser]);

  return (
    <>
      <h1>Here will be nearby users: </h1>
      <div>asdf</div>
    </>
  );
}

export default NearbyUsers;
