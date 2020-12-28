const initialState = {};

function reducer(state = initialState, action) {
  if (action.type === "AddLike") {
    state = action.payload;
  }

  return state;
}

export default reducer;