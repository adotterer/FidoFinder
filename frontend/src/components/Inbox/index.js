import { useState, useEffect } from "react";
import MessageHead from "./MessageHead.js";

const fetchInbox = async function () {
  return await fetch("/api/inbox")
    .then((res) => res.json())
    .then((resBody) => resBody);
};

export default function Inbox() {
  const [inbox, setInbox] = useState([]);

  useEffect(async () => {
    setInbox(await fetchInbox());
  }, []);

  // useEffect(() => console.log(inbox, "new inbox!"), [inbox]);

  return (
    <div>
      {inbox ? (
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
