const initialState = {};

function reducer(state = initialState, action) {
  if (action.type === "AddReport") {
    state = action.payload;
  }

  return state;
}

export default reducer;