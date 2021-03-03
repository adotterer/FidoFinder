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
      return (
        <div class="div__LogInSignUpBlock">
          <GetIpAddress />
          <div>
            Please log in or sign up to start chatting with dog owners near you.
          </div>
          <div>
            <LoginFormModal />
          </div>
          <Link to="/signup">
            <div>
              <button>Sign up</button>
            </div>
          </Link>
        </div>
      );
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
