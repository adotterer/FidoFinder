export default function MessageHead([topMessage]) {
  console.log(topMessage, "top message");
  const [otherUsers] = topMessage.otherUsers;
  console.log(otherUsers);
  return (
    <div key={"inbox#" + topMessage.chatRoomId}>
      <h4>Your conversation with {otherUsers.username}:</h4>
      <div>
        <span>{topMessage.username}: </span>
        {topMessage.message}
      </div>
      <hr />
    </div>
  );
}
