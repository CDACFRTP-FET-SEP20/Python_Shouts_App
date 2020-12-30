const initialState = {
  friendList: [],
  user: {
    user_id: "26216682-71e4-4f55-b0fe-014e64bd880a",
    username: "abc",
    bio: "No bio.....",
    user_image: "/media/avatar.png",
  },

  profiles:[]
};

function FriendListReducer(state = initialState, action) {
  if (action.type === "DisplayList") {
    return { ...state, friendList: action.payload };
  }

  if (action.type === "storeProfileinfo"){
    return { ...state, profiles: action.payload };
  }
  return state;
}

export default FriendListReducer;
