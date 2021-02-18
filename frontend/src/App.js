import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";
import UserList from "./components/UserList";
import GreetingPage from "./components/GreetingPage";
import UserProfile from "./components/UserProfile";
import SocketMessenger from "./components/SocketMessenger";
// import NearbyUsers from "./components/NearbyUsers";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/chat">
                <ChatRoom />
              </Route>
              <Route path="/users/all">
                <UserList />
              </Route>
              <Route exact path="/chatroom/:chatRoomId">
                <ChatRoom />
              </Route>
              <Route exact path="/user/:userId">
                <UserProfile />
              </Route>
              <Route exact path="/socketmessage/:chatRoomId">
                <SocketMessenger />
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
