const initialState = {};

function reducer(state = initialState, action) {
  
  if (action.type === "AddToken") {
    state = action.payload;
  }
  console.log("login reducer",state);
  return state;
}

export default reducer;
