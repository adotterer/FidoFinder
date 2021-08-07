import { useEffect, useState } from "react";
import "./phone_number_input.css";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { fetch } from "../../store/csrf.js";

// source:
// https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
}

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [checked, setChecked] = useState(false);
  const [editInput, setEditInput] = useState(false);

  useEffect(() => {
    fetch("/api/user/me/phone").then((res) => setPhoneNumber(res.data));
    // console.log("new value of checked", checked);
  }, []);

  function updatePhoneNumber() {
    fetch("/api/user/me/phone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newNumber: phoneNumber }),
    }).then(setEditInput(false));
  }
  // useEffect(() => {
  //   console.log(phoneNumber);
  // }, [phoneNumber]);

  return (
    <>
      <div className="phone__container">
        <em>Phone Number:</em> {"\n"}
        <div className="phone__number__container">
          {editInput ? (
            <>
              <input
                type="text"
                value={formatPhoneNumber(phoneNumber)}
                onChange={(e) => {
                  return setPhoneNumber(e.target.value);
                }}
                placeHolder="No number on record"
              />
              <button onClick={updatePhoneNumber}>Update</button>
            </>
          ) : (
            <>
              <span>{formatPhoneNumber(phoneNumber) + "\t"}</span>
              <span onClick={() => setEditInput(true)}>Edit</span>
            </>
          )}
        </div>
      </div>
      <div className="sms__container">
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
    </>
  );
}
