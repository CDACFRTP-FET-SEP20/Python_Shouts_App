const initialState = {
  token: sessionStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

function reducer(state = initialState, action) {
  if (action.type === "AddToken") {
    sessionStorage.setItem("token", action.payload.token);
    sessionStorage.setItem("user", action.payload.username);
    console.log(action.payload
      );
    console.log("Reducer====", action.payload.username);
    state = action.payload;
    return {
      ...state,
      token: sessionStorage.getItem("token"),
      isAuthenticated: true,
      user: action.payload.user,
    };
  }

  return state;
}

export default reducer;
