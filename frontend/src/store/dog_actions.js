import { fetch } from "./csrf.js";

const SET_NEW_DOG = "dog/addDog";

const setNewDog = (dog) => {
  return {
    type: SET_NEW_DOG,
    dog,
  };
};

export const addDog = ({ dogName, birthday, dogImage }) => async (dispatch) => {
  const formData = new FormData();
  console.log("About to add ", dogName, "and", " ", birthday, "to form");
  formData.append("dogName", dogName);
  formData.append("birthday", birthday);
  // formData.append("interests", interests);
  // formData.append("ownerId", ownerId);

  // for multiple files
  // if (itemImages && itemImages.length !== 0) {
  //   for (var i = 0; i < itemImages.length; i++) {
  //     formData.append("images", itemImages[i]);
  //   }
  // }

  // for single file
  if (dogImage) formData.append("image", dogImage);

  const response = await fetch(`/api/dogProfile/add`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const dog = await response;

  dispatch(setNewDog(dog));
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
