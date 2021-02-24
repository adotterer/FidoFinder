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
  fetch(`/api/user/status`, {
    method: "POST",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => console.log("here is res.status", res.status))
    .catch((e) => console.error(e));
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
