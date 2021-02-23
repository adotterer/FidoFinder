import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { GiDogHouse } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import "./Navigation.css";
import logo from "./logo_3-black.png";
import Notifications from "../NotificationReel";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li class="li__buttonIcons">
          <ProfileButton user={sessionUser} />
        </li>
        <NavLink exact to="/users/all">
          <li class="li__buttonIcons">
            <IoIosChatbubbles />
          </li>
        </NavLink>
        <li class="li__buttonIcons">
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
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <div id="div__nav-bar">
      <NavLink exact to="/">
        <div class="div__logo">
          <img id="img__logo" src={logo} />
          {/* Fido411 / FidoApp / */}FidoFinder
        </div>
      </NavLink>
      <div class="div__navIcons">
        <ul class="ul__navIcons">{isLoaded && sessionLinks}</ul>
      </div>
    </div>
  );
}

export default Navigation;
