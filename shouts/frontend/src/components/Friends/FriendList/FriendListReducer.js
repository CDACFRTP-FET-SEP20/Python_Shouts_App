const initialState = {
  friendList: [],
  user: {
    id: 4,
    bio: "safd dfd fdf fdf adjfndksj bkjbdk jbdaj fbjkdb;kj bkadbgi kablh nd gajga bjfkab; afba asfad af",
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
