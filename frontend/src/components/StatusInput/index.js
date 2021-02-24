import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatus } from "../../store/user_details";

export default function StatusInput() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const inputListenerRef = useRef(null); // TODO: DO I NEED THIS?

  return (
    <input
      ref={inputListenerRef}
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      onBlur={(e) => dispatch(setUserStatus(e.target.value))}
      className="input__status"
      type="text"
      placeholder="Set your status"
    />
  );
}
