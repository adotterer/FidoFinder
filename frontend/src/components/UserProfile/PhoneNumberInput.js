import { useEffect, useState } from "react";
import "./phone_number_input.css";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    console.log("new value of checked", checked);
  }, [checked]);
  return (
    <div className="sms__container">
      <section className="section">
        <div className="radio-container">
          <input
            type="radio"
            onClick={() => setChecked((checkedd) => !checkedd)}
            checked={checked}
            name="group1"
            id="radio-2"
          />
          <label for="radio-2">
            <span className="radio sms__label">
              Receive SMS Text Messages Notifications
            </span>
            <span className="sms__moreInfo">
              <BsFillQuestionCircleFill />
            </span>
          </label>
        </div>
        <div>
          
        </div>
      </section>
    </div>
  );
}
