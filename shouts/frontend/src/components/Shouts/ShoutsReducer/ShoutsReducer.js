function ShoutsReducer(state = [], action) {
    if (action.type === "setShouts") {
        console.log("setShouts",state);
        return action.payload;
    }
  
    if (action.type === "createShouts") {
      return [action.payload, ...state];
    }
  
    return state;
  }
  export default ShoutsReducer;