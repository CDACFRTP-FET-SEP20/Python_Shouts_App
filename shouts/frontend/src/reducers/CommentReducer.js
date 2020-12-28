const initialState = {};

function reducer(state = initialState, action) {
  if (action.type === "AddComment") {
    state = action.payload;
  }

  return state;
}

export default reducer;