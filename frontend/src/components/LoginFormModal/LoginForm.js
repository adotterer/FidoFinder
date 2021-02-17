import React, { useState, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const credentialEl = useRef(null);
  const passwordEl = useRef(null);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  const demoLogin1 = (e) => {
    e.preventDefault();
    const demoUsername = "demo@user.io";
    const demoPassword = ["p", "a", "s", "s", "w", "o", "r", "d"];

    demoUsername.split("").forEach((letter, index) => {
      setTimeout(() => (credentialEl.current.value += letter), 150 * index);
      setCredential(credentialEl.current.value);
    });

    demoPassword.forEach((letter, index) => {
      setTimeout(() => (passwordEl.current.value += letter), 150 * index);
    });

    setTimeout(() => {
      dispatch(
        sessionActions.login({
          credential: demoUsername,
          password: "password",
        })
      ).catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    }, 1800);
  };

  const demoLogin2 = (e) => {
    e.preventDefault();
    const demoUsername = "Barbie";
    const demoPassword = ["p", "a", "s", "s", "w", "o", "r", "d"];

    demoUsername.split("").forEach((letter, index) => {
      setTimeout(() => (credentialEl.current.value += letter), 150 * index);
      setCredential(credentialEl.current.value);
    });

    demoPassword.forEach((letter, index) => {
      setTimeout(() => (passwordEl.current.value += letter), 150 * index);
    });

    setTimeout(() => {
      dispatch(
        sessionActions.login({
          credential: demoUsername,
          password: "password",
        })
      ).catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    }, 1800);
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            ref={credentialEl}
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            ref={passwordEl}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <div className="div__demoLogin">
          <button className="button__demoLogin" onClick={demoLogin1}>
            Demo User 1
          </button>
          <button className="button__demoLogin" onClick={demoLogin2}>
            Demo User 2
          </button>
        </div>
      
      </form>
    </>
  );
}

export default LoginForm;
