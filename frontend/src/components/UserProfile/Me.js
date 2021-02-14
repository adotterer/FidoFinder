import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import createChatRoomEvent from "../../utils/createChatRoomEvent";
import NewDogModal from "../NewDogModal";

function ProfileMe({ userId, dogs }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser.id, "sessionid", userId);
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
