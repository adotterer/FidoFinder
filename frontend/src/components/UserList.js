import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { json } from "body-parser";

async function createChatRoom(sessionUser, user) {
  const res = await fetch(
    `/api/chatroom/add?sessionUserId=${sessionUser.id}&&otherUserId=${user.id}&&sessionUsername=${sessionUser.username}&&otherUsername=${user.username}`
  );
  // console.log(res);
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

  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const createChatRoomEvent = async (e, sessionUser, user) => {
    e.preventDefault();
    try {
      const res = await createChatRoom(sessionUser, user);

      const chatRoomNumber = await res.data.chatRoomId;
      // const [...chatRoomUsers] = res.data.users;
      // console.log(chatRoomUsers, "chatRoomusers");
      // console.log("JSONPARSE", jsonparse);
      history.push(`/chatroom/${chatRoomNumber}`);
    } catch (e) {
      console.error("FAILED TO GET CHAT ROOM NUMBER");
    }
  };

  return (
    <>
      {users[0] &&
        sessionUser &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <Link
                key={user.id}
                onClick={async (e) =>
                  await createChatRoomEvent(e, sessionUser, user)
                }
              >
                {user.username}
              </Link>
            </div>
          );
        })}
    </>
  );
}

export default UserList;
