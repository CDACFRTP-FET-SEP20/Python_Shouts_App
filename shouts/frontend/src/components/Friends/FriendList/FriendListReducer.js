const initialState = {
  friendList: [],
  user: {
    id: 4,
    bio: "aaaaa ssss ddddd fffff ggghh  jjj",
    username: "shekhar",
  },
};

function FriendListReducer(state = initialState, action) {
  if (action.type === "DisplayList") {
    return { ...state, friendList: action.payload };
  }

  return state;
}

export default FriendListReducer;
