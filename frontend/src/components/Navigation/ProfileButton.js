import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { FaUserAlt } from "react-icons/fa";
import "./Navigation.css";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <FaUserAlt onClick={openMenu} />
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <div>{user.username}</div>
            <hr />
          </li>
          <li>
            <Link className="link__hover" to={`/user/${user.id}`}>
              My Profile
            </Link>
          </li>
          <li>
            <Link className="link__hover" to={`/user/${user.id}`}>
              My Dogs [ADD_LINK]
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
