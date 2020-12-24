const initialState = {
  friendList: [],
  user: {
    id: 4,
    bio: "safd dfd asfad af",
    username: "Shekhar",
  },
};

function FriendListReducer(state = initialState, action) {
  if (action.type === "DisplayList") {
    return { ...state, friendList: action.payload };
  }

  return state;
}

export default FriendListReducer;
