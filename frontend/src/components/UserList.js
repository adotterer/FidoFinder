import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { json } from "body-parser";

async function getAllUsers() {
  const res = await fetch("/api/users/all");
  const allUsers = res.data;
  // console.log(allUsers);
  return allUsers;
}

async function createChatRoom(sessionUser, user) {
  const res = await fetch(
    `/api/chatroom/add?sessionUserId=${sessionUser.id}&&otherUserId=${user.id}&&sessionUsername=${sessionUser.username}&&otherUsername=${user.username}`
  );
  // console.log(res);
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
            <li key={user.id}>
              <button
                key={user.id}
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await createChatRoom(sessionUser, user);
                    // const jsonparse = JSON.parse(res);
                    const chatRoomNumber = res.data.chatRoomId;
                    // console.log("JSONPARSE", jsonparse);
                    history.push(`/chatroom/${chatRoomNumber}`);
                  } catch (e) {
                    console.error("FAILED TO GET CHAT ROOM NUMBER");
                  }
                }}
              >
                {user.username}
              </button>
            </li>
          );
        })}
    </ul>
  );
}

export default UserList;
