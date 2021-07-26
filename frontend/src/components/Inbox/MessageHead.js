export default function MessageHead([topMessage]) {
  console.log(topMessage, "top message");
  return (
    <div>
      <h4>{topMessage.username}:</h4>
      <div>{topMessage.message}</div>
      <hr />
    </div>
  );
}
