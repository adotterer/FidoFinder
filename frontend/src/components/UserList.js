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
        console.log("setting users", res.data);
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
      // const jsonparse = JSON.parse(res);
      const chatRoomNumber = res.data.chatRoomId;
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
                onClick={(e) => createChatRoomEvent(e, sessionUser, user)}
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
