import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { BsEnvelopeFill } from "react-icons/bs";
import "./Navigation.css";
import logo from "./logo_3-black.png";
import Notifications from "../NotificationReel";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li className="li__buttonIcons">
          <ProfileButton user={sessionUser} />
        </li>
        <NavLink exact to="/inbox">
          <li className="li__buttonIcons">
            <BsEnvelopeFill />
          </li>
        </NavLink>
        <li className="li__buttonIcons">
          <Notifications />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push("/signup");
            }}
          >
            Sign Up
          </button>
        </li>
      </>
    );
  }

  return (
    <div id="div__nav-bar">
      <NavLink exact to="/">
        <div className="div__logo">
          <img id="img__logo" alt="FidoFinder" src={logo} />
          FidoFinder
        </div>
      </NavLink>
      <div className="div__navIcons">
        <ul className="ul__navIcons">{isLoaded && sessionLinks}</ul>
      </div>
    </div>
  );
}

export default Navigation;
