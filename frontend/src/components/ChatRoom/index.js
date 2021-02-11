import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import MessageCore from "./MessageCore";
// import { fetch } from "../../store/csrf.js";
import { useParams } from "react-router-dom";

// const userOnlineStatusById = async (id) => {
//   const res = await fetch(`/api/chat/salmon`);
//   // const friendStatus = await res.json();
//   console.log(res.data);
//   return res.data;
// };

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  console.log(chatRoomId);

  // SESSION USER
  const sessionUser = useSelector((state) => state.session.user);

  // --- FIND AUTHORIZED USERS --- //
  const [authorizedUsers, setAuthorizedUsers] = useState();
  if (!authorizedUsers) {
    fetch(`/api/chatroom/${chatRoomId}/auth`)
      .then((res) => {
        return res.json();
      })
      .then((res) =>
        setAuthorizedUsers(res.authorizedUsers.map((user) => user.User))
      );
  }

  const [username, setUserName] = useState(sessionUser.username);
  const [userId, setUserId] = useState(sessionUser.id);
  const [messageSession, setMessageSession] = useState(null);
  const webSocket = useRef(null);

  useEffect(() => {
    console.log(authorizedUsers, "here is authorized Users");
  }, [authorizedUsers]);

  useEffect(() => {
    if (!username) {
      return;
    }

    // const ws = new WebSocket(process.env.REACT_APP_WS_URL + `/${chatRoomId}`);
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = () => {
      console.log("where is chatRoomId", chatRoomId);
      sendMessage("add-new-person", {
        userId,
        username,
        chatRoomId,
      });
    };

    ws.onmessage = (e) => {
      console.log(`Processing incoming message ${e.data}...`);

      const message = JSON.parse(e.data);

      switch (message.type) {
        case "start-message-session":
        case "update-message-session":
        case "end-message-session":
          setMessageSession(message.data);
          break;
        default:
          throw new Error(`Unknown message type: ${message.type}`);
      }
    };

    ws.onerror = (e) => {
      console.error(e);
    };

    ws.onclose = (e) => {
      console.log(`Connection closed: ${e}`);
      webSocket.current = null;
      setUserName("");
      setMessageSession(null);
    };

    const sendMessage = (type, data) => {
      const message = JSON.stringify({
        type,
        data,
      });

      console.log(`Sending message ${message}...`);

      ws.send(message);
    };

    webSocket.current = {
      ws,
      sendMessage,
    };

    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.ws.close();
      }
    };
  }, [username]);

  const updatePersonName = (username) => {
    setUserName(username);
  };

  const sendChat = (msg, username) => {
    webSocket.current.sendMessage("chat-message", { username, msg });
  };

  const playAgain = (username) => {
    setMessageSession(null);
    webSocket.current.sendMessage("add-new-person", { username });
  };

  const quit = () => {
    setUserName("");
  };

  const backgroundColor = () => {
    if (messageSession) {
      if (username === messageSession.person1.username) {
        return "lightblue";
      } else {
        return "lightgreen";
      }
    } else {
      return "lightgray";
    }
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColor(),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "500px",
      }}
    >
      <h1>Minimum Instant Messenger </h1>
      <h2>With JS and WebSocket</h2>
      {authorizedUsers &&
        authorizedUsers.map((au) => <h3>authorized Id: {au.id}</h3>)}
      {username ? (
        <MessageCore
          username={username}
          messageSession={messageSession}
          playAgain={playAgain}
          quit={quit}
          sendChat={sendChat}
        />
      ) : (
        <Home updatePersonName={updatePersonName} />
      )}
    </div>
  );
};

export default ChatRoom;
