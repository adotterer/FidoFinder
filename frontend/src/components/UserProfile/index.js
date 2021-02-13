import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState();
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

  return (
    <div>
      <h1>UserProfile</h1>
      <span>userId: {userId}</span>
    </div>
  );
}

export default UserProfile;
