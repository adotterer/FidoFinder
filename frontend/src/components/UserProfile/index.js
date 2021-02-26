import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import createChatRoomEvent from "../../utils/createChatRoomEvent";
import DogProfile from "../DogProfile";
import ProfileMe from "./Me";
import DogProfileReel from "../DogProfileReel";

function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [dogProfiles, setDogProfiles] = useState([]);

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
        console.log(user.Dogs, "dogReel");
      });
  }

  useEffect(() => {
    newDog.length && console.log("GET RID OF ME", newDog);
    // newDog && setDogReel((dogreel) => [...dogreel, newDog]);
  }, [newDog]);

  useEffect(() => {
    // USER PROFILE OBJ
    // console.log(userProfile);
    // *************************
    userProfile && setDogProfiles(userProfile.Dogs);
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
          <hr className="hr__profilePage" />
          {/* abstract out into component */}
          {/* <div className="div__dogprofileContainer">
            {dogProfiles.length > 0
              ? dogProfiles.map((dog) => <DogProfile dog={dog} />)
              : "NO DOG PROFILES YET! 🐶"}
          </div> */}
          <DogProfileReel dogReel={dogReel} />

          <div>
            <ProfileMe userId={userId} dogs={dogProfiles} />
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
