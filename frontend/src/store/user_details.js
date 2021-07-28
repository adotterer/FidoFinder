import { fetch } from "./csrf.js";

const SET_STATUS = "status/set";
const USER_PROFILE = "user/profile";

const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

const userProfile = (userId, profile) => {
  return {
    type: USER_PROFILE,
    userId,
    profile,
  };
};

export const setUserProfile = (userId) => async (dispatch) => {
  const profile = fetch();
  dispatch(userProfile(userId, profile));
};

export const setUserStatus = (status) => async (dispatch) => {
  dispatch(setStatus(status));
  await fetch(`/api/user/status`, {
    method: "POST",
    body: JSON.stringify({ status }),
  })
    .then((time) => time.data)
    .catch((e) => console.error(e));

  // console.log("DATETIME OF UPDATED STATUS", dateTime);
};

const initialState = {};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_STATUS:
      newState = { ...state, status: action.status };
      return newState;
    case USER_PROFILE:
      newState = { ...state, [action.userId]: action.profile };
      return newState;
    default:
      return state;
  }
}

export default reducer;
