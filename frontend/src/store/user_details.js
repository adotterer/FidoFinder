import { fetch } from "./csrf.js";

const SET_STATUS = "status/set";

const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const setUserStatus = (status) => async (dispatch) => {
  dispatch(setStatus(status));
  const dateTime = await fetch(`/api/user/status`, {
    method: "POST",
    body: JSON.stringify({ status }),
  })
    .then((time) => time.data)
    .catch((e) => console.error(e));

  console.log("DATETIME OF UPDATED STATUS", dateTime);
};

const initialState = {};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_STATUS:
      newState = { ...state, status: action.status };
      return newState;
    default:
      return state;
  }
}

export default reducer;
