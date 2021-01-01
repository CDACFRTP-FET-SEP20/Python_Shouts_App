const initialState = {
  like : []
};

function reducer(state = initialState, action) {
  if (action.type === "AddLike") {
    console.log("add", action.payload);
    return {...state, like : action.payload};
  }
  if (action.type === "setLike") {
    // console.log("setShouts", state);
    state = action.payload;
    return state
  }
  if (action.type === "delete_like") {
    console.log("delete",state);
    return state;
   
  }

  return state;
}

export default reducer;