import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import styles from "./MessageCore.module.css";
// import "./chatroom.css";

const MessageCore = ({
  username,
  authorizedUsers,
  messageSession,
  sendChat,
}) => {
  const [msg, setMsg] = useState("");
  // useEffect(() => {
  //   if (messageSession && messageSession.messages) {
  //     console.log(
  //       "messageSession.messages",
  //       messageSession.messages,
  //       messageSession.messages.map((m) => [m.name, m.text])
  //     );
  //   }
  // }, [messageSession]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    sendChat(msg, username);
    setMsg("");
  };

  //
  //
  // TODO:
  //
  // const personsName = (name, short = false) =>
  //   name === username ? (short ? "Me" : `Me (${name})`) : name;
  // const PersonsNames = () => {
  //   console.log("messageSession --->", messageSession);
  //   return messageSession.authorizedUsers.map((u) => {
  //     return <p>{u}</p>;
  //   });
  //   return messageSession.person1.username === username ? (
  //     <>
  //       <div>{personsName(messageSession.person2.username)}</div>
  //       <div>{personsName(messageSession.person1.username)}</div>
  //     </>
  //   ) : (
  //     <>
  //       <div>{personsName(messageSession.person1.username)}</div>
  //       <div>{personsName(messageSession.person2.username)}</div>
  //     </>
  //   );
  // };

  return (
    <div>
      {messageSession ? (
        <>
          <div>
            <h2>A conversation between: </h2>
            <ul>
              {authorizedUsers &&
                authorizedUsers.map((au) => <li>{au.firstName}</li>)}
            </ul>
          </div>
          {messageSession.messages && (
            <div>
              <div>
                {messageSession.messages.map((m) => (
                  <p key={nanoid()}>
                    {/* <span className={styles.person_name}>
                      <b>{personsName(m.username, true)}</b>
                    </span> */}
                    <span>{m.username}: </span>
                    <span>{m.msg}</span>
                  </p>
                ))}
              </div>
              <div className="div__msgSend">
                <form onSubmit={handleChatSubmit}>
                  <input
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Enter a message"
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <h3 className={styles.announcement}>
          Waiting for another person to join the chat...
        </h3>
      )}
    </div>
  );
};

export default MessageCore;
