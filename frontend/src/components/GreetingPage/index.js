import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";
import "./Greeting.css";
import LoginFormModal from "../LoginFormModal";
import { Link } from "react-router-dom";

function GreetingPage() {
  const sessionUser = useSelector((state) => state.session.user);

  function LogInSignUpBlock() {
    let loginBlock;
    if (!sessionUser) {
      return (
        <div class="div__LogInSignUpBlock">
          <div>
            Please log in or sign up to start chatting with dog owners near you.
          </div>
          <div>
            <LoginFormModal />
          </div>
          <Link to="/signup">
            <div>
              <button>Sign up</button>
            </div>
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <div class="div__greetingPage">
      {/* <h1>GreetingPage</h1> */}
      <LogInSignUpBlock />
      <div> </div>
    </div>
  );
}

export default GreetingPage;
