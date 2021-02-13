import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  return <h1>UserProfile</h1>;
}

export default UserProfile;
