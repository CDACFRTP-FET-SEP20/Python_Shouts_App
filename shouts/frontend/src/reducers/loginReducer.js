const initialState = {};

function reducer(state = initialState, action) {
  if (action.type === "AddToken") {
    state = action.payload;
  }

  return state;
}

export default reducer;
