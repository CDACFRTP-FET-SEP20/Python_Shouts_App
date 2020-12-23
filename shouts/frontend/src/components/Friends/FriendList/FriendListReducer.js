const initialState = {
  friendList: [],
  user: {
    id: 7,
    bio: "safd dfd asfad af",
    username: "amey",
  },
};

function FriendListReducer(state = initialState, action) {
  if (action.type === "DisplayList") {
    return { ...state, friendList: action.payload };
  }

  return state;
}

export default FriendListReducer;
