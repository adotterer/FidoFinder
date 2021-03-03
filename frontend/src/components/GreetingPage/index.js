import { useSelector } from "react-redux";
import "./Greeting.css";
import LoginFormModal from "../LoginFormModal";
import GetIpAddress from "../GetIpAddress";
import { Link } from "react-router-dom";
import NearbyUsers from "../NearbyUsers";

function GreetingPage() {
  const sessionUser = useSelector((state) => state.session.user);

  function LogInSignUpBlock() {
    if (!sessionUser) {
      return <GetIpAddress />;
    } else {
      return null;
    }
  }
  return (
    <div>
      <div class="div__greetingPage">
        <LogInSignUpBlock />
      </div>
      {sessionUser && <NearbyUsers />}
    </div>
  );
}

export default GreetingPage;
