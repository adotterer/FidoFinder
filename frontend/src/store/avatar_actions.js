import { fetch } from "./csrf";
const SET_MODAL = "avatarModal/toggle";
const SET_AVATAR_ME_URL = "avatar/me/url";

const setAvatarModal = (open) => {
  return {
    type: SET_MODAL,
    open,
  };
};

const setAvatarURL = (URL) => {
  return {
    type: SET_AVATAR_ME_URL,
    URL,
  };
};

export const toggleAvatarModal = (open) => async (dispatch) => {
  dispatch(setAvatarModal(open));
};

export const uploadAvatar = (avatar) => async (dispatch) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const res = await fetch(`/api/user/me/avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  console.log("RESDATA ABOUT TO BE DISPATCHED");
  dispatch(setAvatarURL(res.data));
  return res.data;
};

export const chooseExistingPic = (imageId) => async (dispatch) => {
  console.log(imageId);
  const formData = new FormData();
  formData.append("imageId", imageId);
  const res = await fetch(`/api/user/me/avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  console.log("RESDATA ABOUT TO BE DISPATCHED", res.data);
  dispatch(setAvatarURL(res.data));
  return res.data;
};

const initialState = {};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_MODAL:
      newState = { ...state, open: action.open };
      return newState;
    case SET_AVATAR_ME_URL:
      newState = { ...state, profileMeURL: action.URL };
      return newState;
    default:
      return state;
  }
}

export default reducer;
