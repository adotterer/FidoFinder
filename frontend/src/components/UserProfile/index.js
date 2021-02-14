import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState();
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
          <div>username: {userProfile.username}</div>
          <div>status: {userProfile.UserDetail.status}</div>
          <div>
            {userProfile.Dogs.length > 0
              ? "this user has dogs"
              : "this user has no dogs"}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading.....</div>;
  }
}

export default UserProfile;
