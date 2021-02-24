import React, { useState, useEffect, useRef } from "react";

export default function StatusInput() {
  const [status, setStatus] = useState("");
  const inputListenerRef = useRef(null);

  if (inputListenerRef && inputListenerRef.current) {
    inputListenerRef.current.addEventListener("blur", (e) => {
      console.log(e.target.value, "STATUS!");
    });
  }

  // useEffect(() => {
  //   console.log("status: ", status);
  // }, [status]);

  return (
    <input
      ref={inputListenerRef}
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="input__status"
      type="text"
      placeholder="Set your status"
    />
  );
}
