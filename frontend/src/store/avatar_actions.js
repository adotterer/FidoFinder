import { fetch } from "./csrf";
const SET_MODAL = "avatarModal/toggle";

const setAvatarModal = (open) => {
  return {
    type: SET_MODAL,
    open,
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
  
  return res.data;
};

export const chooseExistingPic = (imageId) => async (dispatch) => {
  console.log(imageId);
};

const initialState = {};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_MODAL:
      newState = { ...state, open: action.open };
      return newState;
    default:
      return state;
  }
}

export default reducer;
