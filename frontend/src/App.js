import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import UserList from "./components/UserList";
import GreetingPage from "./components/GreetingPage";
import UserProfile from "./components/UserProfile";
import SocketMessenger from "./components/SocketMessenger";
import Notifications from "./components/NotificationReel";
import Logs from "./components/Logs";
import Footer from "./components/Footer";
import Inbox from "./components/Inbox";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // TODO:
  // USE THIS TO TURN THE USER'S STATUS TO OFFLINE---> SEND NOTIFICATIONS TO OTHER USER
  // window.addEventListener("beforeunload", (ev) => {
  //   ev.preventDefault();
  //   return (ev.returnValue = "Are you sure you want to close?");
  // });

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div id="div__bodyContent">
          <div id="div__innerContent">
            <Switch>
              <Route exact path="/">
                <GreetingPage />
              </Route>
              <Route exact path="/inbox">
                <Inbox />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/users/all">
                <UserList />
              </Route>
              <Route exact path="/user/:userId">
                <UserProfile />
              </Route>
              <Route exact path="/chatroom/:chatRoomId">
                <SocketMessenger />
              </Route>
              <Route exact path="/notifications/me">
                <Notifications />
              </Route>
              <Route exact path="/logs">
                <Logs />
              </Route>
            </Switch>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
