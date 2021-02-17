import { fetch } from "./csrf.js";

const SET_NEW_DOG = "dog/addDog";

const setNewDog = (dog) => {
  return {
    type: SET_NEW_DOG,
    dog,
  };
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

  dispatch(setNewDog(newDog));
};

const initialState = {};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_NEW_DOG:
      newState = Object.assign({}, state);
      newState = action.dog;
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
