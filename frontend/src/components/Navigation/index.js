import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { GiDogHouse } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import "./Navigation.css";

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
          <GiDogHouse style={{ fontSize: "1.4em", paddingRight: "0.2em" }} />
          PupFinder
        </div>
      </NavLink>
      <div class="div__navIcons">
        <ul class="ul__navIcons">{isLoaded && sessionLinks}</ul>
      </div>
    </div>
  );
}

export default Navigation;
