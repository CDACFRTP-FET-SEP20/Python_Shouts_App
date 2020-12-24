const initialState = {
  friendList: [],
  user: {
    id: 1,
    bio: "safd dfd asfad af",
    username: "shubham",
  },
};

function FriendListReducer(state = initialState, action) {
  if (action.type === "DisplayList") {
    return { ...state, friendList: action.payload };
  }

  return state;
}

export default FriendListReducer;
