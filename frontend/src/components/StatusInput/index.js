import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatus } from "../../store/user_details";
import { fetch } from "../../store/csrf.js";

export default function StatusInput() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(
    useSelector((state) => state.userDetails.status || "")
  );
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    async function fetchDbStatus() {
      const dbStatus = await fetch(`/api/user/${user.id}/status`);
      dispatch(setUserStatus(dbStatus.data));
      setStatus(dbStatus.data);
    }
    if (!status) {
      try {
        fetchDbStatus();
      } catch (e) {
        console.error(e);
      }
    }
  }, [dispatch, status, user]);

  return (
    <input
      maxLength="255"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      onBlur={(e) => dispatch(setUserStatus(e.target.value))}
      className="input__status"
      type="text"
      placeholder="Set your status"
    />
  );
}
