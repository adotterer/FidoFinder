import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  return (
    <div>
      <h1>UserProfile</h1>
      <span>userId: {userId}</span>
    </div>
  );
}

export default UserProfile;
