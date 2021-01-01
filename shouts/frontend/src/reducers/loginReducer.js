const initialState = {
  token: sessionStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

function reducer(state = initialState, action) {
  if (action.type === "AddToken") {
    sessionStorage.setItem("token", action.payload.token);

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
