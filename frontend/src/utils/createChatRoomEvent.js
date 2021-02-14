import React from "react";

const createChatRoom = async (sessionUser, user) => {
  const res = await fetch(
    `/api/chatroom/add?sessionUserId=${sessionUser.id}&&otherUserId=${user.id}&&sessionUsername=${sessionUser.username}&&otherUsername=${user.username}`
  );
  
  return await res.json();
};
const createChatRoomEvent = async (event, sessionUser, user) => {
  try {
    const res = await createChatRoom(sessionUser, user);
    const chatRoomNumber = res.chatRoomId;
    return chatRoomNumber;
    // history.push(`/chatroom/${chatRoomNumber}`);
  } catch (e) {
    console.error("FAILED TO GET CHAT ROOM NUMBER");
  }
};

export default createChatRoomEvent;
