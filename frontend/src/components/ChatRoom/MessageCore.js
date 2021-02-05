import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import styles from "./MessageCore.module.css";


const MessageCore = ({ username, messageSession, sendChat }) => {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (messageSession && messageSession.messages) {
      console.log(
        "messageSession.messages",
        messageSession.messages,
        messageSession.messages.map((m) => [m.name, m.text])
      );
    }
  }, [messageSession]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    sendChat(msg, username);
    setMsg("");
  };

  const personsName = (name, short = false) =>
    name === username ? (short ? "Me" : `Me (${name})`) : name;
  const PersonsNames = () => {
    return messageSession.person1.username === username ? (
      <>
        <div>{personsName(messageSession.person2.username)}</div>
        <div>{personsName(messageSession.person1.username)}</div>
      </>
    ) : (
      <>
        <div>{personsName(messageSession.person1.username)}</div>
        <div>{personsName(messageSession.person2.username)}</div>
      </>
    );
  };

  return (
    <div className={styles.messageSession}>
      {messageSession ? (
        <>
          <div className={styles.persons}>
            <PersonsNames />
          </div>
          {messageSession.messages && (
            <div>
              <div>
                {messageSession.messages.map((m) => (
                  <p
                    key={nanoid()}
                    className={
                      m.username === username
                        ? styles.individual_message_right
                        : styles.individual_message_left
                    }
                  >
                    <span className={styles.person_name}>
                      <b>{personsName(m.username, true)}</b>
                    </span>
                    <span>{m.msg}</span>
                  </p>
                ))}
              </div>
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
