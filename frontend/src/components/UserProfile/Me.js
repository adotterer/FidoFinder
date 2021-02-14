import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import createChatRoomEvent from "../../utils/createChatRoomEvent";

function ProfileMe({ userId, dogs }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser.id, "sessionid", userId);
  if (Number(sessionUser.id) !== Number(userId)) return null;
  else {
    return (
      <div>
        <button>Add new dog</button>
      </div>
    );
  }
}

export default ProfileMe;
