import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Home from "./Home";
import MessageCore from "./MessageCore";
// import { fetch } from "../../store/csrf.js";
import { useParams } from "react-router-dom";
import "./chatroom.css";

const ChatRoom = () => {
  const { chatRoomId } = useParams();

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
    if (!username) {
      return;
    }

    // const ws = new WebSocket(process.env.REACT_APP_WS_URL + `/${chatRoomId}`);
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = () => {
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

          // debugger ==> for seeing the message.data before it's set;
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
      // setUserName("");
      // setMessageSession(null);
    };

    window.onbeforeunload = function (e) {
      webSocket.current.sendMessage("delete-session", {
        chatRoomId,
      });
      ws.onclose = (e) => {
        // console.log(`Connection closed: ${e}`);
        webSocket.current = null;
      };
      setMessageSession(null);

      ws.close();
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
    webSocket.current.sendMessage("chat-message", {
      username,
      chatRoomId,
      msg,
    });
  };

  const playAgain = (username) => {
    setMessageSession(null);
    webSocket.current.sendMessage("add-new-person", { username });
  };

  const quit = () => {
    setUserName("");
  };

  const backgroundColor = () => {
    console.log("messageSession", messageSession);
    return "lightgreen";
    // debugger; // screw this
    // if (messageSession) {
    //   if (username === messageSession.person1.username) {
    //     return "lightblue";
    //   } else {
    //     return "lightgreen";
    //   }
    // } else {
    //   return "lightgray";
    // }
  };
  if (!sessionUser) return <Redirect to="/" />;
  return (
    <div
      className="div__chatSession"
      // style={{
      //   backgroundColor: backgroundColor(),
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   width: "100%",
      // }}
    >
      {username ? (
        <MessageCore
          username={username}
          authorizedUsers={authorizedUsers}
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
