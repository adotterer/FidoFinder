import { useEffect, useState } from "react";
import "./phone_number_input.css";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { fetch } from "../../store/csrf.js";

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/user/me/phone").then((res) => setPhoneNumber(res.data));
    console.log("new value of checked", checked);
  }, [checked]);
  function updatePhoneNumber() {
    fetch("/api/user/me/phone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newNumber: phoneNumber }),
    }).then((res) => console.log(res));
  }
  useEffect(() => {
    console.log(phoneNumber);
  }, [phoneNumber]);

  return (
    <div className="sms__container">
      <div className="status__container">
        <em>Phone Number:</em> {"\n"}
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            return setPhoneNumber(e.target.value);
          }}
          placeHolder="No number on record"
        />
        <button onClick={updatePhoneNumber}>Update</button>
      </div>

      <section className="section">
        <div className="radio-container">
          <input
            type="radio"
            onClick={() => setChecked((checkedd) => !checkedd)}
            onChange={() => {}}
            checked={checked}
            name="group1"
            id="radio-2"
          />
          <label for="radio-2">
            <span className="radio sms__label">
              Receive SMS Text Message Notifications
            </span>
            <span className="sms__moreInfo">
              <BsFillQuestionCircleFill />
            </span>
          </label>
        </div>
      </section>
    </div>
  );
}
