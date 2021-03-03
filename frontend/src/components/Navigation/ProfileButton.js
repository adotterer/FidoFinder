import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { FaUserAlt } from "react-icons/fa";
import { FiChevronUp } from "react-icons/fi";
import StatusInput from "../StatusInput";
import "./Navigation.css";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const usermenuButton = useRef(null);

  const toggleMenu = () => (showMenu ? setShowMenu(false) : setShowMenu(true));

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    // usermenuButton.addEventListener("click", toggleMenu);
    // TODO: could send in another ref for adding event listener for this ref...

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <FaUserAlt onClick={toggleMenu} />
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <div onClick={toggleMenu}>
              <FiChevronUp className="FiChevronUp" />
            </div>
            <hr
              className="FiChevronUp"
              style={{
                backgroundColor: "lightgrey",
                height: "1px",
                border: "none",
                marginBottom: "8px",
              }}
            />
            <div className="div__username">{user.username}</div>
          </li>
          <li>
            <StatusInput />
          </li>
          <li>
            <Link className="link__hover" to={`/user/${user.id}`}>
              My Profile
            </Link>
          </li>

          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
