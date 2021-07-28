import { useState, useEffect } from "react";
import MessageHead from "./MessageHead.js";

export default function Inbox() {
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    async function fetchInbox() {
      return await fetch("/api/inbox")
        .then((res) => res.json())
        .then((resBody) => setInbox(resBody));
    }
    fetchInbox();
  }, []);

  return (
    <div>
      {inbox.length ? (
        inbox.map((message) => {
          return MessageHead(message);
        })
      ) : (
        <div>
          <h1>Loading!</h1>
        </div>
      )}
    </div>
  );
}
