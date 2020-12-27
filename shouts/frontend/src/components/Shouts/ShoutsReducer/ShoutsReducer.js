function ShoutsReducer(state = [], action) {
  if (action.type === "setShouts") {
    console.log("setShouts", state);
    return action.payload;
  }

  if (action.type === "createShouts") {
    console.log(action.payload.data);
    return [action.payload.data, ...state];
  }
  if (action.type === "edit_post") {
    return action.payload;
  }

  if (action.type === "delete_post") {
    postIndex = shouts.findIndex((post) => post.id === action.payload);
    if (postIndex !== -1) {
      shouts.splice(postIndex, 1);
    }
    return shouts;
  }
  return state;
}
export default ShoutsReducer;
