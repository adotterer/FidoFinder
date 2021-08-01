import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import createChatRoomEvent from "../../utils/createChatRoomEvent";
import ProfileMe from "./Me";
import DogProfileReel from "../DogProfileReel";
import StatusInput from "../StatusInput";
import "./userprofile.css";

function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [dogReel, setDogReel] = useState([]);
  const [isProfileMe, setIsProfileMe] = useState(false);
  const [userAvatar, setUserAvatar] = useState();

  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const newDog = useSelector((state) => state.newDog);
  const newAvatarRedux = useSelector(
    (state) => state.avatarActions.profileMeURL
  );

  useEffect(() => {
    if (newAvatarRedux) {
      setUserAvatar(newAvatarRedux);
    }
  }, [newAvatarRedux]);

  if (!userProfile) {
    fetch(`/api/user/${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        setUserProfile(user);
        setDogReel(user.Dogs);
        setIsProfileMe(user.id === sessionUser.id);
        if (user.UserDetail.Avatar) {
          setUserAvatar(user.UserDetail.Avatar.URL);
        }
      });
  }

  useEffect(() => {
    if (!newDog.dogProfile) return;
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
        <div className="userProfile__container">
          <div className="userProfile__interface">
            <h1>{userProfile.firstName}'s Profile</h1>
            <div>
              <div>
                <em>Username: </em>

                {userProfile.username}
              </div>

              <div className="status__container">
                <em>Status:</em>{" "}
                {!isProfileMe ? userProfile.UserDetail.status : <StatusInput />}
              </div>
              <ProfileMe userId={userId} />
            </div>
          </div>
          <div className="avatar__container">
            <span className="avatar__window">
              {userAvatar && <img src={userAvatar} alt="avatar" />}
            </span>
          </div>
        </div>
        <hr className="hr__profilePage" />
        <DogProfileReel dogReel={dogReel} userProfile={userProfile} />

        <div>
          {!isProfileMe && (
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
    );
  } else {
    return <div>loading.....</div>;
  }
}

export default UserProfile;
