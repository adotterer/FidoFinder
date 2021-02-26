import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import createChatRoomEvent from "../../utils/createChatRoomEvent";
import ProfileMe from "./Me";
import DogProfileReel from "../DogProfileReel";
import StatusInput from "../StatusInput";

function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [dogReel, setDogReel] = useState([]);

  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const newDog = useSelector((state) => state.newDog);

  if (!userProfile) {
    fetch(`/api/user/${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        setUserProfile(user);
        setDogReel(user.Dogs);
        // console.log(user.Dogs, "dogReel");
      });
  }

  useEffect(() => {
    if (!newDog.dogProfile) return;
    console.log(newDog.dogProfile, "WHAT THE FUCK IS THIS");
    newDog.dogProfile &&
      setDogReel((dogReel) => {
        if (!dogReel.length) return [newDog.dogProfile];
        else if (dogReel[dogReel.length - 1].id === newDog.dogProfile.id) {
          return dogReel;
        } else {
          return [...dogReel, newDog.dogProfile];
        }
      });
  }, [newDog]);

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
            <em>Status:</em>{" "}
            {sessionUser.id !== userProfile.id ? (
              userProfile.UserDetail.status
            ) : (
              <StatusInput />
            )}
          </div>
          <hr className="hr__profilePage" />
          <DogProfileReel dogReel={dogReel} />

          <div>
            <ProfileMe userId={userId} />
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
