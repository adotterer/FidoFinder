const SET_MODAL = "modal/toggle";

const setAvatarModal = (open) => {
  return {
    type: SET_MODAL,
    open,
  };
};

export const toggleAvatarModal = (open) => async (dispatch) => {
  dispatch(setAvatarModal(open));
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
