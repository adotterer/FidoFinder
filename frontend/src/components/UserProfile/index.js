import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import createChatRoomEvent from "../../utils/createChatRoomEvent";
import DogProfile from "../DogProfile";
import ProfileMe from "./Me";

function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (!userProfile) {
    fetch(`/api/user/${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => setUserProfile(res));
  }

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  if (userProfile) {
    return (
      <div>
        <h1>{userProfile.firstName}'s Profile</h1>
        <div>
          <div>
            <em>Username: </em>

            {userProfile.username}
          </div>

          <div>
            <em>Status:</em> {userProfile.UserDetail.status}
          </div>
          <div className="div__dogprofileContainer">
            {userProfile.Dogs.length > 0
              ? userProfile.Dogs.map((dog) => <DogProfile dog={dog} />)
              : "NO DOG PROFILES YET! 🐶"}
          </div>
          <div>
            <ProfileMe userId={userId} dogs={userProfile.Dogs} />
            {sessionUser.id !== userProfile.id && (
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  const chatRoomNumber = await createChatRoomEvent(
                    event,
                    sessionUser,
                    userProfile
                  );
                  return history.push(`/chatroom/${chatRoomNumber}`);
                }}
              >
                Chat With This Owner
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading.....</div>;
  }
}

export default UserProfile;
