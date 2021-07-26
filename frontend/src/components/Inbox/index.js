import { useState, useEffect } from "react";

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

  useEffect(() => console.log(inbox, "new inbox!"), [inbox]);
  
  return <div>This is the inbox</div>;
}
