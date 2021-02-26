import { fetch } from "./csrf.js";

const SET_NEW_DOG = "dog/addDog";
const SET_MODAL = "modal/toggle";

const setNewDog = (dog) => {
  return {
    type: SET_NEW_DOG,
    dog,
  };
};

const setDogModal = (open) => {
  return {
    type: SET_MODAL,
    open,
  };
};

export const toggleDogModal = (open) => async (dispatch) => {
  dispatch(setDogModal(open));
};

export const addDog = ({ dogName, birthday, interests, dogImage }) => async (
  dispatch
) => {
  const formData = new FormData();
  formData.append("dogName", dogName);
  formData.append("birthday", birthday);
  formData.append("interests", interests);

  // for multiple files
  // if (itemImages && itemImages.length !== 0) {
  //   for (var i = 0; i < itemImages.length; i++) {
  //     formData.append("images", itemImages[i]);
  //   }
  // }

  // for single file
  if (dogImage) formData.append("image", dogImage);

  const newDog = await fetch(`/api/dogProfile/add`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  return newDog.data;
};

export const submitNewDog = (newDog) => async (dispatch) => {
  dispatch(setNewDog(newDog));
};

const initialState = {};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_MODAL:
      newState = { ...state, open: action.open };
      return newState;
    case SET_NEW_DOG:
      newState = { ...state, dogProfile: action.dog };
      return newState;
    // case REMOVE_ITEM:
    //   newState = Object.assign({}, state);
    //   newState.item = null;
    //   return newState;
    default:
      return state;
  }
}

export default reducer;
