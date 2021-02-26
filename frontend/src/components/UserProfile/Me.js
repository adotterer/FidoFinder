import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewDogModal from "../NewDogModal";

function ProfileMe({ userId }) {
  const sessionUser = useSelector((state) => state.session.user);

  if (Number(sessionUser.id) !== Number(userId)) return null;
  else {
    return (
      <div>
        <NewDogModal />
      </div>
    );
  }
}

export default ProfileMe;
