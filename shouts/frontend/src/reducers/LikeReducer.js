const initialState = {};

function reducer(state = initialState, action) {
  if (action.type === "AddLike") {
    state = action.payload;
  }
  if (action.type === "setLike") {
    // console.log("setShouts", state);
    return action.payload;
  }
  if (action.type === "delete_like") {
    console.log("delete",state);
    return state;
   
  }

  return state;
}

export default reducer;