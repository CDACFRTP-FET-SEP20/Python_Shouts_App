
function ShoutsReducer(state = [], action) {
    if (action.type === "setShouts") {
        console.log("setShouts",state);
        return action.payload;
    }
  
    if (action.type === "createShouts") {
      console.log(action.payload.data);
      return [action.payload.data,...state];
    }
  
    return state;
  }
  export default ShoutsReducer;
