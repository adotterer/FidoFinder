import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatus } from "../../store/user_details";
import { fetch } from "../../store/csrf.js";
import "./statusinput.css";

export default function StatusInput() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(
    useSelector((state) => state.userDetails.status || "")
  );
  const [inputClassList, setInputClassList] = useState("input__status-hidden");
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
    } else {
      console.log("displaying success");
    }
  }, [dispatch, status, user.id]);

  // useEffect(() => {
  //   console.log(inputClassList);
  // }, [inputClassList]);
  return (
    <>
      <input
        maxLength="255"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        onBlur={(e) => {
          dispatch(setUserStatus(e.target.value));
          setInputClassList("input__status-active");
          setTimeout(() => {
            setInputClassList("input__status-hidden");
          }, 2000);
        }}
        type="text"
        placeholder="Set your status"
      />
      <span className={inputClassList}>Success!</span>
    </>
  );
}
